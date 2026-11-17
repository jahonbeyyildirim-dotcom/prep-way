/* Juft savollar: bitta matn yoki audio va unga 2 ta savol (TOPIK I [25~30], [49~70]).
   slot — rasmiy imtihondagi o'rni: 49 → [49~50], 59 → [59~60] (gap qo'yiladigan joy), 63 → [63~64] (xat/e'lon maqsadi) va h.k. */
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
    {id:"s07", type:"T-R6", slot:"49", sec:"read", text:"저는 매주 토요일에 동네 도서관에서 아이들에게 책을 읽어 줍니다. 처음에는 아이들이 조용히 앉아 있지 않아서 힘들었습니다. 하지만 재미있는 책을 골라서 읽어 주니까 아이들이 ( ㉠ ) 들었습니다. 요즘은 아이들이 토요일을 기다립니다.",
     qs:[
      {id:"t213", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["재미있게", "시끄럽게", "늦게", "조금"], a:0,
       exp:"Qiziq kitob tanlagani uchun bolalar <b>qiziqib</b> tinglagan: <b>재미있게</b>. -게 — ravish yasaydi."},
      {id:"t214", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 토요일마다 도서관에 갑니다.", "아이들은 처음부터 조용했습니다.", "저는 아이들에게 그림을 가르칩니다.", "아이들은 토요일을 싫어합니다."], a:0,
       exp:"<b>매주 토요일</b> = 토요일마다 — har shanba. Avvaliga bolalar tinch o'tirmagan."}
     ]},
    {id:"s08", type:"T-R6", slot:"51", sec:"read", text:"한국에서는 이사를 한 후에 이웃에게 떡을 나누어 줍니다. 떡을 주면서 인사를 하면 이웃과 ( ㉠ ) 지낼 수 있습니다. 요즘은 떡 대신 작은 선물을 주는 사람도 있습니다.",
     qs:[
      {id:"t215", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["친하게", "바쁘게", "조용하게", "늦게"], a:0,
       exp:"Salomlashib tteok bersangiz, qo'shnilar bilan <b>do'stona</b> yashaysiz: <b>친하게 지내다</b>."},
      {id:"t216", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["이사 후에 떡을 주는 이유", "떡을 만드는 방법", "이사하는 날짜", "이웃이 많은 이유"], a:0,
       exp:"Matn <b>ko'chgandan keyin qo'shnilarga tteok berish odati</b> va uning maqsadi haqida."}
     ]},
    {id:"s09", type:"T-R6", slot:"53", sec:"read", text:"저는 한국 회사에서 일한 지 1년이 되었습니다. 처음에는 한국어를 잘 못해서 실수를 많이 했습니다. 그래서 퇴근 후에 매일 한 시간씩 한국어를 공부했습니다. 지금은 회의에서 제 생각을 한국어로 ( ㉠ ) 수 있습니다.",
     qs:[
      {id:"t217", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["말할", "말한", "말하는", "말해서"], a:0,
       exp:"<b>-(으)ㄹ 수 있다</b> — «...a olaman»: <b>말할 수 있습니다</b>. Boshqa shakllar 수 bilan birikmaydi."},
      {id:"t218", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 퇴근 후에 한국어를 공부했습니다.", "저는 한국 회사에서 3년 일했습니다.", "저는 처음부터 한국어를 잘했습니다.", "저는 회의에서 말을 하지 않습니다."], a:0,
       exp:"<b>퇴근 후에 매일 한 시간씩</b> — ishdan keyin har kuni bir soatdan o'qigan. 1 yil ishlagan."}
     ]},
    {id:"s10", type:"T-R6", slot:"55", sec:"read", text:"요즘 자전거를 타고 출근하는 사람이 많아졌습니다. 자전거를 타면 운동도 되고 교통비도 들지 않습니다. ( ㉠ ) 비가 오는 날에는 자전거를 타기 어렵습니다. 그래서 날씨가 나쁜 날에는 버스나 지하철을 이용합니다.",
     qs:[
      {id:"t219", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그리고", "그래서", "하지만", "그러면"], a:2,
       exp:"Avval afzalliklar, keyin kamchilik: qarama-qarshi bog'lovchi <b>하지만</b> — lekin."},
      {id:"t220", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["자전거를 타면 교통비가 들지 않습니다.", "비가 와도 자전거를 탑니다.", "자전거로 출근하는 사람이 줄었습니다.", "자전거를 타는 것은 운동이 안 됩니다."], a:0,
       exp:"<b>교통비가 들지 않다</b> — yo'l haqi ketmaydi. Velosipedda ishga boruvchilar ko'paygan."}
     ]},
    {id:"s11", type:"T-R6", slot:"59", sec:"read", text:"저는 지난 주말에 처음으로 한국 친구 집에 초대를 받았습니다. ( ㉠ ) 그래서 우즈베키스탄 음식인 플로브를 만들어 갔습니다. ( ㉡ ) 친구 가족들은 플로브가 아주 맛있다고 했습니다. ( ㉢ ) 친구 어머니께서도 불고기를 만들어 주셨습니다. ( ㉣ )",
     qs:[
      {id:"t221", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n무엇을 가지고 가면 좋을지 고민했습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:0,
       exp:"«Nima olib borsam ekan, deb o'yladim» → <b>그래서</b> palov qildim. Demak gap ㉠ ga tushadi. 고민하다 — o'ylanib qolmoq."},
      {id:"t222", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 친구 집에 처음 갔습니다.", "친구가 플로브를 만들었습니다.", "친구 가족들은 플로브를 싫어했습니다.", "저는 불고기를 만들어 갔습니다."], a:0,
       exp:"<b>처음으로 초대를 받았습니다</b> — birinchi marta taklif qilindim. Palovni men qildim, 불고기 ni do'stning onasi."}
     ]},
    {id:"s12", type:"T-R6", slot:"61", sec:"read", text:"우리 회사 1층에는 작은 카페가 있습니다. 이 카페에서는 회사 근처 대학교 학생들이 아르바이트를 합니다. 커피 값이 다른 카페보다 싸고 맛도 좋아서 직원들이 자주 ( ㉠ ). 저도 점심을 먹은 후에 동료들과 이 카페에 갑니다.",
     qs:[
      {id:"t223", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["이용합니다", "만듭니다", "청소합니다", "배웁니다"], a:0,
       exp:"Arzon va mazali, shuning uchun xodimlar tez-tez <b>foydalanadi</b>: <b>이용하다</b>."},
      {id:"t224", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["카페는 회사 1층에 있습니다.", "카페 커피는 비쌉니다.", "저는 아침에 카페에 갑니다.", "카페에서 회사 직원들이 일합니다."], a:0,
       exp:"<b>1층</b> — birinchi qavat. Kafeda talabalar ishlaydi, men tushlikdan keyin boraman."}
     ]},
    {id:"s13", type:"T-R6", slot:"63", sec:"read", text:"받는 사람: 한국어반 학생들\n제목: 수업 장소 변경 안내\n\n학생 여러분, 안녕하세요.\n다음 주 월요일부터 한국어 수업 장소가 바뀝니다. 지금은 2층 201호에서 공부하지만 다음 주부터는 3층 305호에서 공부합니다. 수업 시간은 바뀌지 않습니다. 잘 기억해 주세요.\n\n한국어반 선생님 김지영",
     qs:[
      {id:"t225", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["수업 장소가 바뀐 것을 알려 주려고", "수업 시간을 바꾸려고", "새 학생을 소개하려고", "교실 청소를 부탁하려고"], a:0,
       exp:"Mavzu: <b>수업 장소 변경 안내</b> — dars joyi o'zgargani haqida xabar. Maqsad — ma'lum qilish."},
      {id:"t226", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["다음 주부터 3층에서 수업을 합니다.", "수업 시간이 바뀝니다.", "지금은 3층에서 공부합니다.", "다음 주 월요일에는 수업이 없습니다."], a:0,
       exp:"Hozir 2-qavat, <b>keyingi haftadan 3-qavat 305-xona</b>. Vaqt o'zgarmaydi."}
     ]},
    {id:"s14", type:"T-R6", slot:"65", sec:"read", text:"김치는 한국 사람들이 가장 많이 먹는 음식입니다. 옛날에는 겨울에 채소를 구하기 어려워서 가을에 김치를 많이 만들어 두었습니다. 이것을 '김장'이라고 합니다. 김장을 할 때는 가족과 이웃이 함께 모여서 김치를 ( ㉠ ). 요즘은 김치를 사서 먹는 사람도 많아졌습니다.",
     qs:[
      {id:"t227", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["담급니다", "팝니다", "버립니다", "기다립니다"], a:0,
       exp:"Kimchi tayyorlash maxsus fe'l bilan aytiladi: <b>김치를 담그다</b> (tuzlab tayyorlamoq)."},
      {id:"t228", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["김장은 가을에 하는 일입니다.", "옛날에는 겨울에 채소가 많았습니다.", "김장은 혼자 합니다.", "요즘은 아무도 김치를 사지 않습니다."], a:0,
       exp:"<b>가을에 김치를 많이 만들어 두었습니다</b> — kuzda ko'p kimchi tayyorlab qo'yilgan: bu <b>김장</b>."}
     ]},
    {id:"s15", type:"T-R6", slot:"67", sec:"read", text:"사람들은 보통 화가 나면 큰 소리로 말합니다. 그런데 화가 났을 때 큰 소리로 말하면 문제가 더 커질 수 있습니다. 화가 날 때는 먼저 깊게 숨을 쉬고 ( ㉠ ) 말하는 것이 좋습니다. 그러면 상대방도 내 이야기를 잘 들어 줍니다.",
     qs:[
      {id:"t229", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["천천히", "빨리", "크게", "많이"], a:0,
       exp:"Baland gapirish yomon, demak <b>sekin, xotirjam</b> gapirish kerak: <b>천천히</b>."},
      {id:"t230", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["화가 났을 때 큰 소리로 말하면 문제가 커질 수 있습니다.", "화가 나면 말을 하지 않아야 합니다.", "큰 소리로 말하면 상대방이 잘 들어 줍니다.", "사람들은 화가 나면 조용히 말합니다."], a:0,
       exp:"<b>문제가 더 커질 수 있습니다</b> — muammo kattalashishi mumkin. 화가 나다 — jahli chiqmoq, 숨을 쉬다 — nafas olmoq."}
     ]},
    {id:"s16", type:"T-R6", slot:"69", sec:"read", text:"저는 어렸을 때부터 사진 찍는 것을 좋아했습니다. 그래서 대학교에서 사진을 공부했습니다. 졸업 후에는 신문사에서 사진 기자로 일했습니다. 하지만 바쁜 기자 생활 때문에 제가 ( ㉠ ) 사진을 찍을 시간이 없었습니다. 그래서 작년에 회사를 그만두고 작은 사진관을 열었습니다. 지금은 손님들의 웃는 얼굴을 찍으면서 행복하게 지냅니다.",
     qs:[
      {id:"t231", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["찍고 싶은", "찍은", "찍는", "찍어서"], a:0,
       exp:"«O'zim <b>suratga olmoqchi bo'lgan</b> rasmlarga vaqt yo'q edi»: <b>-고 싶은</b> + ot."},
      {id:"t232", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["저는 지금 사진관을 하고 있습니다.", "저는 대학교에서 신문을 공부했습니다.", "저는 지금도 신문사에서 일합니다.", "저는 사진 찍는 것을 싫어합니다."], a:0,
       exp:"<b>작은 사진관을 열었습니다</b> — kichik fotostudiya ochdi; hozir o'sha yerda ishlaydi."}
     ]},
    {id:"s17", type:"T-R6", slot:"49", sec:"read", text:"우리 반에는 여러 나라에서 온 학생들이 있습니다. 쉬는 시간에는 서로 자기 나라 말을 가르쳐 줍니다. 저는 친구들에게 우즈베크어로 '안녕하세요'를 가르쳐 주었습니다. 다른 나라 말을 배우는 것은 ( ㉠ ) 재미있습니다.",
     qs:[
      {id:"t233", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["어렵지만", "어려워서", "어려우면", "어렵거나"], a:0,
       exp:"Qiyin, <b>lekin</b> qiziq: <b>-지만</b>. -아서 — sabab, -면 — shart, -거나 — yoki."},
      {id:"t234", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["친구들은 쉬는 시간에 자기 나라 말을 가르쳐 줍니다.", "우리 반 학생들은 모두 한국 사람입니다.", "저는 친구에게 영어를 배웠습니다.", "저는 다른 나라 말을 배우는 것이 싫습니다."], a:0,
       exp:"<b>쉬는 시간</b> — tanaffus: o'quvchilar bir-biriga o'z tilini o'rgatadi."}
     ]},
    {id:"s18", type:"T-R6", slot:"55", sec:"read", text:"저는 매일 아침 커피를 마십니다. 커피를 마시면 잠이 깨고 기분도 좋아집니다. ( ㉠ ) 저녁에 커피를 마시면 잠을 잘 못 잡니다. 그래서 오후 3시 이후에는 커피 대신 차를 마십니다.",
     qs:[
      {id:"t235", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그런데", "그래서", "그리고", "그러니까"], a:0,
       exp:"Yaxshi tomondan keyin muammo — <b>그런데</b> (biroq). 그래서/그러니까 — shuning uchun."},
      {id:"t236", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 오후 3시 이후에는 차를 마십니다.", "저는 저녁에 커피를 마십니다.", "커피를 마시면 기분이 나빠집니다.", "저는 아침에 차를 마십니다."], a:0,
       exp:"<b>커피 대신 차</b> — kofe o'rniga choy, soat 15:00 dan keyin. 대신 — o'rniga."}
     ]},
    {id:"s19", type:"T-R6", slot:"49", sec:"read", text:"저는 요즘 아침마다 공원에서 달리기를 합니다. 처음에는 10분만 뛰어도 힘들었습니다. 그런데 한 달 동안 매일 뛰니까 지금은 30분도 ( ㉠ ) 뛸 수 있습니다. 운동을 하니까 잠도 잘 잡니다.",
     qs:[
      {id:"t241", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["쉽게", "어렵게", "늦게", "조용하게"], a:0,
       exp:"Bir oy mashqdan keyin 30 daqiqa ham <b>oson</b> yuguradi: <b>쉽게</b>. Avval 10 daqiqa ham qiyin edi."},
      {id:"t242", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 매일 아침 달리기를 합니다.", "저는 처음부터 30분을 뛰었습니다.", "저는 저녁에 공원에 갑니다.", "운동을 한 후에 잠을 못 잡니다."], a:0,
       exp:"<b>아침마다</b> — har tong. Sport qilgani uchun yaxshi uxlaydi."}
     ]},
    {id:"s20", type:"T-R6", slot:"51", sec:"read", text:"한국에서는 식사할 때 숟가락과 젓가락을 같이 사용합니다. 밥과 국은 숟가락으로 먹고 반찬은 젓가락으로 먹습니다. 그리고 밥그릇을 손에 ( ㉠ ) 먹지 않습니다. 밥그릇은 식탁 위에 놓고 먹습니다.",
     qs:[
      {id:"t243", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["들고", "들어서", "들면", "들지만"], a:0,
       exp:"Ketma-ket harakat: <b>-고</b> — «...ib». Kosani qo'lda <b>ko'tarib</b> yemaydi: 들고 먹지 않습니다."},
      {id:"t244", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["한국의 식사 예절", "숟가락을 사는 곳", "반찬을 만드는 방법", "한국 음식의 값"], a:0,
       exp:"Qoshiq-cho'p, kosani stolda qoldirish — <b>식사 예절</b> (dasturxon odobi)."}
     ]},
    {id:"s21", type:"T-R6", slot:"51", sec:"read", text:"봄이 되면 한국의 여러 곳에서 꽃 축제가 열립니다. 특히 4월에는 벚꽃을 보러 가는 사람이 많습니다. 꽃이 핀 길을 걸으면서 사진을 찍으면 ( ㉠ ) 좋아집니다. 하지만 사람이 많으니까 아침 일찍 가는 것이 좋습니다.",
     qs:[
      {id:"t245", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["기분이", "날씨가", "시간이", "값이"], a:0,
       exp:"Gul ochilgan yo'lda sayr qilsangiz <b>kayfiyat</b> ko'tariladi: <b>기분이 좋아지다</b>."},
      {id:"t246", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["봄 꽃 축제", "겨울 여행", "사진기 사용법", "길을 찾는 방법"], a:0,
       exp:"Matn <b>bahorgi gul bayramlari</b> haqida. 벚꽃 — sakura, 열리다 — o'tkazilmoq."}
     ]},
    {id:"s22", type:"T-R6", slot:"53", sec:"read", text:"저는 지난달에 휴대폰을 잃어버렸습니다. 버스에서 내릴 때 의자 위에 놓고 내렸습니다. 바로 버스 회사에 전화를 했지만 찾을 수 없었습니다. 그래서 새 휴대폰을 샀습니다. 그 후로는 버스에서 내리기 ( ㉠ ) 꼭 제 물건을 확인합니다.",
     qs:[
      {id:"t247", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["전에", "후에", "동안", "때문에"], a:0,
       exp:"Narsalarni avtobusdan tushishdan <b>oldin</b> tekshiradi: <b>-기 전에</b>."},
      {id:"t248", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 버스에서 휴대폰을 잃어버렸습니다.", "버스 회사에서 휴대폰을 찾아 주었습니다.", "저는 휴대폰을 사지 않았습니다.", "저는 택시에서 휴대폰을 잃어버렸습니다."], a:0,
       exp:"Telefon <b>avtobusda</b> o'rindiqda qolgan va topilmagan, yangisi sotib olingan. 잃어버리다 — yo'qotmoq."}
     ]},
    {id:"s23", type:"T-R6", slot:"53", sec:"read", text:"우리 아파트에는 작은 도서관이 있습니다. 주민들이 읽은 책을 가지고 와서 다른 사람과 나누어 읽습니다. 책을 빌리는 데 돈이 ( ㉠ ). 저도 지난주에 요리책 두 권을 빌렸습니다.",
     qs:[
      {id:"t249", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["들지 않습니다", "많이 듭니다", "있습니다", "모입니다"], a:0,
       exp:"Kitoblar bo'lishiladi — <b>pul ketmaydi</b>: <b>돈이 들지 않다</b>. 돈이 들다 — pul sarflanmoq."},
      {id:"t250", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["주민들은 자기 책을 가지고 와서 나눕니다.", "책을 빌리려면 돈을 내야 합니다.", "저는 소설책을 빌렸습니다.", "도서관은 아파트 밖에 있습니다."], a:0,
       exp:"<b>주민</b> — aholi, uy egalari: o'qigan kitoblarini olib kelib bo'lishadi. Men pazandachilik kitobi oldim."}
     ]},
    {id:"s24", type:"T-R6", slot:"55", sec:"read", text:"한국 사람들은 생일에 미역국을 먹습니다. 미역국은 몸에 좋은 음식입니다. ( ㉠ ) 시험을 보는 날에는 미역국을 먹지 않습니다. 미역이 미끄러워서 시험에서 떨어진다고 생각하기 때문입니다.",
     qs:[
      {id:"t251", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그런데", "그래서", "그리고", "그러면"], a:0,
       exp:"Foydali ovqat, <b>biroq</b> imtihon kuni yeyilmaydi — qarama-qarshilik: <b>그런데</b>."},
      {id:"t252", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["생일에 미역국을 먹습니다.", "시험 날에 미역국을 꼭 먹습니다.", "미역국은 몸에 나쁩니다.", "미역은 미끄럽지 않습니다."], a:0,
       exp:"<b>미역국</b> — dengiz karami sho'rvasi, tug'ilgan kunda ichiladi. 떨어지다 — yiqilmoq; imtihondan yiqilmoq."}
     ]},
    {id:"s25", type:"T-R6", slot:"59", sec:"read", text:"저는 작년부터 주말마다 요리 학원에 다닙니다. ( ㉠ ) 처음에는 칼을 잘 쓰지 못해서 손을 자주 다쳤습니다. ( ㉡ ) 지금은 한국 음식을 열 가지쯤 만들 수 있습니다. ( ㉢ ) 다음 달에는 친구들을 초대해서 제가 만든 음식을 대접하려고 합니다. ( ㉣ )",
     qs:[
      {id:"t253", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n하지만 열심히 연습해서 실력이 많이 늘었습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:1,
       exp:"<b>하지만</b> — avvalgi qiyinchilikka qarshi: qo'l jarohatidan keyin, «hozir 10 xil ovqat» dan oldin — ㉡."},
      {id:"t254", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 주말에 요리를 배웁니다.", "저는 처음부터 칼을 잘 썼습니다.", "저는 한국 음식을 만들 줄 모릅니다.", "저는 지난달에 친구들을 초대했습니다."], a:0,
       exp:"<b>주말마다 요리 학원에 다닙니다</b> — har dam olish kuni pazandachilik kursiga boraman."}
     ]},
    {id:"s26", type:"T-R6", slot:"59", sec:"read", text:"우리 회사는 매년 봄에 직원들과 함께 산에 갑니다. ( ㉠ ) 올해도 지난 토요일에 가려고 했습니다. ( ㉡ ) 그래서 산 대신 회사 근처 식당에서 다 같이 점심을 먹었습니다. ( ㉢ ) 다른 부서 사람들과 이야기할 수 있어서 좋았습니다. ( ㉣ )",
     qs:[
      {id:"t255", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n그런데 그날 아침부터 비가 많이 왔습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:1,
       exp:"Yomg'ir — reja o'zgarishining sababi: «borishni rejalashtirdik» va «<b>그래서</b> tog' o'rniga restoran» orasida — ㉡."},
      {id:"t256", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["올해는 산에 가지 못했습니다.", "우리 회사는 가을에 산에 갑니다.", "비가 와서 집에서 쉬었습니다.", "다른 부서 사람들과 이야기하지 못했습니다."], a:0,
       exp:"Yomg'ir tufayli tog'ga <b>bora olishmadi</b>, restoranda tushlik qilishdi. 부서 — bo'lim."}
     ]},
    {id:"s27", type:"T-R6", slot:"61", sec:"read", text:"요즘 혼자 사는 사람들이 많아지면서 편의점에서 식사를 하는 사람도 늘었습니다. 편의점 도시락은 값이 싸고 ( ㉠ ) 먹을 수 있어서 인기가 많습니다. 하지만 매일 편의점 음식만 먹으면 건강에 좋지 않습니다. 가끔은 채소와 과일도 챙겨 먹는 것이 좋습니다.",
     qs:[
      {id:"t257", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["간단하게", "어렵게", "천천히", "비싸게"], a:0,
       exp:"Arzon va <b>oson, tez</b> yeyiladi: <b>간단하게</b>. Shuning uchun mashhur."},
      {id:"t258", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["편의점 도시락은 값이 쌉니다.", "혼자 사는 사람이 줄었습니다.", "편의점 음식만 먹어도 건강합니다.", "편의점 도시락은 인기가 없습니다."], a:0,
       exp:"<b>값이 싸다</b> — arzon. Yolg'iz yashovchilar ko'paygan; faqat do'kon ovqati sog'liqqa zarar."}
     ]},
    {id:"s28", type:"T-R6", slot:"61", sec:"read", text:"저는 한국에 온 후에 한국 친구를 사귀고 싶었습니다. 그래서 학교 축구 동아리에 들어갔습니다. 동아리에서는 일주일에 두 번 축구를 하고 경기가 끝나면 같이 밥을 먹습니다. 축구를 ( ㉠ ) 한국어도 많이 늘었습니다.",
     qs:[
      {id:"t259", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["하면서", "하려고", "하지만", "하거나"], a:0,
       exp:"Futbol o'ynash <b>bilan birga</b> koreys tili ham oshdi: <b>-(으)면서</b>."},
      {id:"t260", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 동아리에서 한국 친구를 사귀려고 했습니다.", "동아리는 매일 축구를 합니다.", "경기가 끝나면 바로 집에 갑니다.", "저는 농구 동아리에 들어갔습니다."], a:0,
       exp:"Koreys do'st orttirish uchun <b>동아리</b> (to'garak) ga kirdi. Haftasiga 2 marta, o'yindan keyin birga ovqatlanishadi."}
     ]},
    {id:"s29", type:"T-R6", slot:"63", sec:"read", text:"받는 사람: 김민수\n제목: 생일 파티 초대\n\n민수 씨, 안녕하세요?\n이번 주 토요일이 제 생일이에요. 그래서 저녁 7시에 우리 집에서 작은 파티를 하려고 해요. 맛있는 음식도 준비할 거예요. 시간이 있으면 꼭 와 주세요. 올 수 있는지 금요일까지 알려 주세요.\n\n나디라",
     qs:[
      {id:"t261", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["생일 파티에 초대하려고", "음식을 부탁하려고", "약속을 취소하려고", "선물을 받으려고"], a:0,
       exp:"Mavzu <b>생일 파티 초대</b> — tug'ilgan kun ziyofatiga taklif. Xat maqsadi — taklif qilish."},
      {id:"t262", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["파티는 토요일 저녁에 합니다.", "파티는 식당에서 합니다.", "민수 씨의 생일은 토요일입니다.", "금요일에 파티를 합니다."], a:0,
       exp:"Ziyofat <b>shanba kuni soat 19:00</b> da, Nadiraning uyida. Juma kunigacha javob berish kerak."}
     ]},
    {id:"s30", type:"T-R6", slot:"63", sec:"read", text:"받는 사람: 하늘아파트 주민 여러분\n제목: 엘리베이터 점검 안내\n\n안녕하십니까? 관리사무소입니다.\n11월 20일 목요일 오전 9시부터 12시까지 엘리베이터를 점검합니다. 점검 시간에는 엘리베이터를 이용할 수 없으니 계단을 이용해 주시기 바랍니다. 불편을 드려서 죄송합니다.",
     qs:[
      {id:"t263", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["엘리베이터 점검을 알리려고", "계단 청소를 부탁하려고", "새 주민을 소개하려고", "관리비를 내라고 말하려고"], a:0,
       exp:"<b>점검 안내</b> — texnik ko'rik haqida xabar. 관리사무소 — boshqaruv idorasi."},
      {id:"t264", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["목요일 오전에는 엘리베이터를 탈 수 없습니다.", "점검은 오후에 합니다.", "점검 시간에도 엘리베이터를 쓸 수 있습니다.", "점검은 일주일 동안 합니다."], a:0,
       exp:"Payshanba <b>09:00–12:00</b> lift ishlamaydi, zinadan foydalanish so'raladi. 계단 — zina."}
     ]},
    {id:"s31", type:"T-R6", slot:"65", sec:"read", text:"한국의 지하철에는 노약자석이 있습니다. 노약자석은 노인, 임신한 사람, 몸이 불편한 사람을 위한 자리입니다. 그래서 젊은 사람들은 자리가 비어 있어도 노약자석에 잘 ( ㉠ ). 자리가 필요한 사람이 언제든지 앉을 수 있게 하기 위해서입니다.",
     qs:[
      {id:"t265", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["앉지 않습니다", "앉습니다", "서지 않습니다", "내립니다"], a:0,
       exp:"Joy bo'sh bo'lsa ham yoshlar u yerga <b>o'tirmaydi</b>: <b>잘 앉지 않습니다</b>."},
      {id:"t266", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["노약자석은 몸이 불편한 사람도 앉을 수 있습니다.", "젊은 사람들은 노약자석에 자주 앉습니다.", "노약자석은 버스에만 있습니다.", "노약자석은 학생을 위한 자리입니다."], a:0,
       exp:"<b>노약자석</b> — keksalar, homilador va nogironlar uchun joy. 불편하다 — noqulay."}
     ]},
    {id:"s32", type:"T-R6", slot:"65", sec:"read", text:"물을 충분히 마시는 것은 건강에 아주 중요합니다. 사람들은 보통 목이 마를 때만 물을 마십니다. 그런데 목이 마르다고 느낄 때는 이미 몸에 물이 ( ㉠ ) 상태입니다. 그러니까 목이 마르지 않아도 조금씩 자주 마시는 것이 좋습니다.",
     qs:[
      {id:"t267", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["부족한", "많은", "차가운", "깨끗한"], a:0,
       exp:"Chanqaganda tanada suv allaqachon <b>yetishmaydi</b>: <b>부족하다</b>."},
      {id:"t268", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["목이 마르지 않아도 물을 마시는 것이 좋습니다.", "목이 마를 때만 물을 마셔야 합니다.", "물을 한 번에 많이 마셔야 합니다.", "물은 건강에 중요하지 않습니다."], a:0,
       exp:"Xulosa: <b>chanqamasangiz ham</b> oz-ozdan tez-tez iching. 조금씩 — ozdan."}
     ]},
    {id:"s33", type:"T-R6", slot:"67", sec:"read", text:"한국의 겨울은 춥고 건조합니다. 그래서 겨울에는 감기에 걸리는 사람이 많습니다. 감기에 걸리지 않으려면 손을 자주 씻고 실내 온도를 적당하게 유지해야 합니다. 또 방이 너무 건조하면 목이 아프기 쉬우니까 ( ㉠ ) 젖은 수건을 방에 걸어 두는 것도 좋습니다.",
     qs:[
      {id:"t269", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["가습기를 사용하거나", "창문을 닫거나", "에어컨을 켜거나", "난방을 끄거나"], a:0,
       exp:"Xona quruq bo'lsa — havoni namlash kerak: <b>가습기</b> (namlagich) yoki ho'l sochiq. -거나 — yoki."},
      {id:"t270", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["겨울에는 손을 자주 씻는 것이 좋습니다.", "한국의 겨울은 따뜻합니다.", "방이 건조하면 감기에 걸리지 않습니다.", "겨울에는 감기에 걸리는 사람이 적습니다."], a:0,
       exp:"Shamollamaslik uchun <b>qo'lni tez-tez yuvish</b> kerak. 건조하다 — quruq, 유지하다 — saqlamoq."}
     ]},
    {id:"s34", type:"T-R6", slot:"67", sec:"read", text:"요즘 많은 사람들이 일회용 컵 대신 개인 컵을 가지고 다닙니다. 일회용 컵은 한 번 쓰고 버리기 때문에 쓰레기가 많이 생깁니다. 그래서 카페에서는 개인 컵을 가지고 오는 손님에게 음료값을 ( ㉠ ) 줍니다. 작은 노력이지만 환경을 지키는 데 도움이 됩니다.",
     qs:[
      {id:"t271", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["할인해", "올려", "받아", "계산해"], a:0,
       exp:"Shaxsiy stakan olib kelganlarni rag'batlantirish — narxni <b>arzonlashtirish</b>: <b>할인해 주다</b>."},
      {id:"t272", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["개인 컵을 쓰면 쓰레기가 줄어듭니다.", "일회용 컵은 여러 번 씁니다.", "카페에서는 개인 컵을 쓸 수 없습니다.", "개인 컵을 가지고 가면 음료가 비쌉니다."], a:0,
       exp:"Bir martalik stakan ko'p chiqindi beradi, shaxsiy stakan esa <b>chiqindini kamaytiradi</b>. 환경 — atrof-muhit."}
     ]},
    {id:"s35", type:"T-R6", slot:"69", sec:"read", text:"저는 어렸을 때 그림 그리는 것을 좋아했습니다. 하지만 부모님은 제가 의사가 되기를 바라셨습니다. 그래서 저는 대학교에서 의학을 공부했습니다. 의사가 된 후에도 시간이 있을 때마다 그림을 그렸습니다. 작년에는 제 그림으로 작은 전시회를 열었습니다. 전시회에 온 환자들이 제 그림을 보고 마음이 편해졌다고 말했습니다. 그때 저는 그림이 ( ㉠ ) 수 있다는 것을 알게 되었습니다.",
     qs:[
      {id:"t273", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["사람들을 위로해 줄", "병원을 지을", "돈을 많이 벌", "의사가 될"], a:0,
       exp:"Bemorlarning ko'ngli taskin topgan — rasm odamlarga <b>tasalli bera oladi</b>: <b>위로하다</b>."},
      {id:"t274", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["저는 의사로 일하면서 그림을 그립니다.", "저는 대학교에서 미술을 공부했습니다.", "부모님은 제가 화가가 되기를 바라셨습니다.", "저는 그림 그리는 것을 그만두었습니다."], a:0,
       exp:"U <b>shifokor</b> bo'ldi, lekin bo'sh vaqtida rasm chizishda davom etadi. 의학 — tibbiyot, 전시회 — ko'rgazma."}
     ]},
    {id:"s36", type:"T-R6", slot:"69", sec:"read", text:"제 할머니는 시골에서 작은 가게를 하십니다. 할머니 가게에는 마을 사람들이 자주 와서 이야기를 나눕니다. 할머니는 물건을 파는 것보다 사람들을 만나는 것을 더 좋아하십니다. 그래서 손님이 물건을 사지 않아도 항상 웃으면서 차를 ( ㉠ ). 방학 때 할머니 가게에 가면 저도 마을 사람들과 친해집니다.",
     qs:[
      {id:"t275", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["대접하십니다", "파십니다", "사십니다", "버리십니다"], a:0,
       exp:"Xarid qilmasa ham choy bilan <b>mehmon qiladi</b>: <b>차를 대접하다</b>. -시- — hurmat qo'shimchasi."},
      {id:"t276", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["할머니 가게에는 마을 사람들이 모입니다.", "할머니는 도시에서 가게를 하십니다.", "할머니는 물건을 파는 것만 좋아하십니다.", "저는 방학 때 할머니 가게에 가지 않습니다."], a:0,
       exp:"Do'konga <b>qishloq aholisi tez-tez kelib suhbatlashadi</b>. 시골 — qishloq, 마을 — qishloq jamoasi."}
     ]},
    {id:"s37", type:"T-L8", sec:"listen", audio:"여자: 승객 여러분께 안내 말씀 드립니다. 이번 역은 서울역입니다. 내리실 문은 오른쪽입니다. 부산으로 가는 기차를 타실 손님은 이번 역에서 내리십시오. 잊으신 물건이 없는지 다시 한번 확인해 주십시오.",
     qs:[
      {id:"t277", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["내릴 역을 안내하려고", "기차표를 팔려고", "길을 물어보려고", "물건을 찾으려고"], a:0,
       exp:"Metroda e'lon: <b>bekat va chiqish eshigi haqida xabar</b>. 승객 — yo'lovchi, 내리다 — tushmoq."},
      {id:"t278", ask:"들은 내용과 같은 것을 고르십시오.", opts:["내리는 문은 오른쪽입니다.", "이번 역은 부산역입니다.", "부산에 가려면 다음 역에서 내려야 합니다.", "손님들은 물건을 잃어버렸습니다."], a:0,
       exp:"<b>내리실 문은 오른쪽입니다</b> — chiqish eshigi o'ng tomonda. Busanga borish uchun shu bekatda (Seul vokzali) tushiladi."}
     ]},
    {id:"s38", type:"T-L9", sec:"listen", audio:"남자: 수진 씨, 요즘 무슨 운동을 해요?\n여자: 저는 수영을 배우고 있어요. 일주일에 세 번 가요.\n남자: 수영은 어렵지 않아요?\n여자: 처음에는 무서웠는데 지금은 정말 재미있어요. 민수 씨도 같이 배울래요?",
     qs:[
      {id:"t279", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["수영 배우기", "수영장 위치", "운동 시간", "건강 검진"], a:0,
       exp:"Butun suhbat ayolning <b>suzishni o'rganishi</b> haqida."},
      {id:"t280", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 일주일에 세 번 수영을 합니다.", "남자는 수영을 가르칩니다.", "여자는 지금도 수영이 무섭습니다.", "남자는 수영을 잘합니다."], a:0,
       exp:"<b>일주일에 세 번</b> — haftasiga uch marta. Avval qo'rqqan, hozir qiziq. 무섭다 — qo'rqinchli."}
     ]},
    {id:"s39", type:"T-L10", sec:"listen", audio:"여자: 민수 씨, 요즘 왜 이렇게 일찍 출근해요?\n남자: 회사 근처로 이사를 했거든요. 전에는 버스를 두 번 갈아타야 해서 한 시간이 넘게 걸렸어요.\n여자: 지금은 얼마나 걸려요?\n남자: 걸어서 10분이면 와요. 그래서 아침에 운동도 할 수 있어요.",
     qs:[
      {id:"t281", ask:"남자가 일찍 출근하는 이유를 고르십시오.", opts:["회사 근처로 이사를 해서", "일이 많아서", "버스를 놓쳐서", "회사에서 아침 운동을 해서"], a:0,
       exp:"<b>-거든요</b> — sabab tushuntirish: ishxona yaqiniga <b>ko'chib o'tgani uchun</b>."},
      {id:"t282", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 지금 걸어서 출근합니다.", "남자는 지금도 버스를 두 번 탑니다.", "여자는 회사 근처에 삽니다.", "남자는 출근하는 데 한 시간이 걸립니다."], a:0,
       exp:"<b>걸어서 10분</b> — piyoda 10 daqiqa. Avval ikki marta avtobus almashtirib, bir soatdan ko'p ketardi."}
     ]}
  ] };
