/* Hanguk Way — imtihon formati: savol turlari, rasmiy ko'rsatmalar, <보기> namunalari, haqiqiy mock tartibi.
   TOPIK I: 듣기 1–30 (40 daqiqa), 읽기 31–70 (60 daqiqa) — rasmiy imtihon varaqalari bo'yicha.
   EPS-TOPIK: o'qish 20 + tinglash 20, 50 daqiqa. Savollar banki yopiq: turlar rasmiy savollar banki va darsliklar asosida.
   <보기> namunalari Hanguk Way tomonidan yozilgan (imtihondan ko'chirilmagan). */
(function () {
  function T(o) { return o; }
  var TYPES = {
    // ===================== TOPIK I · 듣기 =====================
    "T-L1": T({ exam: "topik", sec: "listen", range: "1~4",
      ko: "다음을 듣고 <보기>와 같이 물음에 맞는 대답을 고르십시오.",
      uz: "Tinglang va <보기>dagidek savolga mos javobni tanlang.",
      ru: "Прослушайте и, как в <보기>, выберите подходящий ответ на вопрос.",
      en: "Listen and choose the right answer to the question, as in <보기>.",
      ex: { q: "가: 책이 있어요?\n나: ____________", opts: ["네, 책이 있어요.", "네, 책이 아니에요.", "아니요, 책이에요.", "아니요, 책을 읽어요."], a: 0 } }),
    "T-L2": T({ exam: "topik", sec: "listen", range: "5~6",
      ko: "다음을 듣고 <보기>와 같이 이어지는 말을 고르십시오.",
      uz: "Tinglang va <보기>dagidek keyin aytiladigan gapni tanlang.",
      ru: "Прослушайте и, как в <보기>, выберите следующую реплику.",
      en: "Listen and choose what comes next, as in <보기>.",
      ex: { q: "가: 감사합니다.\n나: ____________", opts: ["축하해요.", "아니에요.", "미안해요.", "안녕히 가세요."], a: 1 } }),
    "T-L3": T({ exam: "topik", sec: "listen", range: "7~10",
      ko: "여기는 어디입니까? <보기>와 같이 알맞은 것을 고르십시오.",
      uz: "Bu yer qayer? <보기>dagidek mos javobni tanlang.",
      ru: "Где это происходит? Выберите подходящее, как в <보기>.",
      en: "Where is this? Choose the right answer, as in <보기>.",
      ex: { q: "가: 어떻게 오셨어요?\n나: 머리가 아파서 왔어요.", opts: ["은행", "병원", "식당", "우체국"], a: 1 } }),
    "T-L4": T({ exam: "topik", sec: "listen", range: "11~14",
      ko: "다음은 무엇에 대해 말하고 있습니까? <보기>와 같이 알맞은 것을 고르십시오.",
      uz: "Nima haqida gapiryapti? <보기>dagidek mos javobni tanlang.",
      ru: "О чём говорят? Выберите подходящее, как в <보기>.",
      en: "What are they talking about? Choose the right answer, as in <보기>.",
      ex: { q: "가: 누구예요?\n나: 제 동생이에요.", opts: ["가족", "친구", "선생님", "이름"], a: 0 } }),
    "T-L5": T({ exam: "topik", sec: "listen", range: "15~16",
      ko: "다음 대화를 듣고 알맞은 그림을 고르십시오.",
      uz: "Dialogni tinglang va mos rasmni tanlang.",
      ru: "Прослушайте диалог и выберите подходящую картинку.",
      en: "Listen to the conversation and choose the matching picture." }),
    "T-L6": T({ exam: "topik", sec: "listen", range: "17~21",
      ko: "다음을 듣고 <보기>와 같이 대화 내용과 같은 것을 고르십시오.",
      uz: "Tinglang va <보기>dagidek dialog mazmuniga mos gapni tanlang.",
      ru: "Прослушайте и, как в <보기>, выберите то, что совпадает с диалогом.",
      en: "Listen and choose the statement that matches the conversation, as in <보기>.",
      ex: { q: "남자: 요즘 한국어를 공부해요?\n여자: 네, 한국 친구한테서 배워요.", opts: ["남자는 학생입니다.", "여자는 한국 사람입니다.", "남자는 한국어를 가르칩니다.", "여자는 한국어를 공부합니다."], a: 3 } }),
    "T-L7": T({ exam: "topik", sec: "listen", range: "22~24",
      ko: "다음을 듣고 여자의 중심 생각을 고르십시오.",
      uz: "Tinglang va ayolning asosiy fikrini tanlang.",
      ru: "Прослушайте и выберите главную мысль женщины.",
      en: "Listen and choose the woman's main idea." }),
    "T-L8": T({ exam: "topik", sec: "listen", range: "25~26", set: true,
      ko: "다음을 듣고 물음에 답하십시오.", uz: "Tinglang va savollarga javob bering.",
      ru: "Прослушайте и ответьте на вопросы.", en: "Listen and answer the questions." }),
    "T-L9": T({ exam: "topik", sec: "listen", range: "27~28", set: true,
      ko: "다음을 듣고 물음에 답하십시오.", uz: "Tinglang va savollarga javob bering.",
      ru: "Прослушайте и ответьте на вопросы.", en: "Listen and answer the questions." }),
    "T-L10": T({ exam: "topik", sec: "listen", range: "29~30", set: true,
      ko: "다음을 듣고 물음에 답하십시오.", uz: "Tinglang va savollarga javob bering.",
      ru: "Прослушайте и ответьте на вопросы.", en: "Listen and answer the questions." }),
    // ===================== TOPIK I · 읽기 =====================
    "T-R1": T({ exam: "topik", sec: "read", range: "31~33",
      ko: "무엇에 대한 이야기입니까? <보기>와 같이 알맞은 것을 고르십시오.",
      uz: "Nima haqida gap ketmoqda? <보기>dagidek mos javobni tanlang.",
      ru: "О чём этот текст? Выберите подходящее, как в <보기>.",
      en: "What is this about? Choose the right answer, as in <보기>.",
      ex: { q: "저는 바지를 샀습니다. 치마도 샀습니다.", opts: ["계절", "쇼핑", "공부", "운동"], a: 1 } }),
    "T-R2": T({ exam: "topik", sec: "read", range: "34~39",
      ko: "<보기>와 같이 (    )에 들어갈 가장 알맞은 것을 고르십시오.",
      uz: "<보기>dagidek qavs ichiga eng mos keladiganini tanlang.",
      ru: "Как в <보기>, выберите то, что лучше всего подходит в скобки.",
      en: "As in <보기>, choose what best fits in the blank.",
      ex: { q: "눈이 나쁩니다. (    )을 씁니다.", opts: ["안경", "모자", "우산", "장갑"], a: 0 } }),
    "T-R3": T({ exam: "topik", sec: "read", range: "40~42",
      ko: "다음을 읽고 맞지 않는 것을 고르십시오.",
      uz: "O'qing va MOS KELMAYDIGANini tanlang.",
      ru: "Прочитайте и выберите то, что НЕ соответствует.",
      en: "Read and choose what does NOT match." }),
    "T-R4": T({ exam: "topik", sec: "read", range: "43~45",
      ko: "다음의 내용과 같은 것을 고르십시오.",
      uz: "Matn mazmuniga mos keladiganini tanlang.",
      ru: "Выберите то, что совпадает с содержанием.",
      en: "Choose the statement that matches the text." }),
    "T-R5": T({ exam: "topik", sec: "read", range: "46~48",
      ko: "다음을 읽고 중심 생각을 고르십시오.",
      uz: "O'qing va asosiy fikrni tanlang.",
      ru: "Прочитайте и выберите главную мысль.",
      en: "Read and choose the main idea." }),
    "T-R6": T({ exam: "topik", sec: "read", range: "49~70", set: true,
      ko: "다음을 읽고 물음에 답하십시오.", uz: "O'qing va savollarga javob bering.",
      ru: "Прочитайте и ответьте на вопросы.", en: "Read and answer the questions." }),
    "T-R7": T({ exam: "topik", sec: "read", range: "57~58",
      ko: "다음을 순서대로 맞게 나열한 것을 고르십시오.",
      uz: "Gaplarni to'g'ri tartibda joylashtirilganini tanlang.",
      ru: "Выберите правильный порядок предложений.",
      en: "Choose the correct order of the sentences." }),
    // Mashq turi (rasmiy mockga kirmaydi): e'lon va xat bo'yicha bitta savol
    "T-RX": T({ exam: "topik", sec: "read", practice: true,
      ko: "다음을 읽고 물음에 답하십시오.", uz: "O'qing va savolga javob bering.",
      ru: "Прочитайте и ответьте на вопрос.", en: "Read and answer the question." }),

    // ===================== EPS-TOPIK · 읽기 =====================
    "E-R1": T({ exam: "eps", sec: "read", ko: "그림을 보고 알맞은 단어를 고르십시오.",
      uz: "Rasmga qarang va mos so'zni tanlang.", ru: "Посмотрите на картинку и выберите подходящее слово.", en: "Look at the picture and choose the right word.",
      ex: { pic: "🧢", opts: ["모자", "안경", "양말", "가방"], a: 0 } }),
    "E-R1S": T({ exam: "eps", sec: "read", ko: "그림을 보고 알맞은 문장을 고르십시오.",
      uz: "Rasmga qarang va mos gapni tanlang.", ru: "Посмотрите на картинку и выберите подходящее предложение.", en: "Look at the picture and choose the matching sentence.",
      ex: { pic: "📖", opts: ["책을 읽고 있습니다.", "밥을 먹고 있습니다.", "잠을 자고 있습니다.", "운동을 하고 있습니다."], a: 0 } }),
    "E-R2": T({ exam: "eps", sec: "read", ko: "다음 표지판은 무슨 뜻입니까? 알맞은 것을 고르십시오.",
      uz: "Bu belgi nimani anglatadi? Mosini tanlang.", ru: "Что означает этот знак? Выберите подходящее.", en: "What does this sign mean? Choose the right answer.",
      ex: { sign: "주차 금지", opts: ["차를 세우면 안 됩니다.", "차를 닦으십시오.", "천천히 가십시오.", "여기에서 타십시오."], a: 0 } }),
    "E-R3": T({ exam: "eps", sec: "read", ko: "(    )에 들어갈 가장 알맞은 것을 고르십시오.",
      uz: "Qavs ichiga eng mos keladiganini tanlang.", ru: "Выберите то, что лучше всего подходит в скобки.", en: "Choose what best fits in the blank.",
      ex: { q: "목이 말라요. 물을 (    ).", opts: ["마셔요", "입어요", "타요", "써요"], a: 0 } }),
    "E-R9": T({ exam: "eps", sec: "read", ko: "밑줄 친 부분과 의미가 같은 것을 고르십시오.",
      uz: "Tagiga chizilgan so'z bilan ma'nodosh variantni tanlang.", ru: "Выберите слово, близкое по значению к подчёркнутому.", en: "Choose the word closest in meaning to the underlined part.",
      ex: { q: "저는 [[매주]] 토요일에 쉽니다.", opts: ["주마다", "가끔", "작년에", "아까"], a: 0 } }),
    "E-R10": T({ exam: "eps", sec: "read", ko: "밑줄 친 부분과 의미가 반대인 것을 고르십시오.",
      uz: "Tagiga chizilgan so'zga zid ma'noli variantni tanlang.", ru: "Выберите слово, противоположное по значению подчёркнутому.", en: "Choose the word opposite in meaning to the underlined part.",
      ex: { q: "방이 [[넓습니다]].", opts: ["좁습니다", "큽니다", "밝습니다", "깨끗합니다"], a: 0 } }),
    "E-R4": T({ exam: "eps", sec: "read", ko: "다음 대화의 (    )에 들어갈 가장 알맞은 것을 고르십시오.",
      uz: "Dialogdagi qavs ichiga eng mos javobni tanlang.", ru: "Выберите лучшую реплику для пропуска в диалоге.", en: "Choose the best line for the blank in the conversation.",
      ex: { q: "가: 어디에 가요?\n나: (    )", opts: ["은행에 가요.", "은행이에요.", "은행이 커요.", "은행에서 왔어요."], a: 0 } }),
    "E-R5": T({ exam: "eps", sec: "read", ko: "다음 설명에 맞는 것을 고르십시오.",
      uz: "Tavsifga mos keladiganini tanlang.", ru: "Выберите то, что соответствует описанию.", en: "Choose what matches the description." }),
    "E-R6": T({ exam: "eps", sec: "read", ko: "다음 글을 읽고 질문에 답하십시오.",
      uz: "Matnni o'qing va savolga javob bering.", ru: "Прочитайте текст и ответьте на вопрос.", en: "Read the text and answer the question." }),
    "E-R7": T({ exam: "eps", sec: "read", ko: "다음 글의 내용과 같은 것을 고르십시오.",
      uz: "Matn mazmuniga mos keladiganini tanlang.", ru: "Выберите то, что совпадает с текстом.", en: "Choose the statement that matches the text." }),
    "E-R8": T({ exam: "eps", sec: "read", ko: "다음 글의 중심 생각을 고르십시오.",
      uz: "Matnning asosiy fikrini tanlang.", ru: "Выберите главную мысль текста.", en: "Choose the main idea of the text." }),
    // ===================== EPS-TOPIK · 듣기 =====================
    "E-L1": T({ exam: "eps", sec: "listen", ko: "다음을 듣고 들은 내용과 관계있는 그림을 고르십시오.",
      uz: "Tinglang va eshitganingizga mos rasmni tanlang.", ru: "Прослушайте и выберите картинку, связанную с услышанным.", en: "Listen and choose the picture related to what you hear.",
      ex: { audio: "모자", opts: ["🧢", "👓", "🧦", "👜"], a: 0 } }),
    "E-L6": T({ exam: "eps", sec: "listen", hideOpts: true, ko: "그림을 보고 알맞은 대답을 고르십시오.",
      uz: "Rasmga qarang, variantlarni tinglang va mosini tanlang.", ru: "Посмотрите на картинку, прослушайте варианты и выберите подходящий.", en: "Look at the picture, listen to the options and choose the right one.",
      ex: { pic: "☕", opts: ["커피입니다.", "우유입니다.", "물입니다.", "주스입니다."], a: 0 } }),
    "E-L2": T({ exam: "eps", sec: "listen", ko: "다음 질문을 듣고 알맞은 대답을 고르십시오.",
      uz: "Savolni tinglang va mos javobni tanlang.", ru: "Прослушайте вопрос и выберите подходящий ответ.", en: "Listen to the question and choose the right answer.",
      ex: { q: "가: 이름이 뭐예요?\n나: ____________", opts: ["아지즈예요.", "스물다섯 살이에요.", "회사원이에요.", "우즈베키스탄에서 왔어요."], a: 0 } }),
    "E-L3": T({ exam: "eps", sec: "listen", ko: "다음을 듣고 이어지는 말로 알맞은 것을 고르십시오.",
      uz: "Tinglang va keyin aytiladigan gapni tanlang.", ru: "Прослушайте и выберите следующую реплику.", en: "Listen and choose what comes next." }),
    "E-L4": T({ exam: "eps", sec: "listen", ko: "다음 대화를 듣고 질문에 알맞은 대답을 고르십시오.",
      uz: "Dialogni tinglang va savolga mos javobni tanlang.", ru: "Прослушайте диалог и выберите ответ на вопрос.", en: "Listen to the conversation and answer the question." }),
    "E-L5": T({ exam: "eps", sec: "listen", ko: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
      uz: "Tinglang va eshitganingizga mos gapni tanlang.", ru: "Прослушайте и выберите то, что совпадает с услышанным.", en: "Listen and choose the statement that matches what you hear." }),
    "E-L7": T({ exam: "eps", sec: "listen", ko: "다음 이야기를 듣고 질문에 알맞은 대답을 고르십시오.",
      uz: "Hikoyani tinglang va savolga mos javobni tanlang.", ru: "Прослушайте рассказ и выберите ответ на вопрос.", en: "Listen to the talk and choose the answer to the question." }),

    // ===================== TOPIK II · 듣기 (1~50, 60 daqiqa) =====================
    "U-L1": T({ exam: "topik2", sec: "listen", range: "4~8",
      ko: "다음을 듣고 이어질 수 있는 말로 가장 알맞은 것을 고르십시오.",
      uz: "Tinglang va keyin aytilishi mumkin bo'lgan eng mos gapni tanlang.", ru: "Прослушайте и выберите наиболее подходящее продолжение.", en: "Listen and choose the most suitable thing to say next." }),
    "U-L2": T({ exam: "topik2", sec: "listen", range: "9~12",
      ko: "다음을 듣고 여자가 이어서 할 행동으로 가장 알맞은 것을 고르십시오.",
      uz: "Tinglang: ayol bundan keyin nima qiladi?", ru: "Прослушайте: что женщина сделает дальше?", en: "Listen: what will the woman do next?" }),
    "U-L3": T({ exam: "topik2", sec: "listen", range: "13~16",
      ko: "다음을 듣고 들은 내용과 같은 것을 고르십시오.",
      uz: "Tinglang va eshitganingizga mos gapni tanlang.", ru: "Прослушайте и выберите то, что совпадает с услышанным.", en: "Listen and choose what matches what you heard." }),
    "U-L4": T({ exam: "topik2", sec: "listen", range: "17~20",
      ko: "다음을 듣고 남자의 중심 생각으로 가장 알맞은 것을 고르십시오.",
      uz: "Tinglang va erkakning asosiy fikrini tanlang.", ru: "Прослушайте и выберите главную мысль мужчины.", en: "Listen and choose the man's main idea." }),
    "U-L5": T({ exam: "topik2", sec: "listen", range: "21~50", set: true,
      ko: "다음을 듣고 물음에 답하십시오.", uz: "Tinglang va savollarga javob bering.", ru: "Прослушайте и ответьте на вопросы.", en: "Listen and answer the questions." }),

    // ===================== TOPIK II · 읽기 (1~50, 70 daqiqa) =====================
    "U-R1": T({ exam: "topik2", sec: "read", range: "1~2",
      ko: "(    )에 들어갈 가장 알맞은 것을 고르십시오.",
      uz: "Qavs ichiga eng mos keladiganini tanlang (grammatika).", ru: "Выберите то, что лучше всего подходит в скобки (грамматика).", en: "Choose what best fits the blank (grammar)." }),
    "U-R2": T({ exam: "topik2", sec: "read", range: "3~4",
      ko: "밑줄 친 부분과 의미가 가장 비슷한 것을 고르십시오.",
      uz: "Tagiga chizilgan qismga ma'nosi eng yaqin variantni tanlang.", ru: "Выберите вариант, наиболее близкий по смыслу к подчёркнутому.", en: "Choose the closest meaning to the underlined part." }),
    "U-R3": T({ exam: "topik2", sec: "read", range: "5~8",
      ko: "다음은 무엇에 대한 글인지 고르십시오.",
      uz: "Bu matn nima haqida?", ru: "О чём этот текст?", en: "What is this text about?" }),
    "U-R4": T({ exam: "topik2", sec: "read", range: "9~12",
      ko: "다음 글 또는 도표의 내용과 같은 것을 고르십시오.",
      uz: "Matn yoki jadval mazmuniga mos keladiganini tanlang.", ru: "Выберите то, что совпадает с текстом или таблицей.", en: "Choose what matches the text or chart." }),
    "U-R5": T({ exam: "topik2", sec: "read", range: "13~15",
      ko: "다음을 순서대로 맞게 배열한 것을 고르십시오.",
      uz: "Gaplarni to'g'ri tartibda joylashtirilgan variantni tanlang.", ru: "Выберите правильный порядок предложений.", en: "Choose the correct order." }),
    "U-R6": T({ exam: "topik2", sec: "read", range: "16~18",
      ko: "다음을 읽고 (    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.",
      uz: "O'qing va qavs ichiga mazmunan eng mos keladiganini tanlang.", ru: "Прочитайте и выберите наиболее подходящее по смыслу для пропуска.", en: "Read and choose the best content for the blank." }),
    "U-R7": T({ exam: "topik2", sec: "read", range: "25~27",
      ko: "다음은 신문 기사의 제목입니다. 가장 잘 설명한 것을 고르십시오.",
      uz: "Bu gazeta maqolasining sarlavhasi. Uni eng yaxshi tushuntirgan variantni tanlang.", ru: "Это заголовок газетной статьи. Выберите лучшее объяснение.", en: "This is a newspaper headline. Choose the best explanation." }),
    "U-R8": T({ exam: "topik2", sec: "read", range: "28~31",
      ko: "다음을 읽고 (    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.",
      uz: "Uzun matnni o'qing va qavs ichiga eng mos mazmunni tanlang.", ru: "Прочитайте текст и выберите наиболее подходящее для пропуска.", en: "Read the passage and choose the best content for the blank." }),
    "U-R9": T({ exam: "topik2", sec: "read", range: "32~34",
      ko: "다음을 읽고 내용이 같은 것을 고르십시오.",
      uz: "O'qing va mazmuni mos keladiganini tanlang.", ru: "Прочитайте и выберите совпадающее по содержанию.", en: "Read and choose the statement that matches." }),
    "U-R10": T({ exam: "topik2", sec: "read", range: "35~38",
      ko: "다음 글의 주제로 가장 알맞은 것을 고르십시오.",
      uz: "Matnning mavzusini (asosiy g'oyasini) tanlang.", ru: "Выберите тему текста.", en: "Choose the topic of the text." }),
    "U-R11": T({ exam: "topik2", sec: "read", range: "39~41",
      ko: "주어진 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.",
      uz: "<보기>dagi gap qaysi joyga eng mos tushadi?", ru: "Куда лучше всего вставить данное предложение?", en: "Where does the given sentence fit best?" }),
    "U-R12": T({ exam: "topik2", sec: "read", range: "19~50", set: true,
      ko: "다음을 읽고 물음에 답하십시오.", uz: "O'qing va savollarga javob bering.", ru: "Прочитайте и ответьте на вопросы.", en: "Read and answer the questions." }),
    "U-R13": T({ exam: "topik2", sec: "read", range: "48~50", set: true,
      ko: "다음을 읽고 물음에 답하십시오.", uz: "Maqolani o'qing va uchta savolga javob bering.", ru: "Прочитайте статью и ответьте на три вопроса.", en: "Read the article and answer three questions." })
  };

  // Eski ko'rsatmalar → tur (savol fayllaridagi inst bo'yicha)
  var MAP = {
    topik: {
      "다음을 듣고 알맞은 대답을 고르십시오.": "T-L1", "다음을 듣고 이어지는 말을 고르십시오.": "T-L2",
      "여기는 어디입니까?": "T-L3", "무엇에 대해 말하고 있습니까?": "T-L4", "들은 내용과 같은 것을 고르십시오.": "T-L6",
      "손님은 무엇을 합니까?": "T-L6",
      "무엇에 대한 내용입니까?": "T-R1", "무엇에 대한 이야기입니까?": "T-R1", "(    )에 알맞은 것을 고르십시오.": "T-R2",
      "다음 설명에 맞는 것을 고르십시오.": "T-R2", "다음을 읽고 맞지 않는 것을 고르십시오.": "T-R3",
      "다음의 내용과 같은 것을 고르십시오.": "T-R4", "읽은 내용과 같은 것을 고르십시오.": "T-R4",
      "다음을 읽고 중심 생각을 고르십시오.": "T-R5", "읽고 질문에 답하십시오.": "T-RX"
    },
    eps: {
      "그림을 보고 알맞은 단어를 고르십시오.": "E-R1", "이 표지판은 무슨 뜻입니까?": "E-R2",
      "(    )에 알맞은 것을 고르십시오.": "E-R3", "다음 대화에 알맞은 것을 고르십시오.": "E-R4",
      "다음 설명에 맞는 것을 고르십시오.": "E-R5", "읽고 질문에 답하십시오.": "E-R6",
      "읽은 내용과 같은 것을 고르십시오.": "E-R7", "다음을 읽고 중심 생각을 고르십시오.": "E-R8",
      "듣고 맞는 그림을 고르십시오.": "E-L1", "다음 질문을 듣고 알맞은 대답을 고르십시오.": "E-L2",
      "다음을 듣고 이어지는 말을 고르십시오.": "E-L3", "여기는 어디입니까?": "E-L4", "무엇에 대한 이야기입니까?": "E-L4",
      "남자는 왜 내일 쉽니까?": "E-L4", "남자는 왜 늦었습니까?": "E-L4", "남자는 이제 무엇을 합니까?": "E-L4",
      "여자는 왜 전화했습니까?": "E-L4", "손님은 무엇을 사려고 합니까?": "E-L4", "화장실은 어디에 있습니까?": "E-L4",
      "들은 내용과 같은 것을 고르십시오.": "E-L5"
    }
  };
  // E-L4 da savolning o'zi (masalan "여기는 어디입니까?") alohida ko'rsatiladi
  var ASK_KEEP = { "E-L4": true, "E-L7": true, "T-RX": false };

  // Haqiqiy format mock tartibi
  var MOCK = {
    topik: { minutes: 100, parts: [
      ["T-L1", 4], ["T-L2", 2], ["T-L3", 4], ["T-L4", 4], ["T-L5", 2], ["T-L6", 5], ["T-L7", 3],
      ["T-L8", 1, "set"], ["T-L9", 1, "set"], ["T-L10", 1, "set"],
      ["T-R1", 3], ["T-R2", 6], ["T-R3", 3], ["T-R4", 3], ["T-R5", 3],
      ["T-R6@49", 1, "set"], ["T-R6@51", 1, "set"], ["T-R6@53", 1, "set"], ["T-R6@55", 1, "set"], ["T-R7", 2],
      ["T-R6@59", 1, "set"], ["T-R6@61", 1, "set"], ["T-R6@63", 1, "set"], ["T-R6@65", 1, "set"], ["T-R6@67", 1, "set"], ["T-R6@69", 1, "set"]
    ] },
    // TOPIK II: haqiqiy tartibdagi qisqartirilgan mock (tinglash 20 + o'qish 28). To'liq imtihon: 50 + 50 savol, 130 daqiqa.
    topik2: { minutes: 65, parts: [
      ["U-L1", 3], ["U-L2", 3], ["U-L3", 3], ["U-L4", 3], ["U-L5", 4, "set"],
      ["U-R1", 2], ["U-R2", 2], ["U-R3", 2], ["U-R4", 2], ["U-R5", 2], ["U-R6", 2], ["U-R12", 1, "set"],
      ["U-R7", 2], ["U-R8", 2], ["U-R9", 2], ["U-R10", 2], ["U-R11", 2], ["U-R12", 2, "set"]
    ] },
    // TOPIK II to'liq imtihon: 듣기 50 (rasmli 1~3 o'rniga [13~16] turi) + 읽기 50 = 100 savol, 60 + 70 = 130 daqiqa
    topik2_exam: { minutes: 130, parts: [
      ["U-L3", 3], ["U-L1", 5], ["U-L2", 4], ["U-L3", 4], ["U-L4", 4], ["U-L5", 15, "set"],
      ["U-R1", 2], ["U-R2", 2], ["U-R3", 4], ["U-R4", 4], ["U-R5", 3], ["U-R6", 3], ["U-R12", 3, "set"],
      ["U-R7", 3], ["U-R8", 4], ["U-R9", 3], ["U-R10", 4], ["U-R11", 3], ["U-R12", 3, "set"], ["U-R13", 3]
    ] },
    eps: { minutes: 50, parts: [
      ["E-R1", 3], ["E-R1S", 2], ["E-R2", 2], ["E-R3", 4], ["E-R9", 2], ["E-R10", 1], ["E-R4", 2], ["E-R5", 1], ["E-R6", 1], ["E-R7", 1], ["E-R8", 1],
      ["E-L1", 3], ["E-L6", 3], ["E-L2", 4], ["E-L3", 2], ["E-L4", 4], ["E-L5", 2], ["E-L7", 2]
    ] }
  };

  function typeOf(exam, q) {
    if (q.type && TYPES[q.type]) return q.type;
    return (MAP[exam] && MAP[exam][q.inst]) || null;
  }
  window.PW_FORMAT = { TYPES: TYPES, MAP: MAP, MOCK: MOCK, ASK_KEEP: ASK_KEEP, typeOf: typeOf };
})();
