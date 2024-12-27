// pages/study/study.js
const { getRandomWords, getTotalWords } = require('../../utils/wordBank.js')

Page({
  data: {
    currentWord: {},
    currentIndex: 0,
    showExample: false,
    progress: 0,
    todayLearned: 0,
    remainingWords: 50,
    audioContext: null,
    openid: '',
    showMeaning: false
  },

  async onLoad() {
    // 检查是否登录
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      wx.showModal({
        title: '提示',
        content: '请先登录后再学习',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/profile/profile'
          })
        }
      })
      return
    }
    
    this.audioContext = wx.createInnerAudioContext()
    
    // 获取用户openid
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'login'
      })
      this.setData({
        openid: result.openid
      })
    } catch (err) {
      console.error('获取openid失败:', err)
    }
    
    // 添加检查
    const totalWords = getTotalWords()
    console.log('Total available words:', totalWords)
    
    if (totalWords < 50) {
      wx.showToast({
        title: `单词库中只有 ${totalWords} 个单词`,
        icon: 'none',
        duration: 2000
      })
    }
    
    // 直接初始化今日单词
    this.initTodayWords()
  },

  onUnload() {
    if (this.audioContext) {
      this.audioContext.destroy()
    }
  },

  async initTodayWords() {
    const today = new Date().toDateString()
    const lastStudyDate = wx.getStorageSync('lastStudyDate')
    const todayLearned = wx.getStorageSync('todayLearned') || 0
    
    let todayWords = wx.getStorageSync('todayWords') || []
    
    // 如果是新的一天或者还没有今日单词，才重新分配单词
    if (today !== lastStudyDate || todayWords.length === 0) {
      const words = getRandomWords(50)
      todayWords = words
      wx.setStorageSync('todayWords', words)
      wx.setStorageSync('lastStudyDate', today)
      wx.setStorageSync('todayLearned', 0)
    }

    // 设置当前单词为上次学习的下一个
    const currentIndex = todayLearned
    
    this.setData({
      todayWords,
      currentWord: todayWords[currentIndex],
      currentIndex,
      todayLearned,
      remainingWords: 50 - todayLearned,
      progress: Math.floor((todayLearned / 50) * 100)
    })
  },

  playPronunciation() {
    const { currentWord } = this.data
    if (currentWord.audioUrl) {
      wx.showLoading({
        title: '加载音频...',
      })
      
      this.audioContext.src = currentWord.audioUrl
      this.audioContext.play()
      
      this.audioContext.onPlay(() => {
        wx.hideLoading()
      })
      
      this.audioContext.onError((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '音频播放失败',
          icon: 'none'
        })
        console.error('音频播放错误：', res)
      })
    }
  },

  showExample() {
    if (this.data.showExample) {
      this.nextWord()
    } else {
      this.setData({ 
        showExample: true,
        showMeaning: true  // 同时显示中文意思
      }, () => {
        setTimeout(() => {
          this.playExample()
        }, 1000)
      })
    }
  },

  playExample() {
    const { currentWord } = this.data
    if (currentWord.example) {
      const audioContext = wx.createInnerAudioContext()
      audioContext.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(currentWord.example)}&type=1`
      
      wx.showLoading({
        title: '加载音频...',
      })
      
      audioContext.play()
      
      audioContext.onPlay(() => {
        wx.hideLoading()
      })
      
      audioContext.onEnded(() => {
        audioContext.destroy()
      })
      
      audioContext.onError((err) => {
        wx.hideLoading()
        console.error('例句播放错误：', err)
        wx.showToast({
          title: '例句播放失败',
          icon: 'none'
        })
        audioContext.destroy()
      })
    }
  },

  // 标记为认识
  markRight() {
    // 显示中文意思
    this.setData({ 
      showMeaning: true,
      showExample: false  // 确保例句不显示
    })
  },

  // 标记为不认识
  markWrong() {
    const { currentWord } = this.data
    
    // 显示中文意思和例句
    this.setData({ 
      showMeaning: true,
      showExample: true  // 同时显示例句
    }, () => {
      // 播放例句音频
      setTimeout(() => {
        this.playExample()
      }, 1000)
    })

    // 处理错题本逻辑
    const mistakeWords = wx.getStorageSync('mistakeWords') || []
    const isWordExist = mistakeWords.some(word => word.word === currentWord.word)
    
    if (!isWordExist) {
      mistakeWords.push({
        ...currentWord,
        addedAt: new Date().getTime(),
        reviewCount: 0,
        lastReviewAt: new Date().getTime()
      })
      wx.setStorageSync('mistakeWords', mistakeWords)
      
      wx.showToast({
        title: '已添加到错题本，请及时复习！',
        icon: 'none',
        duration: 2000
      })
    }
  },

  nextWord() {
    const { currentWord, currentIndex, todayWords } = this.data
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) return
    
    // 保存学习记录
    const learnedWords = wx.getStorageSync('learnedWords') || []
    const existingIndex = learnedWords.findIndex(item => item.word === currentWord.word)
    
    if (existingIndex !== -1) {
      // 如果单词已存在，增加掌握度
      learnedWords[existingIndex].learnedAt = new Date().getTime()
      learnedWords[existingIndex].masteryLevel = Math.min(
        (learnedWords[existingIndex].masteryLevel || 0) + 1, 
        5
      )
    } else {
      // 如果是新单词，添加到列表
      learnedWords.push({
        ...currentWord,
        learnedAt: new Date().getTime(),
        source: 'study',
        masteryLevel: 1
      })
    }
    wx.setStorageSync('learnedWords', learnedWords)

    // 更新今日学习数量
    const todayLearned = (wx.getStorageSync('todayLearned') || 0) + 1
    wx.setStorageSync('todayLearned', todayLearned)

    // 更新学习进度
    const studyProgress = wx.getStorageSync('studyProgress') || {
      totalWords: 0,
      streak: 0,
      lastStudyDate: null
    }
    
    const today = new Date().toDateString()
    if (studyProgress.lastStudyDate !== today) {
      studyProgress.streak += 1
    }
    studyProgress.totalWords += 1
    studyProgress.lastStudyDate = today
    wx.setStorageSync('studyProgress', studyProgress)

    // 检查是否完成今日学习
    const nextIndex = currentIndex + 1
    if (nextIndex >= todayWords.length) {
      wx.showToast({
        title: '今日单词已完成！',
        icon: 'success'
      })
      
      // 返回主页
      wx.navigateBack({
        delta: 1
      })
      return
    }

    // 更新到下一个单词
    this.setData({
      currentIndex: nextIndex,
      currentWord: todayWords[nextIndex],
      showExample: false,
      showMeaning: false,
      progress: Math.floor((todayLearned / 50) * 100),
      remainingWords: 50 - todayLearned,
      todayLearned
    })
  },

  goBack() {
    wx.navigateBack({
      delta: 1
    })
  },

  // 标记单词为已学
  async markWordAsLearned(word) {
    const db = wx.cloud.database()
    try {
      await db.collection('learnedWords').add({
        data: {
          word,
          learnedAt: db.serverDate(),
          reviewTimes: 1,
          mastery: 60
        }
      })
      
      // 更新进度
      await this.updateProgress()
    } catch (err) {
      console.error('保存学习记录失败:', err)
    }
  },

  // 添加到错题本
  async addToMistakes(word) {
    const db = wx.cloud.database()
    try {
      await db.collection('mistakeWords').add({
        data: {
          word,
          addedAt: db.serverDate(),
          reviewCount: 0,
          lastReviewAt: db.serverDate()
        }
      })
    } catch (err) {
      console.error('添加错题失败:', err)
    }
  },

  // 更新学习进度
  async updateProgress() {
    const db = wx.cloud.database()
    try {
      const progress = await db.collection('studyProgress')
        .where({
          _openid: this.data.openid
        })
        .get()
      
      if (progress.data.length === 0) {
        // 创建新进度记录
        await db.collection('studyProgress').add({
          data: {
            totalWords: 0,
            learnedWords: 1,
            streak: 1,
            lastStudyDate: db.serverDate()
          }
        })
      } else {
        // 更新现有进度
        await db.collection('studyProgress')
          .doc(progress.data[0]._id)
          .update({
            data: {
              learnedWords: db.command.inc(1),
              lastStudyDate: db.serverDate()
            }
          })
      }
    } catch (err) {
      console.error('更新进度失败:', err)
    }
  },

  // 标记为已学会
  async markAsLearned(word) {
    if (!this.data.userInfo) return
    
    const db = wx.cloud.database()
    try {
      await db.collection('learnedWords').add({
        data: {
          word,
          learnedAt: db.serverDate()
        }
      })
      
      // 更新本地存储
      const learnedWords = wx.getStorageSync('learnedWords') || []
      learnedWords.push({
        ...word,
        learnedAt: new Date().getTime()
      })
      wx.setStorageSync('learnedWords', learnedWords)
      
    } catch (err) {
      console.error('保存记录失败:', err)
    }
  },

  // 添加到错题本
  async addToMistakes(word) {
    if (!this.data.userInfo) return
    
    const db = wx.cloud.database()
    try {
      await db.collection('mistakeWords').add({
        data: {
          word,
          addedAt: db.serverDate()
        }
      })
      
      // 更新本地存储
      const mistakeWords = wx.getStorageSync('mistakeWords') || []
      mistakeWords.push({
        ...word,
        addedAt: new Date().getTime()
      })
      wx.setStorageSync('mistakeWords', mistakeWords)
      
    } catch (err) {
      console.error('添加错题失败:', err)
    }
  },

  // 保存到云数据库
  async saveToCloud(word, wordData) {
    try {
      const db = wx.cloud.database()
      await db.collection('learnedWords').add({
        data: {
          ...wordData,
          timestamp: db.serverDate()
        }
      })
    } catch (err) {
      console.error('保存到云数据库失败:', err)
    }
  }
})