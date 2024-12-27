const { wordList } = require('../../utils/words.js')

Page({
  data: {
    currentWord: {},
    currentIndex: 0,
    showExample: false,
    progress: 0,
    todayLearned: 0,
    remainingWords: 20,
    audioContext: null  // 添加音频上下文
  },

  onLoad() {
    // 创建音频上下文
    this.audioContext = wx.createInnerAudioContext()
    // 初始化今日单词列表
    this.initTodayWords()
  },

  onUnload() {
    // 页面卸载时销毁音频上下文
    if (this.audioContext) {
      this.audioContext.destroy()
    }
  },

  // 添加发音功能
  playPronunciation() {
    const { currentWord } = this.data
    if (currentWord.audioUrl) {
      // 播放前显示加载中
      wx.showLoading({
        title: '加载音频...',
      })
      
      this.audioContext.src = currentWord.audioUrl
      this.audioContext.play()
      
      // 监听播放开始事件
      this.audioContext.onPlay(() => {
        wx.hideLoading()
      })
      
      // 监听播放错误事件
      this.audioContext.onError((res) => {
        wx.hideLoading()
        wx.showToast({
          title: '音频���放失败',
          icon: 'none'
        })
        console.error('音频播放错误：', res)
      })
    }
  },

  initTodayWords() {
    // 获取今日日期
    const today = new Date().toDateString()
    // 获取上次学习的日期
    const lastStudyDate = wx.getStorageSync('lastStudyDate')
    
    // 如果是新的一天，重新分配单词
    if (today !== lastStudyDate) {
      // 随机选择20个单词作为今日任务
      const shuffled = wordList.sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 20)
      
      wx.setStorageSync('todayWords', selected)
      wx.setStorageSync('lastStudyDate', today)
      wx.setStorageSync('todayLearned', 0)
    }

    const todayWords = wx.getStorageSync('todayWords') || []
    const todayLearned = wx.getStorageSync('todayLearned') || 0

    this.setData({
      todayWords,
      currentWord: todayWords[0],
      todayLearned,
      remainingWords: todayWords.length - todayLearned,
      progress: Math.floor((todayLearned / todayWords.length) * 100)
    })
  },

  // 修改显示例句的方法
  showExample() {
    if (this.data.showExample) {
      this.nextWord()
    } else {
      this.setData({ showExample: true }, () => {
        // 延迟1000ms后播放例句
        setTimeout(() => {
          this.playExample()
        }, 1000)
      })
    }
  },

  // 添加播放例句的方法
  playExample() {
    const { currentWord } = this.data
    if (currentWord.example) {
      // 使用在线TTS服务
      const audioContext = wx.createInnerAudioContext()
      // 使用有道词典的TTS服务
      audioContext.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(currentWord.example)}&type=1`
      
      // 播放前显示加载中
      wx.showLoading({
        title: '加载音频...',
      })
      
      audioContext.play()
      
      // 监听播放开始
      audioContext.onPlay(() => {
        wx.hideLoading()
      })
      
      // 监听播放完成
      audioContext.onEnded(() => {
        audioContext.destroy()
      })
      
      // 监听错误
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
    const { currentWord, todayLearned } = this.data
    // 保存到已学单词
    wx.getStorage({
      key: 'learnedWords',
      success: (res) => {
        const learnedWords = res.data || []
        learnedWords.push({
          ...currentWord,
          learnedAt: new Date().getTime()
        })
        wx.setStorage({
          key: 'learnedWords',
          data: learnedWords
        })
      },
      fail: () => {
        wx.setStorage({
          key: 'learnedWords',
          data: [{
            ...currentWord,
            learnedAt: new Date().getTime()
          }]
        })
      }
    })

    // 更新今日学习数量
    const newTodayLearned = todayLearned + 1
    wx.setStorageSync('todayLearned', newTodayLearned)
    
    this.nextWord()
  },

  // 标记为不认识
  markWrong() {
    const { currentWord } = this.data
    // 保存到错题本
    wx.getStorage({
      key: 'mistakeWords',
      success: (res) => {
        const mistakeWords = res.data || []
        mistakeWords.push({
          ...currentWord,
          addedAt: new Date().getTime()
        })
        wx.setStorage({
          key: 'mistakeWords',
          data: mistakeWords
        })
      },
      fail: () => {
        wx.setStorage({
          key: 'mistakeWords',
          data: [{
            ...currentWord,
            addedAt: new Date().getTime()
          }]
        })
      }
    })
    this.setData({ showExample: true }) // 显示例句
  },

  // 下一个单词
  nextWord() {
    const { currentIndex, todayWords, todayLearned } = this.data
    const nextIndex = currentIndex + 1
    
    if (nextIndex >= todayWords.length) {
      wx.showToast({
        title: '今日单词已完成！',
        icon: 'success'
      })
      // 返回到第一个单词
      this.setData({
        currentIndex: 0,
        currentWord: todayWords[0],
        showExample: false,
        progress: 100
      })
      return
    }

    this.setData({
      currentIndex: nextIndex,
      currentWord: todayWords[nextIndex],
      showExample: false,
      progress: Math.floor(((todayLearned + 1) / todayWords.length) * 100),
      remainingWords: todayWords.length - (todayLearned + 1)
    })
  }
}) 