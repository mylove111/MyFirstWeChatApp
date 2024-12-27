const fetchWords = async () => {
  try {
    const response = await wx.request({
      url: 'https://your-server.com/api/words',
      method: 'GET'
    })
    return response.data
  } catch (error) {
    return null
  }
}

// 获取随机单词列表
const getRandomWords = async () => {
  // 基础词汇列表
  const baseWords = [
    'hello', 'world', 'apple', 'book', 'cat', 'dog',
    'elephant', 'fish', 'garden', 'house', 'ice', 'juice'
    // ... 可以添加更多基础单词
  ]
  
  const words = []
  const shuffled = baseWords.sort(() => 0.5 - Math.random())
  const selected = shuffled.slice(0, 10) // 每次随机选10个单词

  for (const word of selected) {
    const wordData = await fetchWords(word)
    if (wordData) {
      words.push(wordData)
    }
  }

  return words
}

module.exports = {
  getRandomWords
} 