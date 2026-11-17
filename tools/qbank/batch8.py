# 8-to'plam: EPS-TOPIK ning yangi turlari — rasm+gap, ma'nodosh, zid ma'no, rasm+tinglash, uzun hikoya
R1S = ("그림을 보고 알맞은 문장을 고르십시오.", "Rasmga qarang va mos gapni tanlang.")
R9 = ("밑줄 친 부분과 의미가 같은 것을 고르십시오.", "Tagiga chizilgan so'z bilan ma'nodosh variantni tanlang.")
R10 = ("밑줄 친 부분과 의미가 반대인 것을 고르십시오.", "Tagiga chizilgan so'zga zid ma'noli variantni tanlang.")
L6 = ("그림을 보고 알맞은 대답을 고르십시오.", "Rasmga qarang, variantlarni tinglang va mosini tanlang.")
L7 = ("다음 이야기를 듣고 질문에 알맞은 대답을 고르십시오.", "Hikoyani tinglang va savolga mos javobni tanlang.")
def QT(i, sec, typ, ins, kind, content, opts, a, uz, ru, en):
    return (i, sec, ins[0], ins[1], kind, content, opts, a, uz, ru, en, typ)
def QA(i, ask, content, opts, a, uz, ru, en):
    # E-L7: savolning o'zi inst da saqlanadi (ekranda ko'rsatiladi)
    return (i, "listen", ask, L7[1], "audio", content, opts, a, uz, ru, en, "E-L7")
GO = " <b>-고 있다</b> — hozir davom etayotgan ish."
GR = " <b>-고 있다</b> — действие в процессе."
GE = " <b>-고 있다</b> — an action in progress."

EPS = [
 # ---------- Rasm + gap ----------
 QT("e187","read","E-R1S",R1S,"pic","🏃",["뛰고 있습니다.","자고 있습니다.","먹고 있습니다.","앉아 있습니다."],0,"<b>뛰다</b> — yugurmoq."+GO,"<b>뛰다</b> — бегать."+GR,"<b>뛰다</b> — to run."+GE),
 QT("e188","read","E-R1S",R1S,"pic","🧑‍🍳",["요리를 하고 있습니다.","운전을 하고 있습니다.","청소를 하고 있습니다.","노래를 하고 있습니다."],0,"<b>요리를 하다</b> — ovqat pishirmoq."+GO,"<b>요리를 하다</b> — готовить еду."+GR,"<b>요리를 하다</b> — to cook."+GE),
 QT("e189","read","E-R1S",R1S,"pic","🚿",["샤워를 하고 있습니다.","밥을 먹고 있습니다.","책을 읽고 있습니다.","전화를 하고 있습니다."],0,"<b>샤워를 하다</b> — dush qabul qilmoq."+GO,"<b>샤워를 하다</b> — принимать душ."+GR,"<b>샤워를 하다</b> — to take a shower."+GE),
 QT("e190","read","E-R1S",R1S,"pic","🛌",["침대에서 자고 있습니다.","의자에 앉아 있습니다.","버스를 기다리고 있습니다.","공원에서 걷고 있습니다."],0,"<b>침대</b> — karavot, <b>자다</b> — uxlamoq."+GO,"<b>침대</b> — кровать, <b>자다</b> — спать."+GR,"<b>침대</b> — bed, <b>자다</b> — to sleep."+GE),
 QT("e191","read","E-R1S",R1S,"pic","🚴",["자전거를 타고 있습니다.","버스를 타고 있습니다.","수영을 하고 있습니다.","등산을 하고 있습니다."],0,"<b>자전거를 타다</b> — velosiped haydamoq. 타다 — minmoq."+GO,"<b>자전거를 타다</b> — кататься на велосипеде. 타다 — ехать на."+GR,"<b>자전거를 타다</b> — to ride a bike. 타다 — to ride."+GE),
 QT("e192","read","E-R1S",R1S,"pic","🧑‍🔧",["기계를 고치고 있습니다.","옷을 사고 있습니다.","편지를 쓰고 있습니다.","음식을 팔고 있습니다."],0,"<b>고치다</b> — tuzatmoq, ta'mirlamoq. 기계 — mashina, uskuna."+GO,"<b>고치다</b> — чинить. 기계 — станок, механизм."+GR,"<b>고치다</b> — to repair. 기계 — machine."+GE),
 QT("e193","read","E-R1S",R1S,"pic","🌧️",["비가 오고 있습니다.","눈이 오고 있습니다.","날씨가 맑습니다.","바람이 불지 않습니다."],0,"<b>비가 오다</b> — yomg'ir yog'moq. 눈이 오다 — qor yog'moq, 맑다 — ochiq.","<b>비가 오다</b> — идёт дождь. 눈이 오다 — идёт снег, 맑다 — ясно.","<b>비가 오다</b> — it rains. 눈이 오다 — it snows, 맑다 — clear."),
 QT("e194","read","E-R1S",R1S,"pic","📦🚚",["상자를 트럭에 싣고 있습니다.","상자를 열고 있습니다.","트럭을 닦고 있습니다.","트럭을 고치고 있습니다."],0,"<b>싣다</b> — yuklamoq (ㄷ noto'g'ri fe'l: 실어요). 상자 — quti."+GO,"<b>싣다</b> — грузить (неправ. на ㄷ: 실어요). 상자 — коробка."+GR,"<b>싣다</b> — to load (ㄷ-irregular: 실어요). 상자 — box."+GE),
 # ---------- Ma'nodosh ----------
 QT("e195","read","E-R9",R9,"text","저는 [[매일]] 아침에 운동을 합니다.",["날마다","가끔","주말마다","아까"],0,"<b>매일</b> = <b>날마다</b> — har kuni. 가끔 — ba'zan.","<b>매일</b> = <b>날마다</b> — каждый день. 가끔 — иногда.","<b>매일</b> = <b>날마다</b> — every day. 가끔 — sometimes."),
 QT("e196","read","E-R9",R9,"text","이 일은 [[아주]] 어렵습니다.",["매우","조금","별로","아직"],0,"<b>아주</b> = <b>매우</b> — juda. 별로 — unchalik (inkor bilan).","<b>아주</b> = <b>매우</b> — очень. 별로 — не очень (с отрицанием).","<b>아주</b> = <b>매우</b> — very. 별로 — not very (with a negative)."),
 QT("e197","read","E-R9",R9,"text","회의가 [[곧]] 시작됩니다.",["금방","어제","천천히","벌써"],0,"<b>곧</b> = <b>금방</b> — tez orada, hozir. 벌써 — allaqachon.","<b>곧</b> = <b>금방</b> — скоро, сейчас. 벌써 — уже.","<b>곧</b> = <b>금방</b> — soon, any moment. 벌써 — already."),
 QT("e198","read","E-R9",R9,"text","주말에는 [[보통]] 집에서 쉽니다.",["주로","전혀","아까","겨우"],0,"<b>보통</b> = <b>주로</b> — odatda, asosan. 전혀 — umuman (inkor bilan).","<b>보통</b> = <b>주로</b> — обычно, в основном. 전혀 — совсем (с отрицанием).","<b>보통</b> = <b>주로</b> — usually, mostly. 전혀 — not at all (with a negative)."),
 QT("e199","read","E-R9",R9,"text","오늘 일이 [[다]] 끝났습니다.",["모두","조금","아직","별로"],0,"<b>다</b> = <b>모두</b> — hammasi, to'liq.","<b>다</b> = <b>모두</b> — всё, полностью.","<b>다</b> = <b>모두</b> — all, completely."),
 QT("e200","read","E-R9",R9,"text","반장님이 [[빨리]] 오라고 했습니다.",["어서","천천히","늦게","나중에"],0,"<b>빨리</b> = <b>어서</b> — tezroq. -(으)라고 하다 — «...gin» dedi (buyruqni ko'chirish).","<b>빨리</b> = <b>어서</b> — скорее. -(으)라고 하다 — велел (передача приказа).","<b>빨리</b> = <b>어서</b> — quickly. -(으)라고 하다 — told someone to (reported command)."),
 QT("e201","read","E-R9",R9,"text","[[아까]] 사장님이 찾으셨어요.",["조금 전에","나중에","내일","다음 주에"],0,"<b>아까</b> = <b>조금 전에</b> — hozirgina, birozdan oldin.","<b>아까</b> = <b>조금 전에</b> — только что, недавно.","<b>아까</b> = <b>조금 전에</b> — a little while ago."),
 QT("e202","read","E-R9",R9,"text","이 식당은 음식 값이 [[싸요]].",["저렴해요","비싸요","맛있어요","많아요"],0,"<b>싸다</b> = <b>저렴하다</b> — arzon. 비싸다 — qimmat (zid ma'no).","<b>싸다</b> = <b>저렴하다</b> — дешёвый. 비싸다 — дорогой (антоним).","<b>싸다</b> = <b>저렴하다</b> — cheap. 비싸다 — expensive (opposite)."),
 QT("e203","read","E-R9",R9,"text","저는 요즘 한국어를 [[배우고]] 있습니다.",["공부하고","가르치고","잊어버리고","말하고"],0,"<b>배우다</b> ≈ <b>공부하다</b> — o'rganmoq. 가르치다 — o'rgatmoq (zid).","<b>배우다</b> ≈ <b>공부하다</b> — учить(ся). 가르치다 — преподавать (антоним).","<b>배우다</b> ≈ <b>공부하다</b> — to learn, study. 가르치다 — to teach (opposite)."),
 QT("e204","read","E-R9",R9,"text","이 기계를 좀 [[고쳐]] 주세요.",["수리해","사용해","청소해","옮겨"],0,"<b>고치다</b> = <b>수리하다</b> — ta'mirlamoq.","<b>고치다</b> = <b>수리하다</b> — ремонтировать.","<b>고치다</b> = <b>수리하다</b> — to repair."),
 # ---------- Zid ma'no ----------
 QT("e205","read","E-R10",R10,"text","이 가방은 [[무겁습니다]].",["가볍습니다","큽니다","비쌉니다","좋습니다"],0,"<b>무겁다</b> (og'ir) ↔ <b>가볍다</b> (yengil).","<b>무겁다</b> (тяжёлый) ↔ <b>가볍다</b> (лёгкий).","<b>무겁다</b> (heavy) ↔ <b>가볍다</b> (light)."),
 QT("e206","read","E-R10",R10,"text","오늘은 일찍 [[출근했습니다]].",["퇴근했습니다","일했습니다","쉬었습니다","왔습니다"],0,"<b>출근하다</b> (ishga kelmoq) ↔ <b>퇴근하다</b> (ishdan ketmoq).","<b>출근하다</b> (прийти на работу) ↔ <b>퇴근하다</b> (уйти с работы).","<b>출근하다</b> (to go to work) ↔ <b>퇴근하다</b> (to leave work)."),
 QT("e207","read","E-R10",R10,"text","창문을 [[여세요]].",["닫으세요","보세요","닦으세요","고치세요"],0,"<b>열다</b> (ochmoq) ↔ <b>닫다</b> (yopmoq). 열다 + 세요 → 여세요 (ㄹ tushadi).","<b>열다</b> (открывать) ↔ <b>닫다</b> (закрывать). 열다 + 세요 → 여세요 (ㄹ выпадает).","<b>열다</b> (open) ↔ <b>닫다</b> (close). 열다 + 세요 → 여세요 (ㄹ drops)."),
 QT("e208","read","E-R10",R10,"text","불을 [[켜]] 주세요.",["꺼","바꿔","닦아","가져와"],0,"<b>켜다</b> (yoqmoq) ↔ <b>끄다</b> (o'chirmoq): 꺼 주세요.","<b>켜다</b> (включать) ↔ <b>끄다</b> (выключать): 꺼 주세요.","<b>켜다</b> (turn on) ↔ <b>끄다</b> (turn off): 꺼 주세요."),
 QT("e209","read","E-R10",R10,"text","이 문제는 [[쉽습니다]].",["어렵습니다","작습니다","재미있습니다","많습니다"],0,"<b>쉽다</b> (oson) ↔ <b>어렵다</b> (qiyin).","<b>쉽다</b> (лёгкий) ↔ <b>어렵다</b> (трудный).","<b>쉽다</b> (easy) ↔ <b>어렵다</b> (difficult)."),
 QT("e210","read","E-R10",R10,"text","요즘 물건 값이 많이 [[올랐습니다]].",["내렸습니다","비쌌습니다","많았습니다","바뀌었습니다"],0,"Narx <b>오르다</b> (ko'tarilmoq) ↔ <b>내리다</b> (tushmoq).","Цены <b>오르다</b> (расти) ↔ <b>내리다</b> (снижаться).","Prices <b>오르다</b> (rise) ↔ <b>내리다</b> (fall)."),
 QT("e211","read","E-R10",R10,"text","기숙사가 회사에서 [[가깝습니다]].",["멉니다","넓습니다","좁습니다","조용합니다"],0,"<b>가깝다</b> (yaqin) ↔ <b>멀다</b> (uzoq).","<b>가깝다</b> (близко) ↔ <b>멀다</b> (далеко).","<b>가깝다</b> (near) ↔ <b>멀다</b> (far)."),
 QT("e212","read","E-R10",R10,"text","엘리베이터를 타고 5층으로 [[올라갔습니다]].",["내려갔습니다","들어갔습니다","나갔습니다","돌아갔습니다"],0,"<b>올라가다</b> (yuqoriga chiqmoq) ↔ <b>내려가다</b> (pastga tushmoq).","<b>올라가다</b> (подниматься) ↔ <b>내려가다</b> (спускаться).","<b>올라가다</b> (go up) ↔ <b>내려가다</b> (go down)."),
 # ---------- Rasm + tinglash (variantlar faqat ovozda) ----------
 QT("e213","listen","E-L6",L6,"pic","👓",["안경입니다.","모자입니다.","시계입니다.","가방입니다."],0,"<b>안경</b> — ko'zoynak. Variantlar faqat eshittiriladi, ekranda yozilmaydi.","<b>안경</b> — очки. Варианты только звучат, на экране их нет.","<b>안경</b> — glasses. The options are only spoken, not shown."),
 QT("e214","listen","E-L6",L6,"pic","🍚",["밥을 먹습니다.","물을 마십니다.","옷을 입습니다.","책을 읽습니다."],0,"<b>밥</b> — guruch, ovqat: 밥을 먹다.","<b>밥</b> — рис, еда: 밥을 먹다.","<b>밥</b> — rice, a meal: 밥을 먹다."),
 QT("e215","listen","E-L6",L6,"pic","📞",["전화를 합니다.","편지를 씁니다.","텔레비전을 봅니다.","음악을 듣습니다."],0,"<b>전화를 하다</b> — qo'ng'iroq qilmoq.","<b>전화를 하다</b> — звонить.","<b>전화를 하다</b> — to make a call."),
 QT("e216","listen","E-L6",L6,"pic","🕒",["세 시입니다.","여섯 시입니다.","아홉 시입니다.","열두 시입니다."],0,"Soat koreyscha sonlar bilan: <b>세 시</b> — soat uch.","Часы — корейскими числами: <b>세 시</b> — три часа.","Hours use native numbers: <b>세 시</b> — three o'clock."),
 QT("e217","listen","E-L6",L6,"pic","🏥",["병원입니다.","학교입니다.","은행입니다.","우체국입니다."],0,"<b>병원</b> — shifoxona.","<b>병원</b> — больница.","<b>병원</b> — hospital."),
 QT("e218","listen","E-L6",L6,"pic","❄️⛄",["눈이 옵니다.","비가 옵니다.","덥습니다.","바람이 붑니다."],0,"<b>눈이 오다</b> — qor yog'moq.","<b>눈이 오다</b> — идёт снег.","<b>눈이 오다</b> — it snows."),
 QT("e219","listen","E-L6",L6,"pic","🔥🧯",["불을 끕니다.","물을 마십니다.","밥을 짓습니다.","문을 엽니다."],0,"O't o'chirgich bilan <b>olovni o'chirmoq</b>: 불을 끄다.","Огнетушителем <b>тушат огонь</b>: 불을 끄다.","With an extinguisher you <b>put out a fire</b>: 불을 끄다."),
 QT("e220","listen","E-L6",L6,"pic","🚌🚏",["버스를 기다립니다.","택시를 탑니다.","비행기를 탑니다.","자전거를 탑니다."],0,"Bekatda <b>avtobus kutmoq</b>: 버스를 기다리다. 정류장 — bekat.","На остановке <b>ждут автобус</b>: 버스를 기다리다. 정류장 — остановка.","At a stop you <b>wait for the bus</b>: 버스를 기다리다. 정류장 — bus stop."),
 QT("e221","listen","E-L6",L6,"pic","💵",["돈입니다.","우표입니다.","사진입니다.","표입니다."],0,"<b>돈</b> — pul. 우표 — marka, 표 — chipta.","<b>돈</b> — деньги. 우표 — марка, 표 — билет.","<b>돈</b> — money. 우표 — stamp, 표 — ticket."),
 QT("e222","listen","E-L6",L6,"pic","🤒",["열이 납니다.","배가 고픕니다.","기분이 좋습니다.","잠을 잡니다."],0,"<b>열이 나다</b> — isitma chiqmoq.","<b>열이 나다</b> — поднимается температура.","<b>열이 나다</b> — to have a fever."),
 # ---------- Uzun hikoya ----------
 QA("e223","이 사람은 주말에 무엇을 했습니까?","남자: 저는 한국에 온 지 2년이 되었습니다. 처음에는 한국 음식이 매워서 잘 먹지 못했습니다. 그래서 주말마다 고향 친구들과 같이 우즈베키스탄 음식을 만들어 먹었습니다. 지금은 김치찌개도 잘 먹습니다.",["고향 음식을 만들어 먹었습니다.","김치를 만들었습니다.","식당에서 일했습니다.","고향에 갔습니다."],0,
   "Dam olish kunlari do'stlari bilan <b>o'zbek taomlarini pishirib yeyishgan</b>. 맵다 — achchiq.","По выходным с друзьями <b>готовили узбекскую еду</b>. 맵다 — острый.","At weekends he <b>cooked Uzbek food</b> with friends. 맵다 — spicy."),
 QA("e224","버스를 타려면 어떻게 해야 합니까?","여자: 우리 회사는 다음 달부터 출퇴근 버스를 운행합니다. 버스는 아침 7시 30분에 기숙사 앞에서 출발합니다. 퇴근 버스는 저녁 6시에 회사 정문에서 출발합니다. 버스를 타려면 이번 주 금요일까지 사무실에 신청하십시오.",["금요일까지 사무실에 신청해야 합니다.","정문에서 표를 사야 합니다.","아침 7시에 회사에 와야 합니다.","기숙사에 살아야 합니다."],0,
   "<b>신청하다</b> — ariza bermoq: juma kunigacha ofisga. 출퇴근 — ishga borib-kelish, 운행 — qatnov.","<b>신청하다</b> — подать заявку: до пятницы в офис. 출퇴근 — дорога на работу и обратно.","<b>신청하다</b> — to apply: at the office by Friday. 출퇴근 — commute."),
 QA("e225","치료비는 누가 냈습니까?","남자: 저는 지난주에 일하다가 손을 다쳤습니다. 바로 반장님께 말씀드렸고 반장님이 저를 병원에 데려다주셨습니다. 의사 선생님이 일주일 동안 쉬라고 하셨습니다. 회사에서는 산재 보험으로 치료비를 내 주었습니다.",["회사가 산재 보험으로 냈습니다.","이 사람이 냈습니다.","반장님이 냈습니다.","의사 선생님이 냈습니다."],0,
   "<b>산재 보험</b> — ishlab chiqarishdagi baxtsiz hodisa sug'urtasi: davolanish haqini kompaniya shu orqali to'lagan.","<b>산재 보험</b> — страховка от несчастных случаев: компания оплатила лечение через неё.","<b>산재 보험</b> — workers' accident insurance: the company paid the bill through it."),
 QA("e226","외국인은 이사한 후 며칠 안에 신고해야 합니까?","여자: 외국인이 이사를 하면 새로 사는 곳을 신고해야 합니다. 이사한 후 15일 안에 출입국 사무소나 주민센터에 가서 신고하십시오. 신고를 늦게 하면 과태료를 낼 수도 있습니다.",["15일","5일","30일","90일"],0,
   "<b>15일 안에</b> — 15 kun ichida. 신고하다 — ro'yxatdan o'tkazmoq, 과태료 — jarima. (Ma'lumot o'zgarishi mumkin: rasmiy manbadan tekshiring.)","<b>15일 안에</b> — в течение 15 дней. 신고하다 — заявить, 과태료 — штраф. (Правила могут меняться — проверяйте официальный источник.)","<b>15일 안에</b> — within 15 days. 신고하다 — to report, 과태료 — fine. (Rules can change — check official sources.)"),
 QA("e227","이 사람은 일요일에 무엇을 배웁니까?","남자: 저는 주말에 외국인 근로자 센터에 다닙니다. 수업은 무료이고 외국인 근로자를 위한 수업이 많습니다. 토요일에는 한국어를 배우고 일요일에는 컴퓨터를 배웁니다. 친구도 많이 사귀어서 주말이 기다려집니다.",["컴퓨터","한국어","운전","요리"],0,
   "Shanba — koreys tili, <b>yakshanba — kompyuter</b>. 무료 — bepul.","Суббота — корейский, <b>воскресенье — компьютер</b>. 무료 — бесплатно.","Saturday is Korean, <b>Sunday is computers</b>. 무료 — free."),
 QA("e228","비상벨이 울리면 어디로 모입니까?","여자: 여러분, 오늘 오후 2시에 소방 훈련이 있습니다. 비상벨이 울리면 하던 일을 멈추고 비상구로 나가십시오. 엘리베이터는 타지 마시고 계단을 이용하십시오. 모두 회사 앞 주차장으로 모이십시오.",["회사 앞 주차장","회사 식당","엘리베이터 앞","사무실"],0,
   "<b>소방 훈련</b> — yong'in mashqi. Hamma <b>kompaniya oldidagi avtoturargohga</b> yig'iladi. 모이다 — yig'ilmoq.","<b>소방 훈련</b> — пожарные учения. Все собираются <b>на парковке перед компанией</b>. 모이다 — собираться.","<b>소방 훈련</b> — fire drill. Everyone gathers <b>in the parking lot in front</b>. 모이다 — to gather."),
 QA("e229","요즘 이 사람은 어떻게 돈을 보냅니까?","남자: 저는 고향에 있는 가족에게 매달 돈을 보냅니다. 전에는 은행에 직접 가서 보냈습니다. 그런데 은행은 평일에만 문을 열어서 일을 쉬어야 했습니다. 요즘은 휴대폰 앱으로 보내서 아주 편리합니다.",["휴대폰 앱으로 보냅니다.","은행에 가서 보냅니다.","친구에게 부탁합니다.","우체국에서 보냅니다."],0,
   "<b>요즘은</b> — hozir: telefon ilovasi orqali. Avval bankka borardi. 평일 — ish kunlari.","<b>요즘은</b> — сейчас: через приложение. Раньше ходил в банк. 평일 — будни.","<b>요즘은</b> — these days: via a phone app. Before, he went to the bank. 평일 — weekdays."),
 QA("e230","모레 날씨는 어떻습니까?","여자: 내일은 전국에 비가 오겠습니다. 특히 오후에는 바람도 강하게 불겠습니다. 밖에서 일하시는 분들은 안전에 특히 주의하시기 바랍니다. 모레부터는 날씨가 맑겠습니다.",["맑습니다","비가 옵니다","바람이 강하게 붑니다","눈이 옵니다"],0,
   "<b>모레</b> — indinga (ertadan keyin): ob-havo <b>ochiq</b>. Ertaga yomg'ir va shamol.","<b>모레</b> — послезавтра: будет <b>ясно</b>. Завтра дождь и ветер.","<b>모레</b> — the day after tomorrow: <b>clear</b>. Tomorrow: rain and wind."),
]
