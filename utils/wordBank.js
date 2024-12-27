const wordBank = {
  words: [
    {
      word: "apple",
      phonetic: "/ˈæpl/",
      meaning: "苹果",
      example: "I eat an apple every day.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=apple&type=2"
    },
    {
      word: "banana",
      phonetic: "/bəˈnɑːnə/",
      meaning: "香蕉",
      example: "The monkey likes bananas.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=banana&type=2"
    },
    {
      word: "computer",
      phonetic: "/kəmˈpjuːtə/",
      meaning: "电脑",
      example: "I work on my computer every day.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=computer&type=2"
    },
    {
      word: "dictionary",
      phonetic: "/ˈdɪkʃənri/",
      meaning: "字典",
      example: "Look up the word in the dictionary.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=dictionary&type=2"
    },
    {
      word: "elephant",
      phonetic: "/ˈelɪfənt/",
      meaning: "大象",
      example: "The elephant is the largest land animal.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=elephant&type=2"
    },
    {
      word: "friend",
      phonetic: "/frend/",
      meaning: "朋友",
      example: "She is my best friend.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=friend&type=2"
    },
    {
      word: "garden",
      phonetic: "/ˈɡɑːdn/",
      meaning: "花园",
      example: "We have beautiful flowers in our garden.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=garden&type=2"
    },
    {
      word: "happy",
      phonetic: "/ˈhæpi/",
      meaning: "快乐的",
      example: "The children are very happy today.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=happy&type=2"
    },
    {
      word: "internet",
      phonetic: "/ˈɪntənet/",
      meaning: "互联网",
      example: "We can find information on the internet.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=internet&type=2"
    },
    {
      word: "jacket",
      phonetic: "/ˈdʒækɪt/",
      meaning: "夹克",
      example: "It's cold, put on your jacket.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=jacket&type=2"
    },
    {
      word: "kitchen",
      phonetic: "/ˈkɪtʃɪn/",
      meaning: "厨房",
      example: "My mother is cooking in the kitchen.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=kitchen&type=2"
    },
    {
      word: "language",
      phonetic: "/ˈlæŋɡwɪdʒ/",
      meaning: "语言",
      example: "English is an international language.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=language&type=2"
    },
    {
      word: "morning",
      phonetic: "/ˈmɔːnɪŋ/",
      meaning: "早晨",
      example: "Good morning, everyone!",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=morning&type=2"
    },
    {
      word: "notebook",
      phonetic: "/ˈnəʊtbʊk/",
      meaning: "笔记本",
      example: "I write my diary in a notebook.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=notebook&type=2"
    },
    {
      word: "orange",
      phonetic: "/ˈɒrɪndʒ/",
      meaning: "橙子",
      example: "This orange is very sweet.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=orange&type=2"
    },
    {
      word: "pencil",
      phonetic: "/ˈpensl/",
      meaning: "铅笔",
      example: "Can I borrow your pencil?",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=pencil&type=2"
    },
    {
      word: "question",
      phonetic: "/ˈkwestʃən/",
      meaning: "问题",
      example: "Please ask if you have any questions.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=question&type=2"
    },
    {
      word: "rainbow",
      phonetic: "/ˈreɪnbəʊ/",
      meaning: "彩虹",
      example: "Look at that beautiful rainbow!",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=rainbow&type=2"
    },
    {
      word: "student",
      phonetic: "/ˈstjuːdnt/",
      meaning: "学生",
      example: "He is a hardworking student.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=student&type=2"
    },
    {
      word: "teacher",
      phonetic: "/ˈtiːtʃə/",
      meaning: "老师",
      example: "Our English teacher is very kind.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=teacher&type=2"
    },
    {
      word: "umbrella",
      phonetic: "/ʌmˈbrelə/",
      meaning: "雨伞",
      example: "Don't forget your umbrella, it's raining.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=umbrella&type=2"
    },
    {
      word: "vacation",
      phonetic: "/vəˈkeɪʃn/",
      meaning: "假期",
      example: "We're going to the beach for vacation.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=vacation&type=2"
    },
    {
      word: "weather",
      phonetic: "/ˈweðə/",
      meaning: "天气",
      example: "The weather is nice today.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=weather&type=2"
    },
    {
      word: "yellow",
      phonetic: "/ˈjeləʊ/",
      meaning: "黄色",
      example: "The sun is yellow.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=yellow&type=2"
    },
    {
      word: "zebra",
      phonetic: "/ˈzebrə/",
      meaning: "斑马",
      example: "A zebra has black and white stripes.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=zebra&type=2"
    },
    {
      word: "book",
      phonetic: "/bʊk/",
      meaning: "书",
      example: "I love reading books.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=book&type=2"
    },
    {
      word: "cat",
      phonetic: "/kæt/",
      meaning: "猫",
      example: "The cat is sleeping on the sofa.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=cat&type=2"
    },
    {
      word: "dog",
      phonetic: "/dɒɡ/",
      meaning: "狗",
      example: "My dog likes to play fetch.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=dog&type=2"
    },
    {
      word: "egg",
      phonetic: "/eɡ/",
      meaning: "鸡蛋",
      example: "I had two eggs for breakfast.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=egg&type=2"
    },
    {
      word: "fish",
      phonetic: "/fɪʃ/",
      meaning: "鱼",
      example: "There are many fish in the sea.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=fish&type=2"
    },
    {
      word: "game",
      phonetic: "/ɡeɪm/",
      meaning: "游戏",
      example: "Let's play a game together.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=game&type=2"
    },
    {
      word: "house",
      phonetic: "/haʊs/",
      meaning: "房子",
      example: "They live in a big house.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=house&type=2"
    },
    {
      word: "ice",
      phonetic: "/aɪs/",
      meaning: "冰",
      example: "Would you like some ice in your drink?",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=ice&type=2"
    },
    {
      word: "juice",
      phonetic: "/dʒuːs/",
      meaning: "果汁",
      example: "I drink orange juice every morning.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=juice&type=2"
    },
    {
      word: "key",
      phonetic: "/kiː/",
      meaning: "钥匙",
      example: "Don't forget your house key.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=key&type=2"
    },
    {
      word: "leaf",
      phonetic: "/liːf/",
      meaning: "叶子",
      example: "The leaf fell from the tree.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=leaf&type=2"
    },
    {
      word: "milk",
      phonetic: "/mɪlk/",
      meaning: "牛奶",
      example: "Drink your milk before bed.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=milk&type=2"
    },
    {
      word: "night",
      phonetic: "/naɪt/",
      meaning: "夜晚",
      example: "The stars shine at night.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=night&type=2"
    },
    {
      word: "ocean",
      phonetic: "/ˈəʊʃn/",
      meaning: "海洋",
      example: "The ocean is very deep.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=ocean&type=2"
    },
    {
      word: "park",
      phonetic: "/pɑːk/",
      meaning: "公园",
      example: "We often walk in the park.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=park&type=2"
    },
    {
      word: "queen",
      phonetic: "/kwiːn/",
      meaning: "女王",
      example: "The queen lives in a palace.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=queen&type=2"
    },
    {
      word: "rain",
      phonetic: "/reɪn/",
      meaning: "雨",
      example: "It might rain tomorrow.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=rain&type=2"
    },
    {
      word: "sun",
      phonetic: "/sʌn/",
      meaning: "太阳",
      example: "The sun rises in the east.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=sun&type=2"
    },
    {
      word: "time",
      phonetic: "/taɪm/",
      meaning: "时间",
      example: "What time is it?",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=time&type=2"
    },
    {
      word: "university",
      phonetic: "/ˌjuːnɪˈvɜːsəti/",
      meaning: "大学",
      example: "She studies at the university.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=university&type=2"
    },
    {
      word: "village",
      phonetic: "/ˈvɪlɪdʒ/",
      meaning: "村庄",
      example: "My grandparents live in a small village.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=village&type=2"
    },
    {
      word: "water",
      phonetic: "/ˈwɔːtə/",
      meaning: "水",
      example: "Drink plenty of water every day.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=water&type=2"
    },
    {
      word: "window",
      phonetic: "/ˈwɪndəʊ/",
      meaning: "窗户",
      example: "Please open the window.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=window&type=2"
    },
    {
      word: "year",
      phonetic: "/jɪə/",
      meaning: "年",
      example: "Happy New Year!",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=year&type=2"
    },
    {
      word: "zoo",
      phonetic: "/zuː/",
      meaning: "动物园",
      example: "We saw many animals at the zoo.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=zoo&type=2"
    },
    {
      word: "air",
      phonetic: "/eə/",
      meaning: "空气",
      example: "Fresh air is good for health.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=air&type=2"
    },
    {
      word: "bread",
      phonetic: "/bred/",
      meaning: "面包",
      example: "I eat bread for breakfast.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=bread&type=2"
    },
    {
      word: "chair",
      phonetic: "/tʃeə/",
      meaning: "椅子",
      example: "Please sit on the chair.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=chair&type=2"
    },
    {
      word: "dance",
      phonetic: "/dɑːns/",
      meaning: "跳舞",
      example: "She loves to dance.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=dance&type=2"
    },
    {
      word: "earth",
      phonetic: "/ɜːθ/",
      meaning: "地球",
      example: "The Earth moves around the Sun.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=earth&type=2"
    },
    {
      word: "flower",
      phonetic: "/ˈflaʊə/",
      meaning: "花",
      example: "The flower smells sweet.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=flower&type=2"
    },
    {
      word: "grass",
      phonetic: "/ɡrɑːs/",
      meaning: "草",
      example: "The grass is green.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=grass&type=2"
    },
    {
      word: "heart",
      phonetic: "/hɑːt/",
      meaning: "心脏",
      example: "My heart beats fast.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=heart&type=2"
    },
    {
      word: "island",
      phonetic: "/ˈaɪlənd/",
      meaning: "岛屿",
      example: "They live on a small island.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=island&type=2"
    },
    {
      word: "jump",
      phonetic: "/dʒʌmp/",
      meaning: "跳跃",
      example: "Children like to jump.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=jump&type=2"
    },
    {
      word: "king",
      phonetic: "/kɪŋ/",
      meaning: "国王",
      example: "The king rules the country.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=king&type=2"
    },
    {
      word: "letter",
      phonetic: "/ˈletə/",
      meaning: "信",
      example: "I received a letter from my friend.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=letter&type=2"
    },
    {
      word: "moon",
      phonetic: "/muːn/",
      meaning: "月亮",
      example: "The moon shines at night.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=moon&type=2"
    },
    {
      word: "nurse",
      phonetic: "/nɜːs/",
      meaning: "护士",
      example: "The nurse takes care of patients.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=nurse&type=2"
    },
    {
      word: "office",
      phonetic: "/ˈɒfɪs/",
      meaning: "办公室",
      example: "I work in an office.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=office&type=2"
    },
    {
      word: "piano",
      phonetic: "/piˈænəʊ/",
      meaning: "钢琴",
      example: "She plays the piano well.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=piano&type=2"
    },
    {
      word: "quiet",
      phonetic: "/ˈkwaɪət/",
      meaning: "安静的",
      example: "Please be quiet in the library.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=quiet&type=2"
    },
    {
      word: "river",
      phonetic: "/ˈrɪvə/",
      meaning: "河流",
      example: "The river flows to the sea.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=river&type=2"
    },
    {
      word: "smile",
      phonetic: "/smaɪl/",
      meaning: "微笑",
      example: "Her smile is beautiful.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=smile&type=2"
    },
    {
      word: "table",
      phonetic: "/ˈteɪbl/",
      meaning: "桌子",
      example: "Put the book on the table.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=table&type=2"
    },
    {
      word: "uncle",
      phonetic: "/ˈʌŋkl/",
      meaning: "叔叔",
      example: "My uncle lives in London.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=uncle&type=2"
    },
    {
      word: "voice",
      phonetic: "/vɔɪs/",
      meaning: "声音",
      example: "She has a beautiful voice.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=voice&type=2"
    },
    {
      word: "watch",
      phonetic: "/wɒtʃ/",
      meaning: "手表",
      example: "What time is it on your watch?",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=watch&type=2"
    },
    {
      word: "young",
      phonetic: "/jʌŋ/",
      meaning: "年轻的",
      example: "She is still young.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=young&type=2"
    },
    {
      word: "beach",
      phonetic: "/biːtʃ/",
      meaning: "海滩",
      example: "We play on the beach.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=beach&type=2"
    },
    {
      word: "cloud",
      phonetic: "/klaʊd/",
      meaning: "云",
      example: "The sky is full of clouds.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=cloud&type=2"
    },
    {
      word: "dream",
      phonetic: "/driːm/",
      meaning: "梦想",
      example: "Follow your dreams.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=dream&type=2"
    },
    {
      word: "family",
      phonetic: "/ˈfæmɪli/",
      meaning: "家庭",
      example: "I love my family.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=family&type=2"
    },
    {
      word: "guitar",
      phonetic: "/ɡɪˈtɑː/",
      meaning: "吉他",
      example: "He plays guitar in a band.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=guitar&type=2"
    },
    {
      word: "health",
      phonetic: "/helθ/",
      meaning: "健康",
      example: "Health is important.",
      audioUrl: "https://dict.youdao.com/dictvoice?audio=health&type=2"
    }
  ]
}

// 获取随机单词列表
const getRandomWords = (count = 50) => {
  const maxCount = Math.min(count, wordBank.words.length)
  const shuffled = [...wordBank.words].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, maxCount)
}

const getTotalWords = () => {
  return wordBank.words.length
}

module.exports = {
  wordBank,
  getRandomWords,
  getTotalWords
} 