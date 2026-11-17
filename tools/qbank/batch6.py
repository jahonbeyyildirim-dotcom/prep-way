# 6-to'plam: TOPIK I juft savollari — har bir o'rin uchun kamida 3 ta to'plam
def S(i, typ, sec, kind, content, qs, slot=None):
    d = {"id": i, "type": typ, "sec": sec, kind: content, "qs": qs}
    if slot: d["slot"] = slot
    return d
WHY = "여자가 왜 이 이야기를 하고 있는지 고르십시오."
SAME_L = "들은 내용과 같은 것을 고르십시오."
ABOUT2 = "두 사람이 무엇에 대해 이야기하고 있는지 고르십시오."
BLANK = "㉠에 들어갈 알맞은 것을 고르십시오."
CONJ = "( ㉠ )에 들어갈 알맞은 말을 고르십시오."
SAME_R = "이 글의 내용과 같은 것을 고르십시오."
TOPIC = "무엇에 대한 이야기인지 맞는 것을 고르십시오."
POS = "다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n"
PURPOSE = "왜 윗글을 썼는지 맞는 것을 고르십시오."
INFER = "이 글의 내용으로 알 수 있는 것을 고르십시오."
MARKS = ["㉠", "㉡", "㉢", "㉣"]

SETS = {"topik": [
 # ===== [49~50] =====
 S("s19","T-R6","read","text","저는 요즘 아침마다 공원에서 달리기를 합니다. 처음에는 10분만 뛰어도 힘들었습니다. 그런데 한 달 동안 매일 뛰니까 지금은 30분도 ( ㉠ ) 뛸 수 있습니다. 운동을 하니까 잠도 잘 잡니다.",[
   ("t241",BLANK,["쉽게","어렵게","늦게","조용하게"],0,
    "Bir oy mashqdan keyin 30 daqiqa ham <b>oson</b> yuguradi: <b>쉽게</b>. Avval 10 daqiqa ham qiyin edi.",
    "После месяца тренировок даже 30 минут бегает <b>легко</b>: <b>쉽게</b>. Сначала было трудно и 10 минут.",
    "After a month of training he runs 30 minutes <b>easily</b>: <b>쉽게</b>. At first even 10 minutes was hard."),
   ("t242",SAME_R,["저는 매일 아침 달리기를 합니다.","저는 처음부터 30분을 뛰었습니다.","저는 저녁에 공원에 갑니다.","운동을 한 후에 잠을 못 잡니다."],0,
    "<b>아침마다</b> — har tong. Sport qilgani uchun yaxshi uxlaydi.",
    "<b>아침마다</b> — каждое утро. Благодаря спорту хорошо спит.",
    "<b>아침마다</b> — every morning. Thanks to exercise he sleeps well.")], slot="49"),
 # ===== [51~52] =====
 S("s20","T-R6","read","text","한국에서는 식사할 때 숟가락과 젓가락을 같이 사용합니다. 밥과 국은 숟가락으로 먹고 반찬은 젓가락으로 먹습니다. 그리고 밥그릇을 손에 ( ㉠ ) 먹지 않습니다. 밥그릇은 식탁 위에 놓고 먹습니다.",[
   ("t243",BLANK,["들고","들어서","들면","들지만"],0,
    "Ketma-ket harakat: <b>-고</b> — «...ib». Kosani qo'lda <b>ko'tarib</b> yemaydi: 들고 먹지 않습니다.",
    "Последовательность: <b>-고</b> — «и, держа». Не едят, <b>держа</b> чашку в руке: 들고 먹지 않습니다.",
    "Linked actions: <b>-고</b>. Koreans don't eat <b>holding</b> the rice bowl: 들고 먹지 않습니다."),
   ("t244",TOPIC,["한국의 식사 예절","숟가락을 사는 곳","반찬을 만드는 방법","한국 음식의 값"],0,
    "Qoshiq-cho'p, kosani stolda qoldirish — <b>식사 예절</b> (dasturxon odobi).",
    "Ложка, палочки, чашка на столе — это <b>식사 예절</b> (застольный этикет).",
    "Spoons, chopsticks, keeping the bowl on the table — <b>식사 예절</b> (table manners).")], slot="51"),
 S("s21","T-R6","read","text","봄이 되면 한국의 여러 곳에서 꽃 축제가 열립니다. 특히 4월에는 벚꽃을 보러 가는 사람이 많습니다. 꽃이 핀 길을 걸으면서 사진을 찍으면 ( ㉠ ) 좋아집니다. 하지만 사람이 많으니까 아침 일찍 가는 것이 좋습니다.",[
   ("t245",BLANK,["기분이","날씨가","시간이","값이"],0,
    "Gul ochilgan yo'lda sayr qilsangiz <b>kayfiyat</b> ko'tariladi: <b>기분이 좋아지다</b>.",
    "Гуляя по цветущей аллее, <b>настроение</b> улучшается: <b>기분이 좋아지다</b>.",
    "Walking among the blossoms, your <b>mood</b> improves: <b>기분이 좋아지다</b>."),
   ("t246",TOPIC,["봄 꽃 축제","겨울 여행","사진기 사용법","길을 찾는 방법"],0,
    "Matn <b>bahorgi gul bayramlari</b> haqida. 벚꽃 — sakura, 열리다 — o'tkazilmoq.",
    "Текст о <b>весенних фестивалях цветов</b>. 벚꽃 — сакура, 열리다 — проводиться.",
    "The text is about <b>spring flower festivals</b>. 벚꽃 — cherry blossoms, 열리다 — to be held.")], slot="51"),
 # ===== [53~54] =====
 S("s22","T-R6","read","text","저는 지난달에 휴대폰을 잃어버렸습니다. 버스에서 내릴 때 의자 위에 놓고 내렸습니다. 바로 버스 회사에 전화를 했지만 찾을 수 없었습니다. 그래서 새 휴대폰을 샀습니다. 그 후로는 버스에서 내리기 ( ㉠ ) 꼭 제 물건을 확인합니다.",[
   ("t247",BLANK,["전에","후에","동안","때문에"],0,
    "Narsalarni avtobusdan tushishdan <b>oldin</b> tekshiradi: <b>-기 전에</b>.",
    "Проверяет вещи <b>перед</b> выходом из автобуса: <b>-기 전에</b>.",
    "He checks his things <b>before</b> getting off: <b>-기 전에</b>."),
   ("t248",SAME_R,["저는 버스에서 휴대폰을 잃어버렸습니다.","버스 회사에서 휴대폰을 찾아 주었습니다.","저는 휴대폰을 사지 않았습니다.","저는 택시에서 휴대폰을 잃어버렸습니다."],0,
    "Telefon <b>avtobusda</b> o'rindiqda qolgan va topilmagan, yangisi sotib olingan. 잃어버리다 — yo'qotmoq.",
    "Телефон остался на сиденье <b>в автобусе</b> и не нашёлся, купил новый. 잃어버리다 — потерять.",
    "The phone was left on a <b>bus</b> seat and never found; he bought a new one. 잃어버리다 — to lose.")], slot="53"),
 S("s23","T-R6","read","text","우리 아파트에는 작은 도서관이 있습니다. 주민들이 읽은 책을 가지고 와서 다른 사람과 나누어 읽습니다. 책을 빌리는 데 돈이 ( ㉠ ). 저도 지난주에 요리책 두 권을 빌렸습니다.",[
   ("t249",BLANK,["들지 않습니다","많이 듭니다","있습니다","모입니다"],0,
    "Kitoblar bo'lishiladi — <b>pul ketmaydi</b>: <b>돈이 들지 않다</b>. 돈이 들다 — pul sarflanmoq.",
    "Книгами делятся — <b>денег не нужно</b>: <b>돈이 들지 않다</b>. 돈이 들다 — требовать затрат.",
    "Books are shared — <b>it costs nothing</b>: <b>돈이 들지 않다</b>. 돈이 들다 — to cost money."),
   ("t250",SAME_R,["주민들은 자기 책을 가지고 와서 나눕니다.","책을 빌리려면 돈을 내야 합니다.","저는 소설책을 빌렸습니다.","도서관은 아파트 밖에 있습니다."],0,
    "<b>주민</b> — aholi, uy egalari: o'qigan kitoblarini olib kelib bo'lishadi. Men pazandachilik kitobi oldim.",
    "<b>주민</b> — жильцы: приносят прочитанные книги и делятся. Я взял кулинарные книги.",
    "<b>주민</b> — residents bring books they've read and share them. I borrowed cookbooks.")], slot="53"),
 # ===== [55~56] =====
 S("s24","T-R6","read","text","한국 사람들은 생일에 미역국을 먹습니다. 미역국은 몸에 좋은 음식입니다. ( ㉠ ) 시험을 보는 날에는 미역국을 먹지 않습니다. 미역이 미끄러워서 시험에서 떨어진다고 생각하기 때문입니다.",[
   ("t251",CONJ,["그런데","그래서","그리고","그러면"],0,
    "Foydali ovqat, <b>biroq</b> imtihon kuni yeyilmaydi — qarama-qarshilik: <b>그런데</b>.",
    "Полезное блюдо, <b>однако</b> в день экзамена его не едят — противопоставление: <b>그런데</b>.",
    "A healthy dish, <b>but</b> not eaten on exam day — contrast: <b>그런데</b>."),
   ("t252",SAME_R,["생일에 미역국을 먹습니다.","시험 날에 미역국을 꼭 먹습니다.","미역국은 몸에 나쁩니다.","미역은 미끄럽지 않습니다."],0,
    "<b>미역국</b> — dengiz karami sho'rvasi, tug'ilgan kunda ichiladi. 떨어지다 — yiqilmoq; imtihondan yiqilmoq.",
    "<b>미역국</b> — суп из морской капусты, его едят в день рождения. 떨어지다 — упасть; провалить экзамен.",
    "<b>미역국</b> — seaweed soup, eaten on birthdays. 떨어지다 — to fall; to fail an exam.")], slot="55"),
 # ===== [59~60] =====
 S("s25","T-R6","read","text","저는 작년부터 주말마다 요리 학원에 다닙니다. ( ㉠ ) 처음에는 칼을 잘 쓰지 못해서 손을 자주 다쳤습니다. ( ㉡ ) 지금은 한국 음식을 열 가지쯤 만들 수 있습니다. ( ㉢ ) 다음 달에는 친구들을 초대해서 제가 만든 음식을 대접하려고 합니다. ( ㉣ )",[
   ("t253",POS+"하지만 열심히 연습해서 실력이 많이 늘었습니다.",MARKS,1,
    "<b>하지만</b> — avvalgi qiyinchilikka qarshi: qo'l jarohatidan keyin, «hozir 10 xil ovqat» dan oldin — ㉡.",
    "<b>하지만</b> противопоставляется трудностям: после травм рук и перед «сейчас 10 блюд» — ㉡.",
    "<b>하지만</b> contrasts with the earlier struggle: after the cut hands, before \"now 10 dishes\" — ㉡."),
   ("t254",SAME_R,["저는 주말에 요리를 배웁니다.","저는 처음부터 칼을 잘 썼습니다.","저는 한국 음식을 만들 줄 모릅니다.","저는 지난달에 친구들을 초대했습니다."],0,
    "<b>주말마다 요리 학원에 다닙니다</b> — har dam olish kuni pazandachilik kursiga boraman.",
    "<b>주말마다 요리 학원에 다닙니다</b> — каждые выходные хожу на кулинарные курсы.",
    "<b>주말마다 요리 학원에 다닙니다</b> — I attend cooking classes every weekend.")], slot="59"),
 S("s26","T-R6","read","text","우리 회사는 매년 봄에 직원들과 함께 산에 갑니다. ( ㉠ ) 올해도 지난 토요일에 가려고 했습니다. ( ㉡ ) 그래서 산 대신 회사 근처 식당에서 다 같이 점심을 먹었습니다. ( ㉢ ) 다른 부서 사람들과 이야기할 수 있어서 좋았습니다. ( ㉣ )",[
   ("t255",POS+"그런데 그날 아침부터 비가 많이 왔습니다.",MARKS,1,
    "Yomg'ir — reja o'zgarishining sababi: «borishni rejalashtirdik» va «<b>그래서</b> tog' o'rniga restoran» orasida — ㉡.",
    "Дождь — причина смены плана: между «собирались пойти» и «<b>그래서</b> вместо гор — ресторан» — ㉡.",
    "The rain explains the change: between \"we planned to go\" and \"<b>그래서</b> a restaurant instead\" — ㉡."),
   ("t256",SAME_R,["올해는 산에 가지 못했습니다.","우리 회사는 가을에 산에 갑니다.","비가 와서 집에서 쉬었습니다.","다른 부서 사람들과 이야기하지 못했습니다."],0,
    "Yomg'ir tufayli tog'ga <b>bora olishmadi</b>, restoranda tushlik qilishdi. 부서 — bo'lim.",
    "Из-за дождя в горы <b>не пошли</b>, пообедали в ресторане. 부서 — отдел.",
    "Because of rain they <b>couldn't go</b> to the mountain and had lunch out. 부서 — department.")], slot="59"),
 # ===== [61~62] =====
 S("s27","T-R6","read","text","요즘 혼자 사는 사람들이 많아지면서 편의점에서 식사를 하는 사람도 늘었습니다. 편의점 도시락은 값이 싸고 ( ㉠ ) 먹을 수 있어서 인기가 많습니다. 하지만 매일 편의점 음식만 먹으면 건강에 좋지 않습니다. 가끔은 채소와 과일도 챙겨 먹는 것이 좋습니다.",[
   ("t257",BLANK,["간단하게","어렵게","천천히","비싸게"],0,
    "Arzon va <b>oson, tez</b> yeyiladi: <b>간단하게</b>. Shuning uchun mashhur.",
    "Дёшево и можно поесть <b>просто, быстро</b>: <b>간단하게</b>. Поэтому популярно.",
    "Cheap and <b>quick and easy</b> to eat: <b>간단하게</b>. That's why it's popular."),
   ("t258",SAME_R,["편의점 도시락은 값이 쌉니다.","혼자 사는 사람이 줄었습니다.","편의점 음식만 먹어도 건강합니다.","편의점 도시락은 인기가 없습니다."],0,
    "<b>값이 싸다</b> — arzon. Yolg'iz yashovchilar ko'paygan; faqat do'kon ovqati sog'liqqa zarar.",
    "<b>값이 싸다</b> — дёшево. Одиноких стало больше; питаться только так — вредно.",
    "<b>값이 싸다</b> — cheap. More people live alone; eating only this is unhealthy.")], slot="61"),
 S("s28","T-R6","read","text","저는 한국에 온 후에 한국 친구를 사귀고 싶었습니다. 그래서 학교 축구 동아리에 들어갔습니다. 동아리에서는 일주일에 두 번 축구를 하고 경기가 끝나면 같이 밥을 먹습니다. 축구를 ( ㉠ ) 한국어도 많이 늘었습니다.",[
   ("t259",BLANK,["하면서","하려고","하지만","하거나"],0,
    "Futbol o'ynash <b>bilan birga</b> koreys tili ham oshdi: <b>-(으)면서</b>.",
    "<b>Играя</b> в футбол, улучшил и корейский: <b>-(으)면서</b> — одновременно.",
    "<b>While</b> playing football, his Korean improved too: <b>-(으)면서</b>."),
   ("t260",SAME_R,["저는 동아리에서 한국 친구를 사귀려고 했습니다.","동아리는 매일 축구를 합니다.","경기가 끝나면 바로 집에 갑니다.","저는 농구 동아리에 들어갔습니다."],0,
    "Koreys do'st orttirish uchun <b>동아리</b> (to'garak) ga kirdi. Haftasiga 2 marta, o'yindan keyin birga ovqatlanishadi.",
    "Вступил в <b>동아리</b> (клуб), чтобы подружиться с корейцами. 2 раза в неделю, после игры едят вместе.",
    "He joined a <b>동아리</b> (club) to make Korean friends. Twice a week; they eat together after games.")], slot="61"),
 # ===== [63~64] =====
 S("s29","T-R6","read","text","받는 사람: 김민수\n제목: 생일 파티 초대\n\n민수 씨, 안녕하세요?\n이번 주 토요일이 제 생일이에요. 그래서 저녁 7시에 우리 집에서 작은 파티를 하려고 해요. 맛있는 음식도 준비할 거예요. 시간이 있으면 꼭 와 주세요. 올 수 있는지 금요일까지 알려 주세요.\n\n나디라",[
   ("t261",PURPOSE,["생일 파티에 초대하려고","음식을 부탁하려고","약속을 취소하려고","선물을 받으려고"],0,
    "Mavzu <b>생일 파티 초대</b> — tug'ilgan kun ziyofatiga taklif. Xat maqsadi — taklif qilish.",
    "Тема <b>생일 파티 초대</b> — приглашение на день рождения. Цель письма — пригласить.",
    "Subject <b>생일 파티 초대</b> — a birthday party invitation. The purpose is to invite."),
   ("t262",SAME_R,["파티는 토요일 저녁에 합니다.","파티는 식당에서 합니다.","민수 씨의 생일은 토요일입니다.","금요일에 파티를 합니다."],0,
    "Ziyofat <b>shanba kuni soat 19:00</b> da, Nadiraning uyida. Juma kunigacha javob berish kerak.",
    "Праздник <b>в субботу в 19:00</b> дома у Надиры. Ответить нужно до пятницы.",
    "The party is <b>Saturday at 7 p.m.</b> at Nadira's home. Reply by Friday.")], slot="63"),
 S("s30","T-R6","read","text","받는 사람: 하늘아파트 주민 여러분\n제목: 엘리베이터 점검 안내\n\n안녕하십니까? 관리사무소입니다.\n11월 20일 목요일 오전 9시부터 12시까지 엘리베이터를 점검합니다. 점검 시간에는 엘리베이터를 이용할 수 없으니 계단을 이용해 주시기 바랍니다. 불편을 드려서 죄송합니다.",[
   ("t263",PURPOSE,["엘리베이터 점검을 알리려고","계단 청소를 부탁하려고","새 주민을 소개하려고","관리비를 내라고 말하려고"],0,
    "<b>점검 안내</b> — texnik ko'rik haqida xabar. 관리사무소 — boshqaruv idorasi.",
    "<b>점검 안내</b> — уведомление о техосмотре. 관리사무소 — управляющая компания.",
    "<b>점검 안내</b> — a maintenance notice. 관리사무소 — building management office."),
   ("t264",SAME_R,["목요일 오전에는 엘리베이터를 탈 수 없습니다.","점검은 오후에 합니다.","점검 시간에도 엘리베이터를 쓸 수 있습니다.","점검은 일주일 동안 합니다."],0,
    "Payshanba <b>09:00–12:00</b> lift ishlamaydi, zinadan foydalanish so'raladi. 계단 — zina.",
    "В четверг <b>с 9 до 12</b> лифт не работает, просят пользоваться лестницей. 계단 — лестница.",
    "On Thursday <b>9–12 a.m.</b> the elevator is out; use the stairs. 계단 — stairs.")], slot="63"),
 # ===== [65~66] =====
 S("s31","T-R6","read","text","한국의 지하철에는 노약자석이 있습니다. 노약자석은 노인, 임신한 사람, 몸이 불편한 사람을 위한 자리입니다. 그래서 젊은 사람들은 자리가 비어 있어도 노약자석에 잘 ( ㉠ ). 자리가 필요한 사람이 언제든지 앉을 수 있게 하기 위해서입니다.",[
   ("t265",BLANK,["앉지 않습니다","앉습니다","서지 않습니다","내립니다"],0,
    "Joy bo'sh bo'lsa ham yoshlar u yerga <b>o'tirmaydi</b>: <b>잘 앉지 않습니다</b>.",
    "Даже если место свободно, молодые туда <b>не садятся</b>: <b>잘 앉지 않습니다</b>.",
    "Even when it's empty, young people <b>don't sit</b> there: <b>잘 앉지 않습니다</b>."),
   ("t266",SAME_R,["노약자석은 몸이 불편한 사람도 앉을 수 있습니다.","젊은 사람들은 노약자석에 자주 앉습니다.","노약자석은 버스에만 있습니다.","노약자석은 학생을 위한 자리입니다."],0,
    "<b>노약자석</b> — keksalar, homilador va nogironlar uchun joy. 불편하다 — noqulay.",
    "<b>노약자석</b> — места для пожилых, беременных и людей с ограничениями. 불편하다 — неудобно.",
    "<b>노약자석</b> — seats for the elderly, pregnant and disabled. 불편하다 — uncomfortable.")], slot="65"),
 S("s32","T-R6","read","text","물을 충분히 마시는 것은 건강에 아주 중요합니다. 사람들은 보통 목이 마를 때만 물을 마십니다. 그런데 목이 마르다고 느낄 때는 이미 몸에 물이 ( ㉠ ) 상태입니다. 그러니까 목이 마르지 않아도 조금씩 자주 마시는 것이 좋습니다.",[
   ("t267",BLANK,["부족한","많은","차가운","깨끗한"],0,
    "Chanqaganda tanada suv allaqachon <b>yetishmaydi</b>: <b>부족하다</b>.",
    "Когда хочется пить, воды в теле уже <b>не хватает</b>: <b>부족하다</b>.",
    "By the time you're thirsty, your body is already <b>short</b> of water: <b>부족하다</b>."),
   ("t268",SAME_R,["목이 마르지 않아도 물을 마시는 것이 좋습니다.","목이 마를 때만 물을 마셔야 합니다.","물을 한 번에 많이 마셔야 합니다.","물은 건강에 중요하지 않습니다."],0,
    "Xulosa: <b>chanqamasangiz ham</b> oz-ozdan tez-tez iching. 조금씩 — ozdan.",
    "Вывод: пейте понемногу и часто, <b>даже если не хочется</b>. 조금씩 — понемногу.",
    "Conclusion: drink little and often <b>even when not thirsty</b>. 조금씩 — a little at a time.")], slot="65"),
 # ===== [67~68] =====
 S("s33","T-R6","read","text","한국의 겨울은 춥고 건조합니다. 그래서 겨울에는 감기에 걸리는 사람이 많습니다. 감기에 걸리지 않으려면 손을 자주 씻고 실내 온도를 적당하게 유지해야 합니다. 또 방이 너무 건조하면 목이 아프기 쉬우니까 ( ㉠ ) 젖은 수건을 방에 걸어 두는 것도 좋습니다.",[
   ("t269",BLANK,["가습기를 사용하거나","창문을 닫거나","에어컨을 켜거나","난방을 끄거나"],0,
    "Xona quruq bo'lsa — havoni namlash kerak: <b>가습기</b> (namlagich) yoki ho'l sochiq. -거나 — yoki.",
    "Сухой воздух нужно увлажнять: <b>가습기</b> (увлажнитель) или мокрое полотенце. -거나 — или.",
    "Dry air needs moisture: a <b>가습기</b> (humidifier) or a wet towel. -거나 — or."),
   ("t270",SAME_R,["겨울에는 손을 자주 씻는 것이 좋습니다.","한국의 겨울은 따뜻합니다.","방이 건조하면 감기에 걸리지 않습니다.","겨울에는 감기에 걸리는 사람이 적습니다."],0,
    "Shamollamaslik uchun <b>qo'lni tez-tez yuvish</b> kerak. 건조하다 — quruq, 유지하다 — saqlamoq.",
    "Чтобы не простыть, нужно <b>часто мыть руки</b>. 건조하다 — сухой, 유지하다 — поддерживать.",
    "To avoid colds, <b>wash your hands often</b>. 건조하다 — dry, 유지하다 — to maintain.")], slot="67"),
 S("s34","T-R6","read","text","요즘 많은 사람들이 일회용 컵 대신 개인 컵을 가지고 다닙니다. 일회용 컵은 한 번 쓰고 버리기 때문에 쓰레기가 많이 생깁니다. 그래서 카페에서는 개인 컵을 가지고 오는 손님에게 음료값을 ( ㉠ ) 줍니다. 작은 노력이지만 환경을 지키는 데 도움이 됩니다.",[
   ("t271",BLANK,["할인해","올려","받아","계산해"],0,
    "Shaxsiy stakan olib kelganlarni rag'batlantirish — narxni <b>arzonlashtirish</b>: <b>할인해 주다</b>.",
    "Поощрение за свою кружку — <b>скидка</b> на напиток: <b>할인해 주다</b>.",
    "The reward for bringing your own cup is a <b>discount</b>: <b>할인해 주다</b>."),
   ("t272",SAME_R,["개인 컵을 쓰면 쓰레기가 줄어듭니다.","일회용 컵은 여러 번 씁니다.","카페에서는 개인 컵을 쓸 수 없습니다.","개인 컵을 가지고 가면 음료가 비쌉니다."],0,
    "Bir martalik stakan ko'p chiqindi beradi, shaxsiy stakan esa <b>chiqindini kamaytiradi</b>. 환경 — atrof-muhit.",
    "Одноразовые стаканы дают много мусора, своя кружка его <b>уменьшает</b>. 환경 — окружающая среда.",
    "Disposable cups create waste; a personal cup <b>reduces</b> it. 환경 — the environment.")], slot="67"),
 # ===== [69~70] =====
 S("s35","T-R6","read","text","저는 어렸을 때 그림 그리는 것을 좋아했습니다. 하지만 부모님은 제가 의사가 되기를 바라셨습니다. 그래서 저는 대학교에서 의학을 공부했습니다. 의사가 된 후에도 시간이 있을 때마다 그림을 그렸습니다. 작년에는 제 그림으로 작은 전시회를 열었습니다. 전시회에 온 환자들이 제 그림을 보고 마음이 편해졌다고 말했습니다. 그때 저는 그림이 ( ㉠ ) 수 있다는 것을 알게 되었습니다.",[
   ("t273",BLANK,["사람들을 위로해 줄","병원을 지을","돈을 많이 벌","의사가 될"],0,
    "Bemorlarning ko'ngli taskin topgan — rasm odamlarga <b>tasalli bera oladi</b>: <b>위로하다</b>.",
    "Пациентам стало спокойнее — живопись может <b>утешать</b> людей: <b>위로하다</b>.",
    "The patients felt at ease — art can <b>comfort</b> people: <b>위로하다</b>."),
   ("t274",INFER,["저는 의사로 일하면서 그림을 그립니다.","저는 대학교에서 미술을 공부했습니다.","부모님은 제가 화가가 되기를 바라셨습니다.","저는 그림 그리는 것을 그만두었습니다."],0,
    "U <b>shifokor</b> bo'ldi, lekin bo'sh vaqtida rasm chizishda davom etadi. 의학 — tibbiyot, 전시회 — ko'rgazma.",
    "Он стал <b>врачом</b>, но в свободное время продолжает рисовать. 의학 — медицина, 전시회 — выставка.",
    "He became a <b>doctor</b> but still paints in his free time. 의학 — medicine, 전시회 — exhibition.")], slot="69"),
 S("s36","T-R6","read","text","제 할머니는 시골에서 작은 가게를 하십니다. 할머니 가게에는 마을 사람들이 자주 와서 이야기를 나눕니다. 할머니는 물건을 파는 것보다 사람들을 만나는 것을 더 좋아하십니다. 그래서 손님이 물건을 사지 않아도 항상 웃으면서 차를 ( ㉠ ). 방학 때 할머니 가게에 가면 저도 마을 사람들과 친해집니다.",[
   ("t275",BLANK,["대접하십니다","파십니다","사십니다","버리십니다"],0,
    "Xarid qilmasa ham choy bilan <b>mehmon qiladi</b>: <b>차를 대접하다</b>. -시- — hurmat qo'shimchasi.",
    "Даже без покупки <b>угощает</b> чаем: <b>차를 대접하다</b>. -시- — суффикс вежливости.",
    "Even without a purchase she <b>treats</b> them to tea: <b>차를 대접하다</b>. -시- — honorific suffix."),
   ("t276",INFER,["할머니 가게에는 마을 사람들이 모입니다.","할머니는 도시에서 가게를 하십니다.","할머니는 물건을 파는 것만 좋아하십니다.","저는 방학 때 할머니 가게에 가지 않습니다."],0,
    "Do'konga <b>qishloq aholisi tez-tez kelib suhbatlashadi</b>. 시골 — qishloq, 마을 — qishloq jamoasi.",
    "В лавку <b>часто приходят соседи поговорить</b>. 시골 — деревня, 마을 — село.",
    "<b>Villagers often gather</b> at the shop to chat. 시골 — countryside, 마을 — village.")], slot="69"),
 # ===== [25~26] =====
 S("s37","T-L8","listen","audio","여자: 승객 여러분께 안내 말씀 드립니다. 이번 역은 서울역입니다. 내리실 문은 오른쪽입니다. 부산으로 가는 기차를 타실 손님은 이번 역에서 내리십시오. 잊으신 물건이 없는지 다시 한번 확인해 주십시오.",[
   ("t277",WHY,["내릴 역을 안내하려고","기차표를 팔려고","길을 물어보려고","물건을 찾으려고"],0,
    "Metroda e'lon: <b>bekat va chiqish eshigi haqida xabar</b>. 승객 — yo'lovchi, 내리다 — tushmoq.",
    "Объявление в метро: <b>сообщает станцию и выход</b>. 승객 — пассажир, 내리다 — выходить.",
    "A subway announcement: <b>it gives the station and exit side</b>. 승객 — passenger, 내리다 — to get off."),
   ("t278",SAME_L,["내리는 문은 오른쪽입니다.","이번 역은 부산역입니다.","부산에 가려면 다음 역에서 내려야 합니다.","손님들은 물건을 잃어버렸습니다."],0,
    "<b>내리실 문은 오른쪽입니다</b> — chiqish eshigi o'ng tomonda. Busanga borish uchun shu bekatda (Seul vokzali) tushiladi.",
    "<b>내리실 문은 오른쪽입니다</b> — выход справа. Для поезда в Пусан выходят здесь, на Сеульском вокзале.",
    "<b>내리실 문은 오른쪽입니다</b> — doors open on the right. For Busan trains, get off here at Seoul Station.")]),
 # ===== [27~28] =====
 S("s38","T-L9","listen","audio","남자: 수진 씨, 요즘 무슨 운동을 해요?\n여자: 저는 수영을 배우고 있어요. 일주일에 세 번 가요.\n남자: 수영은 어렵지 않아요?\n여자: 처음에는 무서웠는데 지금은 정말 재미있어요. 민수 씨도 같이 배울래요?",[
   ("t279",ABOUT2,["수영 배우기","수영장 위치","운동 시간","건강 검진"],0,
    "Butun suhbat ayolning <b>suzishni o'rganishi</b> haqida.",
    "Весь разговор о том, как женщина <b>учится плавать</b>.",
    "The whole conversation is about her <b>learning to swim</b>."),
   ("t280",SAME_L,["여자는 일주일에 세 번 수영을 합니다.","남자는 수영을 가르칩니다.","여자는 지금도 수영이 무섭습니다.","남자는 수영을 잘합니다."],0,
    "<b>일주일에 세 번</b> — haftasiga uch marta. Avval qo'rqqan, hozir qiziq. 무섭다 — qo'rqinchli.",
    "<b>일주일에 세 번</b> — три раза в неделю. Сначала было страшно, теперь интересно. 무섭다 — страшный.",
    "<b>일주일에 세 번</b> — three times a week. It was scary at first, now it's fun. 무섭다 — scary.")]),
 # ===== [29~30] =====
 S("s39","T-L10","listen","audio","여자: 민수 씨, 요즘 왜 이렇게 일찍 출근해요?\n남자: 회사 근처로 이사를 했거든요. 전에는 버스를 두 번 갈아타야 해서 한 시간이 넘게 걸렸어요.\n여자: 지금은 얼마나 걸려요?\n남자: 걸어서 10분이면 와요. 그래서 아침에 운동도 할 수 있어요.",[
   ("t281","남자가 일찍 출근하는 이유를 고르십시오.",["회사 근처로 이사를 해서","일이 많아서","버스를 놓쳐서","회사에서 아침 운동을 해서"],0,
    "<b>-거든요</b> — sabab tushuntirish: ishxona yaqiniga <b>ko'chib o'tgani uchun</b>.",
    "<b>-거든요</b> объясняет причину: он <b>переехал поближе к работе</b>.",
    "<b>-거든요</b> explains the reason: he <b>moved near the office</b>."),
   ("t282",SAME_L,["남자는 지금 걸어서 출근합니다.","남자는 지금도 버스를 두 번 탑니다.","여자는 회사 근처에 삽니다.","남자는 출근하는 데 한 시간이 걸립니다."],0,
    "<b>걸어서 10분</b> — piyoda 10 daqiqa. Avval ikki marta avtobus almashtirib, bir soatdan ko'p ketardi.",
    "<b>걸어서 10분</b> — 10 минут пешком. Раньше с двумя пересадками ехал больше часа.",
    "<b>걸어서 10분</b> — 10 minutes on foot. Before, two bus changes took over an hour.")]),
]}
