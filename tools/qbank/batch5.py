# 5-to'plam: TOPIK I ning yetishmagan turlari — [15~16], [22~24], [25~30] juftlar, [49~70] juftlar, [57~58]
L5 = ("다음 대화를 듣고 알맞은 그림을 고르십시오.", "Dialogni tinglang va mos rasmni tanlang.")
L7 = ("다음을 듣고 여자의 중심 생각을 고르십시오.", "Tinglang va ayolning asosiy fikrini tanlang.")
R7 = ("다음을 순서대로 맞게 나열한 것을 고르십시오.", "Gaplarni to'g'ri tartibda joylashtirilganini tanlang.")

def QT(i, sec, typ, ins, kind, content, opts, a, uz, ru, en):
    return (i, sec, ins[0], ins[1], kind, content, opts, a, uz, ru, en, typ)

PIC_NOTE_UZ = " Haqiqiy imtihonda variantlar chizilgan rasm bo'ladi."
PIC_NOTE_RU = " На реальном экзамене варианты — рисунки."
PIC_NOTE_EN = " In the real exam the options are drawings."

TOPIK = [
 # ---------- [15~16] 대화를 듣고 알맞은 그림 ----------
 QT("t141","listen","T-L5",L5,"audio","여자: 손님, 어떤 사이즈를 찾으세요?\n남자: 이 운동화 270으로 주세요.",["👟🛍️","🍜🥢","📚✏️","🚌🚏"],0,
   "<b>운동화</b> — krossovka, <b>사이즈</b> — o'lcham: poyabzal do'konida xarid."+PIC_NOTE_UZ,
   "<b>운동화</b> — кроссовки, <b>사이즈</b> — размер: покупка в обувном магазине."+PIC_NOTE_RU,
   "<b>운동화</b> — sneakers, <b>사이즈</b> — size: shopping at a shoe store."+PIC_NOTE_EN),
 QT("t142","listen","T-L5",L5,"audio","남자: 지금 뭐 해요?\n여자: 고향 친구한테 편지를 쓰고 있어요.",["✉️✍️","📞💬","🍳🥘","🧹🏠"],0,
   "<b>편지를 쓰고 있어요</b> — xat yozyapman. <b>-고 있다</b> — hozir davom etayotgan ish."+PIC_NOTE_UZ,
   "<b>편지를 쓰고 있어요</b> — пишу письмо. <b>-고 있다</b> — действие в процессе."+PIC_NOTE_RU,
   "<b>편지를 쓰고 있어요</b> — I'm writing a letter. <b>-고 있다</b> — an action in progress."+PIC_NOTE_EN),
 QT("t143","listen","T-L5",L5,"audio","여자: 비가 와요. 우산 있어요?\n남자: 네, 제 우산 같이 써요.",["☔👫","☀️😎","❄️⛄","🌙😴"],0,
   "Yomg'ir yog'yapti, bitta soyabonni birga tutishadi: <b>우산을 같이 쓰다</b>."+PIC_NOTE_UZ,
   "Идёт дождь, они идут под одним зонтом: <b>우산을 같이 쓰다</b>."+PIC_NOTE_RU,
   "It's raining and they share one umbrella: <b>우산을 같이 쓰다</b>."+PIC_NOTE_EN),
 QT("t144","listen","T-L5",L5,"audio","남자: 왜 그래요? 어디 아파요?\n여자: 넘어져서 다리를 다쳤어요.",["🦵🩹","🦷😖","🤒🌡️","👁️💧"],0,
   "<b>다리를 다쳤어요</b> — oyog'imni jarohatladim. 넘어지다 — yiqilmoq."+PIC_NOTE_UZ,
   "<b>다리를 다쳤어요</b> — повредила ногу. 넘어지다 — упасть."+PIC_NOTE_RU,
   "<b>다리를 다쳤어요</b> — I hurt my leg. 넘어지다 — to fall."+PIC_NOTE_EN),
 # ---------- [22~24] 여자의 중심 생각 ----------
 QT("t145","listen","T-L7",L7,"audio","남자: 수미 씨는 주말에 보통 뭐 해요?\n여자: 저는 주말에 꼭 운동을 해요. 평일에는 바빠서 운동을 못 하니까 주말에라도 해야 건강해질 수 있어요.",["주말에는 운동을 하는 것이 좋습니다.","평일에 운동을 해야 합니다.","주말에는 쉬어야 합니다.","운동은 혼자 하는 것이 좋습니다."],0,
   "Ayolning fikri: hafta ichida vaqt yo'q, shuning uchun <b>dam olish kunlari sport qilish kerak</b>. -아/어야 — ...sagina.",
   "Мысль женщины: в будни нет времени, поэтому <b>в выходные нужно заниматься спортом</b>. -아/어야 — только если.",
   "Her point: weekdays are too busy, so <b>you should exercise at the weekend</b>. -아/어야 — only if."),
 QT("t146","listen","T-L7",L7,"audio","남자: 이 옷 어때요? 싸서 두 벌이나 샀어요.\n여자: 싸다고 많이 사면 안 돼요. 꼭 필요한 옷만 사는 게 좋아요.",["필요한 옷만 사야 합니다.","싼 옷을 많이 사는 것이 좋습니다.","옷은 비싼 것이 좋습니다.","옷을 선물하고 싶습니다."],0,
   "Ayol: arzon deb ko'p olmaslik, <b>faqat kerakli kiyimni olish</b> kerak. 벌 — kiyim sanog'i.",
   "Женщина: нельзя покупать много только потому, что дёшево; <b>покупать только нужное</b>. 벌 — счётное слово для одежды.",
   "She says don't buy a lot just because it's cheap; <b>buy only what you need</b>. 벌 — counter for clothes."),
 QT("t147","listen","T-L7",L7,"audio","남자: 한국어 단어를 외우는 게 너무 어려워요.\n여자: 저는 단어를 외울 때 그 단어로 문장을 만들어 봐요. 그렇게 하면 오래 기억할 수 있어요.",["문장을 만들면서 단어를 외우는 것이 좋습니다.","단어는 외우지 않아도 됩니다.","한국어는 너무 어렵습니다.","단어를 하루에 많이 외워야 합니다."],0,
   "Ayol maslahati: <b>so'z bilan gap tuzib yodlash</b> — uzoq esda qoladi. 외우다 — yodlamoq, 기억하다 — eslab qolmoq.",
   "Совет женщины: <b>учить слова, составляя с ними предложения</b> — так дольше помнишь. 외우다 — заучивать.",
   "Her tip: <b>learn words by making sentences with them</b> — you'll remember longer. 외우다 — to memorise."),
 QT("t148","listen","T-L7",L7,"audio","여자: 민수 씨, 또 밤늦게까지 게임을 했어요?\n남자: 네, 조금만 하려고 했는데요.\n여자: 잠을 충분히 자야 다음 날 공부를 잘할 수 있어요. 일찍 자는 게 좋아요.",["일찍 자는 것이 좋습니다.","게임은 재미있습니다.","밤에 공부해야 합니다.","게임은 주말에만 해야 합니다."],0,
   "Ayolning asosiy fikri oxirida: <b>erta uxlash yaxshi</b>. 충분히 — yetarlicha.",
   "Главная мысль женщины — в конце: <b>лучше ложиться рано</b>. 충분히 — достаточно.",
   "Her main idea comes at the end: <b>it's better to go to bed early</b>. 충분히 — enough."),
 QT("t149","listen","T-L7",L7,"audio","남자: 이번 휴가에 어디 갈지 아직 못 정했어요.\n여자: 여행은 미리 계획하는 게 좋아요. 그래야 비행기 표도 싸게 살 수 있어요.",["여행 계획은 미리 세우는 것이 좋습니다.","비행기 표는 비쌉니다.","휴가에는 집에서 쉬어야 합니다.","여행은 혼자 가는 것이 좋습니다."],0,
   "Ayol: <b>sayohatni oldindan rejalashtirish</b> kerak. 미리 — oldindan, 정하다 — hal qilmoq.",
   "Женщина: <b>поездку лучше планировать заранее</b>. 미리 — заранее, 정하다 — решать.",
   "She says <b>plan trips in advance</b>. 미리 — in advance, 정하다 — to decide."),
 # ---------- [57~58] 순서대로 나열 ----------
 QT("t237","read","T-R7",R7,"text","(가) 그래서 오후에 우산을 사러 갔습니다.\n(나) 아침에 일어나니까 비가 많이 왔습니다.\n(다) 그런데 집에 우산이 없었습니다.\n(라) 가게에 우산이 많아서 마음에 드는 것을 골랐습니다.",["(나)-(다)-(가)-(라)","(나)-(가)-(다)-(라)","(다)-(나)-(가)-(라)","(다)-(가)-(나)-(라)"],0,
   "Birinchi gap mustaqil bo'lishi kerak: (나). <b>그런데</b> — ammo (다), <b>그래서</b> — shuning uchun (가), keyin (라).",
   "Первое предложение — самостоятельное: (나). <b>그런데</b> — однако (다), <b>그래서</b> — поэтому (가), затем (라).",
   "The first sentence must stand alone: (나). <b>그런데</b> — however (다), <b>그래서</b> — so (가), then (라)."),
 QT("t238","read","T-R7",R7,"text","(가) 저는 지난달에 한국에 왔습니다.\n(나) 그래서 요즘 한국 친구에게 한국어를 배웁니다.\n(다) 처음에는 한국어를 잘 몰라서 힘들었습니다.\n(라) 친구 덕분에 지금은 한국 생활이 즐겁습니다.",["(가)-(다)-(나)-(라)","(가)-(나)-(다)-(라)","(다)-(가)-(나)-(라)","(다)-(나)-(가)-(라)"],0,
   "Kelish (가) → qiyinchilik (다) → <b>그래서</b> o'rganish (나) → natija (라). 덕분에 — sharofati bilan.",
   "Приезд (가) → трудности (다) → <b>그래서</b> учёба (나) → результат (라). 덕분에 — благодаря.",
   "Arrival (가) → difficulty (다) → <b>그래서</b> studying (나) → result (라). 덕분에 — thanks to."),
 QT("t239","read","T-R7",R7,"text","(가) 그 후에는 일찍 일어나는 연습을 했습니다.\n(나) 저는 아침에 늦게 일어나서 자주 지각했습니다.\n(다) 지금은 매일 6시에 일어납니다.\n(라) 그래서 밤에 휴대폰을 보지 않고 일찍 잤습니다.",["(나)-(라)-(가)-(다)","(나)-(가)-(라)-(다)","(라)-(나)-(가)-(다)","(라)-(가)-(나)-(다)"],0,
   "Muammo (나) → <b>그래서</b> chora (라) → <b>그 후에</b> mashq (가) → <b>지금은</b> natija (다). 지각하다 — kechikmoq.",
   "Проблема (나) → <b>그래서</b> решение (라) → <b>그 후에</b> тренировка (가) → <b>지금은</b> результат (다). 지각하다 — опаздывать.",
   "Problem (나) → <b>그래서</b> fix (라) → <b>그 후에</b> practice (가) → <b>지금은</b> result (다). 지각하다 — to be late."),
 QT("t240","read","T-R7",R7,"text","(가) 이 식당은 음식이 맛있고 값도 쌉니다.\n(나) 우리 회사 앞에 새 식당이 생겼습니다.\n(다) 그래서 점심시간에는 사람이 많아서 기다려야 합니다.\n(라) 저는 내일 조금 일찍 가 보려고 합니다.",["(나)-(가)-(다)-(라)","(나)-(다)-(가)-(라)","(가)-(나)-(다)-(라)","(가)-(다)-(나)-(라)"],0,
   "Avval yangi restoran paydo bo'ladi (나), <b>이 식당</b> — o'sha restoran (가), sabab-natija (다), reja (라). 생기다 — paydo bo'lmoq.",
   "Сначала открывается ресторан (나), <b>이 식당</b> — этот ресторан (가), следствие (다), план (라). 생기다 — появиться.",
   "First a new restaurant opens (나), <b>이 식당</b> refers back to it (가), consequence (다), plan (라). 생기다 — to appear."),
]

def S(i, typ, sec, kind, content, qs): return {"id": i, "type": typ, "sec": sec, kind: content, "qs": qs}
WHY = "여자가 왜 이 이야기를 하고 있는지 고르십시오."
SAME_L = "들은 내용과 같은 것을 고르십시오."
ABOUT2 = "두 사람이 무엇에 대해 이야기하고 있는지 고르십시오."
BLANK = "㉠에 들어갈 알맞은 것을 고르십시오."
SAME_R = "이 글의 내용과 같은 것을 고르십시오."

SETS = {"topik": [
 # ---------- [25~26] ----------
 S("s01","T-L8","listen","audio","여자: 손님 여러분께 안내 말씀 드리겠습니다. 오늘 오후 3시부터 1층 식품 매장에서 과일을 30% 싸게 팝니다. 행사는 저녁 6시까지 합니다. 많이 이용해 주시기 바랍니다.",[
   ("t201",WHY,["행사를 안내하려고","과일을 사려고","매장을 찾으려고","시간을 물어보려고"],0,
    "<b>안내 말씀 드리겠습니다</b> — e'lon. Ayol chegirma aksiyasi haqida <b>xabar beryapti</b>. 행사 — tadbir, aksiya.",
    "<b>안내 말씀 드리겠습니다</b> — объявление. Женщина <b>сообщает</b> об акции. 행사 — мероприятие, акция.",
    "<b>안내 말씀 드리겠습니다</b> — an announcement. She is <b>announcing</b> a sale event. 행사 — event."),
   ("t202",SAME_L,["과일 행사는 1층에서 합니다.","행사는 오전에 시작합니다.","행사는 밤 9시까지 합니다.","모든 물건을 싸게 팝니다."],0,
    "<b>1층 식품 매장</b> — 1-qavatdagi oziq-ovqat bo'limi. Aksiya 15:00–18:00, faqat mevalarga.",
    "<b>1층 식품 매장</b> — продуктовый отдел на 1 этаже. Акция 15:00–18:00, только на фрукты.",
    "<b>1층 식품 매장</b> — the food section on the 1st floor. The sale runs 3–6 p.m., fruit only.")]),
 S("s02","T-L8","listen","audio","여자: 학생 여러분, 다음 주 금요일에 학교 축제가 있습니다. 축제 날에는 수업이 없습니다. 오전 10시까지 운동장으로 오십시오. 점심은 학교에서 줍니다. 그리고 편한 옷을 입고 오십시오.",[
   ("t203",WHY,["축제를 안내하려고","운동을 가르치려고","옷을 팔려고","점심을 만들려고"],0,
    "O'qituvchi talabalarga <b>bayram (festival) haqida ma'lumot beryapti</b>. 축제 — festival, 운동장 — stadion, maydon.",
    "Учитель <b>информирует о школьном фестивале</b>. 축제 — фестиваль, 운동장 — спортплощадка.",
    "She is <b>giving information about the school festival</b>. 축제 — festival, 운동장 — sports field."),
   ("t204",SAME_L,["축제 날에는 수업을 하지 않습니다.","학생들은 점심을 가지고 와야 합니다.","축제는 다음 주 월요일입니다.","오후에 운동장으로 가야 합니다."],0,
    "<b>수업이 없습니다</b> — dars yo'q. Tushlikni maktab beradi, festival juma kuni, ertalab 10 gacha kelish kerak.",
    "<b>수업이 없습니다</b> — занятий нет. Обед даёт школа, фестиваль в пятницу, прийти к 10 утра.",
    "<b>수업이 없습니다</b> — no classes. The school provides lunch, it's on Friday, arrive by 10 a.m.")]),
 # ---------- [27~28] ----------
 S("s03","T-L9","listen","audio","남자: 수지 씨, 이번 방학에 뭐 할 거예요?\n여자: 저는 제주도에 여행을 가려고 해요. 민수 씨는요?\n남자: 저는 아르바이트를 할 거예요. 돈을 모아서 다음 방학에 여행을 가고 싶어요.\n여자: 그래요? 그럼 다음에는 같이 가요.",[
   ("t205",ABOUT2,["방학 계획","아르바이트 장소","제주도 날씨","여행 비용"],0,
    "Ikkalasi <b>ta'tilda nima qilishini</b> gaplashyapti: <b>방학 계획</b> — ta'til rejasi.",
    "Оба говорят о том, <b>что будут делать на каникулах</b>: <b>방학 계획</b> — планы на каникулы.",
    "They're talking about <b>what they'll do during the break</b>: <b>방학 계획</b> — vacation plans."),
   ("t206",SAME_L,["남자는 방학에 일을 할 겁니다.","여자는 아르바이트를 합니다.","남자는 이번 방학에 제주도에 갑니다.","두 사람은 이번 방학에 같이 여행을 갑니다."],0,
    "Erkak <b>아르바이트</b> qiladi, pul yig'ib keyingi ta'tilda sayohat qilmoqchi. 모으다 — yig'moq.",
    "Мужчина будет <b>подрабатывать</b> и копить на поездку в следующие каникулы. 모으다 — копить.",
    "The man will <b>work part-time</b> and save for a trip next break. 모으다 — to save up.")]),
 S("s04","T-L9","listen","audio","여자: 민호 씨, 이사할 집은 찾았어요?\n남자: 아직요. 학교 근처는 너무 비싸요.\n여자: 지하철역 근처는 어때요? 학교까지 지하철로 15분이면 가요.\n남자: 좋아요. 이번 주말에 한번 가 볼게요.",[
   ("t207",ABOUT2,["이사할 집","학교 수업","지하철 요금","주말 약속"],0,
    "Gap <b>ko'chib o'tiladigan uy</b> haqida: qayerdan uy topish. 이사하다 — ko'chmoq.",
    "Речь о <b>квартире для переезда</b>: где её найти. 이사하다 — переезжать.",
    "They're discussing <b>a place to move to</b>. 이사하다 — to move house."),
   ("t208",SAME_L,["남자는 아직 집을 못 찾았습니다.","학교 근처 집은 쌉니다.","여자는 지하철역 근처에 삽니다.","남자는 오늘 집을 보러 갑니다."],0,
    "<b>아직요</b> — hali yo'q: uy topilmagan. Maktab yaqinidagi uylar qimmat, erkak dam olish kuni boradi.",
    "<b>아직요</b> — ещё нет: жильё не найдено. Возле школы дорого, мужчина поедет в выходные.",
    "<b>아직요</b> — not yet: he hasn't found a place. Near school is expensive; he'll go at the weekend.")]),
 # ---------- [29~30] ----------
 S("s05","T-L10","listen","audio","여자: 선생님, 왜 한국어 선생님이 되셨어요?\n남자: 대학교 때 외국 친구들에게 한국어를 가르쳐 줬어요. 친구들이 한국어를 잘하게 되니까 정말 기뻤어요. 그래서 한국어 선생님이 되고 싶었어요.\n여자: 지금도 그때처럼 즐거우세요?\n남자: 네, 학생들을 만나는 게 제일 즐거워요.",[
   ("t209","남자가 한국어 선생님이 된 이유를 고르십시오.",["외국 친구들을 가르치는 것이 기뻐서","외국에서 살고 싶어서","대학교에서 공부를 잘해서","돈을 많이 벌고 싶어서"],0,
    "Do'stlari koreys tilini o'rganganda <b>xursand bo'lgani uchun</b> o'qituvchi bo'lgan. <b>그래서</b> — sababni ko'rsatadi.",
    "Он стал учителем, потому что <b>радовался успехам друзей</b>. <b>그래서</b> указывает на причину.",
    "He became a teacher because <b>teaching his friends made him happy</b>. <b>그래서</b> signals the reason."),
   ("t210",SAME_L,["남자는 대학교 때 한국어를 가르쳤습니다.","남자는 지금 학생입니다.","남자는 가르치는 일이 힘듭니다.","여자는 한국어 선생님입니다."],0,
    "<b>대학교 때</b> — universitetda o'qiganda, chet ellik do'stlariga dars bergan. Hozir ham ishidan xursand.",
    "<b>대학교 때</b> — во время учёбы в университете учил иностранных друзей. Сейчас ему тоже нравится.",
    "<b>대학교 때</b> — back in university he taught foreign friends. He still enjoys it now.")]),
 S("s06","T-L10","listen","audio","남자: 어서 오세요. 무엇을 도와 드릴까요?\n여자: 어제 여기에서 이 시계를 샀는데요. 다른 색으로 바꾸고 싶어요.\n남자: 왜 바꾸려고 하세요?\n여자: 동생 선물인데 동생이 검은색을 더 좋아해서요. 영수증도 가지고 왔어요.",[
   ("t211","여자가 시계를 바꾸려고 하는 이유를 고르십시오.",["동생이 검은색을 더 좋아해서","시계가 고장 나서","시계가 너무 비싸서","영수증을 잃어버려서"],0,
    "<b>-아/어서요</b> — sabab: singlisi <b>qora rangni ko'proq yoqtirgani uchun</b>. 바꾸다 — almashtirmoq.",
    "<b>-아/어서요</b> — причина: младшая сестра <b>больше любит чёрный</b>. 바꾸다 — менять.",
    "<b>-아/어서요</b> gives the reason: her sibling <b>prefers black</b>. 바꾸다 — to exchange."),
   ("t212",SAME_L,["여자는 영수증을 가지고 왔습니다.","여자는 오늘 시계를 샀습니다.","시계는 여자의 선물입니다.","여자는 돈을 돌려받고 싶어 합니다."],0,
    "<b>영수증도 가지고 왔어요</b> — chekni ham olib keldim. Soat kecha olingan, singlisiga sovg'a.",
    "<b>영수증도 가지고 왔어요</b> — чек тоже принесла. Часы куплены вчера, это подарок сестре.",
    "<b>영수증도 가지고 왔어요</b> — she brought the receipt. The watch was bought yesterday as a gift for her sibling.")]),
 # ---------- [49~70] o'qish juftlari ----------
 S("s07","T-R6","read","text","저는 매주 토요일에 동네 도서관에서 아이들에게 책을 읽어 줍니다. 처음에는 아이들이 조용히 앉아 있지 않아서 힘들었습니다. 하지만 재미있는 책을 골라서 읽어 주니까 아이들이 ( ㉠ ) 들었습니다. 요즘은 아이들이 토요일을 기다립니다.",[
   ("t213",BLANK,["재미있게","시끄럽게","늦게","조금"],0,
    "Qiziq kitob tanlagani uchun bolalar <b>qiziqib</b> tinglagan: <b>재미있게</b>. -게 — ravish yasaydi.",
    "Выбрал интересные книги — дети слушали <b>с интересом</b>: <b>재미있게</b>. -게 образует наречие.",
    "Interesting books made the children listen <b>with interest</b>: <b>재미있게</b>. -게 forms an adverb."),
   ("t214",SAME_R,["저는 토요일마다 도서관에 갑니다.","아이들은 처음부터 조용했습니다.","저는 아이들에게 그림을 가르칩니다.","아이들은 토요일을 싫어합니다."],0,
    "<b>매주 토요일</b> = 토요일마다 — har shanba. Avvaliga bolalar tinch o'tirmagan.",
    "<b>매주 토요일</b> = 토요일마다 — каждую субботу. Сначала дети не сидели тихо.",
    "<b>매주 토요일</b> = 토요일마다 — every Saturday. At first the children weren't quiet.")]),
 S("s08","T-R6","read","text","한국에서는 이사를 한 후에 이웃에게 떡을 나누어 줍니다. 떡을 주면서 인사를 하면 이웃과 ( ㉠ ) 지낼 수 있습니다. 요즘은 떡 대신 작은 선물을 주는 사람도 있습니다.",[
   ("t215",BLANK,["친하게","바쁘게","조용하게","늦게"],0,
    "Salomlashib tteok bersangiz, qo'shnilar bilan <b>do'stona</b> yashaysiz: <b>친하게 지내다</b>.",
    "Угостив соседей ттоком, можно <b>дружно</b> жить с ними: <b>친하게 지내다</b>.",
    "Sharing rice cakes helps you <b>get along well</b> with neighbours: <b>친하게 지내다</b>."),
   ("t216","무엇에 대한 이야기인지 맞는 것을 고르십시오.",["이사 후에 떡을 주는 이유","떡을 만드는 방법","이사하는 날짜","이웃이 많은 이유"],0,
    "Matn <b>ko'chgandan keyin qo'shnilarga tteok berish odati</b> va uning maqsadi haqida.",
    "Текст об <b>обычае угощать соседей ттоком после переезда</b> и его смысле.",
    "The text is about <b>the custom of giving rice cakes after moving</b> and why."),]),
 S("s09","T-R6","read","text","저는 한국 회사에서 일한 지 1년이 되었습니다. 처음에는 한국어를 잘 못해서 실수를 많이 했습니다. 그래서 퇴근 후에 매일 한 시간씩 한국어를 공부했습니다. 지금은 회의에서 제 생각을 한국어로 ( ㉠ ) 수 있습니다.",[
   ("t217",BLANK,["말할","말한","말하는","말해서"],0,
    "<b>-(으)ㄹ 수 있다</b> — «...a olaman»: <b>말할 수 있습니다</b>. Boshqa shakllar 수 bilan birikmaydi.",
    "<b>-(으)ㄹ 수 있다</b> — «могу»: <b>말할 수 있습니다</b>. Другие формы с 수 не сочетаются.",
    "<b>-(으)ㄹ 수 있다</b> — \"can\": <b>말할 수 있습니다</b>. The other forms don't combine with 수."),
   ("t218",SAME_R,["저는 퇴근 후에 한국어를 공부했습니다.","저는 한국 회사에서 3년 일했습니다.","저는 처음부터 한국어를 잘했습니다.","저는 회의에서 말을 하지 않습니다."],0,
    "<b>퇴근 후에 매일 한 시간씩</b> — ishdan keyin har kuni bir soatdan o'qigan. 1 yil ishlagan.",
    "<b>퇴근 후에 매일 한 시간씩</b> — после работы по часу каждый день. Работает 1 год.",
    "<b>퇴근 후에 매일 한 시간씩</b> — an hour every day after work. He has worked there 1 year.")]),
 S("s10","T-R6","read","text","요즘 자전거를 타고 출근하는 사람이 많아졌습니다. 자전거를 타면 운동도 되고 교통비도 들지 않습니다. ( ㉠ ) 비가 오는 날에는 자전거를 타기 어렵습니다. 그래서 날씨가 나쁜 날에는 버스나 지하철을 이용합니다.",[
   ("t219","( ㉠ )에 들어갈 알맞은 말을 고르십시오.",["그리고","그래서","하지만","그러면"],2,
    "Avval afzalliklar, keyin kamchilik: qarama-qarshi bog'lovchi <b>하지만</b> — lekin.",
    "Сначала плюсы, затем минус: нужен союз противопоставления <b>하지만</b> — но.",
    "Advantages first, then a drawback: the contrast word <b>하지만</b> — but."),
   ("t220",SAME_R,["자전거를 타면 교통비가 들지 않습니다.","비가 와도 자전거를 탑니다.","자전거로 출근하는 사람이 줄었습니다.","자전거를 타는 것은 운동이 안 됩니다."],0,
    "<b>교통비가 들지 않다</b> — yo'l haqi ketmaydi. Velosipedda ishga boruvchilar ko'paygan.",
    "<b>교통비가 들지 않다</b> — не тратишься на проезд. Велосипедистов стало больше.",
    "<b>교통비가 들지 않다</b> — no transport costs. More people now cycle to work.")]),
 S("s11","T-R6","read","text","저는 지난 주말에 처음으로 한국 친구 집에 초대를 받았습니다. ( ㉠ ) 그래서 우즈베키스탄 음식인 플로브를 만들어 갔습니다. ( ㉡ ) 친구 가족들은 플로브가 아주 맛있다고 했습니다. ( ㉢ ) 친구 어머니께서도 불고기를 만들어 주셨습니다. ( ㉣ )",[
   ("t221","다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n무엇을 가지고 가면 좋을지 고민했습니다.",["㉠","㉡","㉢","㉣"],0,
    "«Nima olib borsam ekan, deb o'yladim» → <b>그래서</b> palov qildim. Demak gap ㉠ ga tushadi. 고민하다 — o'ylanib qolmoq.",
    "«Думал, что бы принести» → <b>그래서</b> приготовил плов. Значит, место — ㉠. 고민하다 — раздумывать.",
    "\"I wondered what to bring\" → <b>그래서</b> I made plov. So it goes in ㉠. 고민하다 — to agonise over."),
   ("t222",SAME_R,["저는 친구 집에 처음 갔습니다.","친구가 플로브를 만들었습니다.","친구 가족들은 플로브를 싫어했습니다.","저는 불고기를 만들어 갔습니다."],0,
    "<b>처음으로 초대를 받았습니다</b> — birinchi marta taklif qilindim. Palovni men qildim, 불고기 ni do'stning onasi.",
    "<b>처음으로 초대를 받았습니다</b> — меня впервые пригласили. Плов сделал я, 불고기 — мама друга.",
    "<b>처음으로 초대를 받았습니다</b> — invited for the first time. I made plov; the friend's mother made 불고기.")]),
 S("s12","T-R6","read","text","우리 회사 1층에는 작은 카페가 있습니다. 이 카페에서는 회사 근처 대학교 학생들이 아르바이트를 합니다. 커피 값이 다른 카페보다 싸고 맛도 좋아서 직원들이 자주 ( ㉠ ). 저도 점심을 먹은 후에 동료들과 이 카페에 갑니다.",[
   ("t223",BLANK,["이용합니다","만듭니다","청소합니다","배웁니다"],0,
    "Arzon va mazali, shuning uchun xodimlar tez-tez <b>foydalanadi</b>: <b>이용하다</b>.",
    "Дёшево и вкусно, поэтому сотрудники часто <b>пользуются</b> кафе: <b>이용하다</b>.",
    "Cheap and tasty, so staff often <b>use</b> it: <b>이용하다</b>."),
   ("t224",SAME_R,["카페는 회사 1층에 있습니다.","카페 커피는 비쌉니다.","저는 아침에 카페에 갑니다.","카페에서 회사 직원들이 일합니다."],0,
    "<b>1층</b> — birinchi qavat. Kafeda talabalar ishlaydi, men tushlikdan keyin boraman.",
    "<b>1층</b> — первый этаж. В кафе подрабатывают студенты, я хожу после обеда.",
    "<b>1층</b> — the first floor. Students work there; I go after lunch.")]),
 S("s13","T-R6","read","text","받는 사람: 한국어반 학생들\n제목: 수업 장소 변경 안내\n\n학생 여러분, 안녕하세요.\n다음 주 월요일부터 한국어 수업 장소가 바뀝니다. 지금은 2층 201호에서 공부하지만 다음 주부터는 3층 305호에서 공부합니다. 수업 시간은 바뀌지 않습니다. 잘 기억해 주세요.\n\n한국어반 선생님 김지영",[
   ("t225","왜 윗글을 썼는지 맞는 것을 고르십시오.",["수업 장소가 바뀐 것을 알려 주려고","수업 시간을 바꾸려고","새 학생을 소개하려고","교실 청소를 부탁하려고"],0,
    "Mavzu: <b>수업 장소 변경 안내</b> — dars joyi o'zgargani haqida xabar. Maqsad — ma'lum qilish.",
    "Тема: <b>수업 장소 변경 안내</b> — смена места занятий. Цель — сообщить.",
    "Subject: <b>수업 장소 변경 안내</b> — change of class location. The purpose is to inform."),
   ("t226",SAME_R,["다음 주부터 3층에서 수업을 합니다.","수업 시간이 바뀝니다.","지금은 3층에서 공부합니다.","다음 주 월요일에는 수업이 없습니다."],0,
    "Hozir 2-qavat, <b>keyingi haftadan 3-qavat 305-xona</b>. Vaqt o'zgarmaydi.",
    "Сейчас 2 этаж, <b>со следующей недели — 3 этаж, кабинет 305</b>. Время прежнее.",
    "Now on the 2nd floor; <b>from next week, room 305 on the 3rd</b>. The time stays the same.")]),
 S("s14","T-R6","read","text","김치는 한국 사람들이 가장 많이 먹는 음식입니다. 옛날에는 겨울에 채소를 구하기 어려워서 가을에 김치를 많이 만들어 두었습니다. 이것을 '김장'이라고 합니다. 김장을 할 때는 가족과 이웃이 함께 모여서 김치를 ( ㉠ ). 요즘은 김치를 사서 먹는 사람도 많아졌습니다.",[
   ("t227",BLANK,["담급니다","팝니다","버립니다","기다립니다"],0,
    "Kimchi tayyorlash maxsus fe'l bilan aytiladi: <b>김치를 담그다</b> (tuzlab tayyorlamoq).",
    "Для кимчи есть особый глагол: <b>김치를 담그다</b> (заквашивать, готовить).",
    "Kimchi has its own verb: <b>김치를 담그다</b> (to make, pickle)."),
   ("t228",SAME_R,["김장은 가을에 하는 일입니다.","옛날에는 겨울에 채소가 많았습니다.","김장은 혼자 합니다.","요즘은 아무도 김치를 사지 않습니다."],0,
    "<b>가을에 김치를 많이 만들어 두었습니다</b> — kuzda ko'p kimchi tayyorlab qo'yilgan: bu <b>김장</b>.",
    "<b>가을에 김치를 많이 만들어 두었습니다</b> — осенью готовили много кимчи впрок: это <b>김장</b>.",
    "<b>가을에 김치를 많이 만들어 두었습니다</b> — lots of kimchi was made in autumn: that's <b>김장</b>.")]),
 S("s15","T-R6","read","text","사람들은 보통 화가 나면 큰 소리로 말합니다. 그런데 화가 났을 때 큰 소리로 말하면 문제가 더 커질 수 있습니다. 화가 날 때는 먼저 깊게 숨을 쉬고 ( ㉠ ) 말하는 것이 좋습니다. 그러면 상대방도 내 이야기를 잘 들어 줍니다.",[
   ("t229",BLANK,["천천히","빨리","크게","많이"],0,
    "Baland gapirish yomon, demak <b>sekin, xotirjam</b> gapirish kerak: <b>천천히</b>.",
    "Громко говорить плохо, значит говорить нужно <b>медленно, спокойно</b>: <b>천천히</b>.",
    "Speaking loudly is bad, so speak <b>slowly and calmly</b>: <b>천천히</b>."),
   ("t230",SAME_R,["화가 났을 때 큰 소리로 말하면 문제가 커질 수 있습니다.","화가 나면 말을 하지 않아야 합니다.","큰 소리로 말하면 상대방이 잘 들어 줍니다.","사람들은 화가 나면 조용히 말합니다."],0,
    "<b>문제가 더 커질 수 있습니다</b> — muammo kattalashishi mumkin. 화가 나다 — jahli chiqmoq, 숨을 쉬다 — nafas olmoq.",
    "<b>문제가 더 커질 수 있습니다</b> — проблема может вырасти. 화가 나다 — злиться, 숨을 쉬다 — дышать.",
    "<b>문제가 더 커질 수 있습니다</b> — the problem can get bigger. 화가 나다 — to get angry, 숨을 쉬다 — to breathe.")]),
 S("s16","T-R6","read","text","저는 어렸을 때부터 사진 찍는 것을 좋아했습니다. 그래서 대학교에서 사진을 공부했습니다. 졸업 후에는 신문사에서 사진 기자로 일했습니다. 하지만 바쁜 기자 생활 때문에 제가 ( ㉠ ) 사진을 찍을 시간이 없었습니다. 그래서 작년에 회사를 그만두고 작은 사진관을 열었습니다. 지금은 손님들의 웃는 얼굴을 찍으면서 행복하게 지냅니다.",[
   ("t231",BLANK,["찍고 싶은","찍은","찍는","찍어서"],0,
    "«O'zim <b>suratga olmoqchi bo'lgan</b> rasmlarga vaqt yo'q edi»: <b>-고 싶은</b> + ot.",
    "«Не было времени снимать то, что <b>хотелось снимать</b>»: <b>-고 싶은</b> + сущ.",
    "\"No time to take the photos <b>I wanted to take</b>\": <b>-고 싶은</b> + noun."),
   ("t232","이 글의 내용으로 알 수 있는 것을 고르십시오.",["저는 지금 사진관을 하고 있습니다.","저는 대학교에서 신문을 공부했습니다.","저는 지금도 신문사에서 일합니다.","저는 사진 찍는 것을 싫어합니다."],0,
    "<b>작은 사진관을 열었습니다</b> — kichik fotostudiya ochdi; hozir o'sha yerda ishlaydi.",
    "<b>작은 사진관을 열었습니다</b> — открыл маленькую фотостудию и сейчас работает там.",
    "<b>작은 사진관을 열었습니다</b> — he opened a small photo studio and works there now.")]),
 S("s17","T-R6","read","text","우리 반에는 여러 나라에서 온 학생들이 있습니다. 쉬는 시간에는 서로 자기 나라 말을 가르쳐 줍니다. 저는 친구들에게 우즈베크어로 '안녕하세요'를 가르쳐 주었습니다. 다른 나라 말을 배우는 것은 ( ㉠ ) 재미있습니다.",[
   ("t233",BLANK,["어렵지만","어려워서","어려우면","어렵거나"],0,
    "Qiyin, <b>lekin</b> qiziq: <b>-지만</b>. -아서 — sabab, -면 — shart, -거나 — yoki.",
    "Трудно, <b>но</b> интересно: <b>-지만</b>. -아서 — причина, -면 — условие, -거나 — или.",
    "Hard <b>but</b> fun: <b>-지만</b>. -아서 — reason, -면 — condition, -거나 — or."),
   ("t234",SAME_R,["친구들은 쉬는 시간에 자기 나라 말을 가르쳐 줍니다.","우리 반 학생들은 모두 한국 사람입니다.","저는 친구에게 영어를 배웠습니다.","저는 다른 나라 말을 배우는 것이 싫습니다."],0,
    "<b>쉬는 시간</b> — tanaffus: o'quvchilar bir-biriga o'z tilini o'rgatadi.",
    "<b>쉬는 시간</b> — перемена: ученики учат друг друга своим языкам.",
    "<b>쉬는 시간</b> — break time: classmates teach each other their languages.")]),
 S("s18","T-R6","read","text","저는 매일 아침 커피를 마십니다. 커피를 마시면 잠이 깨고 기분도 좋아집니다. ( ㉠ ) 저녁에 커피를 마시면 잠을 잘 못 잡니다. 그래서 오후 3시 이후에는 커피 대신 차를 마십니다.",[
   ("t235","( ㉠ )에 들어갈 알맞은 말을 고르십시오.",["그런데","그래서","그리고","그러니까"],0,
    "Yaxshi tomondan keyin muammo — <b>그런데</b> (biroq). 그래서/그러니까 — shuning uchun.",
    "После плюса — проблема: <b>그런데</b> (однако). 그래서/그러니까 — поэтому.",
    "A drawback after a benefit: <b>그런데</b> (however). 그래서/그러니까 — so."),
   ("t236",SAME_R,["저는 오후 3시 이후에는 차를 마십니다.","저는 저녁에 커피를 마십니다.","커피를 마시면 기분이 나빠집니다.","저는 아침에 차를 마십니다."],0,
    "<b>커피 대신 차</b> — kofe o'rniga choy, soat 15:00 dan keyin. 대신 — o'rniga.",
    "<b>커피 대신 차</b> — чай вместо кофе после 15:00. 대신 — вместо.",
    "<b>커피 대신 차</b> — tea instead of coffee after 3 p.m. 대신 — instead of.")]),
]}
