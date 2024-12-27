Page({
  data: {
    dailyQuote: {
      content: "Practice makes perfect.",
      translation: "熟能生巧。"
    },
    todayLearned: 0,
    totalLearned: 0,
    streak: 0,
    quoteList: [
      {
        content: "Practice makes perfect.",
        translation: "熟能生巧。"
      },
      {
        content: "Actions speak louder than words.",
        translation: "行动胜于言语。"
      },
      {
        content: "Time is money.",
        translation: "时间就是金钱。"
      },
      {
        content: "Knowledge is power.",
        translation: "知识就是力量。"
      },
      {
        content: "Where there is a will, there is a way.",
        translation: "有志者事竟成。"
      },
      {
        content: "No pain, no gain.",
        translation: "不劳无获。"
      },
      {
        content: "Life is not all roses.",
        translation: "生活并非一帆风顺。"
      },
      {
        content: "Every cloud has a silver lining.",
        translation: "黑暗中总有一线光明。"
      }
    ]
  },

  onShow() {
    // 每���显示页面时更新学习进度
    this.updateStudyProgress()
    
    // 检查是否需要更新每日一句
    this.checkAndUpdateDailyQuote()
  },

  checkAndUpdateDailyQuote() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      // 未登录时显示默认每日一句
      this.setData({
        dailyQuote: {
          content: "Practice makes perfect.",
          translation: "熟能生巧。"
        }
      })
      return
    }
    
    const lastQuoteDate = wx.getStorageSync('lastQuoteDate')
    const today = new Date().toDateString()
    
    // 如果是新登录或新的一天，更新每日一句
    if (!lastQuoteDate || lastQuoteDate !== today) {
      this.loadDailyQuote()
      wx.setStorageSync('lastQuoteDate', today)
    }
  },

  updateStudyProgress() {
    const userInfo = wx.getStorageSync('userInfo')
    if (!userInfo) {
      this.setData({
        todayLearned: 0,
        totalLearned: 0,
        streak: 0
      })
      return
    }

    // 获取今日学习数量
    const todayLearned = wx.getStorageSync('todayLearned') || 0
    
    // 获取总学习进度
    const learnedWords = wx.getStorageSync('learnedWords') || []
    const studyProgress = wx.getStorageSync('studyProgress') || {
      totalWords: 0,
      streak: 0
    }

    this.setData({
      todayLearned,
      totalLearned: learnedWords.length,
      streak: studyProgress.streak,
      progress: Math.floor((todayLearned / 50) * 100)
    })
  },

  onLoad() {
    this.audioContext = wx.createInnerAudioContext()
    this.loadDailyQuote()
    this.loadStats()
  },

  onUnload() {
    if (this.audioContext) {
      this.audioContext.destroy()
    }
  },

  loadStats() {
    // 获取今日已学单词数
    const todayLearned = wx.getStorageSync('todayLearned') || 0
    
    // 获取总学习单词数
    const learnedWords = wx.getStorageSync('learnedWords') || []
    
    // 获取连续打卡天数
    const streak = wx.getStorageSync('streak') || 0

    this.setData({
      todayLearned,
      totalLearned: learnedWords.length,
      streak
    })
  },

  loadDailyQuote() {
    const { quoteList } = this.data
    // 随机选择一句
    const randomIndex = Math.floor(Math.random() * quoteList.length)
    const quote = quoteList[randomIndex]
    
    this.setData({
      dailyQuote: quote
    })
  },

  playQuoteAudio() {
    const { content } = this.data.dailyQuote
    if (!content) {
      wx.showToast({
        title: '暂无音频',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '加载音频...'
    })

    // 使用有词典 TTS 服务
    const audioUrl = `https://dict.youdao.com/dictvoice?audio=${encodeURIComponent(content)}&type=1`
    this.audioContext.src = audioUrl
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

    this.audioContext.onEnded(() => {
      console.log('音频播放完成')
    })
  },

  navigateTo(e) {
    const page = e.currentTarget.dataset.page
    wx.navigateTo({
      url: `/pages/${page}/${page}`
    })
  }
}) 