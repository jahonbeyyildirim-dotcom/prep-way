/* Juft savollar: bitta matn yoki audio va unga 2 ta savol (TOPIK I [25~30], [49~70]). */
window.PW_QSETS = { eps: [], topik: [
    {id:"s01", type:"T-L8", sec:"listen", audio:"여자: 손님 여러분께 안내 말씀 드리겠습니다. 오늘 오후 3시부터 1층 식품 매장에서 과일을 30% 싸게 팝니다. 행사는 저녁 6시까지 합니다. 많이 이용해 주시기 바랍니다.",
     qs:[
      {id:"t201", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["행사를 안내하려고", "과일을 사려고", "매장을 찾으려고", "시간을 물어보려고"], a:0,
       exp:"<b>안내 말씀 드리겠습니다</b> — e'lon. Ayol chegirma aksiyasi haqida <b>xabar beryapti</b>. 행사 — tadbir, aksiya."},
      {id:"t202", ask:"들은 내용과 같은 것을 고르십시오.", opts:["과일 행사는 1층에서 합니다.", "행사는 오전에 시작합니다.", "행사는 밤 9시까지 합니다.", "모든 물건을 싸게 팝니다."], a:0,
       exp:"<b>1층 식품 매장</b> — 1-qavatdagi oziq-ovqat bo'limi. Aksiya 15:00–18:00, faqat mevalarga."}
     ]},
    {id:"s02", type:"T-L8", sec:"listen", audio:"여자: 학생 여러분, 다음 주 금요일에 학교 축제가 있습니다. 축제 날에는 수업이 없습니다. 오전 10시까지 운동장으로 오십시오. 점심은 학교에서 줍니다. 그리고 편한 옷을 입고 오십시오.",
     qs:[
      {id:"t203", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["축제를 안내하려고", "운동을 가르치려고", "옷을 팔려고", "점심을 만들려고"], a:0,
       exp:"O'qituvchi talabalarga <b>bayram (festival) haqida ma'lumot beryapti</b>. 축제 — festival, 운동장 — stadion, maydon."},
      {id:"t204", ask:"들은 내용과 같은 것을 고르십시오.", opts:["축제 날에는 수업을 하지 않습니다.", "학생들은 점심을 가지고 와야 합니다.", "축제는 다음 주 월요일입니다.", "오후에 운동장으로 가야 합니다."], a:0,
       exp:"<b>수업이 없습니다</b> — dars yo'q. Tushlikni maktab beradi, festival juma kuni, ertalab 10 gacha kelish kerak."}
     ]},
    {id:"s03", type:"T-L9", sec:"listen", audio:"남자: 수지 씨, 이번 방학에 뭐 할 거예요?\n여자: 저는 제주도에 여행을 가려고 해요. 민수 씨는요?\n남자: 저는 아르바이트를 할 거예요. 돈을 모아서 다음 방학에 여행을 가고 싶어요.\n여자: 그래요? 그럼 다음에는 같이 가요.",
     qs:[
      {id:"t205", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["방학 계획", "아르바이트 장소", "제주도 날씨", "여행 비용"], a:0,
       exp:"Ikkalasi <b>ta'tilda nima qilishini</b> gaplashyapti: <b>방학 계획</b> — ta'til rejasi."},
      {id:"t206", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 방학에 일을 할 겁니다.", "여자는 아르바이트를 합니다.", "남자는 이번 방학에 제주도에 갑니다.", "두 사람은 이번 방학에 같이 여행을 갑니다."], a:0,
       exp:"Erkak <b>아르바이트</b> qiladi, pul yig'ib keyingi ta'tilda sayohat qilmoqchi. 모으다 — yig'moq."}
     ]},
    {id:"s04", type:"T-L9", sec:"listen", audio:"여자: 민호 씨, 이사할 집은 찾았어요?\n남자: 아직요. 학교 근처는 너무 비싸요.\n여자: 지하철역 근처는 어때요? 학교까지 지하철로 15분이면 가요.\n남자: 좋아요. 이번 주말에 한번 가 볼게요.",
     qs:[
      {id:"t207", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["이사할 집", "학교 수업", "지하철 요금", "주말 약속"], a:0,
       exp:"Gap <b>ko'chib o'tiladigan uy</b> haqida: qayerdan uy topish. 이사하다 — ko'chmoq."},
      {id:"t208", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 아직 집을 못 찾았습니다.", "학교 근처 집은 쌉니다.", "여자는 지하철역 근처에 삽니다.", "남자는 오늘 집을 보러 갑니다."], a:0,
       exp:"<b>아직요</b> — hali yo'q: uy topilmagan. Maktab yaqinidagi uylar qimmat, erkak dam olish kuni boradi."}
     ]},
    {id:"s05", type:"T-L10", sec:"listen", audio:"여자: 선생님, 왜 한국어 선생님이 되셨어요?\n남자: 대학교 때 외국 친구들에게 한국어를 가르쳐 줬어요. 친구들이 한국어를 잘하게 되니까 정말 기뻤어요. 그래서 한국어 선생님이 되고 싶었어요.\n여자: 지금도 그때처럼 즐거우세요?\n남자: 네, 학생들을 만나는 게 제일 즐거워요.",
     qs:[
      {id:"t209", ask:"남자가 한국어 선생님이 된 이유를 고르십시오.", opts:["외국 친구들을 가르치는 것이 기뻐서", "외국에서 살고 싶어서", "대학교에서 공부를 잘해서", "돈을 많이 벌고 싶어서"], a:0,
       exp:"Do'stlari koreys tilini o'rganganda <b>xursand bo'lgani uchun</b> o'qituvchi bo'lgan. <b>그래서</b> — sababni ko'rsatadi."},
      {id:"t210", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 대학교 때 한국어를 가르쳤습니다.", "남자는 지금 학생입니다.", "남자는 가르치는 일이 힘듭니다.", "여자는 한국어 선생님입니다."], a:0,
       exp:"<b>대학교 때</b> — universitetda o'qiganda, chet ellik do'stlariga dars bergan. Hozir ham ishidan xursand."}
     ]},
    {id:"s06", type:"T-L10", sec:"listen", audio:"남자: 어서 오세요. 무엇을 도와 드릴까요?\n여자: 어제 여기에서 이 시계를 샀는데요. 다른 색으로 바꾸고 싶어요.\n남자: 왜 바꾸려고 하세요?\n여자: 동생 선물인데 동생이 검은색을 더 좋아해서요. 영수증도 가지고 왔어요.",
     qs:[
      {id:"t211", ask:"여자가 시계를 바꾸려고 하는 이유를 고르십시오.", opts:["동생이 검은색을 더 좋아해서", "시계가 고장 나서", "시계가 너무 비싸서", "영수증을 잃어버려서"], a:0,
       exp:"<b>-아/어서요</b> — sabab: singlisi <b>qora rangni ko'proq yoqtirgani uchun</b>. 바꾸다 — almashtirmoq."},
      {id:"t212", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 영수증을 가지고 왔습니다.", "여자는 오늘 시계를 샀습니다.", "시계는 여자의 선물입니다.", "여자는 돈을 돌려받고 싶어 합니다."], a:0,
       exp:"<b>영수증도 가지고 왔어요</b> — chekni ham olib keldim. Soat kecha olingan, singlisiga sovg'a."}
     ]},
    {id:"s07", type:"T-R6", sec:"read", text:"저는 매주 토요일에 동네 도서관에서 아이들에게 책을 읽어 줍니다. 처음에는 아이들이 조용히 앉아 있지 않아서 힘들었습니다. 하지만 재미있는 책을 골라서 읽어 주니까 아이들이 ( ㉠ ) 들었습니다. 요즘은 아이들이 토요일을 기다립니다.",
     qs:[
      {id:"t213", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["재미있게", "시끄럽게", "늦게", "조금"], a:0,
       exp:"Qiziq kitob tanlagani uchun bolalar <b>qiziqib</b> tinglagan: <b>재미있게</b>. -게 — ravish yasaydi."},
      {id:"t214", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 토요일마다 도서관에 갑니다.", "아이들은 처음부터 조용했습니다.", "저는 아이들에게 그림을 가르칩니다.", "아이들은 토요일을 싫어합니다."], a:0,
       exp:"<b>매주 토요일</b> = 토요일마다 — har shanba. Avvaliga bolalar tinch o'tirmagan."}
     ]},
    {id:"s08", type:"T-R6", sec:"read", text:"한국에서는 이사를 한 후에 이웃에게 떡을 나누어 줍니다. 떡을 주면서 인사를 하면 이웃과 ( ㉠ ) 지낼 수 있습니다. 요즘은 떡 대신 작은 선물을 주는 사람도 있습니다.",
     qs:[
      {id:"t215", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["친하게", "바쁘게", "조용하게", "늦게"], a:0,
       exp:"Salomlashib tteok bersangiz, qo'shnilar bilan <b>do'stona</b> yashaysiz: <b>친하게 지내다</b>."},
      {id:"t216", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["이사 후에 떡을 주는 이유", "떡을 만드는 방법", "이사하는 날짜", "이웃이 많은 이유"], a:0,
       exp:"Matn <b>ko'chgandan keyin qo'shnilarga tteok berish odati</b> va uning maqsadi haqida."}
     ]},
    {id:"s09", type:"T-R6", sec:"read", text:"저는 한국 회사에서 일한 지 1년이 되었습니다. 처음에는 한국어를 잘 못해서 실수를 많이 했습니다. 그래서 퇴근 후에 매일 한 시간씩 한국어를 공부했습니다. 지금은 회의에서 제 생각을 한국어로 ( ㉠ ) 수 있습니다.",
     qs:[
      {id:"t217", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["말할", "말한", "말하는", "말해서"], a:0,
       exp:"<b>-(으)ㄹ 수 있다</b> — «...a olaman»: <b>말할 수 있습니다</b>. Boshqa shakllar 수 bilan birikmaydi."},
      {id:"t218", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 퇴근 후에 한국어를 공부했습니다.", "저는 한국 회사에서 3년 일했습니다.", "저는 처음부터 한국어를 잘했습니다.", "저는 회의에서 말을 하지 않습니다."], a:0,
       exp:"<b>퇴근 후에 매일 한 시간씩</b> — ishdan keyin har kuni bir soatdan o'qigan. 1 yil ishlagan."}
     ]},
    {id:"s10", type:"T-R6", sec:"read", text:"요즘 자전거를 타고 출근하는 사람이 많아졌습니다. 자전거를 타면 운동도 되고 교통비도 들지 않습니다. ( ㉠ ) 비가 오는 날에는 자전거를 타기 어렵습니다. 그래서 날씨가 나쁜 날에는 버스나 지하철을 이용합니다.",
     qs:[
      {id:"t219", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그리고", "그래서", "하지만", "그러면"], a:2,
       exp:"Avval afzalliklar, keyin kamchilik: qarama-qarshi bog'lovchi <b>하지만</b> — lekin."},
      {id:"t220", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["자전거를 타면 교통비가 들지 않습니다.", "비가 와도 자전거를 탑니다.", "자전거로 출근하는 사람이 줄었습니다.", "자전거를 타는 것은 운동이 안 됩니다."], a:0,
       exp:"<b>교통비가 들지 않다</b> — yo'l haqi ketmaydi. Velosipedda ishga boruvchilar ko'paygan."}
     ]},
    {id:"s11", type:"T-R6", sec:"read", text:"저는 지난 주말에 처음으로 한국 친구 집에 초대를 받았습니다. ( ㉠ ) 그래서 우즈베키스탄 음식인 플로브를 만들어 갔습니다. ( ㉡ ) 친구 가족들은 플로브가 아주 맛있다고 했습니다. ( ㉢ ) 친구 어머니께서도 불고기를 만들어 주셨습니다. ( ㉣ )",
     qs:[
      {id:"t221", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n무엇을 가지고 가면 좋을지 고민했습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:0,
       exp:"«Nima olib borsam ekan, deb o'yladim» → <b>그래서</b> palov qildim. Demak gap ㉠ ga tushadi. 고민하다 — o'ylanib qolmoq."},
      {id:"t222", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 친구 집에 처음 갔습니다.", "친구가 플로브를 만들었습니다.", "친구 가족들은 플로브를 싫어했습니다.", "저는 불고기를 만들어 갔습니다."], a:0,
       exp:"<b>처음으로 초대를 받았습니다</b> — birinchi marta taklif qilindim. Palovni men qildim, 불고기 ni do'stning onasi."}
     ]},
    {id:"s12", type:"T-R6", sec:"read", text:"우리 회사 1층에는 작은 카페가 있습니다. 이 카페에서는 회사 근처 대학교 학생들이 아르바이트를 합니다. 커피 값이 다른 카페보다 싸고 맛도 좋아서 직원들이 자주 ( ㉠ ). 저도 점심을 먹은 후에 동료들과 이 카페에 갑니다.",
     qs:[
      {id:"t223", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["이용합니다", "만듭니다", "청소합니다", "배웁니다"], a:0,
       exp:"Arzon va mazali, shuning uchun xodimlar tez-tez <b>foydalanadi</b>: <b>이용하다</b>."},
      {id:"t224", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["카페는 회사 1층에 있습니다.", "카페 커피는 비쌉니다.", "저는 아침에 카페에 갑니다.", "카페에서 회사 직원들이 일합니다."], a:0,
       exp:"<b>1층</b> — birinchi qavat. Kafeda talabalar ishlaydi, men tushlikdan keyin boraman."}
     ]},
    {id:"s13", type:"T-R6", sec:"read", text:"받는 사람: 한국어반 학생들\n제목: 수업 장소 변경 안내\n\n학생 여러분, 안녕하세요.\n다음 주 월요일부터 한국어 수업 장소가 바뀝니다. 지금은 2층 201호에서 공부하지만 다음 주부터는 3층 305호에서 공부합니다. 수업 시간은 바뀌지 않습니다. 잘 기억해 주세요.\n\n한국어반 선생님 김지영",
     qs:[
      {id:"t225", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["수업 장소가 바뀐 것을 알려 주려고", "수업 시간을 바꾸려고", "새 학생을 소개하려고", "교실 청소를 부탁하려고"], a:0,
       exp:"Mavzu: <b>수업 장소 변경 안내</b> — dars joyi o'zgargani haqida xabar. Maqsad — ma'lum qilish."},
      {id:"t226", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["다음 주부터 3층에서 수업을 합니다.", "수업 시간이 바뀝니다.", "지금은 3층에서 공부합니다.", "다음 주 월요일에는 수업이 없습니다."], a:0,
       exp:"Hozir 2-qavat, <b>keyingi haftadan 3-qavat 305-xona</b>. Vaqt o'zgarmaydi."}
     ]},
    {id:"s14", type:"T-R6", sec:"read", text:"김치는 한국 사람들이 가장 많이 먹는 음식입니다. 옛날에는 겨울에 채소를 구하기 어려워서 가을에 김치를 많이 만들어 두었습니다. 이것을 '김장'이라고 합니다. 김장을 할 때는 가족과 이웃이 함께 모여서 김치를 ( ㉠ ). 요즘은 김치를 사서 먹는 사람도 많아졌습니다.",
     qs:[
      {id:"t227", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["담급니다", "팝니다", "버립니다", "기다립니다"], a:0,
       exp:"Kimchi tayyorlash maxsus fe'l bilan aytiladi: <b>김치를 담그다</b> (tuzlab tayyorlamoq)."},
      {id:"t228", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["김장은 가을에 하는 일입니다.", "옛날에는 겨울에 채소가 많았습니다.", "김장은 혼자 합니다.", "요즘은 아무도 김치를 사지 않습니다."], a:0,
       exp:"<b>가을에 김치를 많이 만들어 두었습니다</b> — kuzda ko'p kimchi tayyorlab qo'yilgan: bu <b>김장</b>."}
     ]},
    {id:"s15", type:"T-R6", sec:"read", text:"사람들은 보통 화가 나면 큰 소리로 말합니다. 그런데 화가 났을 때 큰 소리로 말하면 문제가 더 커질 수 있습니다. 화가 날 때는 먼저 깊게 숨을 쉬고 ( ㉠ ) 말하는 것이 좋습니다. 그러면 상대방도 내 이야기를 잘 들어 줍니다.",
     qs:[
      {id:"t229", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["천천히", "빨리", "크게", "많이"], a:0,
       exp:"Baland gapirish yomon, demak <b>sekin, xotirjam</b> gapirish kerak: <b>천천히</b>."},
      {id:"t230", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["화가 났을 때 큰 소리로 말하면 문제가 커질 수 있습니다.", "화가 나면 말을 하지 않아야 합니다.", "큰 소리로 말하면 상대방이 잘 들어 줍니다.", "사람들은 화가 나면 조용히 말합니다."], a:0,
       exp:"<b>문제가 더 커질 수 있습니다</b> — muammo kattalashishi mumkin. 화가 나다 — jahli chiqmoq, 숨을 쉬다 — nafas olmoq."}
     ]},
    {id:"s16", type:"T-R6", sec:"read", text:"저는 어렸을 때부터 사진 찍는 것을 좋아했습니다. 그래서 대학교에서 사진을 공부했습니다. 졸업 후에는 신문사에서 사진 기자로 일했습니다. 하지만 바쁜 기자 생활 때문에 제가 ( ㉠ ) 사진을 찍을 시간이 없었습니다. 그래서 작년에 회사를 그만두고 작은 사진관을 열었습니다. 지금은 손님들의 웃는 얼굴을 찍으면서 행복하게 지냅니다.",
     qs:[
      {id:"t231", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["찍고 싶은", "찍은", "찍는", "찍어서"], a:0,
       exp:"«O'zim <b>suratga olmoqchi bo'lgan</b> rasmlarga vaqt yo'q edi»: <b>-고 싶은</b> + ot."},
      {id:"t232", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["저는 지금 사진관을 하고 있습니다.", "저는 대학교에서 신문을 공부했습니다.", "저는 지금도 신문사에서 일합니다.", "저는 사진 찍는 것을 싫어합니다."], a:0,
       exp:"<b>작은 사진관을 열었습니다</b> — kichik fotostudiya ochdi; hozir o'sha yerda ishlaydi."}
     ]},
    {id:"s17", type:"T-R6", sec:"read", text:"우리 반에는 여러 나라에서 온 학생들이 있습니다. 쉬는 시간에는 서로 자기 나라 말을 가르쳐 줍니다. 저는 친구들에게 우즈베크어로 '안녕하세요'를 가르쳐 주었습니다. 다른 나라 말을 배우는 것은 ( ㉠ ) 재미있습니다.",
     qs:[
      {id:"t233", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["어렵지만", "어려워서", "어려우면", "어렵거나"], a:0,
       exp:"Qiyin, <b>lekin</b> qiziq: <b>-지만</b>. -아서 — sabab, -면 — shart, -거나 — yoki."},
      {id:"t234", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["친구들은 쉬는 시간에 자기 나라 말을 가르쳐 줍니다.", "우리 반 학생들은 모두 한국 사람입니다.", "저는 친구에게 영어를 배웠습니다.", "저는 다른 나라 말을 배우는 것이 싫습니다."], a:0,
       exp:"<b>쉬는 시간</b> — tanaffus: o'quvchilar bir-biriga o'z tilini o'rgatadi."}
     ]},
    {id:"s18", type:"T-R6", sec:"read", text:"저는 매일 아침 커피를 마십니다. 커피를 마시면 잠이 깨고 기분도 좋아집니다. ( ㉠ ) 저녁에 커피를 마시면 잠을 잘 못 잡니다. 그래서 오후 3시 이후에는 커피 대신 차를 마십니다.",
     qs:[
      {id:"t235", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그런데", "그래서", "그리고", "그러니까"], a:0,
       exp:"Yaxshi tomondan keyin muammo — <b>그런데</b> (biroq). 그래서/그러니까 — shuning uchun."},
      {id:"t236", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 오후 3시 이후에는 차를 마십니다.", "저는 저녁에 커피를 마십니다.", "커피를 마시면 기분이 나빠집니다.", "저는 아침에 차를 마십니다."], a:0,
       exp:"<b>커피 대신 차</b> — kofe o'rniga choy, soat 15:00 dan keyin. 대신 — o'rniga."}
     ]}
  ] };
