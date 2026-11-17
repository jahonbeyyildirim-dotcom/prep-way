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
     ]},
    {id:"s40", type:"T-R6", slot:"49", sec:"read", text:"저는 주말마다 시장에 갑니다. 시장은 마트보다 물건 값이 싸고 사람들도 친절합니다. 특히 과일 가게 아주머니는 제가 갈 때마다 과일을 하나씩 더 ( ㉠ ). 그래서 저는 시장에 가는 것이 즐겁습니다.",
     qs:[
      {id:"t283", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["주십니다", "사십니다", "파십니다", "드십니다"], a:0,
       exp:"Opa har safar bittadan ortiqcha meva <b>beradi</b>: <b>주다</b> → 주십니다 (hurmat)."},
      {id:"t284", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["시장은 마트보다 값이 쌉니다.", "저는 마트에 자주 갑니다.", "과일 가게 아주머니는 불친절합니다.", "저는 시장에 가는 것이 싫습니다."], a:0,
       exp:"<b>마트보다 값이 싸다</b> — supermarketdan arzon. 친절하다 — xushmuomala."}
     ]},
    {id:"s41", type:"T-R6", slot:"49", sec:"read", text:"우리 동네에는 오래된 빵집이 있습니다. 이 빵집은 30년 동안 같은 자리에서 빵을 만들었습니다. 아침 7시에 문을 열면 사람들이 ( ㉠ ) 서서 빵을 기다립니다. 저도 주말 아침에는 이 빵집에서 빵을 삽니다.",
     qs:[
      {id:"t285", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["줄을", "길을", "자리를", "문을"], a:0,
       exp:"<b>줄을 서다</b> — navbatga turmoq. 30 yillik novvoyxona juda mashhur."},
      {id:"t286", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["이 빵집은 30년 동안 빵을 만들었습니다.", "빵집은 오후에 문을 엽니다.", "이 빵집은 새로 생겼습니다.", "저는 평일 아침에 빵을 삽니다."], a:0,
       exp:"<b>30년 동안</b> — 30 yil davomida, bir joyda. Ertalab 7 da ochiladi, men dam olish kuni olaman."}
     ]},
    {id:"s42", type:"T-R6", slot:"51", sec:"read", text:"한국에서는 설날에 가족들이 모두 모여서 떡국을 먹습니다. 떡국을 한 그릇 먹으면 나이를 한 살 더 먹는다고 ( ㉠ ). 그리고 어른들께 세배를 하면 어른들은 아이들에게 세뱃돈을 주십니다.",
     qs:[
      {id:"t287", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["말합니다", "먹습니다", "만듭니다", "기다립니다"], a:0,
       exp:"<b>-다고 말하다</b> — «... deb aytadi» (ko'chirma gap). Tteokguk yesang, bir yosh ulg'ayasan deyishadi."},
      {id:"t288", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["설날에 하는 일", "떡국 만드는 방법", "나이를 묻는 방법", "용돈을 쓰는 방법"], a:0,
       exp:"Tteokguk, 세배 (ta'zim), 세뱃돈 — <b>Yangi yil (설날) odatlari</b>."}
     ]},
    {id:"s43", type:"T-R6", slot:"51", sec:"read", text:"요즘은 휴대폰으로 많은 일을 할 수 있습니다. 은행에 가지 않아도 휴대폰으로 돈을 보낼 수 있고 가게에 가지 않아도 물건을 살 수 있습니다. 그래서 생활이 아주 ( ㉠ ). 하지만 휴대폰을 너무 오래 보면 눈이 나빠질 수 있으니까 조심해야 합니다.",
     qs:[
      {id:"t289", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["편리해졌습니다", "불편해졌습니다", "조용해졌습니다", "어려워졌습니다"], a:0,
       exp:"Hamma narsa telefonda — hayot <b>qulay bo'ldi</b>: <b>편리하다</b> + -아/어지다 (o'zgarish)."},
      {id:"t290", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["휴대폰으로 할 수 있는 일", "휴대폰을 사는 방법", "은행에서 일하는 방법", "눈이 나빠지는 이유"], a:0,
       exp:"Matn <b>telefon orqali qilish mumkin bo'lgan ishlar</b> haqida."}
     ]},
    {id:"s44", type:"T-R6", slot:"53", sec:"read", text:"저는 회사에 다니면서 저녁에는 대학원에서 공부를 합니다. 일과 공부를 같이 하는 것은 쉽지 않습니다. 그래서 주말에도 도서관에 가서 공부를 합니다. 힘들지만 내년에 졸업을 ( ㉠ ) 열심히 하고 있습니다.",
     qs:[
      {id:"t291", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["하려고", "해서", "하면", "하지만"], a:0,
       exp:"Maqsad: <b>-(으)려고</b> — «...ish uchun». Kelasi yil bitirish uchun tirishyapti."},
      {id:"t292", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 일을 하면서 공부를 합니다.", "저는 낮에 대학원에 다닙니다.", "저는 주말에 쉽니다.", "저는 작년에 졸업했습니다."], a:0,
       exp:"Kunduzi ishlaydi, <b>kechqurun</b> magistraturada o'qiydi. 대학원 — magistratura."}
     ]},
    {id:"s45", type:"T-R6", slot:"53", sec:"read", text:"지난주에 우리 반 친구 아나 씨가 고향으로 돌아갔습니다. 아나 씨는 우리 반에서 한국어를 제일 잘했습니다. 그래서 모르는 것이 있으면 친구들이 아나 씨에게 자주 ( ㉠ ). 우리는 아나 씨에게 반 친구들의 사진으로 만든 앨범을 선물했습니다.",
     qs:[
      {id:"t293", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["물어봤습니다", "가르쳤습니다", "주었습니다", "보냈습니다"], a:0,
       exp:"Bilmagan narsani Anadan <b>so'rashgan</b>: <b>물어보다</b>."},
      {id:"t294", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["아나 씨는 한국어를 잘했습니다.", "아나 씨는 지난주에 한국에 왔습니다.", "친구들은 아나 씨에게 꽃을 선물했습니다.", "아나 씨는 모르는 것을 친구들에게 물어봤습니다."], a:0,
       exp:"Ana sinfda koreys tilini <b>eng yaxshi</b> bilgan. Unga albom sovg'a qilishdi."}
     ]},
    {id:"s46", type:"T-R6", slot:"55", sec:"read", text:"저는 작년에 한국 회사에 취직했습니다. 회사 일은 재미있지만 처음에는 한국어 때문에 힘들었습니다. ( ㉠ ) 동료들이 천천히 말해 주고 많이 도와주었습니다. 지금은 회사 생활에 잘 적응했습니다.",
     qs:[
      {id:"t295", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["하지만", "그래서", "그러면", "그러니까"], a:0,
       exp:"Qiyin edi, <b>lekin</b> hamkasblar yordam berdi — qarama-qarshilik: <b>하지만</b>."},
      {id:"t296", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["동료들이 저를 많이 도와주었습니다.", "저는 회사 일이 재미없습니다.", "저는 지금도 회사 생활이 힘듭니다.", "저는 올해 회사에 취직했습니다."], a:0,
       exp:"<b>도와주었습니다</b> — yordam berishdi. 취직하다 — ishga kirmoq, 적응하다 — moslashmoq."}
     ]},
    {id:"s47", type:"T-R6", slot:"55", sec:"read", text:"저는 매일 일기를 한국어로 씁니다. 처음에는 한 문장을 쓰는 데도 시간이 오래 걸렸습니다. ( ㉠ ) 매일 쓰니까 지금은 10분이면 일기를 다 쓸 수 있습니다. 일기를 쓰면서 새로 배운 단어도 다시 써 봅니다.",
     qs:[
      {id:"t297", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그런데", "그래서", "그리고", "그러니까"], a:0,
       exp:"Avval sekin edi, <b>biroq</b> har kuni yozib hozir tez — <b>그런데</b> (qarama-qarshilik)."},
      {id:"t298", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 한국어로 일기를 씁니다.", "저는 일주일에 한 번 일기를 씁니다.", "지금도 일기를 쓰는 데 한 시간이 걸립니다.", "저는 일기에 새 단어를 쓰지 않습니다."], a:0,
       exp:"<b>매일 일기를 한국어로</b> — har kuni koreyscha kundalik. Hozir 10 daqiqada yozadi."}
     ]},
    {id:"s48", type:"T-R6", slot:"59", sec:"read", text:"저는 지난달에 처음으로 혼자 여행을 갔습니다. ( ㉠ ) 처음에는 혼자라서 조금 무서웠습니다. ( ㉡ ) 하지만 여행지에서 만난 사람들이 친절하게 길을 알려 주었습니다. ( ㉢ ) 다음에도 또 혼자 여행을 가고 싶습니다. ( ㉣ )",
     qs:[
      {id:"t299", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n그래서 여행을 즐겁게 할 수 있었습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:2,
       exp:"<b>그래서</b> — odamlar yordam bergani natijasi; undan keyin «yana bormoqchiman» — ㉢."},
      {id:"t300", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 혼자 여행을 갔습니다.", "저는 친구와 같이 여행을 갔습니다.", "여행지 사람들은 불친절했습니다.", "저는 다시는 혼자 여행을 가지 않을 겁니다."], a:0,
       exp:"<b>처음으로 혼자</b> — birinchi marta yolg'iz sayohat. 여행지 — sayohat joyi."}
     ]},
    {id:"s49", type:"T-R6", slot:"59", sec:"read", text:"우리 집 근처에 큰 공원이 새로 생겼습니다. ( ㉠ ) 공원에는 산책길과 운동 기구가 있습니다. ( ㉡ ) 그래서 아침이나 저녁에 운동하는 사람이 많습니다. ( ㉢ ) 저도 요즘 퇴근 후에 공원에서 한 시간씩 걷습니다. ( ㉣ )",
     qs:[
      {id:"t301", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n걷기 시작한 후로 몸이 많이 가벼워졌습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:3,
       exp:"Gap mening yurishim natijasi — «men ham yuraman» dan keyin, matn oxirida: ㉣."},
      {id:"t302", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["공원에는 운동 기구가 있습니다.", "공원은 오래되었습니다.", "저는 아침에 공원에서 걷습니다.", "공원에는 운동하는 사람이 적습니다."], a:0,
       exp:"<b>운동 기구</b> — sport anjomlari. Bog' yangi, men ishdan keyin (kechqurun) yuraman."}
     ]},
    {id:"s50", type:"T-R6", slot:"61", sec:"read", text:"요즘 한국에서는 반려동물을 키우는 사람이 많습니다. 반려동물은 외로움을 줄여 주고 생활을 즐겁게 해 줍니다. 하지만 반려동물을 키우려면 시간과 돈이 많이 ( ㉠ ). 그래서 키우기 전에 잘 생각해야 합니다.",
     qs:[
      {id:"t303", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["듭니다", "남습니다", "생깁니다", "모입니다"], a:0,
       exp:"<b>시간과 돈이 들다</b> — vaqt va pul ketadi. 들다 — sarflanmoq."},
      {id:"t304", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["반려동물은 외로움을 줄여 줍니다.", "반려동물을 키우는 사람이 줄었습니다.", "반려동물은 돈이 들지 않습니다.", "반려동물을 키우기 전에 생각할 필요가 없습니다."], a:0,
       exp:"<b>외로움을 줄여 주다</b> — yolg'izlikni kamaytiradi. 반려동물 — uy hayvoni."}
     ]},
    {id:"s51", type:"T-R6", slot:"61", sec:"read", text:"저는 한국 드라마를 보면서 한국어를 공부합니다. 처음에는 한국어 자막을 보면서 드라마를 봤습니다. 이제는 자막이 없어도 내용을 ( ㉠ ) 이해할 수 있습니다. 드라마에 나오는 표현을 따라 하면 말하기 실력도 좋아집니다.",
     qs:[
      {id:"t305", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["거의", "전혀", "별로", "아직"], a:0,
       exp:"<b>거의</b> — deyarli (tasdiq bilan). 전혀/별로 faqat inkor bilan ishlatiladi, 아직 — hali."},
      {id:"t306", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 드라마로 한국어를 공부합니다.", "저는 지금도 자막이 꼭 필요합니다.", "드라마 표현을 따라 하면 말하기가 나빠집니다.", "저는 처음에 영어 자막을 봤습니다."], a:0,
       exp:"Drama ko'rib o'rganadi. Avval koreyscha subtitr bilan, hozir subtitrsiz. 자막 — subtitr."}
     ]},
    {id:"s52", type:"T-R6", slot:"63", sec:"read", text:"받는 사람: 박 선생님\n제목: 수업 결석\n\n선생님, 안녕하세요? 저는 2반 아지즈입니다.\n어제 저녁부터 열이 나고 목이 아파서 오늘 병원에 가야 합니다. 그래서 오늘 수업에 갈 수 없습니다. 죄송합니다. 오늘 숙제는 친구에게 물어보겠습니다.\n\n아지즈 드림",
     qs:[
      {id:"t307", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["수업에 못 가는 것을 알리려고", "숙제를 내려고", "병원을 소개하려고", "친구를 찾으려고"], a:0,
       exp:"<b>결석</b> — darsga kelmaslik. Xat maqsadi — <b>bugun kela olmasligini aytish</b>."},
      {id:"t308", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["아지즈 씨는 오늘 병원에 갑니다.", "아지즈 씨는 오늘 수업에 갑니다.", "아지즈 씨는 어제 수업에 오지 않았습니다.", "선생님께 숙제를 물어볼 겁니다."], a:0,
       exp:"Isitma va tomoq og'rig'i — <b>bugun shifoxonaga boradi</b>. Uy vazifasini do'stidan so'raydi."}
     ]},
    {id:"s53", type:"T-R6", slot:"63", sec:"read", text:"받는 사람: 행복마트 회원 여러분\n제목: 회원 할인 행사 안내\n\n안녕하세요. 행복마트입니다.\n12월 1일부터 7일까지 회원 할인 행사를 합니다. 이 기간에 회원 카드를 보여 주시면 모든 과일과 채소를 20% 싸게 살 수 있습니다. 회원 카드가 없으신 분은 계산대에서 바로 만들 수 있습니다. 많이 이용해 주십시오.",
     qs:[
      {id:"t309", ask:"왜 윗글을 썼는지 맞는 것을 고르십시오.", opts:["할인 행사를 알리려고", "회원 카드를 팔려고", "새 가게를 소개하려고", "계산 방법을 바꾸려고"], a:0,
       exp:"Mavzu <b>할인 행사 안내</b> — chegirma aksiyasi haqida xabar."},
      {id:"t310", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["회원 카드는 계산대에서 만들 수 있습니다.", "행사는 한 달 동안 합니다.", "모든 물건을 20% 싸게 팝니다.", "회원이 아닌 사람도 할인을 받습니다."], a:0,
       exp:"<b>계산대에서 바로 만들 수 있습니다</b> — kartani kassada darhol ochish mumkin. Chegirma faqat meva-sabzavotga, 7 kun."}
     ]},
    {id:"s54", type:"T-R6", slot:"65", sec:"read", text:"한국에서는 아기가 태어난 지 1년이 되면 돌잔치를 합니다. 돌잔치에서는 아기 앞에 여러 가지 물건을 놓고 아기가 하나를 ( ㉠ ) 합니다. 아기가 연필을 잡으면 공부를 잘하고 돈을 잡으면 부자가 된다고 생각합니다.",
     qs:[
      {id:"t311", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["잡게", "먹게", "사게", "버리게"], a:0,
       exp:"<b>-게 하다</b> — «...dirmoq»: chaqaloqqa bitta narsani <b>ushlattiradi</b>. 잡다 — ushlamoq."},
      {id:"t312", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["돌잔치는 아기가 태어난 지 1년 후에 합니다.", "돌잔치는 어른의 생일입니다.", "아기가 연필을 잡으면 부자가 됩니다.", "돌잔치에서는 물건을 팝니다."], a:0,
       exp:"<b>돌잔치</b> — chaqaloqning 1 yoshlik bayrami. Qalam — yaxshi o'qish, pul — boylik."}
     ]},
    {id:"s55", type:"T-R6", slot:"65", sec:"read", text:"잠을 잘 자려면 자기 전에 휴대폰을 보지 않는 것이 좋습니다. 휴대폰의 밝은 빛 때문에 잠이 잘 오지 않기 때문입니다. 그리고 매일 같은 시간에 자고 일어나면 몸이 ( ㉠ ) 쉽게 잠을 잘 수 있습니다.",
     qs:[
      {id:"t313", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["익숙해져서", "피곤해서", "아파서", "무거워서"], a:0,
       exp:"Har kuni bir vaqtda uxlasa, tana <b>o'rganib qoladi</b>: <b>익숙해지다</b>."},
      {id:"t314", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["자기 전에 휴대폰을 보지 않는 것이 좋습니다.", "휴대폰 빛은 잠에 도움이 됩니다.", "매일 다른 시간에 자는 것이 좋습니다.", "잠을 잘 자려면 휴대폰을 오래 봐야 합니다."], a:0,
       exp:"Telefonning yorqin nuri uyquga xalaqit beradi — <b>uxlashdan oldin qaramang</b>."}
     ]},
    {id:"s56", type:"T-R6", slot:"67", sec:"read", text:"한국의 많은 회사에는 '회식' 문화가 있습니다. 회식은 일이 끝난 후에 동료들과 같이 식사를 하는 것입니다. 회식을 하면 동료들과 더 친해질 수 있습니다. 하지만 요즘은 술을 마시는 회식보다 점심 회식이나 공연을 보는 회식을 ( ㉠ ) 사람들이 많아지고 있습니다.",
     qs:[
      {id:"t315", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["좋아하는", "싫어하는", "만드는", "끝내는"], a:0,
       exp:"<b>보다</b> qiyosi: ichkilikli o'tirishdan ko'ra tushlik yoki konsertni <b>yoqtiradiganlar</b> ko'paymoqda."},
      {id:"t316", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["회식을 하면 동료들과 친해질 수 있습니다.", "회식은 일하기 전에 합니다.", "요즘은 술을 마시는 회식만 합니다.", "회식은 혼자 하는 식사입니다."], a:0,
       exp:"<b>회식</b> — ishdan keyin hamkasblar bilan birga ovqatlanish; yaqinlashishga yordam beradi."}
     ]},
    {id:"s57", type:"T-R6", slot:"67", sec:"read", text:"한국에서는 쓰레기를 버릴 때 종량제 봉투를 사용해야 합니다. 종량제 봉투는 편의점이나 마트에서 살 수 있습니다. 봉투가 크면 값이 더 비쌉니다. 그래서 쓰레기를 ( ㉠ ) 사람들은 돈을 더 많이 내야 합니다. 이 제도 덕분에 쓰레기가 많이 줄었습니다.",
     qs:[
      {id:"t317", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["많이 버리는", "적게 버리는", "분리하는", "줍는"], a:0,
       exp:"Katta paket qimmat — demak chiqindini <b>ko'p tashlaydiganlar</b> ko'proq to'laydi."},
      {id:"t318", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["종량제 봉투는 편의점에서 살 수 있습니다.", "봉투가 크면 값이 쌉니다.", "이 제도 때문에 쓰레기가 늘었습니다.", "쓰레기는 아무 봉투에나 버려도 됩니다."], a:0,
       exp:"<b>종량제 봉투</b> — chiqindi uchun pullik paket; do'kon va marketda sotiladi. 제도 — tizim."}
     ]},
    {id:"s58", type:"T-R6", slot:"69", sec:"read", text:"저는 우즈베키스탄에서 대학교를 졸업하고 한국에 왔습니다. 처음 1년 동안은 공장에서 일하면서 밤에 한국어를 공부했습니다. 한국어 실력이 좋아진 후에는 통역 일을 시작했습니다. 지금은 한국에 온 우즈베키스탄 사람들을 돕는 일을 하고 있습니다. 제가 처음 한국에 왔을 때 ( ㉠ ) 지금 다른 사람들을 도울 수 있어서 기쁩니다.",
     qs:[
      {id:"t319", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["힘들었기 때문에", "즐거웠기 때문에", "돈이 많았기 때문에", "한국어를 잘했기 때문에"], a:0,
       exp:"O'zi avval <b>qiynalgani uchun</b> boshqalarga yordam berishdan xursand: <b>-기 때문에</b>."},
      {id:"t320", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["저는 지금 다른 사람들을 돕는 일을 합니다.", "저는 한국에서 대학교를 졸업했습니다.", "저는 지금도 공장에서 일합니다.", "저는 처음부터 통역 일을 했습니다."], a:0,
       exp:"Hozir <b>koreyaga kelgan o'zbeklarga yordam beradi</b>. 통역 — tarjimonlik (og'zaki)."}
     ]},
    {id:"s59", type:"T-R6", slot:"69", sec:"read", text:"제 동생은 어렸을 때부터 동물을 아주 좋아했습니다. 길에서 다친 고양이를 보면 집에 데려와서 치료해 주었습니다. 그래서 가족들은 동생이 나중에 수의사가 될 거라고 생각했습니다. 동생은 열심히 공부해서 올해 대학교 수의학과에 들어갔습니다. 동생은 졸업 후에 ( ㉠ ) 동물 병원을 열고 싶어 합니다.",
     qs:[
      {id:"t321", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["아픈 동물을 돌보는", "동물을 파는", "옷을 만드는", "음식을 파는"], a:0,
       exp:"Veterinar bo'ladi — <b>kasal hayvonlarga qaraydigan</b> klinika: <b>돌보다</b> — parvarish qilmoq."},
      {id:"t322", ask:"이 글의 내용으로 알 수 있는 것을 고르십시오.", opts:["동생은 지금 수의학을 공부합니다.", "동생은 동물을 싫어합니다.", "동생은 이미 동물 병원을 열었습니다.", "가족들은 동생이 의사가 되기를 바랐습니다."], a:0,
       exp:"Bu yil <b>veterinariya fakultetiga</b> kirdi — hozir o'qiyapti. 수의사 — veterinar."}
     ]},
    {id:"s60", type:"T-L8", sec:"listen", audio:"여자: 회원 여러분께 알려 드립니다. 우리 수영장은 다음 주 월요일부터 수요일까지 청소를 합니다. 이 기간에는 수영장을 이용할 수 없습니다. 목요일부터는 다시 이용하실 수 있습니다. 감사합니다.",
     qs:[
      {id:"t323", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["수영장 청소 일정을 알리려고", "수영을 가르치려고", "회원을 모집하려고", "수영복을 팔려고"], a:0,
       exp:"<b>알려 드립니다</b> — xabar beramiz: basseyn tozalash jadvali haqida."},
      {id:"t324", ask:"들은 내용과 같은 것을 고르십시오.", opts:["목요일부터 수영장을 다시 이용할 수 있습니다.", "수영장은 다음 주 내내 쉽니다.", "월요일에는 수영할 수 있습니다.", "청소는 이번 주에 합니다."], a:0,
       exp:"Dushanba–chorshanba yopiq, <b>payshanbadan</b> yana ochiq."}
     ]},
    {id:"s61", type:"T-L8", sec:"listen", audio:"여자: 여러분, 오늘 박물관 견학에 대해 말씀드리겠습니다. 버스는 오전 9시에 학교 앞에서 출발합니다. 박물관 안에서는 사진을 찍을 수 없습니다. 점심은 박물관 식당에서 먹고 오후 3시에 학교로 돌아옵니다.",
     qs:[
      {id:"t325", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["견학 일정을 안내하려고", "사진 찍는 방법을 가르치려고", "식당을 소개하려고", "버스표를 팔려고"], a:0,
       exp:"<b>견학</b> — ekskursiya. O'qituvchi <b>ekskursiya tartibini tushuntiryapti</b>."},
      {id:"t326", ask:"들은 내용과 같은 것을 고르십시오.", opts:["박물관 안에서는 사진을 찍으면 안 됩니다.", "버스는 박물관 앞에서 출발합니다.", "점심은 학교에서 먹습니다.", "오후 9시에 학교로 돌아옵니다."], a:0,
       exp:"<b>사진을 찍을 수 없습니다</b> — rasmga olish mumkin emas. Avtobus maktab oldidan 9 da jo'naydi."}
     ]},
    {id:"s62", type:"T-L9", sec:"listen", audio:"여자: 민수 씨, 이번 주말에 뭐 할 거예요?\n남자: 친구 결혼식에 가요. 그런데 무슨 선물을 하면 좋을지 모르겠어요.\n여자: 요즘은 선물 대신 돈을 많이 줘요. 아니면 신혼부부에게 필요한 그릇은 어때요?\n남자: 좋은 생각이네요. 그릇으로 해야겠어요.",
     qs:[
      {id:"t327", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["결혼 선물", "주말 날씨", "그릇 값", "결혼식 장소"], a:0,
       exp:"Ular <b>to'yga qanday sovg'a qilish</b> haqida gaplashyapti."},
      {id:"t328", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 주말에 결혼식에 갑니다.", "여자는 결혼을 합니다.", "남자는 돈을 선물할 겁니다.", "남자는 선물을 이미 샀습니다."], a:0,
       exp:"Erkak dam olish kuni <b>do'stining to'yiga</b> boradi va idish sovg'a qilmoqchi. 신혼부부 — yangi turmush qurganlar."}
     ]},
    {id:"s63", type:"T-L9", sec:"listen", audio:"남자: 지난번에 추천해 준 한국어 책 샀어요?\n여자: 네, 샀어요. 그런데 생각보다 어려워요.\n남자: 그럼 처음에는 듣기 파일을 들으면서 읽어 보세요. 훨씬 쉬워요.\n여자: 아, 듣기 파일도 있어요? 오늘 해 볼게요.",
     qs:[
      {id:"t329", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["한국어 책 공부 방법", "책을 사는 곳", "듣기 시험 날짜", "서점 위치"], a:0,
       exp:"Gap kitobni <b>qanday o'qish kerakligi</b> haqida: audio bilan birga o'qish."},
      {id:"t330", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 책이 어렵다고 생각합니다.", "남자는 책을 아직 사지 않았습니다.", "책에는 듣기 파일이 없습니다.", "여자는 듣기 파일을 이미 들었습니다."], a:0,
       exp:"<b>생각보다 어려워요</b> — o'ylagandan qiyin. Audio faylni bugun sinab ko'radi."}
     ]},
    {id:"s64", type:"T-L10", sec:"listen", audio:"여자: 사장님, 이 식당은 왜 점심시간에만 문을 열어요?\n남자: 제가 아침마다 시장에 가서 신선한 재료를 사거든요. 그날 산 재료로 그날만 음식을 만들어요.\n여자: 그래서 음식이 이렇게 맛있군요.\n남자: 네, 재료가 다 떨어지면 일찍 문을 닫기도 해요.",
     qs:[
      {id:"t331", ask:"남자가 점심시간에만 문을 여는 이유를 고르십시오.", opts:["그날 산 재료로만 음식을 만들어서", "저녁에 다른 일을 해서", "손님이 적어서", "시장이 멀어서"], a:0,
       exp:"<b>-거든요</b> sababni tushuntiradi: faqat <b>o'sha kuni olingan mahsulotdan</b> pishiradi."},
      {id:"t332", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 아침마다 시장에 갑니다.", "식당은 저녁에도 문을 엽니다.", "재료가 없어도 문을 닫지 않습니다.", "여자는 식당 사장입니다."], a:0,
       exp:"<b>아침마다 시장에</b> — har tong bozorga. 재료가 떨어지다 — mahsulot tugamoq."}
     ]},
    {id:"s65", type:"T-L10", sec:"listen", audio:"남자: 수미 씨, 회사를 그만둔다면서요?\n여자: 네, 다음 달에 유학을 가거든요. 디자인을 더 공부하고 싶어서요.\n남자: 어느 나라로 가요?\n여자: 이탈리아요. 2년 동안 공부하고 돌아올 거예요.",
     qs:[
      {id:"t333", ask:"여자가 회사를 그만두는 이유를 고르십시오.", opts:["디자인을 더 공부하고 싶어서", "회사 일이 힘들어서", "이사를 가야 해서", "결혼을 해서"], a:0,
       exp:"<b>-고 싶어서요</b> — sabab: dizaynni chuqurroq o'rganmoqchi. 유학 — chet elda o'qish."},
      {id:"t334", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 다음 달에 유학을 갑니다.", "여자는 이탈리아에서 일할 겁니다.", "남자는 유학을 갑니다.", "여자는 1년 동안 공부할 겁니다."], a:0,
       exp:"Keyingi oy <b>Italiyaga o'qishga</b> ketadi, 2 yildan keyin qaytadi. -다면서요? — «...ekan-da?»"}
     ]},
    {id:"s66", type:"T-L8", sec:"listen", audio:"여자: 손님 여러분, 잠시 후 오후 1시부터 3층 식당가에서 김치 만들기 행사를 시작합니다. 참가비는 무료이고 만든 김치는 가지고 가실 수 있습니다. 많은 참여 바랍니다.",
     qs:[
      {id:"t361", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["김치 만들기 행사를 알리려고", "김치를 팔려고", "식당을 소개하려고", "길을 알려 주려고"], a:0,
       exp:"Ayol <b>tadbir haqida xabar berib, qatnashishga chaqiryapti</b>. 참여 — ishtirok."},
      {id:"t362", ask:"들은 내용과 같은 것을 고르십시오.", opts:["만든 김치는 가지고 갈 수 있습니다.", "행사는 돈을 내야 합니다.", "행사는 1층에서 합니다.", "행사는 오전에 합니다."], a:0,
       exp:"<b>가지고 가실 수 있습니다</b> — olib ketish mumkin. Bepul, 3-qavat, soat 13:00."}
     ]},
    {id:"s67", type:"T-L8", sec:"listen", audio:"여자: 승객 여러분, 지금 앞에서 사고가 나서 버스가 잠시 멈추겠습니다. 10분쯤 후에 다시 출발하겠습니다. 급한 분은 여기에서 내리셔서 지하철을 이용하시기 바랍니다.",
     qs:[
      {id:"t363", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["버스가 늦게 출발하는 것을 알리려고", "지하철 표를 팔려고", "사고를 신고하려고", "승객을 찾으려고"], a:0,
       exp:"Avtobus <b>to'xtab, kechikib jo'nashi</b> haqida e'lon. 멈추다 — to'xtamoq."},
      {id:"t364", ask:"들은 내용과 같은 것을 고르십시오.", opts:["버스는 10분쯤 후에 출발합니다.", "버스가 고장 났습니다.", "승객들은 모두 내려야 합니다.", "지하철역에서 사고가 났습니다."], a:0,
       exp:"<b>10분쯤 후에 다시 출발</b> — 10 daqiqadan keyin. Faqat shoshayotganlar tushadi."}
     ]},
    {id:"s68", type:"T-L8", sec:"listen", audio:"여자: 학생 여러분, 이번 주 금요일은 도서관 정기 휴일입니다. 책을 반납하실 분은 목요일까지 반납해 주십시오. 토요일부터는 평소처럼 오전 9시에 문을 엽니다.",
     qs:[
      {id:"t365", ask:"여자가 왜 이 이야기를 하고 있는지 고르십시오.", opts:["도서관 휴일을 알리려고", "책을 사려고", "학생을 모집하려고", "시험 날짜를 알리려고"], a:0,
       exp:"<b>정기 휴일</b> — muntazam dam olish kuni haqida xabar. 반납하다 — qaytarmoq."},
      {id:"t366", ask:"들은 내용과 같은 것을 고르십시오.", opts:["금요일에는 도서관이 문을 닫습니다.", "토요일에는 도서관이 쉽니다.", "책은 금요일까지 반납합니다.", "도서관은 오전 10시에 엽니다."], a:0,
       exp:"Juma — dam olish. Kitoblar <b>payshanbagacha</b>, shanbadan soat 9 da ochiladi."}
     ]},
    {id:"s69", type:"T-L9", sec:"listen", audio:"남자: 수미 씨, 요리 잘해요?\n여자: 아니요, 잘 못해요. 그래서 요즘 인터넷으로 요리를 배워요.\n남자: 어떤 요리를 배웠어요?\n여자: 어제는 된장찌개를 만들었어요. 생각보다 쉬웠어요.",
     qs:[
      {id:"t367", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["요리 배우기", "식당 소개", "인터넷 쇼핑", "장보기"], a:0,
       exp:"Gap <b>ovqat pishirishni o'rganish</b> haqida."},
      {id:"t368", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 인터넷으로 요리를 배웁니다.", "여자는 요리를 잘합니다.", "남자는 된장찌개를 만들었습니다.", "된장찌개는 만들기 어려웠습니다."], a:0,
       exp:"<b>인터넷으로</b> — internet orqali o'rganadi; 된장찌개 o'ylagandan oson bo'lgan."}
     ]},
    {id:"s70", type:"T-L9", sec:"listen", audio:"여자: 민수 씨, 휴대폰 바꿨어요?\n남자: 네, 지난번 휴대폰이 자주 꺼져서 새로 샀어요.\n여자: 사진도 잘 나와요?\n남자: 네, 카메라가 정말 좋아요. 배터리도 오래가요.",
     qs:[
      {id:"t369", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["새 휴대폰", "사진 찍는 곳", "휴대폰 가게 위치", "배터리 값"], a:0,
       exp:"Ikkalasi <b>yangi telefon</b> haqida gaplashyapti."},
      {id:"t370", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 휴대폰을 새로 샀습니다.", "새 휴대폰은 자주 꺼집니다.", "여자는 휴대폰을 바꿨습니다.", "새 휴대폰은 배터리가 빨리 닳습니다."], a:0,
       exp:"Eskisi o'chib qolgani uchun <b>yangisini olgan</b>. 오래가다 — uzoq chidamoq."}
     ]},
    {id:"s71", type:"T-L9", sec:"listen", audio:"남자: 이번 토요일에 우리 집에서 집들이를 해요. 올 수 있어요?\n여자: 그럼요. 몇 시까지 가면 돼요?\n남자: 저녁 6시까지 오세요. 다른 친구들도 와요.\n여자: 좋아요. 휴지를 사 갈게요.",
     qs:[
      {id:"t371", ask:"두 사람이 무엇에 대해 이야기하고 있는지 고르십시오.", opts:["집들이 초대", "휴지 사기", "친구 소개", "저녁 메뉴"], a:0,
       exp:"<b>집들이</b> — yangi uyga ko'chganda mehmon chaqirish; erkak taklif qilyapti."},
      {id:"t372", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 토요일에 남자 집에 갈 겁니다.", "집들이는 여자 집에서 합니다.", "남자는 휴지를 삽니다.", "집들이에는 여자만 옵니다."], a:0,
       exp:"Ayol <b>shanba kuni boradi</b> va qog'oz sochiq olib boradi (Koreyada odatiy sovg'a)."}
     ]},
    {id:"s72", type:"T-L10", sec:"listen", audio:"여자: 선생님, 왜 매일 자전거로 출근하세요?\n남자: 처음에는 건강 때문에 시작했어요. 그런데 타 보니까 길이 안 막혀서 버스보다 빨라요.\n여자: 비 오는 날은 어떻게 하세요?\n남자: 그런 날은 지하철을 타요.",
     qs:[
      {id:"t373", ask:"남자가 처음에 자전거를 타기 시작한 이유를 고르십시오.", opts:["건강 때문에", "길이 막혀서", "버스가 없어서", "돈이 없어서"], a:0,
       exp:"<b>처음에는 건강 때문에</b> — avvaliga sog'lig'i uchun boshlagan."},
      {id:"t374", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 비가 오면 지하철을 탑니다.", "남자는 버스로 출근합니다.", "자전거는 버스보다 느립니다.", "남자는 비가 와도 자전거를 탑니다."], a:0,
       exp:"Yomg'irli kunlarda <b>metroga chiqadi</b>. Velosiped avtobusdan tez."}
     ]},
    {id:"s73", type:"T-L10", sec:"listen", audio:"남자: 지나 씨, 왜 이사를 하려고 해요?\n여자: 지금 집이 회사에서 너무 멀어서요. 출근하는 데 1시간 반이나 걸려요.\n남자: 새 집은 찾았어요?\n여자: 네, 회사 근처에 작은 방을 하나 찾았어요.",
     qs:[
      {id:"t375", ask:"여자가 이사하려는 이유를 고르십시오.", opts:["집이 회사에서 멀어서", "집이 너무 작아서", "월세가 비싸서", "이웃이 시끄러워서"], a:0,
       exp:"<b>-아/어서요</b>: uy ishxonadan <b>juda uzoq</b>, 1,5 soat ketadi."},
      {id:"t376", ask:"들은 내용과 같은 것을 고르십시오.", opts:["여자는 회사 근처에 방을 찾았습니다.", "여자는 아직 집을 못 찾았습니다.", "지금 집은 회사에서 가깝습니다.", "새 집은 아주 큽니다."], a:0,
       exp:"Ishxona yaqinidan <b>kichik xona topdi</b>. -(이)나 — «naqd» (ko'plikni ta'kidlash)."}
     ]},
    {id:"s74", type:"T-L10", sec:"listen", audio:"여자: 민호 씨, 요즘 왜 아침을 안 먹어요?\n남자: 아침에 늦게 일어나서 먹을 시간이 없어요.\n여자: 그래도 조금이라도 먹어야 해요. 바나나나 우유라도 드세요.\n남자: 네, 내일부터는 바나나를 먹을게요.",
     qs:[
      {id:"t377", ask:"남자가 아침을 안 먹는 이유를 고르십시오.", opts:["늦게 일어나서", "배가 아파서", "살을 빼고 싶어서", "음식이 없어서"], a:0,
       exp:"<b>늦게 일어나서</b> — kech turgani uchun vaqt yo'q."},
      {id:"t378", ask:"들은 내용과 같은 것을 고르십시오.", opts:["남자는 내일부터 바나나를 먹을 겁니다.", "남자는 아침을 꼭 먹습니다.", "여자는 아침을 안 먹습니다.", "남자는 우유를 싫어합니다."], a:0,
       exp:"<b>-(으)ㄹ게요</b> — va'da: ertadan banan yeydi. -(이)라도 — hech bo'lmasa."}
     ]},
    {id:"s75", type:"T-R6", slot:"49", sec:"read", text:"저는 한국에 와서 처음으로 눈을 봤습니다. 우리 고향은 겨울에도 따뜻해서 눈이 오지 않습니다. 하얀 눈이 내리는 것을 보고 정말 ( ㉠ ). 그날 친구들과 눈사람도 만들었습니다.",
     qs:[
      {id:"t379", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["신기했습니다", "무서웠습니다", "슬펐습니다", "피곤했습니다"], a:0,
       exp:"Qorni birinchi ko'rgan — <b>ajoyib, g'aroyib</b> tuyulgan: <b>신기하다</b>."},
      {id:"t380", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 한국에서 처음 눈을 봤습니다.", "우리 고향은 겨울에 눈이 많이 옵니다.", "저는 혼자 눈사람을 만들었습니다.", "우리 고향은 겨울에 춥습니다."], a:0,
       exp:"<b>처음으로 눈을 봤습니다</b> — qorni Koreyada birinchi ko'rdi. Vatanda qish iliq."}
     ]},
    {id:"s76", type:"T-R6", slot:"49", sec:"read", text:"우리 회사에는 매달 마지막 금요일에 '생일 파티'가 있습니다. 그 달에 생일인 직원들을 위해 케이크를 준비하고 다 같이 노래를 부릅니다. 이 시간이 있어서 직원들이 서로 더 ( ㉠ ) 지냅니다.",
     qs:[
      {id:"t381", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["가깝게", "멀게", "늦게", "바쁘게"], a:0,
       exp:"Birgalikdagi bayram — xodimlar bir-biri bilan <b>yaqinroq</b> munosabatda: <b>가깝게 지내다</b>."},
      {id:"t382", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["생일 파티는 한 달에 한 번 있습니다.", "생일 파티는 매주 금요일에 합니다.", "직원들은 각자 케이크를 삽니다.", "생일인 사람만 파티에 갑니다."], a:0,
       exp:"<b>매달 마지막 금요일</b> — har oyning oxirgi jumasi, ya'ni oyiga bir marta."}
     ]},
    {id:"s77", type:"T-R6", slot:"49", sec:"read", text:"저는 지난 주말에 처음으로 한국 사우나에 갔습니다. 사우나에는 뜨거운 물과 차가운 물이 있었습니다. 뜨거운 물에 들어가니까 몸이 아주 ( ㉠ ). 다음에는 동료들과 같이 가려고 합니다.",
     qs:[
      {id:"t383", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["편해졌습니다", "추워졌습니다", "무거워졌습니다", "아팠습니다"], a:0,
       exp:"Issiq suvda tana <b>yengillashdi, rohatlandi</b>: <b>편해지다</b>."},
      {id:"t384", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 지난 주말에 사우나에 갔습니다.", "사우나에는 차가운 물만 있었습니다.", "저는 동료들과 같이 갔습니다.", "저는 사우나에 자주 갑니다."], a:0,
       exp:"O'tgan dam olish kuni <b>birinchi marta</b> borgan; keyingi safar hamkasblar bilan."}
     ]},
    {id:"s78", type:"T-R6", slot:"51", sec:"read", text:"한국에서는 버스나 지하철을 탈 때 교통카드를 많이 사용합니다. 교통카드는 편의점에서 사고 돈을 충전할 수 있습니다. 교통카드를 쓰면 현금으로 낼 때보다 요금이 조금 ( ㉠ ). 그리고 갈아탈 때 할인도 받을 수 있습니다.",
     qs:[
      {id:"t385", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["쌉니다", "비쌉니다", "많습니다", "깁니다"], a:0,
       exp:"Karta afzalligi: naqd puldan <b>arzonroq</b>. 충전하다 — to'ldirmoq."},
      {id:"t386", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["교통카드의 좋은 점", "편의점에서 일하는 방법", "버스를 기다리는 곳", "지하철 노선"], a:0,
       exp:"Matn <b>transport kartasining afzalliklari</b> haqida."}
     ]},
    {id:"s79", type:"T-R6", slot:"51", sec:"read", text:"한국의 여름에는 '삼계탕'을 먹는 사람이 많습니다. 삼계탕은 닭 안에 쌀과 인삼을 넣고 끓인 음식입니다. 더운 여름에 뜨거운 삼계탕을 먹으면 ( ㉠ ) 생긴다고 생각합니다. 특히 '복날'에는 삼계탕 식당에 사람이 아주 많습니다.",
     qs:[
      {id:"t387", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["힘이", "돈이", "시간이", "친구가"], a:0,
       exp:"Issiq kunda samgyetang yesa <b>kuch-quvvat</b> paydo bo'ladi: <b>힘이 생기다</b>."},
      {id:"t388", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["여름에 먹는 삼계탕", "닭을 키우는 방법", "인삼 값", "식당 예약 방법"], a:0,
       exp:"Matn <b>yozda yeyiladigan samgyetang</b> haqida. 복날 — yozning eng issiq kunlari."}
     ]},
    {id:"s80", type:"T-R6", slot:"51", sec:"read", text:"요즘은 집에서 일하는 사람들이 많아졌습니다. 집에서 일하면 출퇴근 시간이 없어서 시간을 ( ㉠ ) 쓸 수 있습니다. 하지만 일과 생활을 나누기 어렵다는 사람도 있습니다.",
     qs:[
      {id:"t389", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["아껴", "버려", "빌려", "잊어"], a:0,
       exp:"Yo'lga vaqt ketmaydi — vaqtni <b>tejab</b> ishlatish mumkin: <b>아껴 쓰다</b>."},
      {id:"t390", ask:"무엇에 대한 이야기인지 맞는 것을 고르십시오.", opts:["집에서 일하는 것", "출퇴근 버스", "회사를 찾는 방법", "집을 청소하는 방법"], a:0,
       exp:"Mavzu: <b>uydan ishlash</b>ning yaxshi va yomon tomonlari."}
     ]},
    {id:"s81", type:"T-R6", slot:"53", sec:"read", text:"저는 회사 동료들과 매주 수요일 저녁에 배드민턴을 칩니다. 처음에는 공을 잘 치지 못했지만 동료들이 친절하게 ( ㉠ ). 지금은 동료들과 경기도 할 수 있을 만큼 잘 칩니다.",
     qs:[
      {id:"t391", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["가르쳐 주었습니다", "배워 주었습니다", "싸워 주었습니다", "잊어 주었습니다"], a:0,
       exp:"Hamkasblar <b>o'rgatib berishdi</b>: <b>가르쳐 주다</b>. 배우다 — o'zi o'rganmoq (bu yerda mos emas)."},
      {id:"t392", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 동료들과 배드민턴을 칩니다.", "저는 처음부터 배드민턴을 잘 쳤습니다.", "배드민턴은 토요일에 칩니다.", "동료들은 배드민턴을 못 칩니다."], a:0,
       exp:"Har chorshanba kechqurun <b>hamkasblar bilan badminton</b>. -(으)ㄹ 만큼 — ...darajada."}
     ]},
    {id:"s82", type:"T-R6", slot:"53", sec:"read", text:"저는 매달 월급의 일부를 고향에 보냅니다. 처음에는 은행에 가서 보냈지만 수수료가 비쌌습니다. 그래서 요즘은 수수료가 ( ㉠ ) 송금 앱을 사용합니다. 돈도 더 빨리 도착합니다.",
     qs:[
      {id:"t393", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["싼", "비싼", "많은", "무거운"], a:0,
       exp:"Bank komissiyasi qimmat edi, shuning uchun komissiyasi <b>arzon</b> ilova: <b>싼</b>."},
      {id:"t394", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["요즘 저는 송금 앱을 사용합니다.", "은행 수수료는 쌌습니다.", "송금 앱은 돈이 늦게 도착합니다.", "저는 돈을 보내지 않습니다."], a:0,
       exp:"<b>송금 앱</b> — pul o'tkazish ilovasi; pul tezroq yetadi. 수수료 — komissiya."}
     ]},
    {id:"s83", type:"T-R6", slot:"53", sec:"read", text:"어제 퇴근하는 길에 할머니 한 분이 무거운 짐을 들고 계셨습니다. 그래서 제가 할머니 집까지 짐을 들어 ( ㉠ ). 할머니께서 고맙다고 하시면서 사과를 주셨습니다.",
     qs:[
      {id:"t395", ask:"㉠에 들어갈 알맞은 것을 고르십시오.", opts:["드렸습니다", "받았습니다", "샀습니다", "주셨습니다"], a:0,
       exp:"Kattaga xizmat — <b>-아/어 드리다</b>: yukini ko'tarib berdim."},
      {id:"t396", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 할머니의 짐을 들어 드렸습니다.", "할머니께서 제 짐을 들어 주셨습니다.", "저는 할머니께 사과를 드렸습니다.", "저는 아침에 할머니를 만났습니다."], a:0,
       exp:"Men buvining yukini ko'tardim, <b>buvi menga olma berdi</b>. 퇴근하는 길에 — ishdan qaytayotib."}
     ]},
    {id:"s84", type:"T-R6", slot:"55", sec:"read", text:"저는 한국 노래를 좋아합니다. 노래를 들으면 기분이 좋아집니다. ( ㉠ ) 가사를 이해하기는 아직 어렵습니다. 그래서 요즘은 가사를 찾아서 공부합니다.",
     qs:[
      {id:"t397", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["하지만", "그래서", "그리고", "그러면"], a:0,
       exp:"Yoqtiraman, <b>lekin</b> so'zlarini tushunish qiyin — <b>하지만</b>."},
      {id:"t398", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 가사를 찾아서 공부합니다.", "저는 가사를 다 이해합니다.", "저는 한국 노래를 싫어합니다.", "노래를 들으면 기분이 나빠집니다."], a:0,
       exp:"<b>가사</b> — qo'shiq matni; uni topib o'rganadi."}
     ]},
    {id:"s85", type:"T-R6", slot:"55", sec:"read", text:"이번 주말에 친구와 부산에 가기로 했습니다. 기차표는 이미 샀습니다. ( ㉠ ) 아직 호텔은 예약하지 못했습니다. 오늘 저녁에 인터넷으로 호텔을 찾아보려고 합니다.",
     qs:[
      {id:"t399", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그런데", "그래서", "그러니까", "그러면"], a:0,
       exp:"Chipta bor, <b>biroq</b> mehmonxona yo'q — <b>그런데</b>."},
      {id:"t400", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["기차표는 샀지만 호텔은 아직 예약하지 않았습니다.", "호텔을 예약했습니다.", "혼자 부산에 갑니다.", "기차표를 아직 사지 않았습니다."], a:0,
       exp:"<b>이미</b> — allaqachon (chipta), <b>아직</b> — hali (mehmonxona yo'q)."}
     ]},
    {id:"s86", type:"T-R6", slot:"55", sec:"read", text:"저는 운동을 싫어했습니다. 그런데 회사 건강 검진에서 운동을 하라는 말을 들었습니다. ( ㉠ ) 매일 저녁 회사 근처 공원을 걷기 시작했습니다. 지금은 걷는 것이 즐겁습니다.",
     qs:[
      {id:"t401", ask:"( ㉠ )에 들어갈 알맞은 말을 고르십시오.", opts:["그래서", "하지만", "그런데", "그렇지만"], a:0,
       exp:"Shifokor aytdi → <b>shuning uchun</b> yura boshladim — <b>그래서</b> (sabab-natija)."},
      {id:"t402", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 매일 저녁 공원을 걷습니다.", "저는 원래 운동을 좋아했습니다.", "저는 아침에 공원을 걷습니다.", "건강 검진을 받지 않았습니다."], a:0,
       exp:"Har kuni <b>kechqurun bog'da yuradi</b>. 원래 — aslida, avvaldan."}
     ]},
    {id:"s87", type:"T-R6", slot:"59", sec:"read", text:"저는 다음 달에 한국어 능력 시험을 봅니다. ( ㉠ ) 그래서 요즘 퇴근 후에 매일 두 시간씩 공부합니다. ( ㉡ ) 특히 듣기가 어려워서 한국 뉴스를 자주 듣습니다. ( ㉢ ) 시험이 끝나면 고향 친구들과 여행을 가고 싶습니다. ( ㉣ )",
     qs:[
      {id:"t403", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n처음에는 뉴스가 너무 빨라서 거의 알아듣지 못했습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:2,
       exp:"Gap yangiliklar haqida — «yangiliklarni tinglayman» dan keyin: ㉢. 알아듣다 — eshitib tushunmoq."},
      {id:"t404", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["저는 요즘 퇴근 후에 공부합니다.", "저는 지난달에 시험을 봤습니다.", "저는 읽기가 제일 어렵습니다.", "저는 뉴스를 듣지 않습니다."], a:0,
       exp:"<b>퇴근 후에 매일 두 시간씩</b> — ishdan keyin har kuni 2 soatdan. Imtihon keyingi oy."}
     ]},
    {id:"s88", type:"T-R6", slot:"59", sec:"read", text:"우리 동네에는 매주 일요일에 벼룩시장이 열립니다. ( ㉠ ) 사람들은 쓰지 않는 물건을 가지고 와서 싸게 팝니다. ( ㉡ ) 저도 지난주에 작아진 옷을 가지고 가서 팔았습니다. ( ㉢ ) 그 돈으로 필요한 책을 샀습니다. ( ㉣ )",
     qs:[
      {id:"t405", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n벼룩시장은 오래된 물건을 사고파는 곳입니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:0,
       exp:"Ta'rif gapi — bozor nomi tilga olingandan <b>darhol keyin</b>: ㉠. 벼룩시장 — «burga bozori», eski buyumlar bozori."},
      {id:"t406", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["벼룩시장은 일요일마다 열립니다.", "벼룩시장에서는 새 물건만 팝니다.", "저는 벼룩시장에서 옷을 샀습니다.", "저는 책을 팔았습니다."], a:0,
       exp:"<b>매주 일요일</b> = 일요일마다. Men kiyim sotib, kitob oldim."}
     ]},
    {id:"s89", type:"T-R6", slot:"59", sec:"read", text:"저는 어제 처음으로 한국 친구의 결혼식에 갔습니다. ( ㉠ ) 결혼식은 생각보다 짧아서 30분 만에 끝났습니다. ( ㉡ ) 결혼식이 끝난 후에는 다 같이 식사를 했습니다. ( ㉢ ) 친구가 아주 행복해 보여서 저도 기뻤습니다. ( ㉣ )",
     qs:[
      {id:"t407", ask:"다음 문장이 들어갈 곳으로 가장 알맞은 것을 고르십시오.\n\n우리 고향의 결혼식은 보통 하루 종일 하기 때문에 조금 놀랐습니다.", opts:["㉠", "㉡", "㉢", "㉣"], a:1,
       exp:"Hayrat sababi — to'y qisqa bo'lgani: «30 daqiqada tugadi» dan keyin — ㉡."},
      {id:"t408", ask:"이 글의 내용과 같은 것을 고르십시오.", opts:["결혼식은 30분 만에 끝났습니다.", "결혼식은 하루 종일 했습니다.", "결혼식 후에 바로 집에 갔습니다.", "저는 결혼식에 자주 갑니다."], a:0,
       exp:"<b>30분 만에 끝났습니다</b> — 30 daqiqada tugadi. Keyin hamma birga ovqatlandi."}
     ]}
  ] };
