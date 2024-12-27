// pages/mistakes/mistakes.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mistakeWords: [],
    audioContext: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
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
    this.loadMistakeWords()
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

  loadMistakeWords() {
    wx.getStorage({
      key: 'mistakeWords',
      success: (res) => {
        this.setData({
          mistakeWords: res.data || []
        })
      }
    })
  },

  playPronunciation(e) {
    const { word } = e.currentTarget.dataset
    if (word.audioUrl) {
      this.audioContext.src = word.audioUrl
      this.audioContext.play()
    }
  },

  markAsLearned(e) {
    const { word } = e.currentTarget.dataset
    
    // 获取已学单词列表
    const learnedWords = wx.getStorageSync('learnedWords') || []
    
    // 检查单词是否已存在
    const existingIndex = learnedWords.findIndex(item => item.word === word.word)
    
    if (existingIndex !== -1) {
      // 如果单词已存在，更新学习时间和来源
      learnedWords[existingIndex].learnedAt = new Date().getTime()
      learnedWords[existingIndex].source = 'mistakes'
    } else {
      // 如果是新单词，添加到列表
      learnedWords.push({
        ...word,
        learnedAt: new Date().getTime(),
        source: 'mistakes',
        masteryLevel: 1
      })
    }
    
    // 保存更新后的已学单词列表
    wx.setStorageSync('learnedWords', learnedWords)
    
    // 从错题本中移除
    const mistakeWords = wx.getStorageSync('mistakeWords') || []
    const updatedMistakes = mistakeWords.filter(item => item.word !== word.word)
    wx.setStorageSync('mistakeWords', updatedMistakes)
    
    // 显示提示
    wx.showToast({
      title: '请及时复习！',
      icon: 'none',
      duration: 2000
    })
    
    // 刷新错题本列表
    this.loadMistakeWords()
  }
})