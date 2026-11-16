/* Prep Way — til tizimi: o'zbek (asosiy), rus, ingliz.
   1) Interfeys matnlari: DICT dagi o'zbekcha matn tanlangan tilga almashtiriladi (sahifa va yangi qo'shilgan elementlar).
   2) So'zlar va suhbatlar: asosiy til + qolgan ikki tildagi tarjima. */
(function () {
  var KEY = "pwLang";
  function load() { try { return localStorage.getItem(KEY) || ""; } catch (e) { return ""; } }
  var LANG = load() || "uz";
  var IDX = { ru: 0, en: 1 };
  var FLAG = { uz: "🇺🇿", ru: "🇷🇺", en: "🇬🇧" };

  // o'zbekcha → [ruscha, inglizcha]
  var DICT = {
    "DEMO versiya — serversiz rejim": ["ДЕМО-версия — офлайн-режим", "DEMO version — offline mode"],
    "👤 Akkaunt": ["👤 Аккаунт", "👤 Account"],
    "Asosiy": ["Главная", "Home"], "Daftar": ["Тетрадь", "Notebook"], "So'zlar": ["Слова", "Words"], "Xatolar": ["Ошибки", "Mistakes"],
    "kun seriya": ["дней подряд", "day streak"], "daqiqa bugun": ["мин сегодня", "min today"],
    "Bugungi reja": ["План на сегодня", "Today's plan"],
    "10 savol · 10 daqiqa": ["10 вопросов · 10 минут", "10 questions · 10 min"],
    "Komiko bilan suhbat": ["Разговор с Комико", "Talk with Komiko"],
    "Ovozli mashq · 5 daqiqa": ["Голосовая практика · 5 минут", "Voice practice · 5 min"],
    "Daftar topshirig'i": ["Задание в тетради", "Notebook task"],
    "Yozing → rasmga oling → Komiko tekshiradi": ["Напишите → сфотографируйте → Комико проверит", "Write → take a photo → Komiko checks"],
    "Ovozli suhbat": ["Голосовой диалог", "Voice chat"], "Rasm bilan tekshiruv": ["Проверка по фото", "Photo check"],
    "Talaffuz": ["Произношение", "Pronunciation"], "Gapni ayting, baho oling": ["Скажите фразу — получите оценку", "Say it, get a score"],
    "Kitoblar": ["Книги", "Books"], "O'z darsligingiz": ["Ваш учебник", "Your textbook"],
    "Imtihonni tanlang": ["Выберите экзамен", "Choose an exam"],
    "Koreyada ishlash · E-9 viza": ["Работа в Корее · виза E-9", "Work in Korea · E-9 visa"],
    "Ish joyi, xavfsizlik, zavod va kundalik hayot mavzularida o'qish va tinglash.": ["Чтение и аудирование: работа, безопасность, завод и повседневная жизнь.", "Reading and listening: workplace, safety, factory and daily life."],
    "O'qish + Tinglash": ["Чтение + Аудирование", "Reading + Listening"], "Tinglash + O'qish": ["Аудирование + Чтение", "Listening + Reading"],
    "⚡ Tezkor test": ["⚡ Быстрый тест", "⚡ Quick test"], "📝 To'liq imtihon": ["📝 Полный экзамен", "📝 Full exam"],
    "40 savol · 50 daqiqa": ["40 вопросов · 50 минут", "40 questions · 50 min"], "30 savol · 40 daqiqa": ["30 вопросов · 40 минут", "30 questions · 40 min"],
    "O'qish · universitet · grant": ["Учёба · университет · грант", "Study · university · scholarship"],
    "1–2-daraja: kundalik so'zlar, grammatika, qisqa matnlar va dialoglar.": ["Уровни 1–2: бытовая лексика, грамматика, короткие тексты и диалоги.", "Levels 1–2: everyday words, grammar, short texts and dialogues."],
    "📝 Katta mock": ["📝 Большой пробный", "📝 Big mock"],
    "Maslahatlar": ["Советы", "Tips"], "🤖 Shaxsiy maslahat": ["🤖 Личный совет", "🤖 Personal advice"],
    "Test va talaffuz natijalaringiz asosida AI kuchli va zaif tomonlaringizni aytadi hamda 7 kunlik reja tuzadi.": ["По результатам тестов и произношения ИИ назовёт сильные и слабые стороны и составит план на 7 дней.", "Based on your test and pronunciation results, AI shows your strengths and weaknesses and makes a 7-day plan."],
    "Maslahat olish": ["Получить совет", "Get advice"],
    "🎧 Tinglash": ["🎧 Аудирование", "🎧 Listening"], "📖 O'qish": ["📖 Чтение", "📖 Reading"], "✍️ Yozish (TOPIK II)": ["✍️ Письмо (TOPIK II)", "✍️ Writing (TOPIK II)"],
    "🗣 Gapirish va talaffuz": ["🗣 Речь и произношение", "🗣 Speaking and pronunciation"], "🗂️ So'z yodlash": ["🗂️ Запоминание слов", "🗂️ Learning words"], "🏭 EPS-TOPIK": ["🏭 EPS-TOPIK", "🏭 EPS-TOPIK"],
    "Har kuni 15–20 daqiqa tinglang: avval matnsiz, keyin matn bilan.": ["Слушайте 15–20 минут в день: сначала без текста, потом с текстом.", "Listen 15–20 minutes a day: first without the script, then with it."],
    "Audio boshlanishidan oldin savol va javob variantlarini o'qib oling.": ["До начала аудио прочитайте вопрос и варианты ответа.", "Read the question and options before the audio starts."],
    "Raqamlar, vaqt, joy va odam nomlariga alohida e'tibor bering.": ["Особое внимание — числам, времени, местам и именам.", "Pay special attention to numbers, times, places and names."],
    "Soya usuli (shadowing): audio bilan bir vaqtda takrorlang.": ["Шэдоуинг: повторяйте одновременно с аудио.", "Shadowing: repeat along with the audio."],
    "Avval savolni, keyin matnni o'qing: nima qidirayotganingizni biling.": ["Сначала вопрос, потом текст: знайте, что ищете.", "Read the question first, then the text: know what you're looking for."],
    "Bitta savolga uzoq qolib ketmang: vaqtni teng taqsimlang.": ["Не застревайте на одном вопросе: распределяйте время.", "Don't get stuck on one question: split your time evenly."],
    "Notanish so'zni kontekstdan taxmin qilishni mashq qiling.": ["Учитесь угадывать незнакомые слова по контексту.", "Practise guessing unknown words from context."],
    "Sekin va aniq gapirish tez, lekin noaniq gapirishdan yaxshiroq baholanadi.": ["Медленная чёткая речь оценивается выше быстрой нечёткой.", "Slow, clear speech scores better than fast, unclear speech."],
    "Komiko bilan har kuni 5 daqiqa gaplashing.": ["Говорите с Комико по 5 минут в день.", "Talk with Komiko for 5 minutes a day."],
    "Kuniga 15–20 ta so'z yodlang va 1, 3, 7 kundan keyin takrorlang.": ["Учите 15–20 слов в день и повторяйте через 1, 3 и 7 дней.", "Learn 15–20 words a day and review after 1, 3 and 7 days."],
    "Xavfsizlik belgilari va asbob-uskuna nomlari ko'p so'raladi.": ["Часто спрашивают знаки безопасности и названия инструментов.", "Safety signs and tool names come up a lot."],
    "Haftasiga kamida 2 marta to'liq mock test ishlang.": ["Решайте полный пробный тест минимум 2 раза в неделю.", "Take a full mock test at least twice a week."],
    "Tariflar": ["Тарифы", "Plans"], "BEPUL": ["БЕСПЛАТНО", "FREE"], "0 so'm": ["0 сумов", "0 UZS"], "/ oy": ["/ мес", "/ month"],
    "Mock testlar va so'z kartochkalari": ["Пробные тесты и карточки слов", "Mock tests and word cards"],
    "1 ta kitob yuklash": ["Загрузка 1 книги", "Upload 1 book"], "Xatolar daftari": ["Тетрадь ошибок", "Mistakes notebook"],
    "Shaxsiy maslahat va haftalik reja": ["Личные советы и недельный план", "Personal advice and weekly plan"],
    "⭐ Premium olish": ["⭐ Получить Premium", "⭐ Get Premium"],
    "← Oldingi": ["← Назад", "← Previous"], "Keyingi →": ["Далее →", "Next →"], "Natija": ["Результат", "Result"],
    "Qayta topshirish": ["Пройти снова", "Retake"], "Bosh sahifa": ["Главная", "Home"], "Javoblar tahlili": ["Разбор ответов", "Answer review"],
    "Yakunlash ✓": ["Завершить ✓", "Finish ✓"], "Baribir yakunlash": ["Всё равно завершить", "Finish anyway"],
    "📖 O'qish · 읽기": ["📖 Чтение · 읽기", "📖 Reading · 읽기"], "🎧 Tinglash · 듣기": ["🎧 Аудирование · 듣기", "🎧 Listening · 듣기"],
    "Audioni tinglang": ["Прослушайте аудио", "Listen to the audio"], "Matnni ko'rsatish": ["Показать текст", "Show text"], "Matnni yashirish": ["Скрыть текст", "Hide text"],
    "So'z kartochkalari": ["Карточки слов", "Word cards"], "Hammasi": ["Все", "All"], "EPS: ish joyi": ["EPS: работа", "EPS: workplace"],
    "O'rta (3–4)": ["Средний (3–4)", "Intermediate (3–4)"], "Eng qiyin (5–6)": ["Самые сложные (5–6)", "Hardest (5–6)"], "Maqollar · 사자성어": ["Пословицы · 사자성어", "Proverbs · 사자성어"],
    "Tarjimani ko'rish uchun bosing": ["Нажмите, чтобы увидеть перевод", "Tap to see the translation"],
    "🔊 Tinglash": ["🔊 Слушать", "🔊 Listen"], "↻ Takrorlayman": ["↻ Повторю", "↻ Review again"], "✓ Bilaman": ["✓ Знаю", "✓ I know it"],
    "Komiko bilan gapirish": ["Говорим с Комико", "Speaking with Komiko"], "🎯 Talaffuz": ["🎯 Произношение", "🎯 Pronunciation"], "🤖 Komiko bilan suhbat": ["🤖 Разговор с Комико", "🤖 Talk with Komiko"],
    "Boshlang'ich": ["Начальный", "Beginner"], "Yuqori daraja": ["Высокий уровень", "Advanced"], "Qiyin talaffuz": ["Сложное произношение", "Tricky pronunciation"],
    "🔊 Namuna": ["🔊 Образец", "🔊 Sample"], "Bosing, gapni o'qing, tugatgach yana bosing": ["Нажмите и прочитайте фразу", "Tap and say the sentence"],
    "Bosing va gapni ayting": ["Нажмите и скажите фразу", "Tap and say the sentence"],
    "Qayta urinish uchun mikrofonni bosing": ["Нажмите микрофон, чтобы повторить", "Tap the mic to try again"],
    "O'z gapingizni mashq qiling": ["Тренируйте свою фразу", "Practise your own sentence"], "Mashq qilish": ["Тренировать", "Practise"],
    "Koreyscha gap kiriting…": ["Введите фразу на корейском…", "Type a Korean sentence…"],
    "Koreyscha yozing yoki o'zbekcha so'rang…": ["Пишите по-корейски или спросите по-русски…", "Write in Korean or ask in English…"],
    "🔈 Ovozni o'zgartirish": ["🔈 Сменить голос", "🔈 Change voice"],
    "👋 Tanishuv": ["👋 Знакомство", "👋 Introductions"], "🏭 Ish joyida": ["🏭 На работе", "🏭 At work"], "🛒 Do'konda": ["🛒 В магазине", "🛒 At the shop"],
    "🏥 Kasalxonada": ["🏥 В больнице", "🏥 At the hospital"], "☀️ Kundalik": ["☀️ Повседневное", "☀️ Daily life"], "🚇 Yo'lda": ["🚇 В дороге", "🚇 Getting around"],
    "Daftar tekshiruvi": ["Проверка тетради", "Notebook check"],
    "Daftaringizga yozing, rasmga oling — Komiko tekshiradi": ["Напишите в тетради, сфотографируйте — Комико проверит", "Write in your notebook, take a photo — Komiko checks"],
    "📝 Topshiriq": ["📝 Задание", "📝 Task"], "🔄 Boshqa topshiriq": ["🔄 Другое задание", "🔄 Another task"], "→ koreyscha?": ["→ по-корейски?", "→ in Korean?"],
    "💡 Aniq, katta harflar bilan yozing. Har bir javobni alohida qatorga raqam bilan yozing. Rasmni yorug' joyda, daftarni to'liq ko'rinadigan qilib oling.": ["💡 Пишите чётко и крупно, каждый ответ — на отдельной строке с номером. Фотографируйте при хорошем свете, чтобы была видна вся страница.", "💡 Write clearly and large, each answer on its own numbered line. Take the photo in good light with the whole page visible."],
    "✍️ Daftarga yozing": ["✍️ Напишите", "✍️ Write it"], "📷 Rasmga oling": ["📷 Сфотографируйте", "📷 Take a photo"], "✅ Natija": ["✅ Результат", "✅ Result"],
    "📷 Rasmga olish": ["📷 Сфотографировать", "📷 Take photo"], "🖼 Galereya": ["🖼 Галерея", "🖼 Gallery"],
    "📍 Topshiriq qayerda bajarilganini belgilash (GPS)": ["📍 Отмечать, где выполнено задание (GPS)", "📍 Record where the task was done (GPS)"],
    "Oldingi tekshiruvlar": ["Прошлые проверки", "Past checks"], "Hali tekshiruv yo'q. Birinchi topshiriqni bajaring!": ["Проверок пока нет. Выполните первое задание!", "No checks yet. Do your first task!"],
    "📷 Qayta rasmga olish": ["📷 Переснять", "📷 Retake photo"], "Keyingi topshiriq →": ["Следующее задание →", "Next task →"],
    "Komiko rasmdan o'qigan matn": ["Текст, который Комико прочитал на фото", "Text Komiko read from the photo"],
    "Kitoblarim": ["Мои книги", "My books"], "Kitob yuklash": ["Загрузить книгу", "Upload a book"], "← Kitoblarim": ["← Мои книги", "← My books"],
    "🗑 Kitobni o'chirish": ["🗑 Удалить книгу", "🗑 Delete book"], "← Darslar": ["← Уроки", "← Lessons"],
    "Testlarda xato qilgan savollaringiz shu yerda saqlanadi.": ["Здесь сохраняются вопросы, в которых вы ошиблись.", "Questions you got wrong are saved here."],
    "Hozircha xato yo'q. Mock test topshirib ko'ring!": ["Ошибок пока нет. Пройдите пробный тест!", "No mistakes yet. Try a mock test!"],
    "Test tanlash": ["Выбрать тест", "Choose a test"], "Daftarni tozalash": ["Очистить тетрадь", "Clear notebook"],
    "Yopish": ["Закрыть", "Close"], "⚙️ Sozlamalar": ["⚙️ Настройки", "⚙️ Settings"], "Komiko ovozi": ["Голос Комико", "Komiko's voice"],
    "⏱ Kunlik maqsad": ["⏱ Цель на день", "⏱ Daily goal"], "Tanishuv savollarini qaytadan": ["Пройти знакомство заново", "Redo the intro questions"],
    "Darajani qayta aniqlash": ["Заново определить уровень", "Re-check your level"], "🌐 Ilova tili": ["🌐 Язык приложения", "🌐 App language"],
    "🔈 Komiko ovozi": ["🔈 Голос Комико", "🔈 Komiko's voice"], "👩 Ayol": ["👩 Женский", "👩 Female"], "👨 Erkak": ["👨 Мужской", "👨 Male"],
    "🐢 Sekin": ["🐢 Медленно", "🐢 Slow"], "🚶 Odatiy": ["🚶 Обычно", "🚶 Normal"], "▶ Tinglab ko'rish": ["▶ Прослушать", "▶ Preview"],
    "⬇️ Ovoz paketini o'rnatish": ["⬇️ Установить голосовой пакет", "⬇️ Install voice data"],
    "🔁 Qaytadan": ["🔁 Заново", "🔁 Again"], "Komiko": ["Комико", "Komiko"],
    "Qavs ichiga mos keladiganini tanlang.": ["Выберите подходящий вариант для пропуска.", "Choose what fits in the brackets."],
    "Bu belgi nimani anglatadi?": ["Что означает этот знак?", "What does this sign mean?"],
    "Dialogga mos javobni tanlang.": ["Выберите ответ, подходящий к диалогу.", "Choose the reply that fits the dialogue."],
    "Tinglang: nima haqida gap ketmoqda?": ["Послушайте: о чём речь?", "Listen: what is it about?"],
    "Eshitganingizga mos keladiganini tanlang.": ["Выберите то, что соответствует услышанному.", "Choose what matches what you heard."],
    "Tinglang va mos javobni tanlang.": ["Послушайте и выберите ответ.", "Listen and choose the answer."],
    "Tinglang: bu yer qayer?": ["Послушайте: где это?", "Listen: where is this?"],
    "Matnga mos keladiganini tanlang.": ["Выберите то, что соответствует тексту.", "Choose what matches the text."],
    "Nima haqida gap ketmoqda?": ["О чём речь?", "What is it about?"],
    "Rasmga qarang va mos so'zni tanlang.": ["Посмотрите на картинку и выберите слово.", "Look at the picture and choose the word."],
    "Tinglang va mos rasmni tanlang.": ["Послушайте и выберите картинку.", "Listen and choose the picture."],
    "Savolni tinglang va mos javobni tanlang.": ["Послушайте вопрос и выберите ответ.", "Listen to the question and choose the answer."],
    "Tinglang va keyin aytiladigan gapni tanlang.": ["Послушайте и выберите следующую реплику.", "Listen and choose the next line."],
    "Ta'rifga mos keladigan joyni tanlang.": ["Выберите место по описанию.", "Choose the place that fits the description."],
    "Matnning asosiy fikrini tanlang.": ["Выберите главную мысль текста.", "Choose the main idea of the text."],
    "Matnni o'qing va savolga javob bering: maosh qachon beriladi?": ["Прочитайте текст: когда выдают зарплату?", "Read the text: when is the salary paid?"],
    "E'lonni o'qing va savolga javob bering.": ["Прочитайте объявление и ответьте на вопрос.", "Read the notice and answer the question."],
    "Qoidalarni o'qing: yotoqxonada nima qilish mumkin emas?": ["Прочитайте правила: что нельзя делать в общежитии?", "Read the rules: what is not allowed in the dormitory?"],
    "Tinglang: hojatxona qayerda?": ["Послушайте: где туалет?", "Listen: where is the toilet?"],
    "Tinglang: ishchi nega ertaga dam oladi?": ["Послушайте: почему рабочий завтра отдыхает?", "Listen: why is the worker off tomorrow?"],
    "Tinglang: ishchi endi nima qiladi?": ["Послушайте: что рабочий сделает сейчас?", "Listen: what will the worker do now?"],
    "Tinglang: xaridor nima sotib olmoqchi?": ["Послушайте: что хочет купить покупатель?", "Listen: what does the customer want to buy?"],
    "E'lonni o'qing va unga MOS KELMAYDIGANini tanlang.": ["Прочитайте объявление и выберите НЕВЕРНОЕ.", "Read the notice and choose the one that is NOT true."],
    "Taklifnomani o'qing va MOS KELMAYDIGANini tanlang.": ["Прочитайте приглашение и выберите НЕВЕРНОЕ.", "Read the invitation and choose the one that is NOT true."],
    "Tinglang: nima haqida gapiryapti?": ["Послушайте: о чём говорят?", "Listen: what are they talking about?"],
    "Tavsifga mos keladiganini tanlang.": ["Выберите то, что подходит к описанию.", "Choose what matches the description."],
    "Tinglang: erkak endi nima qiladi?": ["Послушайте: что мужчина сделает сейчас?", "Listen: what will the man do now?"],
    "E'lonni o'qing va MOS KELMAYDIGANini tanlang.": ["Прочитайте объявление и выберите то, что НЕ соответствует.", "Read the notice and choose what does NOT match."],
    "Tinglang: u nega kechikdi?": ["Послушайте: почему он опоздал?", "Listen: why was he late?"],
    "Tinglang: mijoz nima qilyapti?": ["Послушайте: что делает клиент?", "Listen: what is the customer doing?"],
    // Daftar topshiriqlari
    "Hangul: oila va oddiy so'zlar": ["Хангыль: семья и простые слова", "Hangul: family and simple words"],
    "Hangul: kundalik so'zlar": ["Хангыль: бытовые слова", "Hangul: everyday words"], "Joylar": ["Места", "Places"],
    "Ish joyi so'zlari (EPS)": ["Слова о работе (EPS)", "Workplace words (EPS)"], "Hafta kunlari": ["Дни недели", "Days of the week"],
    "Kundalik gaplar": ["Бытовые фразы", "Everyday sentences"], "Ish joyida gaplar (EPS)": ["Фразы на работе (EPS)", "Workplace sentences (EPS)"],
    "Murakkab gaplar": ["Сложные предложения", "Complex sentences"],
    "Har bir so'zni koreys harflari bilan daftaringizga yozing.": ["Напишите каждое слово корейскими буквами.", "Write each word in Korean letters."],
    "So'zlarni koreyscha yozing.": ["Напишите слова по-корейски.", "Write the words in Korean."],
    "Joy nomlarini koreyscha yozing.": ["Напишите названия мест по-корейски.", "Write the place names in Korean."],
    "EPS-TOPIK'da ko'p uchraydigan so'zlarni yozing.": ["Напишите частые слова EPS-TOPIK.", "Write common EPS-TOPIK words."],
    "Hafta kunlarini koreyscha yozing.": ["Напишите дни недели по-корейски.", "Write the days of the week in Korean."],
    "Gaplarni koreyschaga tarjima qilib yozing.": ["Переведите фразы на корейский.", "Translate the sentences into Korean."],
    "Gaplarni koreyschaga tarjima qiling (grammatikaga e'tibor bering).": ["Переведите на корейский (следите за грамматикой).", "Translate into Korean (mind the grammar)."],
    "ona": ["мама", "mum"], "ota": ["папа", "dad"], "sut": ["молоко", "milk"], "bola": ["ребёнок", "child"], "bodring": ["огурец", "cucumber"],
    "suv": ["вода", "water"], "kitob": ["книга", "book"], "uy": ["дом", "house"], "non": ["хлеб", "bread"], "olma": ["яблоко", "apple"],
    "maktab": ["школа", "school"], "kasalxona": ["больница", "hospital"], "do'kon": ["магазин", "shop"], "bank": ["банк", "bank"], "kutubxona": ["библиотека", "library"],
    "zavod": ["завод", "factory"], "qo'lqop": ["перчатки", "gloves"], "kaska": ["каска", "hard hat"], "ombor": ["склад", "warehouse"], "maosh": ["зарплата", "salary"],
    "dushanba": ["понедельник", "Monday"], "seshanba": ["вторник", "Tuesday"], "chorshanba": ["среда", "Wednesday"], "payshanba": ["четверг", "Thursday"], "juma": ["пятница", "Friday"],
    "Men talabaman.": ["Я студент.", "I'm a student."], "Bu qancha turadi?": ["Сколько это стоит?", "How much is this?"], "Hojatxona qayerda?": ["Где туалет?", "Where is the toilet?"],
    "Rahmat.": ["Спасибо.", "Thank you."], "O'zbekistondan keldim.": ["Я из Узбекистана.", "I came from Uzbekistan."],
    "Kaskani kiying.": ["Наденьте каску.", "Put on your hard hat."], "Mashina buzildi.": ["Станок сломался.", "The machine broke down."],
    "Qo'limni jarohatladim.": ["Я поранил руку.", "I hurt my hand."], "Bugun qo'shimcha ish bormi?": ["Сегодня есть сверхурочная работа?", "Is there overtime today?"],
    "Omborga olib boring.": ["Отнесите на склад.", "Take it to the warehouse."],
    "Ertaga yomg'ir yog'adi, soyabon oling.": ["Завтра дождь, возьмите зонт.", "It will rain tomorrow, take an umbrella."],
    "Vaqtim bo'lsa, sayohatga boraman.": ["Если будет время, поеду путешествовать.", "If I have time, I'll go travelling."],
    "Kitob o'qish uchun kutubxonaga bordim.": ["Я пошёл в библиотеку, чтобы почитать.", "I went to the library to read."],
    "U kelguncha kutaman.": ["Я подожду, пока он придёт.", "I'll wait until they come."],
    "Koreys tilini o'rganish qiyin, lekin qiziq.": ["Учить корейский трудно, но интересно.", "Learning Korean is hard but fun."],
    // 6 daqiqa
    "6 daqiqa koreys": ["6 минут корейского", "6-Minute Korean"]
  };
  // So'zlar kartochkasi: koreyscha → [ruscha, inglizcha]
  var WORDS = {
    "안전모": ["защитная каска", "hard hat"], "장갑": ["перчатки", "gloves"], "공장": ["завод, фабрика", "factory"], "기숙사": ["общежитие", "dormitory"],
    "월급": ["месячная зарплата", "monthly salary"], "출근하다": ["приходить на работу", "to go to work"], "퇴근하다": ["уходить с работы", "to leave work"],
    "잔업": ["сверхурочная работа", "overtime"], "반장": ["бригадир", "team leader"], "위험하다": ["быть опасным", "to be dangerous"], "조심하세요": ["Осторожно!", "Be careful!"],
    "도서관": ["библиотека", "library"], "병원": ["больница", "hospital"], "가족": ["семья", "family"], "친구": ["друг", "friend"], "주말": ["выходные", "weekend"],
    "날씨": ["погода", "weather"], "생일": ["день рождения", "birthday"], "경험": ["опыт", "experience"], "환경": ["окружающая среда", "environment"], "영향": ["влияние", "influence"],
    "해결하다": ["решать", "to solve"], "노력하다": ["стараться", "to make an effort"], "발전": ["развитие", "development"], "참여하다": ["участвовать", "to participate"],
    "증가하다": ["увеличиваться", "to increase"], "비교하다": ["сравнивать", "to compare"], "결정하다": ["решать, принимать решение", "to decide"],
    "불가피하다": ["неизбежный", "inevitable"], "간과하다": ["упускать из виду", "to overlook"], "모색하다": ["искать (путь, решение)", "to seek (a way)"],
    "대두되다": ["становиться актуальным", "to emerge (as an issue)"], "초래하다": ["приводить к (последствиям)", "to bring about"],
    "수반하다": ["сопровождать, влечь за собой", "to accompany, entail"], "상쇄하다": ["компенсировать, сводить на нет", "to offset"],
    "시사하다": ["указывать, намекать", "to suggest, imply"], "저해하다": ["препятствовать", "to hinder"], "도모하다": ["стремиться к (цели)", "to pursue (a goal)"],
    "억제하다": ["сдерживать", "to restrain"], "고령화": ["старение населения", "population ageing"], "양극화": ["поляризация", "polarisation"],
    "지속 가능하다": ["устойчивый", "sustainable"], "취약하다": ["уязвимый", "vulnerable"], "타당하다": ["обоснованный", "valid, reasonable"],
    "막론하다": ["независимо от", "regardless of"], "유례없다": ["беспрецедентный", "unprecedented"], "견해": ["точка зрения", "viewpoint"],
    "실마리": ["ключ (к решению)", "clue"], "각광을 받다": ["быть в центре внимания", "to be in the spotlight"], "아랑곳하지 않다": ["не обращать внимания", "to pay no heed"],
    "일석이조": ["убить двух зайцев", "two birds with one stone"], "우물 안 개구리": ["лягушка в колодце (ограниченный человек)", "a frog in a well (narrow-minded)"],
    "발 없는 말이 천 리 간다": ["слухи распространяются быстро", "words travel fast"], "소 잃고 외양간 고친다": ["после драки кулаками не машут", "locking the barn after the horse has bolted"],
    "가는 말이 고와야 오는 말이 곱다": ["как аукнется, так и откликнется", "kind words get kind replies"], "티끌 모아 태산": ["с миру по нитке", "every little bit adds up"],
    "백문이 불여일견": ["лучше один раз увидеть", "seeing is believing"], "고진감래": ["после трудностей приходит радость", "no pain, no gain"],
    "금상첨화": ["вишенка на торте", "icing on the cake"], "작심삼일": ["решимость на три дня", "short-lived resolve"]
  };

  function t(uz) {
    if (LANG === "uz" || uz == null) return uz;
    var k = String(uz).trim(), v = DICT[k];
    return v ? v[IDX[LANG]] : uz;
  }
  // Dinamik matnlar uchun: o'zbekcha shablon + {o'zgaruvchi}
  function f(map, vars) {
    var s = (map && (map[LANG] || map.uz)) || "";
    if (vars) Object.keys(vars).forEach(function (k) { s = s.split("{" + k + "}").join(vars[k]); });
    return s;
  }
  // {uz, ru, en} → asosiy til
  function pick(o) { return o ? (o[LANG] || o.uz || o.en || "") : ""; }
  // Asosiy til + boshqa tillar (HTML)
  function tri(o, cls) {
    if (!o) return "";
    var others = ["uz", "ru", "en"].filter(function (l) { return l !== LANG && o[l]; });
    return '<span class="tri-main">' + esc(pick(o)) + '</span>' + (others.length ? '<span class="tri ' + (cls || "") + '">' +
      others.map(function (l) { return FLAG[l] + " " + esc(o[l]); }).join(" · ") + '</span>' : "");
  }
  function word(ko, uz) { var w = WORDS[ko] || []; return { uz: uz, ru: w[0], en: w[1] }; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }

  // ---------- DOM tarjimasi ----------
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1 };
  function trNode(n) {
    var v = n.nodeValue; if (!v) return;
    var k = v.trim(); if (!k || !DICT[k]) return;
    var r = DICT[k][IDX[LANG]]; if (!r || r === k) return;
    n.nodeValue = v.replace(k, r);
  }
  function apply(root) {
    if (LANG === "uz" || !root) return;
    if (root.nodeType === 3) { trNode(root); return; }
    if (root.nodeType !== 1 || SKIP[root.tagName]) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null), n;
    while ((n = w.nextNode())) { if (!SKIP[n.parentNode.tagName]) trNode(n); }
    if (root.querySelectorAll) root.querySelectorAll("[placeholder]").forEach(function (e) { var r = t(e.placeholder); if (r !== e.placeholder) e.placeholder = r; });
    if (root.placeholder) { var r2 = t(root.placeholder); if (r2 !== root.placeholder) root.placeholder = r2; }
  }
  var obs = null;
  function observe() {
    if (obs || LANG === "uz" || !window.MutationObserver) return;
    obs = new MutationObserver(function (ms) {
      ms.forEach(function (m) {
        if (m.type === "characterData") trNode(m.target);
        else m.addedNodes.forEach(apply);
      });
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });
  }
  function setLang(l) {
    if (!/^(uz|ru|en)$/.test(l)) return;
    var changed = l !== LANG;
    try { localStorage.setItem(KEY, l); } catch (e) {}
    LANG = l; document.documentElement.lang = l;
    if (changed) location.reload();
  }
  function start() { document.documentElement.lang = LANG; apply(document.body); observe(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start); else start();

  window.I18N = {
    lang: function () { return LANG; }, chosen: function () { return !!load(); }, setLang: setLang,
    t: t, f: f, pick: pick, tri: tri, word: word, apply: apply, FLAG: FLAG,
    speechCode: function (l) { return { uz: "uz-UZ", ru: "ru-RU", en: "en-US" }[l || LANG]; }
  };
})();
