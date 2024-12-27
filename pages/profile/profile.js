// pages/profile/profile.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    hasUserInfo: false,
    stats: {
      totalWords: 0,
      todayWords: 0, 
      streak: 0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // 检查是否已有用户信息
    const userInfo = wx.getStorageSync('userInfo')
    if (userInfo) {
      this.setData({
        userInfo: userInfo,
        hasUserInfo: true
      })
      this.loadStats()
    }
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
    if (this.data.hasUserInfo) {
      this.loadStats()
    }
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
   * 用户点���右上角分享
   */
  onShareAppMessage() {

  },

  // 处理登录
  handleLogin() {
    wx.getUserProfile({
      desc: '用于完善用户资料',
      success: (res) => {
        const userInfo = res.userInfo
        wx.setStorageSync('userInfo', userInfo)
        
        // 初始化学习数据
        if (!wx.getStorageSync('learnedWords')) {
          wx.setStorageSync('learnedWords', [])
        }
        if (!wx.getStorageSync('mistakeWords')) {
          wx.setStorageSync('mistakeWords', [])
        }
        
        // 获取现有的学习进度
        const studyProgress = wx.getStorageSync('studyProgress') || {
          totalWords: 0,
          streak: 0,
          lastStudyDate: null
        }
        
        // 登录时增加连续打卡天数
        studyProgress.streak += 1
        studyProgress.lastStudyDate = new Date().toDateString()
        
        wx.setStorageSync('studyProgress', studyProgress)
        
        // 清除上次的每日一句日期，强制更新每日一句
        wx.removeStorageSync('lastQuoteDate')
        
        this.setData({ 
          userInfo, 
          hasUserInfo: true 
        })
        
        this.loadStats()
      }
    })
  },

  // 加载统计数据
  loadStats() {
    const learnedWords = wx.getStorageSync('learnedWords') || []
    const todayLearned = wx.getStorageSync('todayLearned') || 0
    const studyProgress = wx.getStorageSync('studyProgress') || {
      totalWords: 0,
      streak: 0,
    }
    
    this.setData({
      'stats.totalWords': learnedWords.length,
      'stats.todayWords': todayLearned,
      'stats.streak': studyProgress.streak
    })
  },

  // 处理退出登录
  handleLogout() {
    // 保存当前进度
    const studyProgress = wx.getStorageSync('studyProgress')
    const learnedWords = wx.getStorageSync('learnedWords')
    const mistakeWords = wx.getStorageSync('mistakeWords')
    
    // 清除用户信息和临时数据
    wx.removeStorageSync('userInfo')
    wx.removeStorageSync('todayLearned')
    wx.removeStorageSync('todayWords')
    wx.removeStorageSync('lastStudyDate')
    wx.removeStorageSync('lastQuoteDate')  // 清除每日一句的日期记录
    
    // 保存回进度数据（保持连续打卡记录）
    wx.setStorageSync('studyProgress', {
      totalWords: studyProgress.totalWords,
      streak: studyProgress.streak,
      lastStudyDate: studyProgress.lastStudyDate
    })
    
    // 保存学习记录
    wx.setStorageSync('learnedWords', learnedWords)
    wx.setStorageSync('mistakeWords', mistakeWords)
    
    this.setData({
      userInfo: null,
      hasUserInfo: false,
      stats: {
        totalWords: 0,
        todayWords: 0,
        streak: 0
      }
    })
    
    // 返回主页并刷新
    wx.switchTab({
      url: '/pages/home/home'
    })
  },

  // 页面导航
  navigateTo(e) {
    const page = e.currentTarget.dataset.page
    if (!this.data.hasUserInfo) {
      wx.showToast({
        title: '请先登录',
        icon: 'none'
      })
      return
    }

    wx.navigateTo({
      url: `/pages/${page}/${page}`
    })
  }
})