/* Hanguk Way — TOPIK II savollar banki, 2-qism (to'liq imtihon uchun: 50 tinglash + 50 o'qish).
   Hanguk Way tomonidan rasmiy savol turlari bo'yicha yozilgan. topik2.js dan keyin yuklanadi. */
(function () {
  var S = [], G = [];
  function q(o) { S.push(o); }
  function set(o) { G.push(o); }

  // ======================= 듣기 =======================
  q({id:"u301", type:"U-L1", sec:"listen",
    audio:"여자: 이번 주 금요일 저녁에 시간 있어요? 회사 근처에 새로 생긴 식당에 가 보려고요.\n남자: 금요일은 야근이 있어서 좀 어려울 것 같아요.",
    opts:["그럼 토요일 점심은 어때요?","식당 음식이 정말 맛있었어요.","저도 야근하는 걸 좋아해요.","금요일에 같이 가서 즐거웠어요."], a:0,
    exp:"Erkak juma kuni band (야근 — kechki qo'shimcha ish). Mantiqiy davomi — <b>boshqa vaqt taklif qilish</b>: 토요일 점심은 어때요?",
    tr:["Мужчина занят в пятницу (야근 — сверхурочная работа). Логично предложить <b>другое время</b>.","He works late (야근) on Friday, so she <b>suggests another time</b>."]});
  q({id:"u302", type:"U-L1", sec:"listen",
    audio:"남자: 손님, 이 바지 길이를 줄여 드릴까요?\n여자: 네, 조금만 줄여 주세요. 언제 찾으러 오면 돼요?",
    opts:["내일 오후에 오시면 됩니다.","바지가 너무 짧네요.","어제 찾아가셨잖아요.","이 바지는 팔지 않아요."], a:0,
    exp:"Ayol <b>qachon olib ketishni</b> so'radi (언제 찾으러 오면 돼요?). Javobda vaqt bo'lishi kerak: 내일 오후에. 줄이다 — qisqartirmoq.",
    tr:["Она спрашивает, <b>когда забрать</b>. Ответ должен содержать время. 줄이다 — укоротить.","She asks <b>when to pick it up</b>, so the reply gives a time. 줄이다 — to shorten."]});
  q({id:"u303", type:"U-L1", sec:"listen",
    audio:"여자: 민수 씨, 얼굴이 안 좋아 보이는데 어디 아파요?\n남자: 어제부터 열이 나고 목이 많이 아파요.",
    opts:["오늘은 일찍 들어가서 쉬는 게 좋겠어요.","감기가 다 나아서 다행이네요.","열이 없어서 괜찮겠네요.","목이 마르면 물을 드세요."], a:0,
    exp:"Erkak kasal: isitma (열이 나다) va tomoq og'rig'i. Mos javob — <b>dam olishni maslahat berish</b>. 목이 마르다 — chanqamoq (chalg'ituvchi).",
    tr:["Он болен: температура и боль в горле. Уместно <b>посоветовать отдохнуть</b>. 목이 마르다 — хотеть пить (ловушка).","He's sick (fever, sore throat), so <b>advising rest</b> fits. 목이 마르다 — be thirsty (a trap)."]});
  q({id:"u304", type:"U-L1", sec:"listen",
    audio:"남자: 이번 발표는 누가 맡기로 했어요?\n여자: 아직 못 정했어요. 다들 바빠서 하겠다는 사람이 없네요.",
    opts:["그럼 이번에는 제가 해 볼게요.","발표가 잘 끝나서 다행이에요.","다들 발표를 하고 싶어 하네요.","발표는 지난주에 했어요."], a:0,
    exp:"Hech kim taqdimotni olmoqchi emas — mantiqiy javob: <b>men qilaman</b> deb taklif qilish. 맡다 — zimmasiga olmoq.",
    tr:["Никто не хочет делать доклад — логично <b>вызваться самому</b>. 맡다 — брать на себя.","Nobody will present, so <b>volunteering</b> fits. 맡다 — to take charge of."]});

  q({id:"u305", type:"U-L2", sec:"listen",
    audio:"남자: 지영 씨, 복사기에 종이가 다 떨어졌네요.\n여자: 그래요? 창고에 종이가 있을 거예요.\n남자: 제가 지금 회의에 들어가야 해서요. 좀 가져다줄 수 있어요?\n여자: 네, 제가 가져올게요.",
    opts:["창고에서 종이를 가져온다.","회의에 들어간다.","복사기를 고친다.","종이를 주문한다."], a:0,
    exp:"Erkak majlisga ketadi va qog'oz olib kelishni so'radi. Ayol: <b>제가 가져올게요</b> — omborxonadan qog'oz olib keladi. 떨어지다 — tugab qolmoq.",
    tr:["Мужчина уходит на совещание; она: <b>제가 가져올게요</b> — принесёт бумагу со склада. 떨어지다 — закончиться.","He's off to a meeting; she says <b>제가 가져올게요</b> — she'll fetch paper from storage."]});
  q({id:"u306", type:"U-L2", sec:"listen",
    audio:"여자: 여보세요, 김 선생님 계십니까?\n남자: 지금 수업 중이신데요. 메시지 남겨 드릴까요?\n여자: 아니요, 괜찮습니다. 수업 끝나면 다시 전화 드릴게요. 몇 시에 끝나요?\n남자: 3시에 끝납니다.",
    opts:["수업이 끝난 후에 다시 전화한다.","메시지를 남긴다.","선생님을 찾아간다.","수업에 들어간다."], a:0,
    exp:"Ayol xabar qoldirmadi (<b>괜찮습니다</b>), <b>dars tugagach qayta qo'ng'iroq qiladi</b> (soat 3 dan keyin).",
    tr:["Она отказалась оставлять сообщение и <b>перезвонит после урока</b> (после 3 часов).","She declines a message and <b>will call back after class</b> (after 3)."]});
  q({id:"u307", type:"U-L2", sec:"listen",
    audio:"남자: 이 서류에 사진이 한 장 더 필요한데요.\n여자: 어떡하죠? 사진을 한 장밖에 안 가져왔어요.\n남자: 1층에 사진관이 있으니까 거기서 찍어 오시면 돼요.\n여자: 알겠습니다. 금방 다녀올게요.",
    opts:["1층에 가서 사진을 찍는다.","서류를 다시 쓴다.","집에 가서 사진을 가져온다.","사진 없이 서류를 낸다."], a:0,
    exp:"1-qavatda fotosalon bor; ayol <b>금방 다녀올게요</b> — tezda borib keladi, ya'ni 1-qavatda suratga tushadi.",
    tr:["На 1-м этаже фотосалон; она <b>금방 다녀올게요</b> — сходит сфотографироваться.","There's a photo studio downstairs; she'll <b>go get a photo taken</b>."]});
  q({id:"u308", type:"U-L2", sec:"listen",
    audio:"여자: 과장님, 내일 출장 가실 때 탈 기차표를 예매할까요?\n남자: 아, 기차표는 제가 아까 인터넷으로 해 놨어요. 대신 호텔 예약 좀 해 줄래요?\n여자: 네, 회사 근처 호텔로 알아보겠습니다.",
    opts:["호텔을 예약한다.","기차표를 예매한다.","출장을 간다.","회사에 전화한다."], a:0,
    exp:"Poyezd chiptasini erkak o'zi olgan. U <b>mehmonxona bron qilishni</b> so'radi, ayol rozi: 알아보겠습니다. 예매하다 — oldindan sotib olmoq.",
    tr:["Билеты он уже купил; просит <b>забронировать гостиницу</b>, она соглашается. 예매하다 — купить заранее.","He already bought the tickets; he asks her to <b>book a hotel</b>."]});

  q({id:"u309", type:"U-L3", sec:"listen",
    audio:"남자: (안내 방송) 오늘 오후 2시부터 4시까지 건물 정기 점검으로 엘리베이터 운행이 중단됩니다. 이용에 불편을 드려 죄송합니다. 점검 시간에는 계단을 이용해 주시기 바랍니다.",
    opts:["점검 시간에는 계단을 이용해야 한다.","엘리베이터는 하루 종일 운행하지 않는다.","점검은 오전에 한다.","점검 중에도 엘리베이터를 쓸 수 있다."], a:0,
    exp:"Lift faqat <b>14:00–16:00</b> da ishlamaydi, bu vaqtda <b>zinadan (계단)</b> foydalanish kerak. 정기 점검 — muntazam tekshiruv, 중단되다 — to'xtatilmoq.",
    tr:["Лифт не работает только <b>с 14 до 16</b>, в это время — <b>по лестнице</b> (계단). 정기 점검 — плановая проверка.","The lift stops only <b>2–4 p.m.</b>; use the <b>stairs</b> (계단) then."]});
  q({id:"u310", type:"U-L3", sec:"listen",
    audio:"여자: 요즘 퇴근 후에 요리 학원에 다닌다면서요?\n남자: 네, 혼자 살다 보니 밖에서 사 먹는 일이 많아서 배우기 시작했어요. 벌써 석 달째예요.",
    opts:["남자는 요리를 배운 지 석 달이 됐다.","남자는 가족과 함께 산다.","남자는 출근 전에 학원에 간다.","여자는 요리 학원 선생님이다."], a:0,
    exp:"<b>벌써 석 달째예요</b> — mana uch oy bo'ldi. U yolg'iz yashaydi (혼자 살다 보니), kursga ishdan keyin boradi.",
    tr:["<b>벌써 석 달째예요</b> — уже третий месяц. Живёт один, ходит после работы.","<b>벌써 석 달째예요</b> — it's been three months. He lives alone and goes after work."]});
  q({id:"u311", type:"U-L3", sec:"listen",
    audio:"여자: (뉴스) 올해 겨울은 평년보다 기온이 높을 것으로 예상됩니다. 다만 기상청은 1월 중순에 강한 추위가 며칠 동안 이어질 수 있다며 미리 대비할 것을 당부했습니다.",
    opts:["올해 겨울은 예년보다 따뜻할 것이다.","겨울 내내 매우 추울 것이다.","1월 중순에는 따뜻할 것이다.","기상청은 추위에 대비할 필요가 없다고 했다."], a:0,
    exp:"<b>평년보다 기온이 높을 것</b> — odatdagidan iliqroq bo'ladi. Faqat yanvar o'rtasida bir necha kun qattiq sovuq bo'lishi mumkin. 평년 = 예년 — odatiy yil.",
    tr:["<b>평년보다 기온이 높을 것</b> — теплее обычного; лишь в середине января возможны морозы. 평년 = 예년.","<b>평년보다 기온이 높을 것</b> — warmer than usual, except a cold snap mid-January."]});
  q({id:"u312", type:"U-L3", sec:"listen",
    audio:"남자: 이번 주말에 시민 공원에서 '책 바꿔 읽기' 행사가 열린대요. 다 읽은 책을 가져가면 다른 사람의 책과 바꿀 수 있대요.\n여자: 재미있겠네요. 저도 집에 있는 소설책을 가져가 봐야겠어요.",
    opts:["행사에서는 책을 서로 교환할 수 있다.","행사는 평일에 열린다.","행사에서 새 책을 판다.","여자는 행사에 가지 않을 것이다."], a:0,
    exp:"O'qilgan kitobni olib borib <b>boshqasiga almashtirish</b> mumkin (바꾸다 = 교환하다). Tadbir dam olish kuni, ayol ham boradi.",
    tr:["Можно <b>обменять</b> прочитанную книгу (바꾸다 = 교환하다). В выходные, женщина тоже пойдёт.","You can <b>swap</b> books (바꾸다 = 교환하다); it's on the weekend and she'll go."]});

  q({id:"u313", type:"U-L4", sec:"listen",
    audio:"여자: 아이에게 벌써 스마트폰을 사 줬어요? 너무 이르지 않아요?\n남자: 저도 고민 많이 했어요. 그런데 무조건 못 쓰게 막기보다 제대로 쓰는 방법을 가르치는 게 더 중요하다고 생각해요.",
    opts:["스마트폰을 바르게 쓰는 방법을 가르치는 것이 중요하다.","아이에게 스마트폰을 사 주면 안 된다.","스마트폰은 아이에게 꼭 필요하다.","아이는 부모의 말을 잘 듣지 않는다."], a:0,
    exp:"<b>막기보다 제대로 쓰는 방법을 가르치는 게 더 중요</b> — taqiqlashdan ko'ra to'g'ri foydalanishni o'rgatish muhimroq.",
    tr:["<b>막기보다 … 가르치는 게 더 중요</b> — важнее научить правильно пользоваться, чем запрещать.","<b>막기보다 … 가르치는 게 더 중요</b> — teaching proper use beats banning."]});
  q({id:"u314", type:"U-L4", sec:"listen",
    audio:"남자: 저는 회의는 짧을수록 좋다고 생각해요. 미리 자료를 공유하고 꼭 결정해야 할 것만 이야기하면 30분이면 충분하거든요.",
    opts:["회의는 미리 준비해서 짧게 하는 것이 좋다.","회의는 자주 해야 한다.","회의 자료는 회의 중에 나눠 주어야 한다.","회의는 길게 할수록 결과가 좋다."], a:0,
    exp:"<b>짧을수록 좋다</b> + <b>미리 자료를 공유하고</b> — oldindan tayyorlanib, qisqa majlis o'tkazish yaxshi.",
    tr:["<b>짧을수록 좋다</b> + <b>미리 자료를 공유</b> — подготовиться заранее и проводить коротко.","<b>짧을수록 좋다</b> + share materials in advance — prepare and keep it short."]});
  q({id:"u315", type:"U-L4", sec:"listen",
    audio:"여자: 이번 휴가에는 해외여행 안 가요?\n남자: 네, 이번에는 그냥 집에서 푹 쉬려고요. 휴가는 어디를 가느냐보다 얼마나 편하게 쉬느냐가 더 중요한 것 같아요.",
    opts:["휴가 때는 편하게 쉬는 것이 중요하다.","휴가에는 해외여행을 가야 한다.","휴가는 길수록 좋다.","집에서 쉬는 것은 지루하다."], a:0,
    exp:"<b>어디를 가느냐보다 얼마나 편하게 쉬느냐가 더 중요</b> — qayerga borishdan ko'ra yaxshi dam olish muhimroq.",
    tr:["<b>어디를 가느냐보다 얼마나 편하게 쉬느냐가 더 중요</b> — важнее хорошо отдохнуть, чем куда поехать.","<b>… 얼마나 편하게 쉬느냐가 더 중요</b> — resting well matters more than where you go."]});
  q({id:"u316", type:"U-L4", sec:"listen",
    audio:"남자: 요즘 일회용품을 줄이자는 캠페인이 많은데요. 개인의 노력도 물론 중요하지만, 기업이 처음부터 포장을 줄여야 효과가 훨씬 커요.",
    opts:["일회용품을 줄이려면 기업이 포장을 줄여야 한다.","일회용품 줄이기는 개인만의 책임이다.","캠페인은 효과가 없다.","포장은 많을수록 좋다."], a:0,
    exp:"<b>물론 ..., 기업이 ... 줄여야 효과가 훨씬 커요</b> — asosiy fikr 지만 dan keyin: kompaniyalar qadoqni kamaytirishi kerak.",
    tr:["Главное после 지만: <b>компании должны сокращать упаковку</b>.","The main point follows 지만: <b>companies must cut packaging</b>."]});

  set({id:"us21", type:"U-L5", sec:"listen",
    audio:"여자: 관리사무소죠? 위층에서 밤마다 쿵쿵거리는 소리가 나서 잠을 잘 수가 없어요.\n남자: 많이 불편하셨겠네요. 저희가 위층에 연락해서 주의해 달라고 말씀드리겠습니다. 그리고 이런 문제는 직접 찾아가서 따지기보다 저희를 통해서 이야기하시는 게 서로 감정이 상하지 않고 좋습니다.\n여자: 네, 그럼 부탁드릴게요.",
    qs:[
      {id:"u521", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["층간 소음 문제는 관리사무소를 통해 해결하는 것이 좋다.","이웃을 직접 찾아가서 이야기해야 한다.","소음은 참는 것이 좋다.","위층 사람에게는 잘못이 없다."], a:0,
       exp:"<b>직접 찾아가서 따지기보다 저희를 통해서 이야기하시는 게 ... 좋습니다</b> — bevosita janjallashishdan ko'ra boshqaruv idorasi orqali hal qilish yaxshi.",
       tr:["<b>… 저희를 통해서 이야기하시는 게 좋습니다</b> — лучше решать через управляющую компанию.","<b>… 저희를 통해서 …</b> — better to go through the management office."]},
      {id:"u522", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 소음 때문에 잠을 자기 어렵다.","남자는 위층에 사는 사람이다.","여자는 위층에 직접 찾아갔다.","소음은 낮에만 난다."], a:0,
       exp:"<b>밤마다 ... 잠을 잘 수가 없어요</b> — har kecha shovqin tufayli uxlay olmayapti. Erkak — boshqaruv idorasi xodimi. 층간 소음 — qavatlar orasidagi shovqin.",
       tr:["<b>밤마다 … 잠을 잘 수가 없어요</b> — каждую ночь не может уснуть. Мужчина — сотрудник управляющей компании.","<b>밤마다 …</b> — she can't sleep every night. He works at the management office."]}
    ]});
  set({id:"us22", type:"U-L5", sec:"listen",
    audio:"여자: 대기업을 그만두고 고향에서 딸기 농사를 시작하셨다고요?\n남자: 네, 처음에는 주변에서 다들 말렸어요. 하지만 저는 농사에 새로운 기술을 접목하면 충분히 경쟁력이 있다고 봤어요. 지금은 스마트폰으로 온도와 습도를 조절하는 시설을 갖춰서 일하는 시간은 줄고 수확량은 두 배로 늘었습니다.",
    qs:[
      {id:"u523", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["농사에도 새로운 기술을 쓰면 경쟁력이 생긴다.","대기업에서 일하는 것이 가장 좋다.","농사는 힘들어서 젊은 사람에게 맞지 않는다.","고향을 떠나야 성공할 수 있다."], a:0,
       exp:"<b>농사에 새로운 기술을 접목하면 충분히 경쟁력이 있다</b> — dehqonchilikka yangi texnologiya qo'shilsa, raqobatbardosh bo'ladi. 접목하다 — qo'shmoq, birlashtirmoq.",
       tr:["<b>… 새로운 기술을 접목하면 … 경쟁력이 있다</b> — с новыми технологиями фермерство конкурентоспособно.","<b>… 새로운 기술을 접목하면 …</b> — with new tech, farming can compete."]},
      {id:"u524", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 스마트폰으로 시설을 관리한다.","처음부터 주변 사람들이 찬성했다.","수확량이 예전보다 줄었다.","남자는 아직 회사에 다닌다."], a:0,
       exp:"<b>스마트폰으로 온도와 습도를 조절하는 시설</b> — harorat va namlikni telefon orqali boshqaradi. Atrofdagilar avval qarshi edi (말렸어요), hosil ikki baravar oshgan.",
       tr:["<b>스마트폰으로 … 조절하는 시설</b> — управляет теплицей с телефона. Сначала его отговаривали (말렸어요), урожай вырос вдвое.","He controls the greenhouse <b>by smartphone</b>; people first discouraged him (말렸어요); yield doubled."]}
    ]});
  set({id:"us23", type:"U-L5", sec:"listen",
    audio:"남자: 이번 학기에 동아리 회비를 올리기로 했다면서요?\n여자: 네, 연습실 사용료가 올라서 어쩔 수 없었어요. 대신 회비를 한꺼번에 내기 어려운 사람은 두 번에 나눠 낼 수 있게 했어요.\n남자: 그래도 갑자기 오르면 부담스러워하는 사람이 있을 텐데요.\n여자: 그래서 이번 모임 때 회원들에게 이유를 자세히 설명하려고요.",
    qs:[
      {id:"u525", ask:"여자가 이번 모임에서 하려는 일로 알맞은 것을 고르십시오.", opts:["회비를 올린 이유를 설명한다.","회비를 다시 내린다.","새 연습실을 찾는다.","새 회원을 모집한다."], a:0,
       exp:"Oxirgi gap: <b>회원들에게 이유를 자세히 설명하려고요</b> — a'zolarga sababini batafsil tushuntirmoqchi.",
       tr:["Последняя фраза: <b>이유를 자세히 설명하려고요</b> — подробно объяснить причину.","Her last line: she'll <b>explain the reason in detail</b>."]},
      {id:"u526", ask:"들은 내용과 같은 것을 고르십시오.", opts:["회비는 두 번에 나눠 낼 수 있다.","연습실 사용료가 내렸다.","회비는 이번 학기에 내렸다.","남자는 회비를 이미 냈다."], a:0,
       exp:"<b>두 번에 나눠 낼 수 있게 했어요</b> — badalni ikki bo'lib to'lash mumkin. Xona ijarasi oshgan, shuning uchun badal ham oshdi.",
       tr:["<b>두 번에 나눠 낼 수 있게</b> — взнос можно платить в два приёма. Аренда выросла, поэтому взнос подняли.","Fees can be <b>paid in two instalments</b>; rent went up, so fees rose."]}
    ]});
  set({id:"us24", type:"U-L5", sec:"listen",
    audio:"여자: (강연) 사람들은 처음 만난 상대에 대해 3초 안에 판단을 내린다고 합니다. 이렇게 만들어진 첫인상은 쉽게 바뀌지 않는데요, 이를 '초두 효과'라고 합니다. 그래서 면접이나 첫 만남에서는 밝은 표정과 바른 자세가 중요하죠. 하지만 첫인상이 전부는 아닙니다. 꾸준히 믿음을 주는 행동을 보이면 처음의 인상도 충분히 바꿀 수 있습니다.",
    qs:[
      {id:"u527", ask:"무엇에 대한 내용인지 가장 알맞은 것을 고르십시오.", opts:["첫인상의 영향과 그것을 바꾸는 방법","면접에서 입는 옷","사람의 성격을 판단하는 기준","표정을 짓는 방법"], a:0,
       exp:"Ma'ruza <b>birinchi taassurot</b> (첫인상) qanday shakllanishi, muhimligi va uni <b>o'zgartirish mumkinligi</b> haqida.",
       tr:["Лекция о <b>первом впечатлении</b>: как оно формируется, почему важно и как его <b>изменить</b>.","It's about <b>first impressions</b>: their effect and how to <b>change</b> them."]},
      {id:"u528", ask:"들은 내용과 같은 것을 고르십시오.", opts:["첫인상은 꾸준한 행동으로 바꿀 수 있다.","첫인상은 절대 바뀌지 않는다.","사람들은 30분 동안 보고 상대를 판단한다.","면접에서 표정은 중요하지 않다."], a:0,
       exp:"<b>꾸준히 믿음을 주는 행동을 보이면 ... 바꿀 수 있습니다</b> — doimiy ishonchli xatti-harakat bilan taassurotni o'zgartirish mumkin. Baho 3 soniyada beriladi.",
       tr:["<b>꾸준히 믿음을 주는 행동을 보이면 … 바꿀 수 있습니다</b> — постоянным надёжным поведением впечатление можно изменить. Оценка — за 3 секунды.","Consistent trustworthy behaviour <b>can change</b> it; judgement takes 3 seconds."]}
    ]});
  set({id:"us25", type:"U-L5", sec:"listen",
    audio:"남자: 우리 회사도 다음 달부터 일주일에 이틀은 재택근무를 한대요.\n여자: 잘됐네요. 출퇴근 시간이 줄면 그만큼 일에 더 집중할 수 있잖아요.\n남자: 저는 좀 걱정돼요. 집에 있으면 일과 생활의 구분이 없어져서 오히려 더 오래 일하게 될 것 같아요.\n여자: 그럴 수도 있겠네요. 그럼 일하는 시간을 정해 놓고 지키면 되지 않을까요?",
    qs:[
      {id:"u529", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["재택근무를 하면 일과 생활을 구분하기 어려워질 수 있다.","재택근무를 하면 일에 더 집중할 수 있다.","출퇴근 시간이 너무 길다.","재택근무는 매일 해야 한다."], a:0,
       exp:"Erkak xavotirda: <b>일과 생활의 구분이 없어져서 오히려 더 오래 일하게 될 것 같아요</b>. ② — ayolning fikri, erkakniki emas!",
       tr:["Мужчина боится, что <b>граница между работой и жизнью исчезнет</b>. ② — мнение женщины!","He worries <b>work and life will blur</b>. ② is the woman's view — a classic trap."]},
      {id:"u530", ask:"들은 내용과 같은 것을 고르십시오.", opts:["재택근무는 다음 달부터 시작된다.","일주일에 사흘 재택근무를 한다.","여자는 재택근무에 반대한다.","남자는 이미 재택근무를 하고 있다."], a:0,
       exp:"<b>다음 달부터 일주일에 이틀</b> — keyingi oydan, haftada ikki kun. 이틀 — 2 kun, 사흘 — 3 kun.",
       tr:["<b>다음 달부터 일주일에 이틀</b> — со следующего месяца, 2 дня в неделю. 이틀 — 2 дня, 사흘 — 3.","<b>From next month, two days a week</b>. 이틀 = 2 days, 사흘 = 3."]}
    ]});
  set({id:"us26", type:"U-L5", sec:"listen",
    audio:"남자: (다큐멘터리) 한국의 전통 가옥인 한옥에는 '온돌'이라는 독특한 난방 방식이 있습니다. 부엌에서 불을 때면 뜨거운 공기가 방바닥 아래의 길을 따라 지나가면서 바닥 전체를 데웁니다. 바닥이 따뜻해지면 그 열이 방 안의 공기까지 천천히 데워 따뜻함이 오래 유지됩니다. 이 원리는 오늘날 아파트의 바닥 난방으로 이어지고 있습니다.",
    qs:[
      {id:"u531", ask:"무엇에 대한 내용인지 가장 알맞은 것을 고르십시오.", opts:["온돌의 난방 원리","한옥을 짓는 방법","부엌에서 요리하는 방법","아파트의 장점"], a:0,
       exp:"Hujjatli film <b>ondol</b> — an'anaviy pol isitish tizimi qanday ishlashi haqida. 난방 — isitish, 원리 — tamoyil.",
       tr:["Об <b>ондоле</b> — как работает традиционный подогрев пола. 난방 — отопление, 원리 — принцип.","About how <b>ondol</b> floor heating works. 난방 — heating, 원리 — principle."]},
      {id:"u532", ask:"들은 내용과 같은 것을 고르십시오.", opts:["온돌의 원리는 현대 아파트에도 쓰이고 있다.","온돌은 벽을 데우는 방식이다.","뜨거운 공기는 방 위로 지나간다.","온돌은 열이 금방 식는다."], a:0,
       exp:"<b>오늘날 아파트의 바닥 난방으로 이어지고 있습니다</b> — bugungi kvartiralarda ham davom etmoqda. Issiq havo pol <b>ostidan</b> o'tadi, issiqlik uzoq saqlanadi.",
       tr:["<b>… 아파트의 바닥 난방으로 이어지고</b> — продолжается в современных квартирах. Горячий воздух идёт <b>под</b> полом, тепло держится долго.","It <b>lives on in modern apartments</b>; hot air runs <b>under</b> the floor and heat lasts."]}
    ]});
  set({id:"us27", type:"U-L5", sec:"listen",
    audio:"여자: 지난주에 산 청소기가 벌써 고장 났어요. 환불받을 수 있을까요?\n남자: 구매하신 지 7일이 지나서 환불은 어렵고, 무료로 수리해 드릴 수는 있습니다.\n여자: 일주일 남짓 썼는데 고장 났으면 제품에 문제가 있는 거 아닌가요?\n남자: 그럼 먼저 제품을 검사해 보고, 제품 불량으로 확인되면 새 제품으로 교환해 드리겠습니다.",
    qs:[
      {id:"u533", ask:"여자의 의도로 가장 알맞은 것을 고르십시오.", opts:["고장 난 제품에 대해 환불을 요구하려고","청소기를 새로 사려고","수리 방법을 물어보려고","제품을 칭찬하려고"], a:0,
       exp:"Ayol buzilgan changyutgich uchun <b>pulni qaytarishni talab qilyapti</b> (환불받을 수 있을까요?). 의도 — niyat, maqsad.",
       tr:["Она <b>требует возврата денег</b> за сломанный пылесос. 의도 — намерение.","She <b>demands a refund</b> for the broken vacuum. 의도 — intention."]},
      {id:"u534", ask:"들은 내용과 같은 것을 고르십시오.", opts:["제품 불량이 확인되면 새 제품으로 바꿀 수 있다.","여자는 청소기를 한 달 전에 샀다.","남자는 바로 환불해 주었다.","수리는 돈을 내야 한다."], a:0,
       exp:"<b>제품 불량으로 확인되면 새 제품으로 교환</b> — nuqson tasdiqlansa, yangisiga almashtiriladi. Ta'mir bepul (무료), pul darhol qaytarilmadi.",
       tr:["<b>… 불량으로 확인되면 새 제품으로 교환</b> — при подтверждении брака заменят. Ремонт бесплатный.","If a <b>defect is confirmed, it's exchanged</b>; repair is free; no instant refund."]}
    ]});
  set({id:"us28", type:"U-L5", sec:"listen",
    audio:"여자: (강연) 어떤 언어에는 파란색과 초록색을 구분하는 단어가 따로 없습니다. 연구에 따르면 이런 언어를 쓰는 사람들은 두 색을 구별하는 데 시간이 조금 더 걸린다고 합니다. 이는 우리가 쓰는 언어가 세상을 보는 방식에 영향을 줄 수 있다는 것을 보여 줍니다. 그러니 외국어를 배운다는 것은 단어만 아는 것이 아니라 새로운 시각을 얻는 것이라고 할 수 있습니다.",
    qs:[
      {id:"u535", ask:"여자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["언어는 세상을 보는 방식에 영향을 준다.","파란색과 초록색은 같은 색이다.","외국어는 단어만 외우면 된다.","색을 구별하는 능력은 타고난다."], a:0,
       exp:"<b>언어가 세상을 보는 방식에 영향을 줄 수 있다</b> — til dunyoni ko'rish tarzimizga ta'sir qiladi. 시각 — nuqtai nazar.",
       tr:["<b>언어가 세상을 보는 방식에 영향을</b> — язык влияет на то, как мы видим мир. 시각 — взгляд.","<b>Language shapes how we see the world</b>. 시각 — perspective."]},
      {id:"u536", ask:"들은 내용과 같은 것을 고르십시오.", opts:["어떤 언어에는 파란색과 초록색을 구분하는 말이 없다.","모든 언어는 색 이름이 같다.","그런 언어를 쓰는 사람들은 두 색을 전혀 구별하지 못한다.","외국어 학습은 단어를 외우는 것이 전부이다."], a:0,
       exp:"Matn boshida aytildi. ③ noto'g'ri: ular ranglarni ajratadi, faqat <b>biroz ko'proq vaqt</b> ketadi (시간이 조금 더 걸린다).",
       tr:["Сказано в начале. ③ неверно: различают, но <b>чуть медленнее</b>.","Stated at the start. ③ is wrong: they can tell them apart, just <b>a bit slower</b>."]}
    ]});
  set({id:"us29", type:"U-L5", sec:"listen",
    audio:"남자: 직원 휴게실을 카페처럼 바꾸자는 의견이 많은데 어떻게 생각하세요?\n여자: 좋은 생각이에요. 다만 비용이 꽤 들 테니까 먼저 직원들이 실제로 얼마나 이용할지 설문 조사를 해 보는 게 좋겠어요.\n남자: 맞아요. 그럼 이번 주 안에 설문지를 만들어서 돌리죠.",
    qs:[
      {id:"u537", ask:"여자의 생각으로 가장 알맞은 것을 고르십시오.", opts:["휴게실을 바꾸기 전에 이용할 사람이 얼마나 될지 먼저 알아봐야 한다.","휴게실을 바꿀 필요가 없다.","카페는 회사 밖에 있어야 한다.","비용은 생각하지 않아도 된다."], a:0,
       exp:"Ayol g'oyani qo'llaydi, lekin <b>다만</b> — avval <b>so'rovnoma (설문 조사)</b> o'tkazish kerak, chunki xarajat katta.",
       tr:["Она за идею, но <b>다만</b> — сначала нужен <b>опрос</b> (설문 조사), ведь это дорого.","She supports it, but <b>다만</b> — survey staff first, since it's costly."]},
      {id:"u538", ask:"들은 내용과 같은 것을 고르십시오.", opts:["이번 주 안에 설문 조사를 할 것이다.","휴게실은 이미 카페로 바뀌었다.","여자는 휴게실을 바꾸는 데 반대한다.","휴게실을 바꾸는 데 비용이 들지 않는다."], a:0,
       exp:"<b>이번 주 안에 설문지를 만들어서 돌리죠</b> — shu hafta ichida so'rovnoma tarqatiladi. 돌리다 — tarqatmoq.",
       tr:["<b>이번 주 안에 설문지를 … 돌리죠</b> — анкету раздадут на этой неделе. 돌리다 — раздавать.","They'll circulate the survey <b>this week</b>. 돌리다 — to hand out."]}
    ]});
  set({id:"us30", type:"U-L5", sec:"listen",
    audio:"남자: 최근 노인 일자리 사업에 참여하는 어르신들이 크게 늘고 있습니다. 단순히 돈을 버는 것뿐만 아니라 사회에 참여하면서 삶의 활력을 되찾을 수 있기 때문입니다. 다만 아직은 일자리가 단순 노동에 치우쳐 있어서, 어르신들의 경험과 능력을 살릴 수 있는 다양한 일자리를 만드는 것이 과제입니다.",
    qs:[
      {id:"u539", ask:"남자의 중심 생각으로 가장 알맞은 것을 고르십시오.", opts:["노인의 경험을 살릴 수 있는 다양한 일자리가 필요하다.","노인은 일을 하지 않는 것이 좋다.","노인 일자리는 지금으로 충분하다.","노인들은 돈만을 위해 일한다."], a:0,
       exp:"<b>다만</b> dan keyin muammo va vazifa: <b>keksalarning tajribasidan foydalanadigan turli ish o'rinlari</b> yaratish kerak. 치우치다 — bir tomonga og'moq.",
       tr:["После <b>다만</b> — задача: создавать <b>разные рабочие места, использующие опыт</b> пожилых. 치우치다 — быть перекошенным.","After <b>다만</b>: the task is <b>diverse jobs that use seniors' experience</b>."]},
      {id:"u540", ask:"들은 내용과 같은 것을 고르십시오.", opts:["노인 일자리 사업 참여자가 늘고 있다.","노인 일자리는 매우 다양하다.","참여자가 점점 줄고 있다.","이 사업은 돈을 주지 않는다."], a:0,
       exp:"<b>참여하는 어르신들이 크게 늘고 있습니다</b> — ishtirokchilar ko'paymoqda. Ish o'rinlari hozircha oddiy mehnatga yo'naltirilgan (xilma-xil emas).",
       tr:["<b>… 크게 늘고 있습니다</b> — участников всё больше. Работа пока в основном простая.","Participation is <b>rising sharply</b>; jobs are still mostly simple labour."]}
    ]});
  set({id:"us31", type:"U-L5", sec:"listen",
    audio:"남자: 책을 반납하러 왔는데요. 반납 날짜가 사흘 지났어요.\n여자: 연체가 되면 늦은 날짜만큼 대출이 정지됩니다. 그래서 사흘 동안은 책을 빌리실 수 없어요.\n남자: 그럼 오늘 빌리려던 책은 어떻게 하죠? 과제 때문에 꼭 필요한데요.\n여자: 대출은 안 되지만 열람실에서 읽으시는 건 괜찮습니다. 필요한 부분은 복사하셔도 돼요.",
    qs:[
      {id:"u541", ask:"남자가 도서관에 온 이유로 알맞은 것을 고르십시오.", opts:["책을 반납하려고","책을 복사하려고","연체료를 내려고","열람실을 예약하려고"], a:0,
       exp:"Birinchi gap: <b>책을 반납하러 왔는데요</b> — kitobni qaytarishga keldim. -(으)러 오다 — ...gani kelmoq.",
       tr:["Первая фраза: <b>책을 반납하러 왔는데요</b> — пришёл вернуть книгу.","First line: <b>책을 반납하러 왔는데요</b> — he came to return a book."]},
      {id:"u542", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 사흘 동안 책을 빌릴 수 없다.","연체료를 내면 바로 빌릴 수 있다.","열람실에서도 책을 읽을 수 없다.","남자는 반납 날짜를 지켰다."], a:0,
       exp:"<b>늦은 날짜만큼 대출이 정지</b> — kechiktirilgan kunlar soni (3 kun) davomida kitob berilmaydi. O'quv zalida o'qish mumkin. 연체 — muddatni o'tkazish.",
       tr:["<b>Выдача приостановлена на столько дней, на сколько просрочил</b> — 3 дня. В читальном зале читать можно.","Borrowing is <b>suspended for as many days as overdue</b> — 3 days; the reading room is fine."]}
    ]});
  set({id:"us32", type:"U-L5", sec:"listen",
    audio:"여자: (뉴스) 시에서 운영하는 공공 자전거의 이용자가 1년 만에 두 배로 늘었습니다. 시는 이용자가 많은 지하철역 주변에 대여소를 50곳 더 만들 계획입니다. 하지만 자전거를 아무 데나 세워 두어 보행자가 불편을 겪는다는 지적도 나오고 있어, 시는 지정된 곳에만 반납하도록 단속을 강화하기로 했습니다.",
    qs:[
      {id:"u543", ask:"무엇에 대한 내용인지 가장 알맞은 것을 고르십시오.", opts:["공공 자전거 이용 증가와 시의 대책","자전거를 잘 타는 방법","지하철 요금 인상","보행자 교통사고"], a:0,
       exp:"Yangilik: <b>jamoat velosipedidan foydalanish oshgani</b> va shaharning <b>choralari</b> (yangi ijara punktlari, nazoratni kuchaytirish). 대책 — chora.",
       tr:["О <b>росте проката велосипедов</b> и <b>мерах города</b> (новые пункты, контроль). 대책 — меры.","About <b>rising bike-share use</b> and the <b>city's measures</b>. 대책 — countermeasures."]},
      {id:"u544", ask:"들은 내용과 같은 것을 고르십시오.", opts:["시는 대여소를 더 늘릴 계획이다.","이용자가 절반으로 줄었다.","자전거는 아무 곳에나 반납해도 된다.","대여소는 공원에만 있다."], a:0,
       exp:"<b>대여소를 50곳 더 만들 계획</b> — yana 50 ta ijara punkti ochiladi. Velosipedni faqat belgilangan joyga qaytarish kerak.",
       tr:["<b>대여소를 50곳 더</b> — ещё 50 пунктов проката. Возвращать — только в отведённые места.","<b>50 more rental stations</b> planned; bikes must be returned to set spots."]}
    ]});

  // ======================= 읽기 =======================
  q({id:"u401", type:"U-R3", sec:"read", text:"튼튼한 이로 평생 웃으세요!\n하루 세 번, 3분 이상 꼼꼼하게.", opts:["치아 관리","식사 예절","운동 방법","시간 관리"], a:0,
    exp:"<b>이</b> — tish, \"kuniga uch marta, 3 daqiqadan ko'p\" — tish yuvish. Demak <b>tish parvarishi</b> (치아 관리).",
    tr:["<b>이</b> — зубы; «три раза в день по 3 минуты» — чистка зубов → <b>уход за зубами</b>.","<b>이</b> — teeth; \"three times a day, 3+ minutes\" → <b>dental care</b>."]});
  q({id:"u402", type:"U-R3", sec:"read", text:"버튼 하나로 깨끗한 공기가 집 안 가득!\n미세먼지 걱정은 이제 그만.", opts:["공기청정기","세탁기","냉장고","전기밥솥"], a:0,
    exp:"Toza havo, mayda chang (<b>미세먼지</b>) — <b>havo tozalagich</b> (공기청정기) reklamasi.",
    tr:["Чистый воздух, мелкая пыль (<b>미세먼지</b>) — реклама <b>очистителя воздуха</b>.","Clean air, fine dust (<b>미세먼지</b>) — an <b>air purifier</b> ad."]});
  q({id:"u403", type:"U-R4", sec:"read", text:"<분실물 센터 이용 안내>\n· 위치: 지하철 시청역 지하 1층\n· 운영 시간: 평일 09:00~18:00 (주말·공휴일 휴무)\n· 보관 기간: 1주일 (이후 경찰서로 이관)\n※ 물건을 찾으러 오실 때는 신분증을 꼭 가져오십시오.",
    opts:["물건을 찾으려면 신분증이 필요하다.","주말에도 이용할 수 있다.","분실물은 한 달 동안 보관한다.","분실물 센터는 지하 2층에 있다."], a:0,
    exp:"<b>신분증을 꼭 가져오십시오</b> — shaxsni tasdiqlovchi hujjat shart. Dam olish kunlari yopiq, saqlash muddati 1 hafta, joyi — 1-yer osti qavat.",
    tr:["<b>신분증을 꼭 가져오십시오</b> — обязательно удостоверение. В выходные закрыто, хранение — неделя, этаж B1.","<b>Bring ID</b>. Closed weekends, kept one week, on B1."]});
  q({id:"u404", type:"U-R4", sec:"read", text:"지난 10일, 한 고등학생이 길에서 쓰러진 노인에게 심폐소생술을 해 생명을 구했다. 이 학생은 학교에서 배운 응급 처치 방법을 떠올려 구급차가 올 때까지 침착하게 대처했다. 노인은 병원으로 옮겨져 현재 건강을 회복하고 있다.",
    opts:["학생은 학교에서 응급 처치를 배웠다.","노인은 아직 의식을 찾지 못했다.","학생은 구급차를 운전했다.","이 일은 병원 안에서 일어났다."], a:0,
    exp:"<b>학교에서 배운 응급 처치 방법</b> — maktabda o'rgangan birinchi yordam usuli. Voqea ko'chada bo'lgan, qariya tuzalmoqda.",
    tr:["<b>학교에서 배운 응급 처치</b> — первая помощь, изученная в школе. Случай на улице, пожилой человек поправляется.","He used <b>first aid learned at school</b>; it happened on the street and the man is recovering."]});
  q({id:"u405", type:"U-R8", sec:"read", text:"사람들은 대개 쉬는 날에 잠을 몰아서 자면 피로가 풀린다고 생각한다. 그러나 주말에 평소보다 훨씬 늦게 일어나면 몸의 시계가 흐트러져 오히려 월요일 아침에 더 피곤해질 수 있다. 따라서 피로를 제대로 풀려면 (    ) 것이 좋다.",
    opts:["주말에도 평일과 비슷한 시간에 일어나는","주말에 최대한 오래 자는","월요일에 늦게 일어나는","평일에 잠을 줄이는"], a:0,
    exp:"Kech turish tana soatini buzadi → xulosa: <b>dam olish kunlari ham odatdagi vaqtda turish</b> kerak. 몰아서 자다 — bir yo'la ko'p uxlamoq.",
    tr:["Поздний подъём сбивает биоритм → вывод: <b>вставать в выходные как в будни</b>. 몰아서 자다 — отсыпаться.","Sleeping in disrupts the body clock → <b>get up at the usual time on weekends</b>."]});
  q({id:"u406", type:"U-R8", sec:"read", text:"박물관들이 변하고 있다. 과거의 박물관이 유물을 유리 안에 넣어 보여 주기만 했다면, 요즘 박물관은 관람객이 (    ) 다양한 체험 프로그램을 마련하고 있다. 아이들은 옛날 옷을 입어 보거나 직접 도자기를 만들어 보면서 역사를 더 생생하게 느낀다.",
    opts:["직접 참여하며 배울 수 있는","유물을 사 갈 수 있는","조용히 감상만 하는","사진을 찍을 수 없는"], a:0,
    exp:"O'tmish: faqat ko'rsatish ↔ hozir: <b>체험 프로그램</b>, kiyim kiyib ko'rish, sopol yasash — <b>o'zi qatnashib o'rganish</b>. 생생하다 — jonli.",
    tr:["Раньше — только показ, теперь — <b>участие самих посетителей</b> (체험). 생생하다 — живой.","Old: display only; now visitors <b>learn by taking part</b> (체험). 생생하다 — vivid."]});
  q({id:"u407", type:"U-R10", sec:"read", text:"많은 사람들이 거절하는 것을 어려워한다. 상대방이 서운해할까 봐 원하지 않는 부탁도 들어주는 것이다. 하지만 무리하게 부탁을 들어주다 보면 결국 자신도 지치고 관계도 나빠진다. 정중하게 이유를 설명하고 거절하는 것이 오히려 건강한 관계를 유지하는 방법이다.",
    opts:["정중하게 거절하는 것이 건강한 관계에 도움이 된다.","다른 사람의 부탁은 모두 들어주어야 한다.","거절하면 관계가 끝난다.","다른 사람에게 부탁을 하지 말아야 한다."], a:0,
    exp:"Oxirgi gap — mavzu: <b>xushmuomalalik bilan rad etish</b> sog'lom munosabatni saqlaydi. 거절하다 — rad etmoq, 정중하다 — muloyim.",
    tr:["Тема в конце: <b>вежливый отказ</b> сохраняет здоровые отношения. 거절하다 — отказывать.","The topic is the last line: <b>polite refusal</b> keeps relationships healthy."]});
  q({id:"u408", type:"U-R10", sec:"read", text:"실패한 상품도 기업에게는 소중한 자산이 될 수 있다. 소비자가 왜 그 상품을 선택하지 않았는지 분석하면 다음 상품을 만들 때 같은 실수를 피할 수 있기 때문이다. 실제로 많은 인기 상품들이 실패한 상품의 경험을 바탕으로 탄생했다.",
    opts:["실패한 상품의 원인을 분석하면 다음 성공에 도움이 된다.","기업은 실패를 숨겨야 한다.","인기 상품은 우연히 만들어진다.","소비자는 새 상품을 좋아하지 않는다."], a:0,
    exp:"Asosiy g'oya: muvaffaqiyatsiz mahsulot — <b>qimmatli boylik</b>, sababini tahlil qilsang keyingisida muvaffaqiyat bo'ladi. 자산 — boylik, aktiv.",
    tr:["Главное: неудачный товар — <b>ценный актив</b>, анализ причин помогает следующему успеху.","A failed product is <b>an asset</b> — analysing it helps the next one succeed."]});
  q({id:"u409", type:"U-R11", sec:"read", fixed:true, text:"<보기> 그러나 무엇보다 중요한 것은 매일 꾸준히 하는 것이다.\n\n외국어 듣기 실력을 높이는 방법은 여러 가지가 있다. ( ㉠ ) 자신의 수준에 맞는 자료를 고르는 것이 중요하고, 처음에는 자막을 보면서 듣다가 익숙해지면 자막 없이 듣는 것이 좋다. ( ㉡ ) 하루에 몇 시간씩 몰아서 듣는 것보다 짧게라도 매일 듣는 것이 훨씬 효과적이다. ( ㉢ ) 이렇게 습관이 되면 실력은 자연스럽게 는다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:1,
    exp:"<보기>: \"<b>lekin</b> eng muhimi — har kuni\". Undan keyingi gap shuni tushuntiradi (har kuni oz-ozdan tinglash samarali) → <b>㉡</b>.",
    tr:["<보기>: «<b>но</b> важнее всего — каждый день». Следующая фраза это раскрывает → <b>㉡</b>.","<보기> says \"<b>but</b> daily practice matters most\"; the next sentence elaborates → <b>㉡</b>."]});
  q({id:"u410", type:"U-R11", sec:"read", fixed:true, text:"<보기> 이 때문에 해조류가 자라는 곳은 '바다의 숲'이라고 불린다.\n\n해조류는 바닷속에서 자라는 미역, 김, 다시마 같은 식물을 말한다. ( ㉠ ) 해조류는 광합성으로 많은 양의 산소를 만들고, 물고기들에게 먹이와 쉴 곳을 제공한다. ( ㉡ ) 그런데 최근 바다 온도가 오르면서 해조류가 빠르게 사라지고 있다. ( ㉢ ) 이에 정부는 바닷속에 해조류를 심는 사업을 벌이고 있다. ( ㉣ )",
    opts:["㉠","㉡","㉢","㉣"], a:1,
    exp:"<보기> <b>이 때문에</b> — \"shu sababli\": u kislorod va baliqlarga boshpana haqidagi gapdan keyin, <b>그런데</b> (muammo) dan oldin turadi → <b>㉡</b>. 해조류 — suv o'tlari.",
    tr:["<보기> с <b>이 때문에</b> идёт после описания пользы (кислород, укрытие) и перед <b>그런데</b> → <b>㉡</b>. 해조류 — водоросли.","<보기> (<b>이 때문에</b>) follows the benefits and precedes <b>그런데</b> → <b>㉡</b>."]});
  q({id:"u411", type:"U-R5", sec:"read", text:"(가) 이 돈으로 아이들에게 책을 사 주기로 했다.\n(나) 우리 반은 지난달 학교 축제에서 직접 만든 쿠키를 팔았다.\n(다) 생각보다 많이 팔려서 10만 원이 넘는 돈을 모았다.\n(라) 다음 주에 반 친구들과 함께 책을 전달하러 지역 아동 센터에 갈 예정이다.",
    opts:["(나)-(다)-(가)-(라)","(나)-(가)-(다)-(라)","(다)-(나)-(가)-(라)","(나)-(다)-(라)-(가)"], a:0,
    exp:"(나) pechenye sotdik → (다) pul yig'dik → (가) <b>이 돈으로</b> kitob olishga qaror qildik → (라) keyingi hafta topshiramiz.",
    tr:["(나) продали печенье → (다) собрали деньги → (가) <b>на эти деньги</b> решили купить книги → (라) отвезём на следующей неделе.","(나) sold cookies → (다) raised money → (가) <b>with this money</b> buy books → (라) deliver next week."]});
  q({id:"u412", type:"U-R6", sec:"read", text:"바닷가에서 쉽게 볼 수 있는 조개껍데기는 사실 (    ). 조개껍데기에는 칼슘이 많아서 잘게 부숴 밭에 뿌리면 흙을 건강하게 만드는 비료가 되고, 닭의 사료에 섞어 주기도 한다.",
    opts:["쓸모가 많은 자원이다","바다를 오염시키는 쓰레기이다","사람이 먹는 음식이다","구하기 어려운 물건이다"], a:0,
    exp:"Keyingi gap foydalarini sanaydi: o'g'it, tovuq yemi → <b>foydali resurs</b>. 사실 — aslida (kutilmagan haqiqat), 쓸모 — foyda.",
    tr:["Далее перечислена польза: удобрение, корм → <b>полезный ресурс</b>. 쓸모 — польза.","The next sentence lists uses (fertilizer, feed) → <b>a useful resource</b>."]});

  set({id:"us41", type:"U-R12", sec:"read",
    text:"퇴근길 지하철에서 깜빡 잠이 들었다. 눈을 떠 보니 내려야 할 역을 세 정거장이나 지나 있었다. 서둘러 내리려고 일어나는데 옆에 앉은 할머니가 내 가방을 꼭 붙잡고 계셨다. 내가 자는 동안 가방이 바닥에 떨어질까 봐 계속 잡고 계셨던 것이다. 감사하다고 말씀드리자 할머니는 \"피곤했나 보네. 조심히 가요.\" 하며 웃으셨다. [[그날 밤 집으로 걸어가는 발걸음이 왠지 가벼웠다]].",
    qs:[
      {id:"u641", ask:"밑줄 친 부분에 나타난 '나'의 심정으로 가장 알맞은 것을 고르십시오.", opts:["흐뭇하다","억울하다","초조하다","귀찮다"], a:0,
       exp:"Begona buvining mehridan ko'ngli iliydi — \"qadamlar yengil\" = <b>흐뭇하다</b> (mamnun, ko'ngli to'q). 억울하다 — nohaqlikdan xafa, 초조하다 — xavotirli.",
       tr:["Тепло на душе от доброты незнакомки — <b>흐뭇하다</b> (довольный, растроганный). 억울하다 — обидно, 초조하다 — тревожно.","Warmed by a stranger's kindness — <b>흐뭇하다</b> (heart-warmed). 억울하다 — wronged, 초조하다 — anxious."]},
      {id:"u642", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["할머니는 내 가방이 떨어지지 않게 잡아 주셨다.","나는 내릴 역에서 바로 내렸다.","할머니는 내 가방을 가져가려고 했다.","나는 할머니께 인사를 하지 않았다."], a:0,
       exp:"<b>가방이 바닥에 떨어질까 봐 계속 잡고 계셨던 것이다</b> — sumka tushib ketmasin deb ushlab turgan. Men 3 bekat o'tib ketganman.",
       tr:["<b>… 떨어질까 봐 계속 잡고 계셨던 것</b> — держала, чтобы сумка не упала. Я проехал 3 остановки.","She held the bag <b>so it wouldn't fall</b>; I'd missed my stop by three stations."]}
    ]});
  set({id:"us42", type:"U-R12", sec:"read",
    text:"꿀은 썩지 않는 음식으로 알려져 있다. 실제로 수천 년 전 이집트의 무덤에서 발견된 꿀이 여전히 먹을 수 있는 상태였다고 한다. 꿀이 오래 보관될 수 있는 것은 수분이 적고 당분이 많아서 세균이 살기 어렵기 때문이다. (    ) 꿀도 뚜껑을 열어 둔 채 보관하면 공기 중의 수분을 흡수해 맛이 변할 수 있다. 따라서 반드시 뚜껑을 닫아 서늘한 곳에 두어야 한다.",
    qs:[
      {id:"u643", ask:"(    )에 들어갈 알맞은 것을 고르십시오.", opts:["하지만","그래서","예를 들면","게다가"], a:0,
       exp:"\"Asal buzilmaydi\" ↔ \"<b>lekin</b> ochiq qolsa ta'mi o'zgaradi\" — qarama-qarshilik: <b>하지만</b>.",
       tr:["«Мёд не портится» ↔ «<b>но</b> открытый меняет вкус» — противопоставление: <b>하지만</b>.","\"Honey doesn't spoil\" ↔ \"<b>but</b> left open it changes\" — contrast: <b>하지만</b>."]},
      {id:"u644", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["꿀은 수분이 적어서 세균이 살기 어렵다.","꿀은 뚜껑을 열어 두어야 한다.","이집트에서 발견된 꿀은 먹을 수 없었다.","꿀은 따뜻한 곳에 두어야 한다."], a:0,
       exp:"<b>수분이 적고 당분이 많아서 세균이 살기 어렵기 때문</b> — namlik kam, shakar ko'p — bakteriya yashay olmaydi. Saqlash: yopiq, salqin joyda.",
       tr:["<b>수분이 적고 당분이 많아서 …</b> — мало влаги и много сахара, бактериям трудно жить. Хранить закрытым в прохладе.","<b>Low moisture, high sugar</b> — bacteria can't thrive; store closed and cool."]}
    ]});
  set({id:"us43", type:"U-R12", sec:"read",
    text:"최근 여러 지방자치단체가 출산 장려금을 크게 올리고 있다. 아이를 낳으면 수백만 원을 지원하겠다는 것이다. 물론 경제적 지원은 필요하다. 그러나 장려금만으로 출산율이 오를 것이라고 기대하는 것은 지나치게 단순한 생각이다. 젊은 부부들이 아이 낳기를 망설이는 이유는 일시적인 비용보다 육아와 일을 함께 하기 어려운 환경, 높은 집값 같은 구조적인 문제에 있기 때문이다. 일회성 지원보다 아이를 키우기 좋은 사회 환경을 만드는 데 정책의 초점을 맞춰야 한다.",
    qs:[
      {id:"u645", ask:"필자의 태도로 가장 알맞은 것을 고르십시오.", opts:["출산 장려금 중심의 정책이 가진 한계를 지적하고 있다.","출산 장려금을 더 올려야 한다고 주장하고 있다.","경제적 지원은 전혀 필요 없다고 보고 있다.","젊은 부부들의 선택을 비판하고 있다."], a:0,
       exp:"Muallif: yordam kerak (물론), <b>그러나</b> faqat pul bilan yechilmaydi — <b>cheklovini ko'rsatmoqda</b>. 한계 — chegara, cheklov, 지적하다 — ko'rsatib o'tmoq.",
       tr:["Автор признаёт помощь (물론), <b>но</b> указывает на <b>ограниченность</b> денежных выплат. 한계 — предел.","He grants aid is needed (물론) but <b>points out the limits</b> of cash incentives."]},
      {id:"u646", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["필자는 구조적인 문제를 해결해야 한다고 본다.","장려금 덕분에 출산율이 크게 올랐다.","젊은 부부들은 비용만 걱정한다.","지방자치단체들이 장려금을 줄이고 있다."], a:0,
       exp:"Sabab — <b>구조적인 문제</b> (bola tarbiyasi va ish, uy narxi). Muallif ijtimoiy muhitni yaxshilashni taklif qiladi. 망설이다 — ikkilanmoq.",
       tr:["Причина — <b>структурные проблемы</b> (работа и уход за детьми, жильё). 망설이다 — колебаться.","The cause is <b>structural</b> (childcare vs work, housing). 망설이다 — hesitate."]}
    ]});
  set({id:"us44", type:"U-R12", sec:"read",
    text:"한 편의점 회사가 유통기한이 얼마 남지 않은 도시락을 할인해 파는 앱 서비스를 시작했다. 소비자는 앱으로 가까운 매장의 할인 상품을 확인하고 최대 50%까지 싸게 살 수 있다. 회사 입장에서는 버려지는 음식을 줄여 (    ), 소비자는 저렴하게 식사를 해결할 수 있어 양쪽 모두에게 이익이다. 서비스를 시작한 지 석 달 만에 버려지는 도시락의 양이 30% 줄었다.",
    qs:[
      {id:"u647", ask:"(    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.", opts:["폐기 비용을 아낄 수 있고","도시락 가격을 올릴 수 있고","매장 수를 줄일 수 있고","유통기한을 늘릴 수 있고"], a:0,
       exp:"Kompaniya uchun foyda: tashlanadigan ovqat kamayadi → <b>yo'q qilish xarajati tejaladi</b>. 폐기 — chiqitga chiqarish, 유통기한 — yaroqlilik muddati.",
       tr:["Выгода компании: меньше выбрасывают → <b>экономия на утилизации</b>. 폐기 — утилизация, 유통기한 — срок годности.","For the company, less waste → <b>saved disposal costs</b>. 유통기한 — sell-by date."]},
      {id:"u648", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["서비스를 시작한 후 버려지는 도시락이 줄었다.","할인 상품은 매장에 가야만 확인할 수 있다.","도시락을 최대 70%까지 할인한다.","서비스는 1년 전에 시작했다."], a:0,
       exp:"<b>석 달 만에 버려지는 도시락의 양이 30% 줄었다</b> — uch oyda tashlanadigan obento 30% kamaydi. Chegirma 50% gacha, ilovada ko'rish mumkin.",
       tr:["<b>За 3 месяца выбрасываемых обедов стало на 30% меньше</b>. Скидка до 50%, смотреть в приложении.","<b>Within three months waste fell 30%</b>; discounts up to 50%, visible in the app."]}
    ]});
  set({id:"us45", type:"U-R12", sec:"read",
    text:"사람의 뇌는 여러 가지 일을 동시에 처리하는 데 익숙하지 않다. 우리가 여러 일을 동시에 한다고 느낄 때에도 실제로는 뇌가 일과 일 사이를 빠르게 오가는 것이다. 이 과정에서 집중력이 떨어지고 실수가 늘어난다. 연구에 따르면 여러 일을 번갈아 할 때는 한 가지 일에 집중할 때보다 시간이 최대 40% 더 걸린다고 한다. 따라서 일의 효율을 높이려면 한 번에 한 가지 일에 집중하는 것이 바람직하다.",
    qs:[
      {id:"u649", ask:"윗글의 주제로 가장 알맞은 것을 고르십시오.", opts:["한 번에 한 가지 일에 집중하는 것이 효율적이다.","여러 일을 동시에 하는 능력을 길러야 한다.","뇌는 쉬지 않고 일해야 한다.","실수를 줄이려면 일을 빨리 끝내야 한다."], a:0,
       exp:"Xulosa (<b>따라서</b>): <b>bir vaqtda bitta ishga diqqat qaratish</b> samaraliroq. 효율 — samaradorlik, 번갈아 — navbatma-navbat.",
       tr:["Вывод (<b>따라서</b>): эффективнее <b>сосредоточиться на одном деле</b>. 효율 — эффективность.","Conclusion (<b>따라서</b>): <b>focus on one task at a time</b>. 효율 — efficiency."]},
      {id:"u650", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["뇌는 여러 일 사이를 빠르게 오간다.","여러 일을 동시에 하면 시간이 줄어든다.","뇌는 여러 일을 동시에 처리하는 데 익숙하다.","일을 번갈아 하면 실수가 줄어든다."], a:0,
       exp:"<b>실제로는 뇌가 일과 일 사이를 빠르게 오가는 것이다</b> — aslida miya ishlar orasida tez almashadi. Vaqt 40% gacha ko'proq ketadi.",
       tr:["<b>… 뇌가 일과 일 사이를 빠르게 오가는 것</b> — мозг быстро переключается. Времени уходит до 40% больше.","<b>The brain switches rapidly between tasks</b>; it takes up to 40% longer."]}
    ]});

  // [48~50] uch savolli to'plam (U-R13)
  set({id:"us51", type:"U-R13", sec:"read",
    text:"최근 인공지능이 그린 그림이 미술 대회에서 상을 받으면서 논란이 일고 있다. 인공지능 그림을 예술로 인정해야 하는지에 대해 의견이 엇갈리는 것이다. 인정해야 한다는 쪽은 인공지능도 결국 사람이 명령어를 입력하고 결과를 고르는 과정을 거치므로 창작의 도구일 뿐이라고 주장한다. 반면 반대하는 쪽은 수많은 작가의 작품을 허락 없이 학습해 만든 그림이 (    ) 지적한다. 기술의 발전을 막을 수는 없다. 그렇다고 해서 원작자의 권리가 무시되어서도 안 된다. 이 논란을 해결하려면 무엇보다 학습에 사용되는 작품에 대한 저작권 기준을 하루빨리 마련해야 할 것이다.",
    qs:[
      {id:"u651", ask:"필자가 이 글을 쓴 목적으로 가장 알맞은 것을 고르십시오.", opts:["인공지능 그림에 대한 저작권 기준 마련을 촉구하려고","인공지능 그림 대회를 홍보하려고","인공지능 기술의 발전을 막으려고","작가들의 작품을 소개하려고"], a:0,
       exp:"Oxirgi gap — maqsad: <b>mualliflik huquqi mezonlarini tezroq ishlab chiqishni talab qilish</b>. 촉구하다 — qat'iy talab qilmoq, 저작권 — mualliflik huquqi.",
       tr:["Цель в последней фразе: <b>призвать скорее выработать нормы авторского права</b>. 촉구하다 — призывать.","The aim is in the last line: <b>urge copyright rules for AI training</b>. 촉구하다 — to urge."]},
      {id:"u652", ask:"(    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.", opts:["다른 사람의 권리를 침해할 수 있다고","사람의 그림보다 더 아름답다고","상을 받을 자격이 있다고","너무 비싸게 팔린다고"], a:0,
       exp:"Qarshi tomon: <b>ruxsatsiz</b> o'rganilgan asarlar — demak <b>boshqalarning huquqini buzishi mumkin</b>. 침해하다 — buzmoq (huquqni).",
       tr:["Противники: обучение <b>без разрешения</b> → может <b>нарушать чужие права</b>. 침해하다 — нарушать.","Opponents: trained <b>without permission</b> → it may <b>infringe others' rights</b>."]},
      {id:"u653", ask:"필자의 태도로 가장 알맞은 것을 고르십시오.", opts:["기술 발전과 원작자의 권리를 함께 고려해야 한다고 본다.","인공지능 그림을 모두 금지해야 한다고 본다.","원작자의 권리는 중요하지 않다고 본다.","인공지능 그림을 무조건 예술로 인정해야 한다고 본다."], a:0,
       exp:"<b>기술의 발전을 막을 수는 없다. 그렇다고 해서 원작자의 권리가 무시되어서도 안 된다</b> — muallif muvozanatli: ikkalasini ham hisobga olish kerak.",
       tr:["<b>Прогресс не остановить, но и права авторов нельзя игнорировать</b> — сбалансированная позиция.","<b>Progress can't be stopped, nor can creators' rights be ignored</b> — a balanced stance."]}
    ]});
  set({id:"us52", type:"U-R13", sec:"read",
    text:"도시의 빈집이 늘고 있다. 인구가 줄고 사람들이 새 아파트로 옮겨 가면서 오래된 주택이 방치되는 것이다. 빈집은 보기에 좋지 않을 뿐만 아니라 범죄나 화재의 위험도 높여 주변 주민들의 불안을 키운다. 이에 일부 지역에서는 빈집을 고쳐 청년들에게 싼값에 빌려주거나 마을 도서관, 공동 작업실 등으로 바꾸는 사업을 벌이고 있다. 이러한 사업은 (    ) 동시에 젊은 층을 지역으로 끌어들이는 효과도 있다. 다만 사업이 일회성으로 끝나지 않으려면 빈집 소유자와의 협의 절차를 간소화하고, 꾸준히 운영할 수 있는 예산을 확보하려는 노력이 뒤따라야 한다.",
    qs:[
      {id:"u654", ask:"필자가 이 글을 쓴 목적으로 가장 알맞은 것을 고르십시오.", opts:["빈집 활용 사업의 효과와 과제를 설명하려고","새 아파트 분양을 홍보하려고","빈집 소유자를 비판하려고","화재 예방 방법을 알려 주려고"], a:0,
       exp:"Matn bo'sh uylarni qayta ishlatish loyihasining <b>foydasi</b> (muammoni hal qiladi, yoshlarni jalb qiladi) va <b>vazifalari</b> (다만 — byudjet, kelishuv) haqida.",
       tr:["Текст о <b>пользе</b> проектов с пустыми домами и о <b>задачах</b> (다만 — бюджет, согласование).","It explains the project's <b>benefits</b> and remaining <b>challenges</b> (다만 — budget, approvals)."]},
      {id:"u655", ask:"(    )에 들어갈 내용으로 가장 알맞은 것을 고르십시오.", opts:["빈집 문제를 해결하는","빈집을 더 늘리는","집값을 크게 올리는","주민들을 떠나게 하는"], a:0,
       exp:"<b>동시에 ... 효과도 있다</b> — ikki ijobiy natija: birinchisi — <b>bo'sh uylar muammosini hal qilish</b>, ikkinchisi — yoshlarni jalb qilish.",
       tr:["<b>동시에 … 효과도</b> — два плюса: <b>решить проблему пустых домов</b> и привлечь молодёжь.","<b>동시에 … 효과도</b> — two benefits: <b>solving the empty-house problem</b> and attracting youth."]},
      {id:"u656", ask:"윗글의 내용과 같은 것을 고르십시오.", opts:["빈집은 주변 주민들에게 불안감을 준다.","빈집 활용 사업은 모든 지역에서 끝났다.","이 사업에는 예산이 필요하지 않다.","청년들은 빈집을 비싼 값에 빌린다."], a:0,
       exp:"<b>범죄나 화재의 위험도 높여 주변 주민들의 불안을 키운다</b> — jinoyat va yong'in xavfi tufayli qo'shnilar xavotirda. Yoshlarga <b>arzon</b> ijaraga beriladi.",
       tr:["<b>… 주변 주민들의 불안을 키운다</b> — риск преступлений и пожаров тревожит соседей. Молодёжи сдают <b>дёшево</b>.","Empty houses <b>raise neighbours' anxiety</b> (crime, fire); youth rent them <b>cheaply</b>."]}
    ]});

  window.PW_QTR = window.PW_QTR || {};
  function tr(o) { if (o.tr) { window.PW_QTR[o.id] = o.tr; delete o.tr; } }
  S.forEach(tr);
  G.forEach(function (g) { g.qs.forEach(tr); });
  window.PW_QBANK.topik2 = (window.PW_QBANK.topik2 || []).concat(S);
  window.PW_QSETS.topik2 = (window.PW_QSETS.topik2 || []).concat(G);
})();
