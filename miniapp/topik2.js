/* Hanguk Way — TOPIK II (3–6-daraja) savollar banki.
   Barcha savollar Hanguk Way tomonidan rasmiy savol turlari bo'yicha yozilgan (imtihondan ko'chirilmagan).
   Tuzilishi: singles → PW_QBANK.topik2, sets → PW_QSETS.topik2. tr: [ruscha, inglizcha] izoh → PW_QTR.
   Rasmli savollar ([듣기 1~3]) ilovada yo'q — ular o'rniga shu bo'limdagi boshqa turlar ko'proq beriladi. */
(function () {
  var S = [], G = [];
  function q(o) { S.push(o); }
  function set(o) { G.push(o); }

  // ======================= 듣기 · TINGLASH =======================
  // [4~8] 이어질 수 있는 말
  q({id:"u001", type:"U-L1", sec:"listen",
    audio:"여자: 민수 씨, 내일 회의 자료는 다 준비됐어요?\n남자: 거의 다 했는데 프린터가 고장 나서 아직 출력을 못 했어요.",
    opts:["그럼 제 자리에 있는 프린터를 쓰세요.","회의는 벌써 끝났어요.","프린터를 새로 사서 다행이에요.","자료를 다 출력해 줘서 고마워요."], a:0,
    exp:"Erkak: \"Printer buzilgani uchun chop eta olmadim\". Mantiqiy davomi — yordam taklif qilish: <b>제 자리에 있는 프린터를 쓰세요</b>. 출력하다 — chop etmoq, 고장 나다 — buzilmoq.",
    tr:["Мужчина не может распечатать, потому что сломался принтер. Логичное продолжение — предложить помощь: <b>제 자리에 있는 프린터를 쓰세요</b>. 출력하다 — печатать, 고장 나다 — сломаться.","The man can't print because the printer broke. The natural reply offers help: <b>제 자리에 있는 프린터를 쓰세요</b>. 출력하다 — to print, 고장 나다 — to break down."]});
  q({id:"u002", type:"U-L1", sec:"listen",
    audio:"남자: 이번 주말에 등산 가기로 한 거 기억하죠?\n여자: 그럼요. 그런데 일기 예보를 보니까 토요일에 비가 많이 온대요.",
    opts:["그럼 일요일로 미루는 게 어때요?","등산 가방을 벌써 샀어요.","토요일에는 날씨가 맑겠네요.","비가 와서 산에 잘 다녀왔어요."], a:0,
    exp:"Shanba kuni kuchli yomg'ir bo'lishi aytildi, shuning uchun rejani <b>yakshanbaga ko'chirish</b> (미루다) taklifi mos keladi. -대요 — \"...deyishyapti\" (o'zgadan eshitilgan gap).",
    tr:["Сказано, что в субботу будет сильный дождь, поэтому уместно предложить <b>перенести на воскресенье</b> (미루다). -대요 — «говорят, что…».","Heavy rain is forecast for Saturday, so suggesting to <b>postpone to Sunday</b> (미루다) fits. -대요 — reported speech, \"they say…\"."]});
  q({id:"u003", type:"U-L1", sec:"listen",
    audio:"여자: 이 셔츠를 어제 샀는데 집에 가서 입어 보니까 좀 작네요.\n남자: 영수증 가지고 오셨어요?",
    opts:["네, 여기 있어요. 한 치수 큰 걸로 바꿔 주세요.","아니요, 셔츠가 너무 커요.","네, 어제 영수증을 버렸어요.","이 셔츠는 선물로 받았어요."], a:0,
    exp:"Sotuvchi \"chekni olib keldingizmi?\" deb so'radi. Mos javob: <b>네, 여기 있어요</b> va kattaroq o'lchamga almashtirishni so'rash. 치수 — o'lcham, 바꾸다 — almashtirmoq.",
    tr:["Продавец спрашивает, принесли ли чек. Подходящий ответ: <b>네, 여기 있어요</b> и просьба обменять на размер больше. 치수 — размер, 바꾸다 — обменять.","The clerk asks for the receipt. The right reply: <b>네, 여기 있어요</b> plus asking to exchange for one size up. 치수 — size, 바꾸다 — to exchange."]});
  q({id:"u004", type:"U-L1", sec:"listen",
    audio:"남자: 지난번에 추천해 준 책 다 읽었어요. 정말 재미있던데요.\n여자: 그렇죠? 그 작가가 쓴 다른 책도 있는데 빌려 줄까요?",
    opts:["좋아요. 다 읽고 바로 돌려줄게요.","저는 책을 별로 안 좋아해요.","그 책은 아직 못 읽었어요.","작가가 누군지 모르겠어요."], a:0,
    exp:"Ayol shu yozuvchining boshqa kitobini qarzga berishni taklif qildi (<b>빌려 줄까요?</b>). Erkak kitobni yoqtirgan — taklifni qabul qiladi: <b>좋아요, 다 읽고 바로 돌려줄게요</b>.",
    tr:["Женщина предлагает одолжить другую книгу этого автора. Мужчине книга понравилась — он соглашается: <b>좋아요, 다 읽고 바로 돌려줄게요</b>.","She offers to lend another book by the same author. He liked the first one, so he accepts: <b>좋아요, 다 읽고 바로 돌려줄게요</b>."]});
  q({id:"u005", type:"U-L1", sec:"listen",
    audio:"여자: 과장님, 다음 달 출장 일정이 바뀌었다고 들었는데요.\n남자: 네, 거래처 사정 때문에 일주일 앞당겨졌어요.",
    opts:["그럼 비행기 표를 다시 예약해야겠네요.","출장이 취소돼서 아쉬워요.","일주일 늦어져서 다행이에요.","거래처에 다녀오셨군요."], a:0,
    exp:"Safar <b>bir hafta oldinga surildi</b> (앞당겨지다). Demak chiptani qayta bron qilish kerak. 늦어지다 — kechikmoq (teskari ma'no), 거래처 — hamkor kompaniya.",
    tr:["Командировку <b>перенесли на неделю раньше</b> (앞당겨지다), значит, билеты нужно перебронировать. 늦어지다 — задержаться (противоположное), 거래처 — партнёр.","The trip was <b>moved a week earlier</b> (앞당겨지다), so the tickets must be rebooked. 늦어지다 — be delayed (the opposite), 거래처 — client company."]});
  q({id:"u006", type:"U-L1", sec:"listen",
    audio:"남자: 요즘 운동을 시작했는데 생각보다 너무 힘들어요.\n여자: 처음부터 무리하지 말고 조금씩 늘려 가는 게 좋아요.",
    opts:["그래야겠어요. 오늘은 30분만 해야겠어요.","운동은 원래 쉬워요.","저는 운동을 안 해 봤어요.","벌써 그만둬서 다행이에요."], a:0,
    exp:"Maslahat: \"Boshidan o'zingizni qiynamang, asta-sekin ko'paytiring\" (<b>무리하지 말고 조금씩</b>). Maslahatni qabul qilgan javob: <b>그래야겠어요</b> — \"shunday qilishim kerak ekan\".",
    tr:["Совет: «не перенапрягайтесь, увеличивайте нагрузку постепенно» (<b>무리하지 말고 조금씩</b>). Ответ, принимающий совет: <b>그래야겠어요</b>.","The advice: don't overdo it, build up gradually (<b>무리하지 말고 조금씩</b>). Accepting it: <b>그래야겠어요</b> — \"I guess I should\"."]});

  // [9~12] 여자가 이어서 할 행동
  q({id:"u007", type:"U-L2", sec:"listen",
    audio:"여자: 손님, 주문하신 케이크가 아직 준비가 안 됐는데 10분 정도 기다리실 수 있으세요?\n남자: 네, 괜찮아요. 그동안 계산을 먼저 할게요.\n여자: 네, 카드 주시겠어요?",
    opts:["카드로 계산한다.","케이크를 포장한다.","케이크를 새로 만든다.","손님에게 자리를 안내한다."], a:0,
    exp:"Oxirgi gap: <b>카드 주시겠어요?</b> — \"Kartangizni berasizmi?\" Demak ayol endi <b>karta bilan hisob-kitob qiladi</b>. 계산하다 — to'lov qilmoq.",
    tr:["Последняя фраза: <b>카드 주시겠어요?</b> — «Дадите карту?» Значит, она сейчас <b>проведёт оплату картой</b>. 계산하다 — рассчитываться.","Her last line: <b>카드 주시겠어요?</b> — \"Could I have your card?\" So she will <b>process the card payment</b>. 계산하다 — to pay."]});
  q({id:"u008", type:"U-L2", sec:"listen",
    audio:"남자: 지영 씨, 발표 준비는 잘 돼 가요?\n여자: 네, 자료는 다 만들었는데 발표 시간이 10분을 넘을 것 같아요.\n남자: 그럼 한번 연습해 보면서 시간을 재 보는 게 어때요?\n여자: 좋은 생각이네요. 지금 바로 해 볼게요.",
    opts:["시간을 재면서 발표 연습을 한다.","발표 자료를 새로 만든다.","발표 시간을 바꿔 달라고 한다.","남자에게 자료를 보낸다."], a:0,
    exp:"Erkak \"mashq qilib, vaqtni o'lchab ko'ring\" dedi, ayol <b>지금 바로 해 볼게요</b> — \"hozir sinab ko'raman\" deb javob berdi. 재다 — o'lchamoq.",
    tr:["Мужчина советует порепетировать и засечь время, женщина: <b>지금 바로 해 볼게요</b> — «сейчас же попробую». 재다 — измерять.","He suggests rehearsing while timing it; she says <b>지금 바로 해 볼게요</b> — \"I'll try right now\". 재다 — to measure."]});
  q({id:"u009", type:"U-L2", sec:"listen",
    audio:"여자: 이 노트북을 수리하고 싶은데요.\n남자: 어디가 고장 났는지 먼저 확인해야 하니까 이 신청서를 작성해 주세요.\n여자: 네, 알겠습니다. 펜 좀 빌려주시겠어요?",
    opts:["신청서를 작성한다.","노트북을 새로 산다.","고장 난 곳을 확인한다.","서비스 센터를 나간다."], a:0,
    exp:"Usta ariza (<b>신청서</b>) to'ldirishni so'radi, ayol ruchka so'radi — demak u <b>arizani to'ldiradi</b>. 작성하다 — to'ldirmoq, yozmoq. Nosozlikni usta tekshiradi, ayol emas.",
    tr:["Мастер просит заполнить заявление (<b>신청서</b>), она просит ручку — значит, <b>заполнит заявление</b>. Неисправность проверяет мастер, а не она.","The technician asks her to fill out the form (<b>신청서</b>) and she asks for a pen — she'll <b>fill out the form</b>. Checking the fault is his job."]});
  q({id:"u010", type:"U-L2", sec:"listen",
    audio:"남자: 이번 동아리 모임 장소 예약했어요?\n여자: 아직요. 학생회관 세미나실을 쓰려고 했는데 이미 예약이 다 찼대요.\n남자: 그럼 도서관 스터디룸은 어때요? 인터넷으로 바로 예약할 수 있어요.\n여자: 그래요? 그럼 지금 확인해 볼게요.",
    opts:["도서관 스터디룸 예약을 확인한다.","학생회관에 찾아간다.","동아리 모임을 취소한다.","세미나실 예약을 바꾼다."], a:0,
    exp:"Erkak kutubxonadagi xonani taklif qildi, internetda bron qilish mumkin. Ayol: <b>지금 확인해 볼게요</b>. Demak u <b>kutubxona xonasi bronini tekshiradi</b>. 예약이 다 차다 — joy qolmagan.",
    tr:["Мужчина предлагает комнату в библиотеке с онлайн-бронированием. Она: <b>지금 확인해 볼게요</b> — проверит бронь комнаты в библиотеке. 예약이 다 차다 — всё занято.","He suggests the library study room, bookable online. She: <b>지금 확인해 볼게요</b> — she'll check that booking. 예약이 다 차다 — fully booked."]});
  q({id:"u011", type:"U-L2", sec:"listen",
    audio:"여자: 선생님, 장학금 신청 서류를 내러 왔는데요.\n남자: 성적 증명서는 가지고 왔어요? 그게 꼭 있어야 해요.\n여자: 아, 깜빡했어요. 학과 사무실에서 바로 발급받아 올게요.",
    opts:["성적 증명서를 발급받으러 간다.","장학금 신청을 포기한다.","선생님께 서류를 낸다.","학과 사무실에 전화한다."], a:0,
    exp:"Baholar haqida ma'lumotnoma (<b>성적 증명서</b>) esdan chiqqan. Ayol: <b>발급받아 올게요</b> — \"olib kelaman\". 발급받다 — (hujjat) olmoq, 깜빡하다 — unutib qo'ymoq.",
    tr:["Она забыла выписку с оценками (<b>성적 증명서</b>) и говорит: <b>발급받아 올게요</b> — «схожу получу». 발급받다 — получить документ, 깜빡하다 — забыть.","She forgot the transcript (<b>성적 증명서</b>) and says <b>발급받아 올게요</b> — \"I'll go get it issued\". 깜빡하다 — to forget."]});
  q({id:"u012", type:"U-L2", sec:"listen",
    audio:"남자: 김 대리, 오늘 오후에 오기로 한 손님이 한 시간 일찍 도착한대요.\n여자: 그래요? 그럼 회의실 준비부터 해야겠네요.\n남자: 회의실은 제가 정리할 테니까 김 대리는 음료수 좀 사다 줄래요?\n여자: 네, 알겠습니다.",
    opts:["음료수를 사러 간다.","회의실을 정리한다.","손님에게 전화한다.","회의 시간을 바꾼다."], a:0,
    exp:"Erkak: \"Majlis xonasini men tartibga keltiraman, siz <b>ichimlik olib keling</b>\". Ayol rozi bo'ldi. -(으)ㄹ 테니까 — \"men ... qilaman, shuning uchun siz...\".",
    tr:["Мужчина: «переговорную приберу я, а вы <b>купите напитки</b>». Она соглашается. -(으)ㄹ 테니까 — «я сделаю…, а вы…».","He says he'll tidy the meeting room and asks her to <b>buy drinks</b>; she agrees. -(으)ㄹ 테니까 — \"since I'll do…, you…\"."]});

  // [13~16] 들은 내용과 같은 것
  q({id:"u013", type:"U-L3", sec:"listen",
    audio:"여자: (안내 방송) 승객 여러분께 알려 드립니다. 선로 점검으로 인해 지하철 2호선 운행이 약 20분간 지연되고 있습니다. 급하신 분들은 역 앞 버스 정류장에서 임시 버스를 이용해 주시기 바랍니다.",
    opts:["지하철이 늦게 운행되고 있다.","지하철 운행이 완전히 중단되었다.","임시 버스는 역 안에서 탈 수 있다.","선로 점검은 이미 끝났다."], a:0,
    exp:"<b>운행이 지연되고 있습니다</b> — qatnov kechikmoqda (20 daqiqa). To'liq to'xtamagan. Vaqtinchalik avtobus — stansiya <b>oldidagi</b> bekatda. 선로 — temir yo'l izi.",
    tr:["<b>운행이 지연되고 있습니다</b> — движение задерживается (на 20 минут), а не остановлено. Временный автобус — на остановке <b>перед</b> станцией. 선로 — пути.","<b>운행이 지연되고 있습니다</b> — service is delayed about 20 minutes, not stopped. The shuttle bus leaves from the stop <b>in front of</b> the station."]});
  q({id:"u014", type:"U-L3", sec:"listen",
    audio:"남자: 이번 봄 축제 때 우리 과에서 음식을 팔기로 했다면서요?\n여자: 네, 떡볶이를 팔고 번 돈은 전부 지역 아동 센터에 기부하기로 했어요.\n남자: 좋은 생각이네요. 저도 도울 일이 있으면 말해 주세요.",
    opts:["음식을 팔아서 번 돈은 기부할 것이다.","여자는 축제에서 떡볶이를 사 먹었다.","남자는 축제 준비를 돕지 않을 것이다.","축제는 가을에 열린다."], a:0,
    exp:"<b>번 돈은 전부 지역 아동 센터에 기부</b> — topilgan pul to'liq bolalar markaziga xayriya qilinadi. Bayram bahorda (봄 축제), erkak yordam bermoqchi.",
    tr:["<b>번 돈은 전부 … 기부</b> — все вырученные деньги будут пожертвованы детскому центру. Фестиваль весной, мужчина хочет помочь.","<b>번 돈은 전부 … 기부</b> — all the money earned will be donated to the children's center. It's a spring festival and he offers to help."]});
  q({id:"u015", type:"U-L3", sec:"listen",
    audio:"여자: (뉴스) 오늘 오전 시내의 한 건물에서 화재가 발생했습니다. 불은 30분 만에 꺼졌으며 건물 안에 있던 사람들은 모두 안전하게 대피했습니다. 경찰은 정확한 화재 원인을 조사하고 있습니다.",
    opts:["건물 안에 있던 사람들은 다치지 않았다.","불은 저녁에 났다.","불이 꺼지는 데 세 시간이 걸렸다.","화재 원인이 밝혀졌다."], a:0,
    exp:"<b>모두 안전하게 대피했습니다</b> — hamma xavfsiz evakuatsiya qilindi, ya'ni hech kim jarohatlanmadi. Yong'in ertalab, 30 daqiqada o'chirildi, sababi hali tekshirilmoqda.",
    tr:["<b>모두 안전하게 대피했습니다</b> — все благополучно эвакуировались, никто не пострадал. Пожар утром, потушен за 30 минут, причина выясняется.","<b>모두 안전하게 대피했습니다</b> — everyone evacuated safely, so nobody was hurt. It was in the morning, out in 30 minutes, cause still under investigation."]});
  q({id:"u016", type:"U-L3", sec:"listen",
    audio:"남자: 요즘 회사 근처로 이사할까 고민 중이에요. 출퇴근 시간이 왕복 세 시간이나 걸리거든요.\n여자: 그 동네는 월세가 꽤 비싸지 않아요?\n남자: 맞아요. 그래도 시간을 아낄 수 있으니까 그 정도는 괜찮을 것 같아요.",
    opts:["남자는 출퇴근하는 데 시간이 많이 걸린다.","남자는 회사 근처로 이미 이사했다.","회사 근처는 월세가 싸다.","여자는 남자에게 이사를 권하고 있다."], a:0,
    exp:"<b>왕복 세 시간이나 걸리거든요</b> — borib-kelish 3 soat oladi. Erkak hali o'ylayapti (고민 중), ko'chmagan. Ijara (월세) qimmat.",
    tr:["<b>왕복 세 시간이나 걸리거든요</b> — дорога туда-обратно занимает целых 3 часа. Он ещё думает (고민 중), не переехал. Аренда (월세) дорогая.","<b>왕복 세 시간이나</b> — a round trip takes three hours. He's still deciding (고민 중); rent (월세) there is expensive."]});
  q({id:"u017", type:"U-L3", sec:"listen",
    audio:"여자: (안내) 시립 도서관에서 알려 드립니다. 다음 달부터 평일 운영 시간이 밤 10시까지 연장됩니다. 단, 주말에는 지금처럼 저녁 6시에 문을 닫습니다. 많은 이용 바랍니다.",
    opts:["다음 달부터 평일에는 더 늦게까지 문을 연다.","주말 운영 시간도 연장된다.","도서관은 이번 달부터 밤 10시까지 연다.","평일에는 저녁 6시에 문을 닫는다."], a:0,
    exp:"<b>평일 운영 시간이 밤 10시까지 연장</b> — keyingi oydan ish kunlari soat 22:00 gacha uzaytiriladi. Dam olish kunlari avvalgidek 18:00 da yopiladi. 연장되다 — uzaytirilmoq, 단 — biroq.",
    tr:["<b>평일 운영 시간이 밤 10시까지 연장</b> — со следующего месяца по будням до 22:00. В выходные, как и сейчас, до 18:00. 연장되다 — продлеваться.","<b>평일 … 연장</b> — from next month weekday hours extend to 10 p.m.; weekends still close at 6 p.m."]});
  q({id:"u018", type:"U-L3", sec:"listen",
    audio:"남자: 이 화분은 물을 얼마나 자주 줘야 돼요?\n여자: 일주일에 한 번이면 충분해요. 물을 너무 자주 주면 뿌리가 썩을 수 있으니까 조심하세요. 그리고 햇빛이 잘 드는 곳에 두세요.",
    opts:["물을 자주 주면 식물에 좋지 않다.","이 식물은 매일 물을 줘야 한다.","이 식물은 그늘에 두는 것이 좋다.","남자는 식물을 키워 본 경험이 많다."], a:0,
    exp:"<b>물을 너무 자주 주면 뿌리가 썩을 수 있으니까</b> — tez-tez sug'orilsa ildiz chirishi mumkin. Haftada bir marta yetarli, quyoshli joyga qo'yish kerak. 썩다 — chirimoq, 그늘 — soya.",
    tr:["<b>물을 너무 자주 주면 뿌리가 썩을 수</b> — при частом поливе корни могут сгнить. Достаточно раз в неделю, ставить на солнце. 그늘 — тень.","<b>물을 너무 자주 주면 뿌리가 썩을 수</b> — watering too often can rot the roots. Once a week is enough; keep it in the sun. 그늘 — shade."]});

  // [17~20] 남자의 중심 생각
  q({id:"u019", type:"U-L4", sec:"listen",
    audio:"여자: 요즘은 다들 휴대폰으로 책을 읽던데 민수 씨는 아직도 종이책을 사요?\n남자: 네, 저는 종이책이 좋아요. 화면으로 읽으면 금방 눈이 피곤해지고 내용도 머리에 잘 안 남더라고요.",
    opts:["종이책으로 읽는 것이 더 낫다.","휴대폰으로 책을 읽는 것이 편리하다.","책을 많이 읽어야 한다.","종이책은 너무 비싸다."], a:0,
    exp:"Erkak qog'oz kitobni afzal ko'radi: ekrandan o'qisa ko'z charchaydi, mazmun esda qolmaydi. Asosiy fikr — <b>qog'oz kitob yaxshiroq</b>. -더라고요 — o'z tajribasidan aytish.",
    tr:["Он предпочитает бумажные книги: с экрана устают глаза и хуже запоминается. Главная мысль — <b>бумажная книга лучше</b>. -더라고요 — рассказ о личном опыте.","He prefers paper books: screens tire his eyes and he retains less. Main idea — <b>paper is better</b>. -더라고요 shares personal experience."]});
  q({id:"u020", type:"U-L4", sec:"listen",
    audio:"남자: 신입 사원이 실수를 하면 바로 지적하기보다는 스스로 고칠 수 있게 기다려 주는 게 중요하다고 생각해요. 그래야 자신감을 잃지 않고 일을 빨리 배우거든요.",
    opts:["신입 사원이 스스로 실수를 고치도록 기다려 줘야 한다.","신입 사원의 실수는 바로 지적해야 한다.","신입 사원은 실수를 하면 안 된다.","신입 사원은 자신감이 너무 많다."], a:0,
    exp:"Kalit: <b>바로 지적하기보다는 스스로 고칠 수 있게 기다려 주는 게 중요</b> — darhol tanqid qilishdan ko'ra, o'zi tuzatishini kutish muhim. 지적하다 — kamchilikni ko'rsatmoq.",
    tr:["Ключ: <b>바로 지적하기보다는 스스로 고칠 수 있게 기다려 주는 게 중요</b> — важнее не сразу указывать, а дать исправить самому. 지적하다 — указывать на ошибку.","Key line: <b>바로 지적하기보다는 … 기다려 주는 게 중요</b> — rather than pointing it out at once, let them fix it themselves."]});
  q({id:"u021", type:"U-L4", sec:"listen",
    audio:"여자: 주말마다 캠핑을 간다면서요? 준비하는 게 귀찮지 않아요?\n남자: 조금 귀찮긴 하죠. 그래도 일주일 동안 쌓인 스트레스를 자연 속에서 푸는 게 저한테는 무엇보다 중요해요.",
    opts:["자연 속에서 스트레스를 푸는 것이 중요하다.","캠핑 준비는 너무 귀찮다.","주말에는 집에서 쉬어야 한다.","캠핑 장비는 비싸다."], a:0,
    exp:"\"Biroz zerikarli, <b>그래도</b> ...\" — 그래도 dan keyingi gap asosiy fikr: <b>tabiatda stressdan xalos bo'lish muhim</b>. 귀찮다 — erinchoqlik qo'zg'atadigan, 쌓이다 — to'planmoq.",
    tr:["После <b>그래도</b> («и всё же») идёт главная мысль: <b>снимать стресс на природе важно</b>. 귀찮다 — хлопотно, 쌓이다 — накапливаться.","The main idea follows <b>그래도</b> (\"still\"): <b>relieving stress in nature matters most</b>. 귀찮다 — bothersome."]});
  q({id:"u022", type:"U-L4", sec:"listen",
    audio:"남자: 아이들한테 용돈을 줄 때는 그냥 주는 것보다 어떻게 쓸지 계획을 세우게 하는 게 좋아요. 어릴 때부터 돈을 관리하는 습관을 들여야 커서도 돈을 아껴 쓸 수 있거든요.",
    opts:["어릴 때부터 돈 관리 습관을 길러야 한다.","아이들에게 용돈을 주지 않는 것이 좋다.","용돈은 많이 줄수록 좋다.","아이들은 돈을 아껴 쓴다."], a:0,
    exp:"<b>어릴 때부터 돈을 관리하는 습관을 들여야</b> — yoshlikdan pulni boshqarish odatini shakllantirish kerak. 용돈 — cho'ntak puli, 습관을 들이다 — odat qilmoq.",
    tr:["<b>어릴 때부터 돈을 관리하는 습관을 들여야</b> — привычку управлять деньгами нужно прививать с детства. 용돈 — карманные деньги.","<b>어릴 때부터 … 습관을 들여야</b> — children should build money-management habits early. 용돈 — pocket money."]});
  q({id:"u023", type:"U-L4", sec:"listen",
    audio:"여자: 이번에 새로 생긴 식당 가 봤어요? 줄이 엄청 길던데요.\n남자: 네, 가 봤는데 기대만큼은 아니었어요. 사람들이 많이 가는 곳이라고 해서 꼭 맛있는 건 아닌 것 같아요.",
    opts:["유명한 식당이라고 해서 항상 맛있는 것은 아니다.","새로 생긴 식당에 꼭 가 봐야 한다.","줄이 긴 식당은 음식 값이 비싸다.","식당에서는 줄을 서서 기다려야 한다."], a:0,
    exp:"<b>-다고 해서 꼭 ... 것은 아니다</b> — \"...bo'lgani uchun albatta ... degani emas\". Odam ko'p boradigan joy har doim mazali emas — erkakning asosiy fikri.",
    tr:["<b>-다고 해서 꼭 … 아니다</b> — «то, что…, ещё не значит…». Популярное место не обязательно вкусное — главная мысль.","<b>-다고 해서 꼭 … 아니다</b> — \"just because… doesn't mean…\". A crowded restaurant isn't necessarily good."]});
  q({id:"u024", type:"U-L4", sec:"listen",
    audio:"남자: 외국어를 배울 때 문법만 공부하면 실제로 말하기가 어려워요. 틀려도 괜찮으니까 처음부터 많이 말해 보는 게 실력을 키우는 가장 좋은 방법이에요.",
    opts:["외국어는 틀리더라도 많이 말해 봐야 는다.","외국어는 문법부터 완벽하게 공부해야 한다.","외국어 공부는 어렵다.","말하기보다 쓰기가 더 중요하다."], a:0,
    exp:"<b>틀려도 괜찮으니까 처음부터 많이 말해 보는 게 ... 가장 좋은 방법</b> — xato qilsa ham ko'p gapirish eng yaxshi yo'l. 실력을 키우다 — mahoratni oshirmoq.",
    tr:["<b>틀려도 괜찮으니까 … 많이 말해 보는 게 가장 좋은 방법</b> — говорить много, даже с ошибками, — лучший способ. 실력을 키우다 — развивать навык.","<b>틀려도 괜찮으니까 … 많이 말해 보는 게 …</b> — speaking a lot, even with mistakes, is the best way to improve."]});

  // [21~50] 묶음 문제
  set({id:"us01", type:"U-L5", sec:"listen",
    audio:"여자: 부장님, 이번 신제품 홍보를 인터넷 광고로만 하는 건 어떨까요? 비용도 적게 들고요.\n남자: 인터넷 광고도 좋지만 우리 제품을 주로 사는 사람들은 50대 이상이에요. 그분들은 아직 텔레비전이나 신문을 더 많이 보니까 그쪽 광고도 같이 해야 해요.\n여자: 그럼 예산을 나눠서 두 가지를 다 하는 걸로 계획을 다시 세워 보겠습니다.",
    qs:[
      {id:"u201", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["주요 고객에 맞게 광고 방법을 정해야 한다.","인터넷 광고는 효과가 없다.","광고 비용을 줄여야 한다.","신제품은 젊은 사람들에게 팔아야 한다."], a:0,
       exp:"Erkak: asosiy xaridorlar 50 yoshdan oshganlar, ular TV va gazetani ko'proq ko'radi, shuning uchun reklama ham ularga mos bo'lishi kerak — <b>asosiy mijozga qarab reklama usulini tanlash</b>.",
       tr:["Мужчина: основные покупатели — люди 50+, они больше смотрят ТВ и газеты, значит, рекламу нужно <b>подбирать под основных клиентов</b>.","He argues the main buyers are 50+ and watch TV/newspapers, so the ad channel should <b>match the core customers</b>."]},
      {id:"u202", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 광고 계획을 다시 세울 것이다.","남자는 인터넷 광고에 반대한다.","이 제품은 주로 젊은 사람들이 산다.","텔레비전 광고는 하지 않기로 했다."], a:0,
       exp:"Ayol oxirida: <b>계획을 다시 세워 보겠습니다</b> — rejani qayta tuzaman. Erkak internet reklamasiga qarshi emas (좋지만), ikkalasini qilishni xohlaydi.",
       tr:["В конце она говорит: <b>계획을 다시 세워 보겠습니다</b> — составлю план заново. Мужчина не против интернет-рекламы (좋지만), он за оба варианта.","She ends with <b>계획을 다시 세워 보겠습니다</b> — she'll redo the plan. He isn't against online ads (좋지만); he wants both."]}
    ]});
  set({id:"us02", type:"U-L5", sec:"listen",
    audio:"남자: 안녕하세요. 지난주에 인터넷으로 주문한 의자가 아직 안 와서 전화드렸습니다. 주문 번호는 1205번이에요.\n여자: 확인해 보겠습니다. 고객님, 죄송합니다. 해당 상품이 품절돼서 배송이 늦어지고 있습니다. 다음 주 수요일에 입고될 예정인데 기다려 주시겠어요? 아니면 바로 환불해 드릴 수도 있습니다.\n남자: 그럼 기다릴게요. 대신 입고되면 바로 보내 주세요.",
    qs:[
      {id:"u203", ask:"남자가 무엇을 하고 있는지 고르십시오.", opts:["배송이 늦어진 이유를 묻고 있다.","의자를 새로 주문하고 있다.","환불을 요청하고 있다.","주문 번호를 바꾸고 있다."], a:0,
       exp:"Erkak buyurtma qilgan stul hali kelmagani uchun qo'ng'iroq qildi — <b>yetkazib berish kechikishi sababini so'rayapti</b>. U pulni qaytarishni so'ramadi, kutishga rozi.",
       tr:["Он звонит, потому что стул ещё не доставлен — <b>спрашивает о причине задержки</b>. Возврат денег не просит, согласен подождать.","He's calling because the chair hasn't arrived — <b>asking why delivery is late</b>. He doesn't ask for a refund."]},
      {id:"u204", ask:"들은 내용과 같은 것을 고르십시오.", opts:["상품이 없어서 배송이 늦어지고 있다.","남자는 환불을 받기로 했다.","의자는 이번 주에 도착한다.","남자는 가게에 직접 찾아갔다."], a:0,
       exp:"<b>품절돼서 배송이 늦어지고 있습니다</b> — tovar tugab qolgani uchun kechikmoqda. Keyingi chorshanba omborga keladi. 품절 — sotilib tugagan, 입고 — omborga kelish.",
       tr:["<b>품절돼서 배송이 늦어지고</b> — товар распродан, поэтому доставка задерживается; поступит в следующую среду. 품절 — нет в наличии, 입고 — поступление.","<b>품절돼서 …</b> — it's sold out, hence the delay; restock next Wednesday. 품절 — sold out, 입고 — restock."]}
    ]});
  set({id:"us03", type:"U-L5", sec:"listen",
    audio:"여자: 선생님께서는 오랫동안 시골 마을에서 작은 도서관을 운영해 오셨는데요. 처음에 어떻게 시작하시게 됐나요?\n남자: 제가 어렸을 때 이 마을에는 책을 읽을 곳이 하나도 없었어요. 그래서 아이들이 책을 마음껏 읽을 수 있는 공간을 만들고 싶었죠. 처음에는 제 집 거실에 책 200권으로 시작했는데 지금은 마을 사람들이 기증해 준 책이 만 권이 넘습니다.",
    qs:[
      {id:"u205", ask:"남자가 누구인지 고르십시오.", opts:["마을에서 도서관을 운영하는 사람","책을 쓰는 작가","학교에서 아이들을 가르치는 선생님","도서관을 짓는 건축가"], a:0,
       exp:"Intervyu boshida aytildi: <b>시골 마을에서 작은 도서관을 운영해 오셨는데요</b> — qishloqda kichik kutubxona yuritib kelgan inson. 선생님 bu yerda hurmat bilan murojaat, kasb emas.",
       tr:["В начале интервью: <b>시골 마을에서 작은 도서관을 운영해 오셨는데요</b> — он много лет ведёт сельскую библиотеку. 선생님 здесь — вежливое обращение, а не профессия.","The intro says he <b>has run a small village library</b> for years. 선생님 here is a respectful address, not his job."]},
      {id:"u206", ask:"들은 내용과 같은 것을 고르십시오.", opts:["처음에는 남자의 집에서 도서관을 시작했다.","도서관의 책은 모두 남자가 샀다.","지금 도서관에는 책이 200권 있다.","남자가 어렸을 때 마을에 도서관이 있었다."], a:0,
       exp:"<b>처음에는 제 집 거실에 책 200권으로 시작했는데</b> — dastlab o'z uyining mehmonxonasida 200 ta kitob bilan boshlagan. Hozir qishloq aholisi sovg'a qilgan (기증) kitoblar 10 mingdan oshgan.",
       tr:["<b>처음에는 제 집 거실에 책 200권으로 시작</b> — начинал у себя в гостиной с 200 книг. Сейчас подаренных (기증) жителями книг больше 10 000.","<b>처음에는 제 집 거실에…</b> — he started in his own living room with 200 books; now donated (기증) books exceed 10,000."]}
    ]});
  set({id:"us04", type:"U-L5", sec:"listen",
    audio:"남자: 이번 학기부터 학교 식당에서 일회용 컵을 쓸 수 없게 된다면서요?\n여자: 네, 환경을 보호하기 위해서 그렇게 결정했대요. 대신 개인 컵을 가져오면 음료를 300원 할인해 준대요.\n남자: 좋은 방법이네요. 그런데 컵을 매일 들고 다니는 게 좀 불편하지 않을까요?\n여자: 처음에는 그렇겠지만 익숙해지면 괜찮을 거예요. 학교에서 컵을 빌려주는 서비스도 시작한대요.",
    qs:[
      {id:"u207", ask:"여자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["개인 컵 사용은 처음엔 불편해도 곧 익숙해질 것이다.","일회용 컵을 계속 써야 한다.","컵 할인 금액이 너무 적다.","학교 식당 음료가 비싸다."], a:0,
       exp:"Ayol: <b>처음에는 그렇겠지만 익숙해지면 괜찮을 거예요</b> — boshida noqulay, lekin ko'nikkach muammo bo'lmaydi. Uning asosiy fikri shu.",
       tr:["Она: <b>처음에는 그렇겠지만 익숙해지면 괜찮을 거예요</b> — сначала неудобно, но потом привыкнут. Это её главная мысль.","She says <b>처음에는 그렇겠지만 익숙해지면 괜찮을 거예요</b> — awkward at first, fine once you get used to it."]},
      {id:"u208", ask:"들은 내용과 같은 것을 고르십시오.", opts:["개인 컵을 가져오면 음료 값이 싸진다.","학교 식당에서 컵을 판다.","일회용 컵은 지난 학기부터 금지되었다.","남자는 이 결정에 반대한다."], a:0,
       exp:"<b>개인 컵을 가져오면 음료를 300원 할인</b> — o'z stakaningizni olib kelsangiz, ichimlik 300 von arzonlashadi. Taqiq <b>shu semestrdan</b>, maktab stakanni ijaraga beradi (sotmaydi).",
       tr:["<b>개인 컵을 가져오면 … 300원 할인</b> — со своей чашкой напиток дешевле на 300 вон. Запрет — <b>с этого семестра</b>; чашки дают напрокат, а не продают.","<b>개인 컵을 가져오면 … 할인</b> — bring your own cup and save 300 won. The ban starts <b>this</b> semester; cups are lent, not sold."]}
    ]});
  set({id:"us05", type:"U-L5", sec:"listen",
    audio:"여자: (강연) 여러분, 잠을 충분히 자지 못하면 어떤 일이 생길까요? 연구에 따르면 잠이 부족하면 기억력이 떨어질 뿐만 아니라 감정을 조절하기도 어려워진다고 합니다. 특히 잠자기 전에 스마트폰을 보면 빛 때문에 잠이 드는 데 시간이 더 오래 걸립니다. 그러니까 자기 한 시간 전에는 스마트폰을 멀리 두는 것이 좋습니다.",
    qs:[
      {id:"u209", ask:"무엇에 대한 내용인지 고르십시오.", opts:["수면 부족의 문제와 잘 자는 방법","스마트폰의 좋은 점","기억력을 높이는 운동","감정을 표현하는 방법"], a:0,
       exp:"Ma'ruza <b>uyqu yetishmasligining zarari</b> (xotira, his-tuyg'ularni boshqarish) va <b>yaxshi uxlash maslahati</b> haqida. 수면 — uyqu, 부족 — yetishmovchilik.",
       tr:["Лекция о <b>вреде недосыпа</b> (память, контроль эмоций) и <b>совете, как лучше спать</b>. 수면 — сон, 부족 — нехватка.","The talk covers <b>the harms of sleep loss</b> (memory, emotional control) and <b>a tip for sleeping better</b>."]},
      {id:"u210", ask:"들은 내용과 같은 것을 고르십시오.", opts:["자기 전에 스마트폰을 보면 잠들기 어렵다.","잠이 부족해도 기억력에는 문제가 없다.","자기 직전에 스마트폰을 보는 것이 좋다.","잠을 많이 자면 감정 조절이 어렵다."], a:0,
       exp:"<b>잠자기 전에 스마트폰을 보면 ... 잠이 드는 데 시간이 더 오래 걸립니다</b> — uxlashdan oldin telefon ko'rilsa, uxlab qolish qiyinlashadi. 잠이 들다 — uxlab qolmoq.",
       tr:["<b>잠자기 전에 스마트폰을 보면 … 더 오래 걸립니다</b> — если смотреть телефон перед сном, заснуть труднее. 잠이 들다 — заснуть.","<b>잠자기 전에 스마트폰을 보면 …</b> — looking at a phone before bed makes falling asleep take longer."]}
    ]});
  set({id:"us06", type:"U-L5", sec:"listen",
    audio:"남자: 요즘 많은 회사들이 주 4일 근무를 시험적으로 도입하고 있습니다. 일하는 날이 줄어들면 생산성이 떨어질 거라는 걱정도 있었지만, 실제로 도입한 회사들을 조사해 보니 직원들의 만족도가 높아졌고 생산성도 크게 달라지지 않았습니다. 물론 모든 업종에 적용하기는 어렵겠지만 충분히 검토해 볼 만한 제도라고 생각합니다.",
    qs:[
      {id:"u211", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["주 4일 근무는 검토해 볼 가치가 있다.","주 4일 근무는 모든 회사가 해야 한다.","일하는 날이 줄면 생산성이 떨어진다.","직원들의 만족도는 중요하지 않다."], a:0,
       exp:"Yakuniy fikr: <b>충분히 검토해 볼 만한 제도</b> — jiddiy ko'rib chiqishga arziydigan tizim. \"Barcha sohaga qo'llash qiyin\" degani uchun ② noto'g'ri. -(으)ㄹ 만하다 — ...ga arziydi.",
       tr:["Вывод: <b>충분히 검토해 볼 만한 제도</b> — систему стоит рассмотреть. Он говорит, что подойдёт не всем отраслям, поэтому ② неверно. -(으)ㄹ 만하다 — стоит.","Conclusion: <b>충분히 검토해 볼 만한 제도</b> — worth considering. He says it won't fit every industry, so ② is wrong."]},
      {id:"u212", ask:"들은 내용과 같은 것을 고르십시오.", opts:["주 4일 근무를 도입한 회사의 생산성은 비슷했다.","주 4일 근무 후 직원들의 만족도가 낮아졌다.","모든 업종이 주 4일 근무를 하고 있다.","주 4일 근무에 대한 걱정은 없었다."], a:0,
       exp:"<b>생산성도 크게 달라지지 않았습니다</b> — samaradorlik deyarli o'zgarmagan. Xodimlar mamnunligi oshgan, tashvishlar ham bo'lgan. 도입하다 — joriy qilmoq.",
       tr:["<b>생산성도 크게 달라지지 않았습니다</b> — производительность почти не изменилась. Удовлетворённость выросла, опасения были. 도입하다 — внедрять.","<b>생산성도 크게 달라지지 않았습니다</b> — productivity barely changed; satisfaction rose. 도입하다 — to introduce."]}
    ]});
  set({id:"us07", type:"U-L5", sec:"listen",
    audio:"여자: 민호 씨, 회사 그만두고 유학 간다는 소문이 사실이에요?\n남자: 네, 사실이에요. 사실 오래전부터 디자인을 제대로 공부해 보고 싶었거든요. 안정적인 직장을 그만두는 게 쉽지는 않았지만, 지금 도전하지 않으면 나중에 후회할 것 같았어요.\n여자: 대단하네요. 응원할게요.",
    qs:[
      {id:"u213", ask:"남자가 유학을 결심한 이유로 알맞은 것을 고르십시오.", opts:["나중에 후회하지 않으려고","회사에서 해고를 당해서","외국에서 일하고 싶어서","월급이 너무 적어서"], a:0,
       exp:"<b>지금 도전하지 않으면 나중에 후회할 것 같았어요</b> — hozir harakat qilmasa, keyin afsuslanadi deb o'ylagan. 도전하다 — o'zini sinab ko'rmoq, 후회하다 — afsuslanmoq.",
       tr:["<b>지금 도전하지 않으면 나중에 후회할 것 같았어요</b> — боялся пожалеть, если не попробует сейчас. 도전하다 — бросить вызов, 후회하다 — жалеть.","<b>지금 도전하지 않으면 나중에 후회할 것 같았어요</b> — he feared regretting it later. 후회하다 — to regret."]},
      {id:"u214", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 디자인을 공부하러 유학을 간다.","남자는 회사를 계속 다닐 것이다.","여자는 남자의 결정에 반대한다.","남자는 직장을 그만두는 것이 쉬웠다."], a:0,
       exp:"Erkak <b>dizaynni jiddiy o'rganmoqchi</b> va chet elga o'qishga ketadi. Ishdan ketish oson bo'lmagan (쉽지는 않았지만), ayol uni qo'llab-quvvatlaydi (응원할게요).",
       tr:["Он едет учиться <b>дизайну</b> за границу. Уйти с работы было нелегко (쉽지는 않았지만), женщина его поддерживает (응원할게요).","He's going abroad to <b>study design</b>. Quitting wasn't easy (쉽지는 않았지만); she supports him (응원할게요)."]}
    ]});
  set({id:"us08", type:"U-L5", sec:"listen",
    audio:"남자: (다큐멘터리) 꿀벌은 우리가 먹는 과일과 채소의 상당 부분이 열매를 맺을 수 있도록 꽃가루를 옮겨 줍니다. 그런데 최근 기후 변화와 농약 사용으로 꿀벌의 수가 빠르게 줄고 있습니다. 꿀벌이 사라지면 농작물 생산량이 크게 줄어 식량 문제로 이어질 수 있습니다. 전문가들은 농약 사용을 줄이고 꽃이 피는 식물을 많이 심어야 한다고 강조합니다.",
    qs:[
      {id:"u215", ask:"이 이야기의 주제로 가장 알맞은 것을 고르십시오.", opts:["꿀벌 감소의 원인과 그 영향","꿀을 만드는 방법","농약의 장점","과일을 많이 먹어야 하는 이유"], a:0,
       exp:"Hujjatli film <b>asalarilar kamayishining sabablari</b> (iqlim o'zgarishi, pestitsid) va <b>oqibatlari</b> (hosil kamayishi, oziq-ovqat muammosi) haqida. 감소 — kamayish, 영향 — ta'sir.",
       tr:["Фильм о <b>причинах сокращения пчёл</b> (климат, пестициды) и <b>последствиях</b> (меньше урожая, продовольственная проблема). 감소 — сокращение, 영향 — влияние.","It covers <b>why bees are declining</b> (climate, pesticides) and <b>the consequences</b> (lower yields, food problems)."]},
      {id:"u216", ask:"들은 내용과 같은 것을 고르십시오.", opts:["농약 사용은 꿀벌이 줄어드는 원인 중 하나이다.","꿀벌의 수가 점점 늘고 있다.","꿀벌이 없어도 농작물 생산에는 문제가 없다.","전문가들은 농약을 더 써야 한다고 말한다."], a:0,
       exp:"<b>기후 변화와 농약 사용으로 꿀벌의 수가 빠르게 줄고 있습니다</b> — pestitsid — asalarilar kamayishining sabablaridan biri. Mutaxassislar pestitsidni <b>kamaytirish</b>ni aytadi.",
       tr:["<b>기후 변화와 농약 사용으로 … 줄고 있습니다</b> — пестициды — одна из причин. Эксперты призывают <b>сокращать</b> их применение.","<b>기후 변화와 농약 사용으로 … 줄고</b> — pesticides are one cause. Experts urge <b>reducing</b> them."]}
    ]});

  // ======================= 읽기 · O'QISH =======================
  // [1~2] 빈칸 (문법)
  q({id:"u101", type:"U-R1", sec:"read", text:"아침에 늦게 (    ) 버스를 놓쳤다.", opts:["일어나는 바람에","일어나도록","일어나려면","일어나다가도"], a:0,
    exp:"<b>-는 바람에</b> — kutilmagan sabab, ko'pincha salbiy natija bilan: \"kech turib qolganim sababli avtobusdan qoldim\". -도록 — maqsad, -려면 — agar ... moqchi bo'lsa.",
    tr:["<b>-는 바람에</b> — неожиданная причина с негативным итогом: «из-за того, что проспал, опоздал на автобус». -도록 — цель, -려면 — если хочешь…","<b>-는 바람에</b> — an unexpected cause with a bad result: \"because I overslept, I missed the bus\". -도록 — purpose, -려면 — if you want to…"]});
  q({id:"u102", type:"U-R1", sec:"read", text:"이번 시험은 열심히 (    ) 좋은 결과가 나올 것이다.", opts:["준비한 만큼","준비하느라고","준비하자마자","준비하는데도"], a:0,
    exp:"<b>-(으)ㄴ 만큼</b> — \"qancha ... bo'lsa, shuncha\": qancha tayyorlansang, natija shunga yarasha. -느라고 — ...bilan band bo'lib (salbiy natija), -자마자 — ...bilanoq.",
    tr:["<b>-(으)ㄴ 만큼</b> — «насколько…, настолько»: результат соразмерен подготовке. -느라고 — из-за занятости…, -자마자 — как только.","<b>-(으)ㄴ 만큼</b> — \"as much as\": results match the effort. -느라고 — because busy doing…, -자마자 — as soon as."]});
  q({id:"u103", type:"U-R1", sec:"read", text:"친구가 이사를 한다고 해서 짐 정리를 (    ).", opts:["도와주기로 했다","도와줄 뻔했다","도와주곤 했다","도와줄 리가 없다"], a:0,
    exp:"Do'st ko'chayotgani uchun narsalarini yig'ishga <b>yordam berishga qaror qildim</b> — <b>-기로 하다</b>. -(으)ㄹ 뻔하다 — sal qoldi, -곤 하다 — odatda qilardim, -(으)ㄹ 리가 없다 — bo'lishi mumkin emas.",
    tr:["<b>-기로 하다</b> — решить: «решил помочь с вещами». -(으)ㄹ 뻔하다 — чуть не…, -곤 하다 — бывало, -(으)ㄹ 리가 없다 — не может быть.","<b>-기로 하다</b> — decide to: \"I decided to help pack\". -(으)ㄹ 뻔하다 — almost, -곤 하다 — used to, -(으)ㄹ 리가 없다 — can't be."]});
  q({id:"u104", type:"U-R1", sec:"read", text:"그 영화는 보면 (    ) 더 재미있다.", opts:["볼수록","보느라고","보더니","보길래"], a:0,
    exp:"<b>-(으)면 -(으)ㄹ수록</b> — \"qancha ko'p ... bo'lsa, shuncha\": ko'rgan sari qiziqroq. 보면 볼수록 — ko'rgan sayin.",
    tr:["<b>-(으)면 -(으)ㄹ수록</b> — «чем больше…, тем…»: чем больше смотришь, тем интереснее.","<b>-(으)면 -(으)ㄹ수록</b> — \"the more…, the more…\": the more you watch, the better it gets."]});
  q({id:"u105", type:"U-R1", sec:"read", text:"날씨가 (    ) 공원에 사람이 거의 없었다.", opts:["추운 탓에","추운 김에","춥도록","추운 대신에"], a:0,
    exp:"<b>-(으)ㄴ 탓에</b> — salbiy natijaning sababi: \"havo sovuq bo'lgani sababli parkda odam deyarli yo'q edi\". -(으)ㄴ 김에 — fursatdan foydalanib, -는 대신에 — o'rniga.",
    tr:["<b>-(으)ㄴ 탓에</b> — причина негативного результата: «из-за холода в парке почти никого не было». -(으)ㄴ 김에 — заодно, -는 대신에 — вместо.","<b>-(으)ㄴ 탓에</b> — the cause of a bad outcome: \"because it was cold, the park was empty\". -(으)ㄴ 김에 — while at it."]});
  q({id:"u106", type:"U-R1", sec:"read", text:"이 일은 혼자 (    ) 여러 사람의 도움이 필요하다.", opts:["하기에는 너무 많아서","하기 위해서","하는 김에","하다 보면"], a:0,
    exp:"<b>-기에는 너무 ...</b> — \"...qilish uchun juda ...\": bu ish bir kishi bajarishi uchun juda ko'p, shuning uchun yordam kerak. -다 보면 — ...qilaverib (natijada).",
    tr:["<b>-기에는 너무 …</b> — «слишком…, чтобы…»: работы слишком много для одного. -다 보면 — если продолжать, то…","<b>-기에는 너무 …</b> — \"too … to…\": too much work for one person. -다 보면 — if you keep doing…"]});

  // [3~4] 비슷한 의미
  q({id:"u107", type:"U-R2", sec:"read", text:"아무리 바빠도 아침은 [[먹는 편이다]].", opts:["대체로 먹는다","먹을 수 없다","먹을 리가 없다","먹을 뻔했다"], a:0,
    exp:"<b>-는 편이다</b> — \"ko'proq ... tomonga moyil\", ya'ni odatda: <b>대체로 먹는다</b> — asosan yeyman. 대체로 — umuman olganda.",
    tr:["<b>-는 편이다</b> — «скорее, обычно…»: <b>대체로 먹는다</b> — как правило, ем. 대체로 — в основном.","<b>-는 편이다</b> — \"tend to\": <b>대체로 먹는다</b> — I generally eat. 대체로 — generally."]});
  q({id:"u108", type:"U-R2", sec:"read", text:"버스가 끊길까 봐 [[서둘러 나왔더니]] 시간이 많이 남았다.", opts:["서둘러 나와서","서둘러 나오느라고","서둘러 나오려고","서둘러 나오다가"], a:0,
    exp:"<b>-았/었더니</b> — o'zi qilgan ish va uning natijasi: \"shoshib chiqqan edim, vaqt ko'p qoldi\". Ma'nosi yaqin: <b>-아서/어서</b> (ketma-ketlik/sabab).",
    tr:["<b>-았/었더니</b> — своё действие и его результат: «поспешил выйти — и осталось много времени». Близко к <b>-아서/어서</b>.","<b>-았/었더니</b> — my action and what followed: \"I hurried out, and had lots of time left\". Close to <b>-아서/어서</b>."]});
  q({id:"u109", type:"U-R2", sec:"read", text:"동생은 요즘 공부는 안 하고 [[게임만 할 뿐이다]].", opts:["게임만 한다","게임을 할 뻔했다","게임을 하기로 했다","게임을 할 줄 안다"], a:0,
    exp:"<b>-(으)ㄹ 뿐이다</b> — \"faqat ..., xolos\". <b>게임만 한다</b> — faqat o'yin o'ynaydi. 할 줄 알다 — qila olmoq (bilmoq).",
    tr:["<b>-(으)ㄹ 뿐이다</b> — «только…, и всё»: <b>게임만 한다</b> — только играет. 할 줄 알다 — уметь.","<b>-(으)ㄹ 뿐이다</b> — \"just, only\": <b>게임만 한다</b> — only plays games. 할 줄 알다 — know how to."]});
  q({id:"u110", type:"U-R2", sec:"read", text:"이 정도 비라면 경기는 [[취소될 게 뻔하다]].", opts:["취소될 것이 분명하다","취소될 리가 없다","취소되기 어렵다","취소되면 좋겠다"], a:0,
    exp:"<b>-(으)ㄹ 게 뻔하다</b> — \"aniq ... bo'ladi\" (ochiq-oydin). Ma'nodosh: <b>-(으)ㄹ 것이 분명하다</b>. -(으)ㄹ 리가 없다 — teskari ma'no.",
    tr:["<b>-(으)ㄹ 게 뻔하다</b> — «наверняка, очевидно…». Синоним: <b>-(으)ㄹ 것이 분명하다</b>. -(으)ㄹ 리가 없다 — противоположное.","<b>-(으)ㄹ 게 뻔하다</b> — \"it's obvious that…\". Synonym: <b>-(으)ㄹ 것이 분명하다</b>; -(으)ㄹ 리가 없다 is the opposite."]});
  q({id:"u111", type:"U-R2", sec:"read", text:"회의 자료를 [[만드는 김에]] 보고서도 같이 정리했다.", opts:["만들면서 그 기회에","만들기 전에","만들기 위해서","만든 탓에"], a:0,
    exp:"<b>-는 김에</b> — \"...qilayotgan fursatda, shu bahonada\". Ma'nodosh: <b>그 기회에</b> — o'sha imkoniyatda. -기 위해서 — maqsad, -(으)ㄴ 탓에 — salbiy sabab.",
    tr:["<b>-는 김에</b> — «заодно, пользуясь случаем». Синоним: <b>그 기회에</b>. -기 위해서 — цель, -(으)ㄴ 탓에 — негативная причина.","<b>-는 김에</b> — \"while doing it, taking the chance\". Synonym: <b>그 기회에</b>."]});

  // [5~8] 무엇에 대한 글
  q({id:"u112", type:"U-R3", sec:"read", text:"하루 10분, 당신의 허리를 지켜 드립니다.\n바른 자세로 앉는 습관, 지금부터 시작하세요!", opts:["건강 관리","여행 안내","음식 광고","공연 소개"], a:0,
    exp:"\"Kuniga 10 daqiqa beliniz (허리)ni himoya qiladi\", \"to'g'ri o'tirish odati\" — bu <b>sog'liqni saqlash</b> haqidagi reklama. 자세 — holat, qomat.",
    tr:["«10 минут в день защитят вашу спину (허리)», «привычка правильно сидеть» — это о <b>заботе о здоровье</b>. 자세 — осанка.","\"10 minutes a day protects your back (허리)\", \"good sitting posture\" — this is about <b>health care</b>."]});
  q({id:"u113", type:"U-R3", sec:"read", text:"쓰지 않는 전등은 끄고, 플러그는 뽑아 주세요.\n작은 실천이 지구를 살립니다.", opts:["에너지 절약","교통 안전","화재 예방","건강 검진"], a:0,
    exp:"Chiroqni o'chirish, vilkani rozetkadan sug'urish — <b>energiyani tejash</b> (에너지 절약). 실천 — amalda qilish, 살리다 — qutqarmoq.",
    tr:["Выключать свет, вынимать вилку из розетки — это об <b>экономии энергии</b> (에너지 절약). 실천 — практика.","Turn off lights, unplug — it's about <b>saving energy</b> (에너지 절약). 실천 — putting into practice."]});
  q({id:"u114", type:"U-R3", sec:"read", text:"작품에 손대지 마십시오.\n사진 촬영은 가능하나 플래시는 사용할 수 없습니다.", opts:["관람 예절","상품 안내","이용 요금","모집 공고"], a:0,
    exp:"\"Asarlarga qo'l tekkizmang, chaqnoqsiz suratga olish mumkin\" — muzey/ko'rgazmada <b>tomosha qilish odobi</b> (관람 예절). 촬영 — suratga olish.",
    tr:["«Не трогайте экспонаты, фото без вспышки можно» — <b>правила поведения посетителей</b> (관람 예절). 촬영 — съёмка.","\"Don't touch the works; photos allowed without flash\" — <b>visitor etiquette</b> (관람 예절)."]});
  q({id:"u115", type:"U-R3", sec:"read", text:"30년 전통의 손맛 그대로!\n매일 아침 직접 끓인 국물로 정성을 담았습니다.", opts:["식당","병원","서점","세탁소"], a:0,
    exp:"\"30 yillik an'anaviy ta'm\", \"har kuni ertalab qaynatilgan sho'rva (국물)\" — bu <b>oshxona (식당)</b> reklamasi. 손맛 — qo'l mazasi, 정성 — mehr, e'tibor.",
    tr:["«Вкус с 30-летней традицией», «бульон (국물), сваренный каждое утро» — реклама <b>ресторана</b>. 손맛 — фирменный вкус.","\"30 years of tradition\", \"broth (국물) made fresh every morning\" — an ad for a <b>restaurant</b>."]});
  q({id:"u116", type:"U-R3", sec:"read", text:"함께할 가족을 기다립니다.\n버려진 강아지와 고양이에게 따뜻한 집을 선물해 주세요.", opts:["동물 입양","가구 판매","주택 분양","가족 여행"], a:0,
    exp:"\"Tashlab ketilgan kuchuk va mushuklarga iliq uy sovg'a qiling\" — <b>hayvonni asrab olish</b> (입양). 버려지다 — tashlab ketilmoq. 분양 — kvartira sotuvi (chalg'ituvchi).",
    tr:["«Подарите тёплый дом брошенным щенкам и котам» — о <b>пристройстве животных</b> (입양). 분양 — продажа квартир (отвлекающий вариант).","\"Give abandoned puppies and cats a warm home\" — <b>pet adoption</b> (입양). 분양 is housing sales, a distractor."]});

  // [9~12] 글·도표의 내용과 같은 것
  q({id:"u117", type:"U-R4", sec:"read", text:"<제5회 시민 마라톤 대회>\n· 일시: 10월 12일(일) 오전 8시 출발\n· 코스: 5km / 10km / 하프(21km)\n· 참가비: 2만 원 (기념 티셔츠 제공)\n· 신청: 9월 30일까지 누리집에서만 접수\n※ 초등학생 이하는 보호자와 함께 5km만 참가 가능",
    opts:["참가비를 내면 티셔츠를 받을 수 있다.","신청은 현장에서도 할 수 있다.","초등학생은 10km에 참가할 수 있다.","대회는 토요일에 열린다."], a:0,
    exp:"<b>참가비: 2만 원 (기념 티셔츠 제공)</b> — ishtirok to'lovi bilan esdalik futbolka beriladi. Ariza faqat saytda, boshlang'ich sinf o'quvchilari faqat 5 km, poyga yakshanba (일).",
    tr:["<b>참가비: 2만 원 (기념 티셔츠 제공)</b> — за взнос дают памятную футболку. Заявка только на сайте, школьники — только 5 км, забег в воскресенье (일).","<b>참가비 … (기념 티셔츠 제공)</b> — the fee includes a T-shirt. Online sign-up only, kids 5 km only, and it's on Sunday (일)."]});
  q({id:"u118", type:"U-R4", sec:"read", text:"<20대가 여가 시간에 하는 활동 (복수 응답)>\n1위 인터넷·동영상 시청 68%\n2위 친구 만나기 45%\n3위 운동 32%\n4위 독서 15%",
    opts:["20대가 가장 많이 하는 여가 활동은 동영상 시청이다.","친구를 만나는 사람이 운동하는 사람보다 적다.","책을 읽는 사람이 가장 많다.","운동을 하는 사람은 절반이 넘는다."], a:0,
    exp:"1-o'rin — internet va video ko'rish (68%). Do'st bilan uchrashish (45%) sportdan (32%) ko'p, kitob o'qish eng kam (15%), sport 50% dan kam. 여가 — bo'sh vaqt, 복수 응답 — bir nechta javob.",
    tr:["1-е место — интернет и видео (68%). Встречи с друзьями (45%) чаще спорта (32%), чтение — реже всего (15%). 여가 — досуг, 복수 응답 — несколько ответов.","Top is internet/video (68%). Meeting friends (45%) beats exercise (32%); reading is lowest (15%). 복수 응답 — multiple answers."]});
  q({id:"u119", type:"U-R4", sec:"read", text:"지난 주말 한 시골 마을에서 '마을 음악회'가 열렸다. 이번 음악회는 마을 주민들이 직접 준비한 것으로 초등학생부터 80대 노인까지 50여 명이 무대에 올랐다. 관객들은 공연이 끝난 후에도 자리를 떠나지 않고 박수를 보냈다.",
    opts:["주민들이 음악회를 직접 준비했다.","음악회는 도시에서 열렸다.","음악회에는 젊은 사람들만 참가했다.","공연이 끝나자 관객들이 바로 돌아갔다."], a:0,
    exp:"<b>마을 주민들이 직접 준비한 것으로</b> — konsertni qishloq aholisining o'zi tayyorlagan. Unda boshlang'ich sinf o'quvchisidan 80 yoshli keksagacha qatnashgan, tomoshabinlar ketmay qarsak chalgan.",
    tr:["<b>마을 주민들이 직접 준비한</b> — концерт подготовили сами жители. Участвовали от школьников до 80-летних, зрители не расходились и аплодировали.","<b>마을 주민들이 직접 준비한</b> — the villagers organized it themselves; performers ranged from kids to people in their 80s."]});
  q({id:"u120", type:"U-R4", sec:"read", text:"<무료 한국어 교실 수강생 모집>\n· 대상: 국내 거주 외국인 누구나\n· 기간: 3월 4일 ~ 5월 27일 (매주 화·목 저녁 7시)\n· 장소: 시민 문화 센터 3층\n· 신청: 전화 또는 방문 접수 (선착순 20명)",
    opts:["신청한 순서대로 20명만 수업을 들을 수 있다.","수업은 주말 오전에 있다.","수업료를 내야 한다.","인터넷으로만 신청할 수 있다."], a:0,
    exp:"<b>선착순 20명</b> — birinchi kelgan 20 kishi. Darslar seshanba-payshanba kechqurun, bepul (무료), ariza telefon yoki kelib topshiriladi. 모집 — qabul, 수강생 — tinglovchi.",
    tr:["<b>선착순 20명</b> — первые 20 записавшихся. Занятия по вторникам и четвергам вечером, бесплатно (무료), запись по телефону или лично.","<b>선착순 20명</b> — first come, first served, 20 people. Tue/Thu evenings, free (무료), by phone or in person."]});
  q({id:"u121", type:"U-R4", sec:"read", text:"최근 반려동물을 키우는 1인 가구가 늘면서 반려동물 돌봄 서비스가 인기를 끌고 있다. 주인이 출장이나 여행을 갈 때 집으로 찾아와 밥을 주고 산책을 시켜 주는 방식이다. 이용료는 한 번에 2만 원 정도이다.",
    opts:["주인이 집을 비울 때 반려동물을 돌봐 주는 서비스가 있다.","이 서비스는 반려동물을 다른 곳에 맡기는 방식이다.","혼자 사는 사람들이 줄고 있다.","이 서비스는 무료이다."], a:0,
    exp:"Egasi safarga ketganda <b>uyga kelib ovqat beradi va sayr qildiradi</b> — ya'ni uy bo'sh qolganda parvarish xizmati. Narxi bir marta ~20 ming von; yolg'iz yashovchilar ko'paymoqda (늘면서).",
    tr:["Когда хозяин уезжает, <b>приходят домой, кормят и выгуливают</b>. Цена ~20 000 вон за раз; одиноких домохозяйств становится больше (늘면서).","When owners travel, a sitter <b>comes to the home to feed and walk</b> the pet. About 20,000 won per visit; single households are rising."]});

  // [13~15] 순서 배열
  q({id:"u122", type:"U-R5", sec:"read", text:"(가) 그래서 요즘은 출근 전에 30분씩 걷기로 했다.\n(나) 나는 하루 종일 앉아서 일하는 직장인이다.\n(다) 걷기 시작한 지 한 달 만에 몸이 훨씬 가벼워졌다.\n(라) 그러다 보니 운동할 시간이 거의 없었다.",
    opts:["(나)-(라)-(가)-(다)","(나)-(가)-(라)-(다)","(라)-(나)-(다)-(가)","(가)-(나)-(라)-(다)"], a:0,
    exp:"Boshlanish — o'zini tanishtirish (나). Keyin oqibat: <b>그러다 보니</b> sport qilishga vaqt yo'q (라) → <b>그래서</b> yurishni boshladim (가) → bir oydan keyin natija (다). Bog'lovchilar (그래서, 그러다 보니) tartibni ko'rsatadi.",
    tr:["Начало — представление (나). Затем <b>그러다 보니</b> нет времени на спорт (라) → <b>그래서</b> начал ходить (가) → результат через месяц (다). Порядок подсказывают союзы.","Start with the intro (나), then <b>그러다 보니</b> no time to exercise (라) → <b>그래서</b> I started walking (가) → result after a month (다)."]});
  q({id:"u123", type:"U-R5", sec:"read", text:"(가) 하지만 막상 가 보니 사람이 너무 많아서 제대로 구경할 수 없었다.\n(나) 지난 주말에 유명한 벚꽃 축제에 다녀왔다.\n(다) 다음에는 사람이 적은 평일에 다시 가 보고 싶다.\n(라) 인터넷에서 사진을 보고 꼭 가 보고 싶었던 곳이었다.",
    opts:["(나)-(라)-(가)-(다)","(라)-(나)-(가)-(다)","(나)-(가)-(라)-(다)","(라)-(가)-(나)-(다)"], a:0,
    exp:"(나) voqea — festivalga bordim; (라) u yer haqida qo'shimcha: borishni juda xohlagandim; (가) <b>하지만 막상</b> — lekin borsam, odam ko'p edi; (다) keyingi reja. 막상 — aslida, amalda.",
    tr:["(나) съездил на фестиваль; (라) давно хотел туда; (가) <b>하지만 막상</b> — но на деле людей было слишком много; (다) план на будущее. 막상 — на самом деле.","(나) went to the festival; (라) had long wanted to; (가) <b>하지만 막상</b> — but when I got there it was packed; (다) future plan."]});
  q({id:"u124", type:"U-R5", sec:"read", text:"(가) 이런 이유로 일부 회사에서는 낮잠 시간을 따로 만들기도 한다.\n(나) 점심을 먹고 나면 졸음이 쏟아지는 경우가 많다.\n(다) 실제로 낮잠 시간을 도입한 회사의 업무 효율이 높아졌다는 조사도 있다.\n(라) 이때 15분 정도 짧게 자면 오후 업무에 집중하는 데 도움이 된다.",
    opts:["(나)-(라)-(가)-(다)","(나)-(가)-(라)-(다)","(라)-(나)-(가)-(다)","(가)-(나)-(다)-(라)"], a:0,
    exp:"(나) muammo: tushlikdan keyin uyqu bosadi → (라) <b>이때</b> 15 daqiqa uxlash yordam beradi → (가) <b>이런 이유로</b> ba'zi kompaniyalar tushki uyqu vaqtini joriy qiladi → (다) <b>실제로</b> — dalil.",
    tr:["(나) проблема: после обеда клонит в сон → (라) <b>이때</b> 15 минут сна помогают → (가) <b>이런 이유로</b> компании вводят время для сна → (다) <b>실제로</b> — доказательство.","(나) problem: drowsy after lunch → (라) <b>이때</b> a 15-minute nap helps → (가) <b>이런 이유로</b> some firms add nap time → (다) <b>실제로</b> evidence."]});
  q({id:"u125", type:"U-R5", sec:"read", text:"(가) 그 결과 이제는 마을의 대표 관광지가 되었다.\n(나) 몇 년 전까지만 해도 이 골목은 낡고 어두운 곳이었다.\n(다) 그런데 지역 예술가들이 벽에 그림을 그리기 시작했다.\n(라) 그림이 늘어나자 사진을 찍으러 오는 사람들도 많아졌다.",
    opts:["(나)-(다)-(라)-(가)","(다)-(나)-(라)-(가)","(나)-(라)-(다)-(가)","(다)-(라)-(나)-(가)"], a:0,
    exp:"(나) avvalgi holat → (다) <b>그런데</b> rassomlar devorga rasm chiza boshladi → (라) rasm ko'paygach odamlar keldi → (가) <b>그 결과</b> — natijada turistik joyga aylandi. 낡다 — eskirgan, 골목 — tor ko'cha.",
    tr:["(나) прежнее состояние → (다) <b>그런데</b> художники начали рисовать на стенах → (라) стало больше людей → (가) <b>그 결과</b> — стало достопримечательностью. 골목 — переулок.","(나) the old state → (다) <b>그런데</b> artists began painting → (라) visitors grew → (가) <b>그 결과</b> it became a landmark."]});

  // [16~18] 빈칸 (내용)
  q({id:"u126", type:"U-R6", sec:"read", text:"사람들은 보통 실패를 부정적으로 생각한다. 그러나 실패는 무엇이 부족했는지 알려 주는 좋은 기회가 되기도 한다. 실패의 원인을 분석하고 고쳐 나가다 보면 (    ).",
    opts:["다음에는 성공할 가능성이 높아진다","다시는 도전하지 않게 된다","실패를 피할 수 있다","다른 사람을 탓하게 된다"], a:0,
    exp:"Matn: muvaffaqiyatsizlik — kamchilikni ko'rsatadigan imkoniyat. Sababini tahlil qilib tuzatib borsang (<b>-다 보면</b>), natija ijobiy: <b>keyingi safar muvaffaqiyat ehtimoli oshadi</b>.",
    tr:["Неудача — шанс понять, чего не хватило. Если анализировать и исправлять (<b>-다 보면</b>), итог позитивный: <b>шансы на успех растут</b>.","Failure shows what was missing; analyzing and fixing it (<b>-다 보면</b>) leads to a positive result: <b>better chances next time</b>."]});
  q({id:"u127", type:"U-R6", sec:"read", text:"식물도 음악을 들으면 더 잘 자란다는 연구 결과가 있다. 연구팀은 같은 조건에서 한쪽 식물에는 하루 세 시간씩 클래식 음악을 들려주고, 다른 쪽에는 (    ). 한 달 후 음악을 들은 식물이 더 크게 자랐다.",
    opts:["아무 소리도 들려주지 않았다","물을 주지 않았다","더 많은 음악을 들려주었다","햇빛을 더 많이 주었다"], a:0,
    exp:"Tajriba: bir xil sharoitda faqat bitta farq bo'lishi kerak — musiqa. Demak ikkinchi guruhga <b>hech qanday tovush eshittirilmagan</b>. Suv yoki quyosh farqi tajribani buzadi.",
    tr:["В эксперименте условия одинаковы, отличается только музыка. Значит, второй группе <b>ничего не включали</b>. Разница в воде или солнце испортила бы опыт.","A fair experiment changes only one thing — music. So the other plants <b>heard no sound</b>; changing water or light would spoil it."]});
  q({id:"u128", type:"U-R6", sec:"read", text:"중고 거래가 늘고 있다. 필요 없는 물건을 버리지 않고 팔면 돈을 벌 수 있고, 사는 사람은 (    ). 또한 물건을 다시 사용하기 때문에 쓰레기를 줄이는 효과도 있다.",
    opts:["새 물건보다 싸게 살 수 있다","물건을 비싸게 팔 수 있다","새 물건만 살 수 있다","쓰레기를 더 많이 버린다"], a:0,
    exp:"Sotuvchi foyda ko'radi, <b>xaridor esa</b> — yangisidan <b>arzonroq oladi</b>. Gap har ikki tomon foydasi haqida. 중고 거래 — ishlatilgan narsalar savdosi.",
    tr:["Продавец зарабатывает, а <b>покупатель покупает дешевле нового</b>. 중고 거래 — торговля б/у вещами.","The seller earns money and <b>the buyer pays less than for new</b>. 중고 거래 — secondhand trading."]});
  q({id:"u129", type:"U-R6", sec:"read", text:"아이들은 어른의 행동을 보고 배운다. 부모가 아무리 '책을 읽어라'라고 말해도 정작 부모가 책을 읽지 않으면 아이도 책을 가까이하지 않는다. 아이에게 좋은 습관을 길러 주고 싶다면 (    ).",
    opts:["부모가 먼저 모범을 보여야 한다","아이에게 더 자주 말해야 한다","책을 많이 사 주어야 한다","아이를 혼내야 한다"], a:0,
    exp:"Asosiy g'oya: bolalar kattalarning <b>xatti-harakatidan</b> o'rganadi. Demak yaxshi odat uchun <b>ota-ona birinchi bo'lib o'rnak ko'rsatishi kerak</b>. 정작 — aslida, 모범 — o'rnak.",
    tr:["Дети учатся на <b>поведении</b> взрослых. Значит, <b>родители должны первыми подавать пример</b>. 정작 — на деле, 모범 — пример.","Kids learn from adults' <b>actions</b>, so <b>parents must set the example first</b>. 모범 — model, example."]});
  q({id:"u130", type:"U-R6", sec:"read", text:"여름철에는 음식이 쉽게 상한다. 따라서 음식을 오래 보관하려면 (    ). 또한 한 번 꺼낸 음식은 다시 넣지 말고 되도록 빨리 먹는 것이 좋다.",
    opts:["반드시 냉장고에 넣어 두어야 한다","햇빛이 드는 곳에 두어야 한다","뚜껑을 열어 두어야 한다","따뜻한 곳에 보관해야 한다"], a:0,
    exp:"Yozda ovqat tez buziladi (<b>상하다</b>), shuning uchun uzoq saqlash uchun <b>albatta muzlatgichga qo'yish kerak</b>. 보관하다 — saqlamoq, 되도록 — iloji boricha.",
    tr:["Летом еда быстро портится (<b>상하다</b>), поэтому <b>обязательно хранить в холодильнике</b>. 보관하다 — хранить, 되도록 — по возможности.","Food spoils (<b>상하다</b>) fast in summer, so it <b>must be kept in the fridge</b>. 보관하다 — to store."]});

  // [25~27] 신문 기사 제목
  q({id:"u131", type:"U-R7", sec:"read", text:"폭설에 출근길 '거북이 운행'… 지각 사태 잇따라",
    opts:["눈이 많이 와서 차들이 천천히 다녀 회사에 늦는 사람이 많았다.","거북이 때문에 도로가 막혔다.","눈이 와서 회사가 문을 닫았다.","출근 시간이 앞당겨졌다."], a:0,
    exp:"<b>폭설</b> — kuchli qor, <b>거북이 운행</b> — \"toshbaqa harakati\", ya'ni juda sekin yurish (ko'chma ma'no), <b>지각 사태 잇따라</b> — kechikishlar ketma-ket. Sarlavhalarda ko'chma iboralar ko'p!",
    tr:["<b>폭설</b> — сильный снегопад, <b>거북이 운행</b> — «черепашье движение», т.е. очень медленно (переносно), <b>지각 사태 잇따라</b> — массовые опоздания.","<b>폭설</b> — heavy snow, <b>거북이 운행</b> — \"turtle traffic\", i.e. crawling (figurative), <b>지각 사태 잇따라</b> — a wave of late arrivals."]});
  q({id:"u132", type:"U-R7", sec:"read", text:"고물가에 '집밥' 인기… 마트 채소 매출 껑충",
    opts:["물가가 올라 집에서 밥을 해 먹는 사람이 늘어 채소가 많이 팔렸다.","채소 값이 크게 내렸다.","식당 매출이 크게 늘었다.","마트가 채소 판매를 그만두었다."], a:0,
    exp:"<b>고물가</b> — narxlar yuqori, <b>집밥 인기</b> — uyda ovqat qilish ommalashdi, <b>매출 껑충</b> — savdo keskin oshdi. 껑충 — sakrab (keskin o'sish).",
    tr:["<b>고물가</b> — высокие цены, <b>집밥 인기</b> — популярность домашней еды, <b>매출 껑충</b> — продажи резко выросли. 껑충 — скачком.","<b>고물가</b> — high prices, <b>집밥 인기</b> — home cooking is popular, <b>매출 껑충</b> — sales jumped."]});
  q({id:"u133", type:"U-R7", sec:"read", text:"신인 감독 첫 작품, 관객 100만 돌파 '돌풍'",
    opts:["새로 데뷔한 감독의 첫 영화가 관객 100만 명을 넘으며 큰 인기를 얻고 있다.","유명 감독이 100번째 영화를 만들었다.","영화관에 바람이 많이 불었다.","관객들이 영화를 보고 실망했다."], a:0,
    exp:"<b>신인 감독</b> — yangi rejissyor, <b>돌파</b> — oshib o'tish, <b>돌풍</b> — \"bo'ron\", ya'ni kutilmagan katta muvaffaqiyat (ko'chma ma'no).",
    tr:["<b>신인 감독</b> — режиссёр-дебютант, <b>돌파</b> — превысить, <b>돌풍</b> — «вихрь», т.е. неожиданный огромный успех.","<b>신인 감독</b> — debut director, <b>돌파</b> — surpass, <b>돌풍</b> — \"gust\", i.e. a surprise hit."]});
  q({id:"u134", type:"U-R7", sec:"read", text:"전기차 충전소 부족 '발 동동'… 정부, 연내 2배 확대",
    opts:["충전소가 모자라 운전자들이 불편을 겪자 정부가 올해 안에 충전소를 두 배로 늘리기로 했다.","전기차 판매가 두 배로 줄었다.","정부가 충전소를 없애기로 했다.","운전자들이 충전소에서 춤을 추었다."], a:0,
    exp:"<b>발(을) 동동 구르다</b> — tashvishlanib, nima qilishni bilmay qolmoq (ibora). <b>연내</b> — yil ichida, <b>2배 확대</b> — ikki baravar kengaytirish.",
    tr:["<b>발을 동동 구르다</b> — нервничать, не находя выхода (идиома). <b>연내</b> — в течение года, <b>2배 확대</b> — расширить вдвое.","<b>발을 동동 구르다</b> — be anxious and helpless (idiom). <b>연내</b> — within the year, <b>2배 확대</b> — double the number."]});

  // [28~31] 빈칸 (긴 글)
  q({id:"u135", type:"U-R8", sec:"read", text:"과거에는 오래 한 회사에 다니는 것이 미덕으로 여겨졌다. 그러나 최근 젊은 세대는 (    ) 더 중요하게 생각한다. 이들은 월급이 조금 적더라도 자신의 능력을 키울 수 있고 일과 삶의 균형을 지킬 수 있는 회사를 찾아 망설임 없이 직장을 옮긴다.",
    opts:["개인의 성장과 삶의 질을","한 회사에 오래 다니는 것을","높은 월급을","회사의 규모를"], a:0,
    exp:"Matnda yoshlar maosh kam bo'lsa ham <b>qobiliyatini o'stirish</b> va <b>ish-hayot muvozanati</b>ni tanlaydi deyilgan → <b>shaxsiy o'sish va hayot sifati</b>. 미덕 — fazilat, 망설임 없이 — ikkilanmasdan.",
    tr:["Молодёжь выбирает <b>развитие способностей</b> и <b>баланс работы и жизни</b> даже при меньшей зарплате → <b>личный рост и качество жизни</b>. 미덕 — добродетель.","Young workers pick <b>growth</b> and <b>work-life balance</b> over pay → <b>personal growth and quality of life</b>. 미덕 — virtue."]});
  q({id:"u136", type:"U-R8", sec:"read", text:"사람의 기억은 생각보다 정확하지 않다. 같은 사건을 경험한 사람들도 시간이 지나면 서로 다르게 기억하는 경우가 많다. 이는 우리가 기억을 떠올릴 때마다 (    ) 때문이다. 즉, 기억은 그대로 저장된 사진이 아니라 떠올릴 때마다 새로 만들어지는 이야기에 가깝다.",
    opts:["그 내용을 조금씩 다시 구성하기","기억이 완전히 사라지기","항상 똑같이 떠올리기","다른 사람의 말을 듣지 않기"], a:0,
    exp:"Oxirgi gap kalit: xotira — <b>har eslaganda qaytadan tuziladigan hikoya</b>. Demak sabab: eslaganimizda mazmunni <b>biroz qayta tuzamiz</b>. 즉 — ya'ni, 떠올리다 — eslamoq.",
    tr:["Ключ — последнее предложение: память — <b>рассказ, создаваемый заново при каждом воспоминании</b>. Значит, мы <b>понемногу перестраиваем</b> содержание. 즉 — то есть.","The last sentence is the key: memory is <b>a story rebuilt each time</b>, so we <b>reconstruct it a little</b> whenever we recall it."]});
  q({id:"u137", type:"U-R8", sec:"read", text:"도시의 가로수는 단순히 거리를 아름답게 하는 역할만 하는 것이 아니다. 나무는 여름철 그늘을 만들어 도시의 온도를 낮추고 자동차에서 나오는 먼지를 흡수한다. 또한 (    ) 소음을 줄여 주는 효과도 있다. 이 때문에 많은 도시들이 가로수를 늘리는 데 힘쓰고 있다.",
    opts:["나뭇잎이 소리를 막아","나무를 베어 내면","도로를 넓혀서","차가 많이 다녀서"], a:0,
    exp:"Daraxtlarning foydalari sanalmoqda (<b>또한</b> — shuningdek). Shovqinni kamaytirish sababi — <b>barglar tovushni to'sadi</b>. 가로수 — ko'cha daraxtlari, 흡수하다 — yutmoq.",
    tr:["Перечисляется польза деревьев (<b>또한</b> — также). Шум уменьшается, потому что <b>листья задерживают звук</b>. 가로수 — уличные деревья.","The text lists benefits (<b>또한</b> — also). Noise drops because <b>leaves block sound</b>. 가로수 — street trees."]});
  q({id:"u138", type:"U-R8", sec:"read", text:"광고는 소비자에게 상품의 정보를 알려 준다는 점에서 유용하다. 하지만 광고가 항상 사실만을 전달하는 것은 아니다. 광고의 목적은 결국 상품을 파는 것이기 때문에 (    ) 단점은 감추는 경우가 많다. 따라서 소비자는 광고를 그대로 믿기보다 여러 정보를 비교해 보고 판단해야 한다.",
    opts:["장점은 크게 보여 주고","가격은 정확히 알려 주고","단점을 먼저 설명하고","다른 상품을 소개하고"], a:0,
    exp:"Reklama maqsadi — sotish, shuning uchun <b>afzalliklarni bo'rttirib ko'rsatadi</b>, kamchiliklarni yashiradi (감추다). Juft qarama-qarshilik: 장점 ↔ 단점.",
    tr:["Цель рекламы — продать, поэтому она <b>преувеличивает плюсы</b> и скрывает (감추다) минусы. Пара: 장점 ↔ 단점.","Ads aim to sell, so they <b>play up the strengths</b> and hide (감추다) weaknesses — the pair 장점 ↔ 단점."]});

  // [32~34] 내용 일치 (긴 글)
  q({id:"u139", type:"U-R9", sec:"read", text:"한글은 1443년 세종대왕이 백성들이 쉽게 글을 읽고 쓸 수 있도록 만든 문자이다. 당시에는 한자를 사용했는데 한자는 배우기가 어려워 일반 백성들은 글을 알기 어려웠다. 한글은 자음과 모음을 조합하는 방식으로 되어 있어 짧은 시간에 배울 수 있다. 2009년에는 문자가 없던 인도네시아의 한 부족이 자신들의 언어를 적는 데 한글을 사용하기도 했다.",
    opts:["한글은 백성들이 글을 쉽게 쓰게 하려고 만들어졌다.","한글이 만들어지기 전에도 백성들은 글을 쉽게 읽었다.","한글은 배우는 데 시간이 오래 걸린다.","한글은 한국에서만 사용된다."], a:0,
    exp:"<b>백성들이 쉽게 글을 읽고 쓸 수 있도록 만든 문자</b> — xalq oson o'qib-yozishi uchun yaratilgan. Ilgari xanja qiyin edi, hangul tez o'rganiladi, Indoneziyadagi bir qabila ham foydalangan.",
    tr:["<b>백성들이 쉽게 … 만든 문자</b> — создан, чтобы народ мог легко читать и писать. Раньше иероглифы были трудны, хангыль учится быстро, его использовало и племя в Индонезии.","<b>백성들이 쉽게 … 만든 문자</b> — made so common people could read and write easily; it's quick to learn and was even adopted by a tribe in Indonesia."]});
  q({id:"u140", type:"U-R9", sec:"read", text:"커피 찌꺼기는 대부분 쓰레기로 버려진다. 그런데 커피 찌꺼기에는 냄새를 없애는 성분이 있어서 말려서 신발장이나 냉장고에 넣어 두면 탈취제로 쓸 수 있다. 또한 식물의 비료로도 활용할 수 있다. 다만 젖은 상태로 두면 곰팡이가 생기기 쉬우므로 반드시 잘 말려서 사용해야 한다.",
    opts:["커피 찌꺼기는 말려서 써야 한다.","커피 찌꺼기는 젖은 채로 쓰는 것이 좋다.","커피 찌꺼기는 비료로 쓸 수 없다.","커피 찌꺼기는 대부분 재활용되고 있다."], a:0,
    exp:"<b>반드시 잘 말려서 사용해야 한다</b> — albatta yaxshi quritib ishlatish kerak, aks holda mog'or (곰팡이) bosadi. Ko'p qismi chiqindiga tashlanadi, o'g'it sifatida ham ishlatish mumkin.",
    tr:["<b>반드시 잘 말려서 사용해야 한다</b> — обязательно хорошо высушить, иначе появится плесень (곰팡이). Большую часть выбрасывают, можно использовать и как удобрение.","<b>반드시 잘 말려서 …</b> — it must be dried well, or mould (곰팡이) forms. Most is thrown away; it also works as fertilizer."]});
  q({id:"u141", type:"U-R9", sec:"read", text:"'번아웃 증후군'은 한 가지 일에 지나치게 몰두하던 사람이 신체적·정신적으로 극도의 피로를 느끼며 무기력해지는 현상이다. 주로 책임감이 강하고 완벽을 추구하는 사람에게 많이 나타난다. 이를 예방하려면 일과 휴식의 경계를 분명히 하고, 일 이외에 즐길 수 있는 취미를 갖는 것이 도움이 된다.",
    opts:["취미를 갖는 것은 번아웃 예방에 도움이 된다.","번아웃은 책임감이 약한 사람에게 주로 나타난다.","번아웃은 신체적인 피로와는 관계가 없다.","번아웃을 막으려면 일과 휴식을 구분하지 않아야 한다."], a:0,
    exp:"<b>일 이외에 즐길 수 있는 취미를 갖는 것이 도움이 된다</b> — ishdan tashqari sevimli mashg'ulot foydali. Ko'pincha mas'uliyatli, mukammallikka intiluvchilarda uchraydi. 몰두하다 — berilib ketmoq, 무기력 — holsizlik.",
    tr:["<b>… 취미를 갖는 것이 도움이 된다</b> — хобби помогает. Чаще у ответственных перфекционистов. 몰두하다 — погружаться, 무기력 — апатия.","<b>… 취미를 갖는 것이 도움이 된다</b> — having hobbies helps. It mostly hits responsible perfectionists. 무기력 — lethargy."]});
  q({id:"u142", type:"U-R9", sec:"read", text:"조선 시대의 '암행어사'는 왕의 명령을 받아 신분을 숨기고 지방을 돌아다니며 관리들이 일을 바르게 하는지 살폈다. 이들은 평범한 백성처럼 옷을 입고 다니다가 잘못을 저지른 관리를 발견하면 '마패'를 보이며 신분을 밝히고 벌을 주었다.",
    opts:["암행어사는 신분을 숨기고 관리들을 감시했다.","암행어사는 화려한 옷을 입고 다녔다.","암행어사는 백성들에게 벌을 주는 일을 했다.","마패는 백성들이 가지고 다니던 물건이다."], a:0,
    exp:"<b>신분을 숨기고 ... 관리들이 일을 바르게 하는지 살폈다</b> — kimligini yashirib, amaldorlarni kuzatgan. Oddiy kiyimda yurgan, jazoni <b>amaldorlarga</b> bergan. 마패 — amtxeng-osaning nishoni.",
    tr:["<b>신분을 숨기고 … 살폈다</b> — скрывая личность, проверял чиновников. Ходил в простой одежде, наказывал <b>чиновников</b>. 마패 — знак ревизора.","<b>신분을 숨기고 … 살폈다</b> — he hid his identity and watched over officials; dressed plainly and punished <b>officials</b>. 마패 — his badge."]});
  q({id:"u143", type:"U-R9", sec:"read", text:"최근 '제로 웨이스트' 가게가 늘고 있다. 이 가게에서는 세제나 곡물 같은 물건을 포장 없이 무게 단위로 판다. 손님은 집에서 용기를 가져와 필요한 만큼만 담아 가면 된다. 처음에는 불편하다는 반응도 있었지만 쓰레기를 줄일 수 있다는 점 때문에 단골손님이 꾸준히 늘고 있다.",
    opts:["손님은 자신의 용기에 물건을 담아 간다.","이 가게는 물건을 상자에 담아 판다.","이 가게를 찾는 손님이 줄고 있다.","처음부터 불편하다는 사람이 없었다."], a:0,
    exp:"<b>손님은 집에서 용기를 가져와 필요한 만큼만 담아 가면 된다</b> — mijoz idishini uydan olib keladi. Qadoqsiz (포장 없이) sotiladi, doimiy mijozlar (단골) ko'paymoqda.",
    tr:["<b>손님은 집에서 용기를 가져와 …</b> — покупатель приносит свою тару. Продают без упаковки (포장 없이), постоянных клиентов (단골) больше.","<b>손님은 집에서 용기를 가져와 …</b> — customers bring their own containers; goods are sold unpackaged and regulars (단골) keep growing."]});

  // [35~38] 주제
  q({id:"u144", type:"U-R10", sec:"read", text:"아이들이 스마트폰을 너무 오래 사용하는 것을 걱정하는 부모가 많다. 하지만 무조건 사용을 금지하면 아이들은 몰래 사용하게 되고 부모와의 관계도 나빠질 수 있다. 그보다는 아이와 함께 사용 시간과 규칙을 정하고 스스로 지키도록 하는 것이 효과적이다.",
    opts:["아이와 함께 스마트폰 사용 규칙을 정하는 것이 효과적이다.","아이들의 스마트폰 사용을 완전히 금지해야 한다.","스마트폰은 아이들에게 해롭지 않다.","부모와 아이의 관계는 중요하지 않다."], a:0,
    exp:"Mavzu odatda oxirgi gapda: <b>그보다는 ... 함께 ... 규칙을 정하고 ... 효과적이다</b> — bola bilan birga qoida tuzish samarali. 무조건 — so'zsiz, 몰래 — yashirincha.",
    tr:["Тема обычно в конце: <b>그보다는 … 함께 규칙을 정하고 … 효과적이다</b> — эффективнее вместе с ребёнком установить правила. 무조건 — безоговорочно, 몰래 — тайком.","The topic is in the last sentence: <b>그보다는 … 함께 규칙을 정하고 …</b> — setting rules together works better. 몰래 — secretly."]});
  q({id:"u145", type:"U-R10", sec:"read", text:"많은 사람들이 성공한 사람들은 타고난 재능이 있다고 생각한다. 그러나 여러 연구에 따르면 한 분야에서 뛰어난 성과를 낸 사람들의 공통점은 재능보다 꾸준한 노력이었다. 매일 조금씩이라도 포기하지 않고 연습하는 것이 결국 큰 차이를 만든다.",
    opts:["성공을 위해서는 재능보다 꾸준한 노력이 중요하다.","성공한 사람들은 모두 재능을 타고났다.","연습은 많이 할 필요가 없다.","한 분야에서 성공하기는 쉽다."], a:0,
    exp:"<b>그러나</b> dan keyingi gap — asosiy fikr: muvaffaqiyatning umumiy jihati <b>iste'doddan ko'ra muntazam mehnat</b>. 타고나다 — tug'ma, 꾸준하다 — muntazam, doimiy.",
    tr:["Главная мысль после <b>그러나</b>: общее у успешных людей — <b>упорный труд важнее таланта</b>. 타고나다 — врождённый, 꾸준하다 — постоянный.","The idea after <b>그러나</b>: what successful people share is <b>steady effort more than talent</b>. 꾸준하다 — steady."]});
  q({id:"u146", type:"U-R10", sec:"read", text:"외래어를 무분별하게 사용하면 세대 간에 의사소통이 어려워질 수 있다. 특히 공공 기관의 안내문이나 뉴스에서 어려운 외래어를 쓰면 노인들은 중요한 정보를 이해하지 못하게 된다. 누구나 쉽게 이해할 수 있도록 가능한 한 우리말로 바꾸어 쓰려는 노력이 필요하다.",
    opts:["공공 정보는 누구나 이해할 수 있는 쉬운 말로 전달해야 한다.","외래어는 노인들이 더 잘 이해한다.","뉴스에서는 외래어를 많이 써야 한다.","세대 간 의사소통은 원래 어렵다."], a:0,
    exp:"Muallif fikri oxirida: <b>누구나 쉽게 이해할 수 있도록 ... 우리말로 바꾸어 쓰려는 노력이 필요하다</b> — rasmiy ma'lumot hamma tushunadigan oddiy tilda bo'lishi kerak. 외래어 — o'zlashma so'z, 무분별하게 — o'ylamay.",
    tr:["Мысль автора в конце: <b>… 우리말로 바꾸어 쓰려는 노력이 필요하다</b> — официальная информация должна быть понятна всем. 외래어 — заимствования, 무분별하게 — бездумно.","The author's point at the end: public information should be in <b>plain words everyone understands</b>. 외래어 — loanwords."]});
  q({id:"u147", type:"U-R10", sec:"read", text:"여행을 가면 유명한 관광지를 바쁘게 돌아다니며 사진만 찍고 오는 경우가 많다. 하지만 진정한 여행의 즐거움은 그 지역 사람들의 생활을 가까이에서 느끼는 데 있다. 시장에서 현지 음식을 먹어 보고 골목길을 천천히 걸어 보는 것이 더 오래 기억에 남는다.",
    opts:["여행은 현지의 생활을 가까이에서 경험할 때 더 즐겁다.","여행에서는 사진을 많이 찍어야 한다.","유명한 관광지만 가는 것이 좋다.","여행은 바쁘게 다녀야 한다."], a:0,
    exp:"<b>하지만 진정한 여행의 즐거움은 ... 생활을 가까이에서 느끼는 데 있다</b> — haqiqiy zavq mahalliy hayotni yaqindan his qilishda. 현지 — mahalliy, 진정한 — haqiqiy.",
    tr:["<b>하지만 진정한 여행의 즐거움은 …</b> — настоящая радость — почувствовать местную жизнь вблизи. 현지 — местный, 진정한 — настоящий.","<b>하지만 진정한 여행의 즐거움은 …</b> — the real joy is experiencing local life up close. 현지 — local."]});

  // [39~41] 문장 넣기
  q({id:"u148", type:"U-R11", sec:"read", fixed:true, text:"<보기> 이처럼 작은 친절이 다른 사람의 하루를 바꿀 수도 있다.\n\n오늘 아침 버스에서 한 학생이 할머니께 자리를 양보했다. ( ㉠ ) 할머니는 고맙다며 학생에게 사탕을 건넸다. ( ㉡ ) 그 모습을 본 승객들의 얼굴에도 미소가 번졌다. ( ㉢ ) 나도 오늘 하루는 누군가에게 먼저 친절을 베풀어 보기로 했다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:2,
    exp:"<보기> gapi <b>이처럼</b> (\"mana shunday\") bilan boshlanadi — u avvalgi voqealarni xulosalaydi. Voqea (o'rin bo'shatish, yo'lovchilar tabassumi) tugagach va muallif qaroridan oldin — <b>㉢</b>.",
    tr:["Предложение <보기> начинается с <b>이처럼</b> («вот так») — оно подводит итог описанному. Ставим после истории и перед решением автора — <b>㉢</b>.","The <보기> sentence starts with <b>이처럼</b> (\"like this\"), summing up the story, so it goes after the scene and before the writer's decision — <b>㉢</b>."]});
  q({id:"u149", type:"U-R11", sec:"read", fixed:true, text:"<보기> 하지만 지나치게 많이 마시면 오히려 몸에 해로울 수 있다.\n\n물은 우리 몸의 약 70%를 차지한다. ( ㉠ ) 그래서 하루에 충분한 양의 물을 마시는 것이 건강에 좋다고 알려져 있다. ( ㉡ ) 짧은 시간에 너무 많은 물을 마시면 혈액 속 나트륨 농도가 낮아져 두통이나 구토가 생길 수 있기 때문이다. ( ㉢ ) 따라서 자신의 몸 상태에 맞게 적당히 마시는 것이 중요하다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:1,
    exp:"<보기>: \"<b>Lekin</b> haddan tashqari ko'p ichilsa, zararli\". Bu \"ko'p suv ichish foydali\" gapidan keyin, va zarar <b>sababini</b> tushuntiruvchi gapdan (-기 때문이다) oldin turishi kerak → <b>㉡</b>.",
    tr:["<보기>: «<b>Но</b> слишком много пить вредно». Ставим после «пить достаточно воды полезно» и перед объяснением причины (-기 때문이다) → <b>㉡</b>.","<보기> says \"<b>but</b> too much can harm you\" — after \"drinking enough water is healthy\" and before the reason (-기 때문이다) → <b>㉡</b>."]});
  q({id:"u150", type:"U-R11", sec:"read", fixed:true, text:"<보기> 그 덕분에 지금은 누구나 쉽게 책을 구할 수 있게 되었다.\n\n옛날에는 책을 한 권 만들려면 사람이 직접 손으로 베껴 써야 했다. ( ㉠ ) 그래서 책은 매우 비싸고 귀한 물건이었다. ( ㉡ ) 그러다 인쇄 기술이 발전하면서 같은 책을 짧은 시간에 많이 만들 수 있게 되었다. ( ㉢ ) 책이 널리 보급되자 사람들의 지식 수준도 함께 높아졌다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:2,
    exp:"<보기> <b>그 덕분에</b> (\"shu tufayli\") — ijobiy natija sababi oldinda bo'lishi kerak: bosma texnologiyasi rivojlandi → shu tufayli kitob hammaga ochiq bo'ldi → <b>㉢</b>. 베끼다 — ko'chirib yozmoq, 보급 — tarqalish.",
    tr:["<보기> с <b>그 덕분에</b> («благодаря этому») — причина должна стоять перед ним: развилась печать → благодаря этому книги стали доступны → <b>㉢</b>. 베끼다 — переписывать.","<보기> begins <b>그 덕분에</b> (\"thanks to that\"), so it follows its cause — the rise of printing → <b>㉢</b>. 베끼다 — to copy by hand."]});
  q({id:"u151", type:"U-R11", sec:"read", fixed:true, text:"<보기> 예를 들어 '사과'를 외울 때 빨간 사과를 먹는 장면을 떠올리는 식이다.\n\n외국어 단어를 오래 기억하는 방법 중 하나는 이미지를 활용하는 것이다. ( ㉠ ) 단어를 소리로만 외우는 것보다 그림이나 장면과 함께 기억하면 훨씬 오래 남는다. ( ㉡ ) 또 새로 배운 단어로 직접 문장을 만들어 보는 것도 도움이 된다. ( ㉢ ) 이렇게 다양한 방법을 함께 쓰면 단어 공부가 즐거워진다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:1,
    exp:"<보기> <b>예를 들어</b> — misol. U \"so'zni rasm/sahna bilan eslash\" haqidagi gapdan keyin turishi kerak, chunki aynan o'sha usulga misol → <b>㉡</b>. 또 (yana) dan keyin boshqa usul boshlanadi.",
    tr:["<보기> с <b>예를 들어</b> — пример. Он должен идти сразу после фразы о запоминании с картинкой → <b>㉡</b>. После 또 начинается другой способ.","<보기> starts <b>예를 들어</b> (for example) — it must follow the sentence about remembering words with images → <b>㉡</b>."]});

  // [19~24, 42~50] 묶음 (읽기)
  set({id:"us11", type:"U-R12", sec:"read",
    text:"요즘 회사들은 직원을 뽑을 때 학력이나 자격증보다 실제 업무 능력을 더 중요하게 본다. 그래서 서류 심사 대신 직접 과제를 주고 해결 과정을 평가하는 회사가 늘고 있다. (    ) 지원자들도 단순히 점수를 높이기보다 실무 경험을 쌓는 데 더 많은 시간을 쓰고 있다. 전문가들은 이러한 변화가 앞으로 더 확대될 것으로 보고 있다.",
    qs:[
      {id:"u251", ask:"(    )에 들어갈 알맞은 것을 고르십시오.", opts:["이에 따라","그런데도","반면에","예를 들면"], a:0,
       exp:"Kompaniyalar o'zgardi → <b>shunga ko'ra</b> nomzodlar ham o'zgarmoqda. Sabab-natija bog'lovchisi: <b>이에 따라</b>. 그런데도 — shunga qaramay, 반면에 — aksincha.",
       tr:["Компании изменились → <b>соответственно</b> меняются и кандидаты: <b>이에 따라</b>. 그런데도 — несмотря на это, 반면에 — напротив.","Companies changed → <b>accordingly</b> applicants change too: <b>이에 따라</b>. 그런데도 — even so, 반면에 — in contrast."]},
      {id:"u252", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["과제를 통해 지원자를 평가하는 회사가 많아지고 있다.","회사들은 자격증을 가장 중요하게 본다.","지원자들은 점수를 높이는 데만 집중한다.","전문가들은 이 변화가 곧 사라질 것이라고 본다."], a:0,
       exp:"<b>직접 과제를 주고 해결 과정을 평가하는 회사가 늘고 있다</b> — topshiriq orqali baholaydigan kompaniyalar ko'paymoqda. Mutaxassislar o'zgarish <b>kengayadi</b> deb hisoblaydi.",
       tr:["<b>직접 과제를 주고 … 평가하는 회사가 늘고 있다</b> — компаний, оценивающих через задание, становится больше. Эксперты считают, что тенденция <b>расширится</b>.","<b>직접 과제를 주고 … 늘고 있다</b> — more firms assess candidates by assignments; experts expect this to <b>expand</b>."]}
    ]});
  set({id:"us12", type:"U-R12", sec:"read",
    text:"할머니 댁 마당에는 커다란 감나무가 한 그루 있었다. 어린 시절 나는 가을이 되면 동생과 함께 그 나무에 올라가 감을 따곤 했다. 할머니는 높은 곳에 달린 감은 따지 말라고 하셨다. 겨울에 먹을 것이 없는 새들을 위해 남겨 두어야 한다는 것이었다. 그때는 그 말씀이 이해가 되지 않아 [[괜히 아깝다는 생각만 했다]]. 하지만 어른이 된 지금, 나눔이란 내가 가진 것이 많을 때가 아니라 조금 부족할 때도 할 수 있는 것이라는 할머니의 가르침이 가슴에 와닿는다.",
    qs:[
      {id:"u253", ask:"밑줄 친 부분에 나타난 '나'의 심정으로 알맞은 것을 고르십시오.", opts:["서운하다","만족스럽다","자랑스럽다","부끄럽다"], a:0,
       exp:"Bolalikda xurmo qushlarga qoldirilgani <b>achinarli, afsus</b> (아깝다) tuyulgan — ya'ni <b>xafa, ko'ngli to'lmagan</b> (서운하다). 부끄럽다 — uyalish (hozir, kattalikda his qilishi mumkin, lekin o'shanda emas).",
       tr:["В детстве ему было <b>жаль</b> (아깝다) оставлять хурму птицам — <b>обидно, досадно</b> (서운하다). 부끄럽다 — стыдно (это не о том моменте).","As a child he felt it was <b>a waste</b> (아깝다) — i.e. <b>disappointed, sorry</b> (서운하다). 부끄럽다 (ashamed) doesn't fit that moment."]},
      {id:"u254", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["할머니는 새들을 위해 감 일부를 남겨 두었다.","나는 어릴 때 할머니의 말씀을 바로 이해했다.","감나무는 우리 집 마당에 있었다.","할머니는 감을 따지 말라고 하셨지만 이유를 말하지 않았다."], a:0,
       exp:"<b>겨울에 먹을 것이 없는 새들을 위해 남겨 두어야 한다</b> — buvisi baland shoxdagi xurmolarni qushlar uchun qoldirgan. O'shanda tushunmagan, daraxt buvisining hovlisida edi.",
       tr:["<b>… 새들을 위해 남겨 두어야 한다</b> — бабушка оставляла верхнюю хурму птицам на зиму. Тогда он не понимал, дерево росло во дворе бабушки.","<b>… 새들을 위해 남겨 두어야 한다</b> — grandma left the high fruit for the birds. He didn't understand then; the tree was at her house."]}
    ]});
  set({id:"us13", type:"U-R12", sec:"read",
    text:"동물원의 역할에 대해 의견이 엇갈리고 있다. 동물원이 멸종 위기 동물을 보호하고 사람들에게 동물에 대한 지식을 알려 주는 교육의 장이라는 의견이 있다. 반면 좁은 우리에 갇힌 동물들이 스트레스를 받아 같은 행동을 반복하는 등 이상 행동을 보인다는 비판도 있다. 이에 일부 동물원은 동물이 사는 자연환경과 비슷한 넓은 공간을 만들고, 관람객 수를 제한하는 등 (    ) 노력을 하고 있다. 동물원이 앞으로도 존재하려면 '보여 주기 위한 곳'이 아니라 '동물을 위한 곳'으로 바뀌어야 할 것이다.",
    qs:[
      {id:"u255", ask:"(    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.", opts:["동물의 복지를 높이기 위한","관람객을 늘리기 위한","입장료를 올리기 위한","동물의 수를 늘리기 위한"], a:0,
       exp:"Keng tabiiy joy va tomoshabinlarni cheklash — <b>hayvonlar farovonligi (복지)</b>ni oshirish uchun. Tomoshabinni ko'paytirish teskari ma'no.",
       tr:["Просторные вольеры и ограничение посетителей — ради <b>благополучия животных</b> (복지). Увеличение числа посетителей — противоположное.","Natural-like spaces and visitor limits aim at <b>animal welfare</b> (복지); more visitors is the opposite."]},
      {id:"u256", ask:"이 글을 쓴 목적으로 가장 알맞은 것을 고르십시오.", opts:["동물원이 동물 중심으로 바뀌어야 함을 주장하려고","동물원 입장 방법을 안내하려고","멸종 위기 동물의 종류를 소개하려고","동물원을 모두 없애야 한다고 주장하려고"], a:0,
       exp:"Oxirgi gap — muallif pozitsiyasi: hayvonot bog'i <b>\"ko'rsatish uchun joy\" emas, \"hayvonlar uchun joy\"</b>ga aylanishi kerak. U bog'larni yo'q qilishni aytmaydi (존재하려면 — mavjud bo'lishi uchun).",
       tr:["Последнее предложение — позиция автора: зоопарк должен стать <b>«местом для животных», а не «для показа»</b>. Он не призывает закрыть зоопарки.","The last sentence states the aim: zoos must become <b>places for animals, not for display</b>. He doesn't call for abolishing them."]}
    ]});
  set({id:"us14", type:"U-R12", sec:"read",
    text:"최근 '느린 패션'이 주목받고 있다. 유행에 따라 옷을 빠르게 만들고 버리는 '빠른 패션'은 값이 싸다는 장점이 있지만, 옷을 만드는 과정에서 많은 물과 에너지가 쓰이고 버려지는 옷이 환경을 오염시킨다는 문제가 있다. 느린 패션은 품질이 좋은 옷을 사서 오래 입고, 필요하면 고쳐 입는 것을 말한다. 처음에는 비용이 더 들 수 있지만 길게 보면 경제적이고 환경에도 도움이 된다.",
    qs:[
      {id:"u257", ask:"윗글의 중심 내용으로 가장 알맞은 것을 고르십시오.", opts:["좋은 옷을 오래 입는 것이 환경과 경제에 도움이 된다.","유행하는 옷을 자주 사야 한다.","빠른 패션은 단점이 없다.","옷은 싸면 쌀수록 좋다."], a:0,
       exp:"Matn \"sekin moda\" — <b>sifatli kiyimni uzoq kiyish</b> uzoq muddatda tejamli va <b>atrof-muhitga foydali</b> degan fikrni ilgari suradi. 품질 — sifat, 고쳐 입다 — tuzatib kiymoq.",
       tr:["Текст продвигает «медленную моду»: <b>носить качественную одежду долго</b> — выгодно и <b>полезно для природы</b>. 품질 — качество.","The text argues <b>wearing quality clothes for long</b> saves money over time and <b>helps the environment</b>. 품질 — quality."]},
      {id:"u258", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["빠른 패션은 옷을 만들 때 자원을 많이 쓴다.","느린 패션은 처음부터 비용이 적게 든다.","빠른 패션은 값이 비싸다.","느린 패션은 옷을 고쳐 입지 않는다."], a:0,
       exp:"<b>옷을 만드는 과정에서 많은 물과 에너지가 쓰이고</b> — tez moda ko'p suv va energiya sarflaydi. Sekin moda boshida qimmatroq bo'lishi mumkin, tez moda esa arzon.",
       tr:["<b>… 많은 물과 에너지가 쓰이고</b> — быстрая мода тратит много воды и энергии. Медленная мода поначалу может быть дороже, а быстрая — дешёвая.","<b>… 많은 물과 에너지가 쓰이고</b> — fast fashion uses lots of water and energy. Slow fashion may cost more at first; fast fashion is cheap."]}
    ]});
  set({id:"us15", type:"U-R12", sec:"read",
    text:"인공지능 번역기의 성능이 좋아지면서 외국어를 배울 필요가 없어졌다고 말하는 사람들이 있다. 물론 간단한 정보를 주고받는 데에는 번역기만으로도 충분하다. 그러나 언어에는 그 나라 사람들의 문화와 생각하는 방식이 담겨 있다. 같은 말이라도 상황과 관계에 따라 전혀 다른 의미가 되기도 한다. 번역기는 이러한 미묘한 차이까지 정확하게 전달하기 어렵다. 따라서 진정한 소통을 위해서는 여전히 외국어를 배우는 노력이 필요하다.",
    qs:[
      {id:"u259", ask:"필자의 태도로 가장 알맞은 것을 고르십시오.", opts:["번역기가 있어도 외국어 학습은 필요하다고 본다.","번역기가 외국어 학습을 완전히 대신할 수 있다고 본다.","번역기 사용을 금지해야 한다고 주장한다.","외국어 공부는 시간 낭비라고 생각한다."], a:0,
       exp:"Muallif tarjimon dasturlarning foydasini tan oladi (물론), lekin <b>그러나 ... 따라서 여전히 외국어를 배우는 노력이 필요하다</b> — chet tilini o'rganish baribir zarur.",
       tr:["Автор признаёт пользу переводчиков (물론), но <b>그러나 … 따라서 여전히 … 필요하다</b> — учить язык всё равно нужно.","He grants translators are useful (물론), but <b>그러나 … 따라서 여전히 … 필요하다</b> — learning languages is still needed."]},
      {id:"u260", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["같은 말도 상황에 따라 뜻이 달라질 수 있다.","번역기는 미묘한 의미 차이도 정확히 전달한다.","간단한 정보도 번역기로는 전달할 수 없다.","언어와 문화는 관계가 없다."], a:0,
       exp:"<b>같은 말이라도 상황과 관계에 따라 전혀 다른 의미가 되기도 한다</b> — bir xil gap vaziyatga qarab boshqa ma'no beradi. 미묘하다 — nozik, 여전히 — hamon.",
       tr:["<b>같은 말이라도 상황과 관계에 따라 … 다른 의미</b> — одна фраза может значить разное в зависимости от ситуации. 미묘하다 — тонкий, 여전히 — по-прежнему.","<b>같은 말이라도 상황과 관계에 따라 …</b> — the same words can mean different things by context. 미묘하다 — subtle."]}
    ]});

  window.PW_QBANK = window.PW_QBANK || {};
  window.PW_QSETS = window.PW_QSETS || {};
  window.PW_QTR = window.PW_QTR || {};
  function tr(o) { if (o.tr) { window.PW_QTR[o.id] = o.tr; delete o.tr; } }
  S.forEach(tr);
  G.forEach(function (g) { g.qs.forEach(tr); });
  window.PW_QBANK.topik2 = S;
  window.PW_QSETS.topik2 = G;
})();
