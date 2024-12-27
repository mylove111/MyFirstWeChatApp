// pages/learned/learned.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    totalLearned: 0,
    todayLearned: 0,
    learnedWords: [],
    audioContext: null,
    masteryRate: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 创建音频上下文
    this.audioContext = wx.createInnerAudioContext()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.loadLearnedWords()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // 页面卸载时销毁音频上下文
    if (this.audioContext) {
      this.audioContext.destroy()
    }
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  loadLearnedWords() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      this.setData({
        learnedWords: [],
        totalLearned: 0,
        todayLearned: 0,
        masteryRate: 0
      })
      return
    }

    // 获取已学单词列表
    const learnedWords = wx.getStorageSync('learnedWords') || []
    
    // 获取今日学习数量
    const todayLearned = wx.getStorageSync('todayLearned') || 0
    
    // 计算掌握率
    let masteryRate = 0
    if (learnedWords.length > 0) {
      // 计算每个单词的掌握度
      const totalMastery = learnedWords.reduce((sum, word) => {
        // 基础分数：每个单词20分
        let score = 20

        // 根据复习次数加分：每次复习加10分，最多30分
        const reviewScore = Math.min((word.masteryLevel || 0) * 10, 30)
        score += reviewScore

        // 根据最近学习时间加分
        const daysPassed = (new Date().getTime() - word.learnedAt) / (24 * 60 * 60 * 1000)
        if (daysPassed < 1) { // 今天学的
          score += 30
        } else if (daysPassed < 3) { // 3天内学的
          score += 20
        } else if (daysPassed < 7) { // 一周内学的
          score += 10
        }

        // 如果是从错题本标记为认识的，额外加分
        if (word.source === 'mistakes') {
          score += 20
        }

        return sum + Math.min(score, 100) // 单个单词最高100分
      }, 0)

      // 计算平均分作为掌握率
      masteryRate = Math.round(totalMastery / learnedWords.length)
    }

    // 按时间倒序排列单词列表
    const sortedWords = learnedWords.sort((a, b) => b.learnedAt - a.learnedAt)

    this.setData({
      learnedWords: sortedWords,
      totalLearned: learnedWords.length,
      todayLearned,
      masteryRate
    })
  },

  // 播放单词发音
  playPronunciation(e) {
    const { word } = e.currentTarget.dataset
    
    wx.showLoading({
      title: '加载音频...'
    })

    // 使用有道词典 TTS 服务
    this.audioContext.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(word)}&type=1`
    this.audioContext.play()

    this.audioContext.onPlay(() => {
      wx.hideLoading()
    })

    this.audioContext.onError((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '播放失败',
        icon: 'none'
      })
      console.error('音频播放错误：', err)
    })
  },

  // 播放例句音频
  playExample(e) {
    const { example } = e.currentTarget.dataset
    if (!example) return

    wx.showLoading({
      title: '加载音频...'
    })

    this.audioContext.src = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(example)}&type=1`
    this.audioContext.play()

    this.audioContext.onPlay(() => {
      wx.hideLoading()
    })

    this.audioContext.onError((err) => {
      wx.hideLoading()
      wx.showToast({
        title: '例句播放失败',
        icon: 'none'
      })
      console.error('例句播放错误：', err)
    })
  }
})