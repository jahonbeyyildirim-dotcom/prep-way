/* Hanguk Way — TOPIK II: YOZISH (쓰기 51–54) va 3–6-daraja GRAMMATIKASI.
   Topshiriqlar va namuna javoblar Hanguk Way tomonidan rasmiy savol turlari bo'yicha yozilgan.
   Baholash: server (/api/write) rasmiy mezonlar bo'yicha — 51–52: 10 ball, 53: 30 ball, 54: 50 ball (jami 100). */
(function () {
  var H = window.HY, I = window.I18N;
  if (!H) return;
  var $ = H.$, esc = H.esc, toast = H.toast;
  function TF(uz, ru, en, v) { return I ? I.f({ uz: uz, ru: ru, en: en }, v) : uz; }

  // ------------------------------------------------------------ TOPSHIRIQLAR
  var MAX = { 51: 10, 52: 10, 53: 30, 54: 50 };
  var LIM = { 53: [200, 300], 54: [600, 700] };
  var INST = {
    51: { ko: "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 쓰십시오.", uz: "Matndagi ㉠ va ㉡ o'rniga mos gapni yozing (har biri bitta gap).", ru: "Впишите подходящие фразы на места ㉠ и ㉡ (по одному предложению).", en: "Write a suitable sentence for each of ㉠ and ㉡." },
    52: { ko: "다음 글의 ㉠과 ㉡에 알맞은 말을 각각 한 문장으로 쓰십시오.", uz: "㉠ va ㉡ o'rniga bittadan gap yozing. Yozma uslub: -다/-ㄴ다.", ru: "Впишите по одному предложению на места ㉠ и ㉡. Письменный стиль: -다/-ㄴ다.", en: "Write one sentence for each of ㉠ and ㉡, in written style (-다/-ㄴ다)." },
    53: { ko: "다음을 참고하여 200~300자로 글을 쓰십시오. 단, 글의 제목은 쓰지 마십시오.", uz: "Ma'lumotlarga tayanib 200–300 belgili matn yozing. Sarlavha yozmang.", ru: "Опираясь на данные, напишите текст на 200–300 знаков. Без заголовка.", en: "Using the data, write 200–300 characters. Do not write a title." },
    54: { ko: "다음을 주제로 하여 자신의 생각을 600~700자로 글을 쓰십시오. 단, 문제를 그대로 옮겨 쓰지 마십시오.", uz: "Mavzu bo'yicha o'z fikringizni 600–700 belgida yozing. Savolni so'zma-so'z ko'chirmang.", ru: "Изложите своё мнение на 600–700 знаков. Не переписывайте задание дословно.", en: "Write your opinion in 600–700 characters. Don't copy the prompt word for word." }
  };
  var TASKS = [
    { id: "w51a", no: 51, text: "<노트북을 찾습니다>\n어제 오후 3시쯤 학생회관 2층 휴게실에서 노트북을 잃어버렸습니다. 검은색이고 뒷면에 노란색 스티커가 붙어 있습니다. 노트북 안에 졸업 논문 자료가 있어서 ( ㉠ ). 혹시 노트북을 보신 분은 ( ㉡ ). 꼭 사례하겠습니다.\n연락처: 010-1234-5678",
      model: ["꼭 찾아야 합니다 / 저에게 매우 중요합니다", "아래 번호로 연락해 주시기 바랍니다 / 이 번호로 연락 주십시오"],
      tip: "㉠ — nega muhimligi (kurs ishi ichida), ㉡ — nima qilish so'ralmoqda (telefon raqami bor → qo'ng'iroq qiling). E'londa rasmiy -ㅂ니다/습니다 uslubi." },
    { id: "w51b", no: 51, text: "받는 사람: 동아리 회원들\n제목: 집들이에 초대합니다\n\n여러분, 안녕하세요. 지난달에 학교 근처로 이사를 했습니다. 그래서 이번 주 토요일 저녁 6시에 ( ㉠ ). 맛있는 음식을 준비해 놓겠습니다. 저희 집은 지하철역에서 가까워서 ( ㉡ ). 오실 수 있는 분은 금요일까지 답장을 주세요.",
      model: ["집들이를 하려고 합니다 / 여러분을 집에 초대하고 싶습니다", "찾아오기 쉽습니다 / 쉽게 오실 수 있습니다"],
      tip: "Sarlavha — 집들이 (yangi uyga taklif). ㉠ — nima qilmoqchi, ㉡ — metroga yaqin → kelish oson. Oldingi va keyingi gapga mantiqan bog'lang." },
    { id: "w51c", no: 51, text: "<시립 도서관 휴관 안내>\n도서관 내부 공사로 인해 다음 달 1일부터 7일까지 ( ㉠ ). 이 기간에는 책을 빌리거나 반납할 수 없습니다. 다만 빌린 책의 반납 날짜가 휴관 기간에 해당하는 분들은 ( ㉡ ). 이용에 불편을 드려 죄송합니다.",
      model: ["도서관 문을 닫습니다 / 휴관합니다", "8일까지 반납하시면 됩니다 / 휴관이 끝난 후에 반납하셔도 됩니다"],
      tip: "휴관 — vaqtincha yopilish. ㉡ dan oldin 다만 (biroq) — istisno: qaytarish muddati to'g'ri kelganlar keyinroq qaytarsa bo'ladi." },
    { id: "w51d", no: 51, text: "민수 씨, 내일 오후 2시에 만나기로 했는데 갑자기 회사에 일이 생겼어요. 그래서 ( ㉠ ). 정말 미안해요. 혹시 다음 주 월요일 저녁은 어때요? 시간이 괜찮으면 ( ㉡ ).",
      model: ["내일 만날 수 없을 것 같아요 / 약속을 바꿔야 할 것 같아요", "연락 주세요 / 답장해 주세요"],
      tip: "Bu SMS — uslub -아요/어요. 그래서 → natija: uchrasha olmayman. ㉡ — javob so'rash." },
    { id: "w52a", no: 52, text: "사람들은 기분이 좋을 때 웃는다. 그런데 반대로 억지로라도 웃으면 기분이 좋아진다는 연구 결과가 있다. 웃을 때 사용하는 얼굴 근육이 움직이면 뇌가 이를 ( ㉠ ). 그래서 기분이 좋지 않을 때 일부러 웃는 것도 ( ㉡ ).",
      model: ["즐거운 상태로 받아들이기 때문이다 / 기쁜 감정으로 인식하기 때문이다", "기분을 바꾸는 데 도움이 될 수 있다"],
      tip: "52 — ilmiy-izohli matn: faqat -다/-ㄴ다 uslubi (-요 YO'Q). ㉠ — sabab (-기 때문이다), ㉡ — 그래서 dan keyin xulosa." },
    { id: "w52b", no: 52, text: "운동을 하면 몸이 건강해진다. 그러나 무리하게 운동을 하면 ( ㉠ ). 특히 평소에 운동을 하지 않던 사람이 갑자기 오랜 시간 운동을 하면 다치기 쉽다. 따라서 운동은 자신의 체력에 맞게 ( ㉡ ).",
      model: ["오히려 건강을 해칠 수 있다 / 몸에 해가 될 수 있다", "조금씩 늘려 가는 것이 좋다 / 해야 한다"],
      tip: "그러나 — qarama-qarshilik: foyda o'rniga zarar (오히려). 따라서 — xulosa/tavsiya (-는 것이 좋다, -아야/어야 한다)." },
    { id: "w52c", no: 52, text: "아침을 거르는 사람이 많다. 아침을 먹지 않으면 점심때 배가 너무 고파서 ( ㉠ ). 이렇게 한꺼번에 많이 먹는 습관은 건강에 좋지 않다. 그러므로 아침은 ( ㉡ ) 조금이라도 먹는 것이 좋다.",
      model: ["음식을 한꺼번에 많이 먹게 된다 / 과식하게 된다", "바쁘더라도 / 시간이 없더라도"],
      tip: "Keyingi gap ㉠ ga ishora qiladi: 이렇게 한꺼번에 많이 먹는 습관. ㉡ — yon bosish: -더라도 (\"...bo'lsa ham\")." },
    { id: "w52d", no: 52, text: "나무로 만든 가구는 습기에 약하다. 공기 중의 습기를 흡수하면 나무가 ( ㉠ ). 그래서 나무 가구는 습기가 많은 곳에 두지 않는 것이 좋다. 또한 가끔 창문을 열어 ( ㉡ ).",
      model: ["휘어지거나 갈라질 수 있다 / 변형되기 쉽다", "환기를 시켜 주는 것이 좋다 / 습기를 없애 주어야 한다"],
      tip: "습기 — namlik. ㉠ — namlikning zarari, ㉡ — 또한 (shuningdek) — yana bir maslahat: xonani shamollatish (환기)." },
    { id: "w53a", no: 53, title: "1인 가구의 증가", text: "조사 기관: 통계청\n· 1인 가구 비율: 2000년 15.5% → 2010년 23.9% → 2022년 34.5%\n· 원인: 결혼에 대한 인식 변화, 고령화\n· 전망: 2050년 약 40% 예상",
      model: "통계청의 조사에 따르면 전체 가구 중에서 1인 가구가 차지하는 비율은 2000년 15.5%에서 2010년 23.9%로 늘었고, 2022년에는 34.5%로 크게 증가하였다. 이처럼 1인 가구가 증가한 원인으로는 결혼에 대한 인식이 변화한 것과 고령화가 빠르게 진행된 것을 들 수 있다. 이러한 추세가 계속된다면 2050년에는 1인 가구의 비율이 약 40%에 이를 것으로 예상된다.",
      tip: "Tuzilma: 1) manba va o'zgarish (…에서 …로 증가하였다) 2) sabablar (원인으로는 …을 들 수 있다) 3) istiqbol (…것으로 예상된다). Faqat berilgan ma'lumot, o'z fikringiz YO'Q." },
    { id: "w53b", no: 53, title: "외국인 관광객의 한국 방문 이유", text: "조사 기관: 한국관광공사\n조사 대상: 외국인 관광객 1,000명\n· 방문 이유: 한국 음식 38%, 쇼핑 27%, K-팝·드라마 촬영지 21%, 자연 경관 14%\n· 가장 만족한 점: 1위 편리한 교통, 2위 좋은 치안",
      model: "한국관광공사에서 외국인 관광객 1,000명을 대상으로 한국을 방문한 이유에 대해 조사하였다. 그 결과 '한국 음식'이라고 응답한 사람이 38%로 가장 많았고, 이어서 '쇼핑'이 27%, 'K-팝·드라마 촬영지'가 21%, '자연 경관'이 14%로 나타났다. 또한 한국 여행에서 가장 만족한 점으로는 교통이 편리하다는 점이 1위, 치안이 좋다는 점이 2위를 차지하였다. 이를 통해 한국 음식과 대중문화가 외국인 관광객을 끌어들이는 중요한 요인임을 알 수 있다.",
      tip: "So'rovnoma: …을/를 대상으로 …에 대해 조사하였다. Tartib: eng ko'pi (가장 많았고) → 이어서 … → 또한 … → xulosa (이를 통해 …을 알 수 있다)." },
    { id: "w53c", no: 53, title: "온라인 쇼핑 매출액의 변화", text: "· 온라인 쇼핑 매출액: 2015년 54조 원 → 2020년 159조 원 → 2023년 227조 원\n· 증가 원인: 스마트폰 보급, 배송 속도 향상\n· 크게 증가한 품목: 음식 서비스, 생활용품\n· 전망: 계속 성장할 것으로 예상",
      model: "온라인 쇼핑 매출액은 2015년 54조 원에서 2020년 159조 원으로 약 3배 증가하였으며, 2023년에는 227조 원에 이르렀다. 이렇게 매출액이 증가한 원인으로는 스마트폰이 널리 보급된 것과 배송 속도가 빨라진 것을 들 수 있다. 품목별로 살펴보면 음식 서비스와 생활용품의 매출이 특히 크게 늘었다. 이러한 추세로 볼 때 앞으로도 온라인 쇼핑 시장은 계속 성장할 것으로 예상된다.",
      tip: "Raqamlar: …에서 …로 약 3배 증가하였다, …에 이르렀다. Sabab → bo'limlar bo'yicha (품목별로 살펴보면) → istiqbol." },
    { id: "w53d", no: 53, title: "대학생 아르바이트", text: "· 아르바이트를 하는 대학생 비율: 2013년 40% → 2023년 58%\n· 아르바이트를 하는 이유 (2023년): 생활비 마련 52%, 용돈 31%, 사회 경험 17%",
      model: "아르바이트를 하는 대학생의 비율은 2013년 40%에서 2023년 58%로 10년 동안 18%p 증가하였다. 2023년에 아르바이트를 하는 이유를 살펴보면 '생활비를 마련하기 위해서'가 52%로 가장 높게 나타났다. 그다음으로 '용돈을 벌기 위해서'가 31%, '사회 경험을 쌓기 위해서'가 17%로 조사되었다. 이를 통해 대학생들이 아르바이트를 하는 가장 큰 이유는 경제적인 부담 때문이라는 것을 알 수 있다.",
      tip: "Foiz farqi — %p (퍼센트포인트). Sabablar kamayish tartibida: 가장 높게 나타났다 → 그다음으로 … Oxirida qisqa xulosa." },
    { id: "w54a", no: 54, title: "SNS의 올바른 사용", text: "오늘날 많은 사람들이 SNS로 소통한다. SNS의 장점과 단점, 그리고 바람직한 사용 방법에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.\n· SNS의 장점은 무엇인가?\n· SNS의 단점은 무엇인가?\n· SNS를 바람직하게 사용하려면 어떻게 해야 하는가?",
      model: "오늘날 많은 사람들이 SNS를 통해 소식을 나누고 다른 사람들과 소통한다. SNS는 시간과 장소에 관계없이 누구와도 쉽게 연결될 수 있다는 점에서 매우 편리하다. 또한 개인이 자신의 생각을 자유롭게 표현할 수 있고, 필요한 정보를 빠르게 얻을 수 있다는 장점도 있다. 멀리 떨어져 사는 가족이나 친구와도 일상을 쉽게 나눌 수 있다.\n그러나 SNS에는 단점도 적지 않다. 우선 확인되지 않은 정보가 빠르게 퍼지면서 잘못된 소문이 사실처럼 받아들여지는 경우가 많다. 그리고 다른 사람의 화려한 일상을 보며 자신과 비교하다 보면 상대적인 박탈감을 느끼기 쉽다. 특히 청소년은 이러한 영향을 더 쉽게 받는다. 게다가 개인 정보가 노출되어 범죄에 이용될 위험도 있다.\n따라서 SNS를 바람직하게 사용하기 위해서는 몇 가지 노력이 필요하다. 첫째, 정보를 그대로 믿기보다 출처를 확인하고 비판적으로 받아들이는 태도를 가져야 한다. 둘째, SNS에 보이는 모습이 그 사람의 전부가 아니라는 것을 인식하고 지나친 비교를 피해야 한다. 셋째, 개인 정보를 함부로 올리지 않도록 주의해야 한다. SNS는 잘 사용하면 삶을 풍요롭게 하는 도구가 되지만, 잘못 사용하면 오히려 해가 될 수 있다. 그러므로 사용하는 사람 스스로 올바른 습관을 기르는 것이 무엇보다 중요하다.",
      tip: "3 qism = 3 savol: 1) kirish + afzalliklar 2) 그러나 — kamchiliklar 3) 따라서 — yechim (첫째/둘째/셋째) va xulosa. Har savolga alohida xatboshi." },
    { id: "w54b", no: 54, title: "조기 외국어 교육", text: "최근 어린 나이부터 외국어를 가르치는 부모가 늘고 있다. 조기 외국어 교육에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.\n· 조기 외국어 교육이 늘어나는 이유는 무엇인가?\n· 조기 외국어 교육의 장점과 문제점은 무엇인가?\n· 조기 외국어 교육에 대한 자신의 의견은 무엇인가?",
      model: "요즘 어린 자녀에게 외국어를 일찍 가르치려는 부모가 늘고 있다. 이는 세계화로 외국어 능력이 중요해지면서 자녀가 경쟁에서 뒤처지지 않기를 바라는 마음 때문이다. 특히 영어는 대학 입시나 취업에서도 중요하게 여겨진다. 또한 언어는 어릴 때 배울수록 쉽게 익힐 수 있다는 생각도 영향을 주고 있다.\n조기 외국어 교육에는 분명한 장점이 있다. 어린아이들은 소리를 있는 그대로 받아들이기 때문에 발음을 자연스럽게 익힐 수 있다. 그리고 다른 문화를 일찍 접하면서 열린 사고를 기를 수 있다. 하지만 문제점도 있다. 아이가 원하지 않는데도 억지로 공부를 시키면 외국어에 대한 흥미를 잃을 수 있다. 또한 모국어 능력이 충분히 발달하지 않은 상태에서 외국어를 배우면 두 언어 모두 어중간해질 수 있으며, 비싼 교육비는 가정에 부담이 된다.\n나는 조기 외국어 교육 자체가 나쁘다고 생각하지는 않는다. 다만 무엇보다 아이의 흥미와 발달 단계를 고려해야 한다고 본다. 시험 점수를 위한 공부보다는 노래나 놀이를 통해 외국어를 즐겁게 접하게 하는 것이 바람직하다. 또한 모국어 교육을 소홀히 해서는 안 된다. 외국어 교육의 목적은 아이가 더 넓은 세상과 소통하도록 돕는 것이지 부모의 욕심을 채우는 것이 아니라는 점을 기억해야 할 것이다.",
      tip: "Sabab (이는 …때문이다) → afzallik va muammo (하지만 문제점도 있다) → o'z fikri (나는 …다고 생각한다 / 본다). Fikringizni aniq bildiring." },
    { id: "w54c", no: 54, title: "인공지능 시대에 필요한 능력", text: "인공지능 기술이 빠르게 발전하면서 생활에 많은 변화가 생기고 있다. '인공지능 시대에 인간에게 필요한 능력'에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.\n· 인공지능의 발달로 생활이 어떻게 달라졌는가?\n· 인공지능이 대신하기 어려운 인간의 능력은 무엇인가?\n· 그러한 능력을 기르기 위해 어떤 노력이 필요한가?",
      model: "인공지능 기술이 발달하면서 우리의 생활은 크게 달라졌다. 스마트폰에 말을 하면 인공지능이 날씨를 알려 주고, 외국어로 된 글도 순식간에 번역해 준다. 회사에서는 사람이 오랜 시간 하던 자료 정리나 분석을 인공지능이 대신하면서 업무 속도가 빨라졌다. 또한 병원에서는 인공지능이 영상 자료를 분석해 질병을 찾아내는 데 도움을 주고 있다.\n그러나 인공지능이 모든 것을 대신할 수는 없다. 인공지능은 많은 자료를 빠르게 처리할 수 있지만 다른 사람의 감정을 깊이 이해하고 공감하는 능력은 부족하다. 또한 새로운 것을 상상해 내는 창의력이나 옳고 그름을 판단하는 윤리적 판단력 역시 인간만이 가진 중요한 능력이다. 따라서 인공지능 시대에는 이러한 능력을 갖춘 사람이 더욱 필요해질 것이다.\n이러한 능력을 기르기 위해서는 다음과 같은 노력이 필요하다. 먼저 다양한 사람들과 직접 대화하고 협력하는 경험을 쌓아야 한다. 그 과정에서 다른 사람의 입장을 이해하는 공감 능력이 자란다. 다음으로 정답을 외우는 교육보다 스스로 질문하고 문제를 해결하는 교육이 이루어져야 한다. 마지막으로 기술을 사용할 때 그것이 사회에 어떤 영향을 미칠지 생각해 보는 습관을 길러야 한다. 인공지능을 두려워하기보다 인간다운 능력을 키워 인공지능을 현명하게 활용하는 것이 중요하다.",
      tip: "Bog'lovchilar zanjiri: 그러나 → 따라서 → 먼저 / 다음으로 / 마지막으로. 54 da yuqori darajali so'zlar (순식간에, 윤리적, 활용하다) ball oshiradi." },
    { id: "w54d", no: 54, title: "바람직한 칭찬", text: "칭찬은 사람을 움직이는 힘이 있다. 그러나 잘못된 칭찬은 오히려 부정적인 영향을 줄 수 있다. '바람직한 칭찬'에 대해 아래의 내용을 중심으로 자신의 생각을 쓰십시오.\n· 칭찬은 왜 필요한가?\n· 잘못된 칭찬은 어떤 문제가 있는가?\n· 바람직한 칭찬의 방법은 무엇인가?",
      model: "사람은 누구나 다른 사람에게 인정받고 싶어 한다. 칭찬은 이러한 욕구를 채워 주어 자신감을 높이고 더 열심히 노력하게 만드는 힘이 있다. 특히 아이들은 칭찬을 받으면서 스스로를 소중한 존재로 느끼고 새로운 일에 도전할 용기를 얻는다. 그러므로 칭찬은 개인의 성장에 꼭 필요하다.\n하지만 모든 칭찬이 좋은 것은 아니다. 결과만 보고 하는 칭찬은 실패를 두려워하게 만들 수 있다. 예를 들어 '머리가 좋구나'라는 칭찬을 자주 들은 아이는 좋은 평가를 잃지 않으려고 어려운 문제를 피하게 된다. 또한 진심이 담기지 않은 지나친 칭찬은 상대방에게 부담을 주거나 칭찬의 가치를 떨어뜨린다. 칭찬이 너무 흔해지면 정말 잘한 일에 대한 칭찬도 의미를 잃게 되기 때문이다.\n그렇다면 바람직한 칭찬은 어떻게 해야 할까? 첫째, 결과보다 과정을 칭찬해야 한다. '끝까지 포기하지 않고 노력했구나'처럼 노력한 과정을 인정해 주면 상대방은 결과와 관계없이 계속 도전할 수 있다. 둘째, 구체적으로 칭찬해야 한다. 막연히 '잘했다'고 하기보다 무엇을 잘했는지 정확히 말해 주면 진심이 더 잘 전달된다. 셋째, 칭찬할 일이 생겼을 때 바로 칭찬하는 것이 효과적이다. 이처럼 올바른 방법으로 칭찬한다면 칭찬은 사람을 성장시키는 훌륭한 도구가 될 것이다.",
      tip: "Savol shaklidagi o'tish gapi (그렇다면 …어떻게 해야 할까?) matnni jonlantiradi. Misol keltiring (예를 들어) — bu ball beradi." }
  ];
  var RULES = [
    "53 va 54 — faqat yozma uslub: <b>-다 / -ㄴ다 / -는다 / -았다</b>. <b>-요, -ㅂ니다 ishlatmang</b> (51 bundan mustasno).",
    "Sarlavha yozmang, savolni so'zma-so'z ko'chirmang — bu ball kamaytiradi.",
    "Belgilar soni bo'sh joy bilan hisoblanadi. 53: 200–300, 54: 600–700. Kam yoki ko'p bo'lsa — ball tushadi.",
    "54 = 3 savol → 3 xatboshi. Bog'lovchilar: 우선, 또한, 그러나, 따라서, 첫째/둘째/셋째, 이처럼.",
    "Vaqt: 51–52 ga ~10 daqiqa, 53 ga ~15 daqiqa, 54 ga ~30 daqiqa (jami 50 daqiqa)."
  ];

  // ------------------------------------------------------------ GRAMMATIKA (3–6)
  var GRAM = [
    ["-는 바람에", 3, "kutilmagan sabab (ko'pincha salbiy natija)", "неожиданная причина (обычно с плохим итогом)", "unexpected cause (usually bad result)", "늦잠을 자는 바람에 지각했다.", "Uxlab qolganim sababli kechikdim."],
    ["-(으)ㄴ/는 탓에", 4, "salbiy natija sababi (ayb)", "причина плохого результата", "cause of a bad outcome", "날씨가 추운 탓에 감기에 걸렸다.", "Havo sovuq bo'lgani tufayli shamollab qoldim."],
    ["-(으)ㄴ/는 덕분에", 3, "ijobiy natija sababi (tufayli)", "благодаря", "thanks to", "친구가 도와준 덕분에 일을 빨리 끝냈다.", "Do'stim yordami tufayli ishni tez tugatdim."],
    ["-느라고", 3, "...bilan band bo'lib (shuning uchun boshqasini qila olmadi)", "из-за того, что был занят…", "because (busy) doing…", "숙제를 하느라고 전화를 못 받았다.", "Uy vazifasi bilan band bo'lib telefonga javob bera olmadim."],
    ["-더니", 4, "o'tmishda kuzatilgan holat va keyingi o'zgarish", "раньше наблюдал…, а потом…", "observed…, and then…", "아침에는 맑더니 오후에 비가 왔다.", "Ertalab ochiq edi, tushdan keyin yomg'ir yog'di."],
    ["-았/었더니", 4, "o'zim qilgan ish va uning natijasi", "я сделал… и в результате…", "I did…, and as a result…", "약을 먹었더니 머리가 안 아프다.", "Dori ichdim — boshim og'rimayapti."],
    ["-(으)ㄹ수록", 3, "qancha ... bo'lsa, shuncha", "чем больше…, тем…", "the more…, the more…", "한국어는 배울수록 재미있다.", "Koreys tilini o'rgangan sari qiziqroq."],
    ["-(으)ㄴ/는 만큼", 4, "...gan darajada, qancha ... bo'lsa", "насколько…, настолько", "as much as", "노력한 만큼 결과가 나온다.", "Qancha harakat qilsang, shuncha natija."],
    ["-는 김에", 3, "shu fursatdan foydalanib", "заодно, раз уж", "while at it", "시장에 가는 김에 우유도 샀다.", "Bozorga borganimda sut ham oldim."],
    ["-다 보면", 4, "...qilaverib (oxir-oqibat)", "если продолжать…, то", "if you keep doing…", "계속 연습하다 보면 잘하게 될 거예요.", "Mashq qilaversangiz, yaxshi bo'lib ketasiz."],
    ["-다가는", 4, "agar shunday davom etsa (salbiy natija)", "если так продолжать (будет плохо)", "if you keep on (bad result)", "이렇게 놀다가는 시험에 떨어질 거야.", "Shunday o'ynayversang, imtihondan yiqilasan."],
    ["-(으)ㄹ 뻔하다", 3, "sal qoldi (bo'lmadi)", "чуть не…", "almost (but didn't)", "버스를 놓칠 뻔했다.", "Avtobusdan qolishimga sal qoldi."],
    ["-기는커녕", 5, "...u yoqda tursin, hatto", "не то что…, даже", "far from…, not even", "돈을 모으기는커녕 빚만 늘었다.", "Pul yig'ish u yoqda tursin, faqat qarz ko'paydi."],
    ["-(으)ㄹ 리가 없다", 4, "bo'lishi mumkin emas", "не может быть, чтобы", "there's no way that", "그 사람이 거짓말을 할 리가 없다.", "U yolg'on gapirishi mumkin emas."],
    ["-(으)ㄹ 게 뻔하다", 4, "aniq ... bo'ladi (ochiq-oydin)", "наверняка, очевидно", "obviously will", "지금 출발하면 늦을 게 뻔하다.", "Hozir chiqsak, kechikishimiz aniq."],
    ["-는 셈이다", 5, "deyarli ... hisoblanadi", "можно считать, что", "it amounts to", "매일 만나니까 가족인 셈이다.", "Har kuni ko'rishamiz — oila desa bo'ladi."],
    ["-기 마련이다", 5, "tabiiy ravishda ... bo'ladi", "естественно, неизбежно", "is bound to", "누구나 실수하기 마련이다.", "Har kim xato qilishi tabiiy."],
    ["-(으)ㄴ/는 반면에", 4, "...bo'lsa, aksincha", "в то время как, напротив", "whereas", "이 집은 넓은 반면에 비싸다.", "Bu uy keng, ammo qimmat."],
    ["-(으)ㄹ 뿐만 아니라", 3, "nafaqat ..., balki", "не только…, но и", "not only…but also", "그는 똑똑할 뿐만 아니라 친절하다.", "U nafaqat aqlli, balki mehribon."],
    ["-기 위해(서)", 3, "...maqsadida", "для того чтобы", "in order to", "건강을 지키기 위해 운동한다.", "Sog'likni saqlash uchun sport qilaman."],
    ["-도록", 4, "...sin deb, ...gunicha", "чтобы; до тех пор, пока", "so that; until", "늦지 않도록 일찍 출발하세요.", "Kechikmaslik uchun erta chiqing."],
    ["-더라도", 4, "...bo'lsa ham (faraz)", "даже если", "even if", "바쁘더라도 아침은 꼭 먹어라.", "Band bo'lsang ham nonushtani albatta qil."],
    ["-(으)ㄴ/는데도", 4, "...ga qaramay", "несмотря на то что", "even though", "약을 먹었는데도 낫지 않는다.", "Dori ichganimga qaramay tuzalmayapman."],
    ["-(으)ㄹ 만하다", 3, "...ga arziydi", "стоит (сделать)", "worth doing", "이 영화는 볼 만하다.", "Bu film ko'rishga arziydi."],
    ["-는 편이다", 3, "ko'proq ...ga moyil", "скорее, довольно", "tend to", "저는 매운 음식을 잘 먹는 편이다.", "Men achchiq ovqatni yaxshi yeyman (odatda)."],
    ["-곤 하다", 3, "odatda qilardi", "бывало, обычно", "used to", "어릴 때 이 공원에 오곤 했다.", "Bolaligimda bu parkka kelib turardim."],
    ["-는 대로", 4, "...bilanoq; ...gandek", "как только; так, как", "as soon as; as", "도착하는 대로 연락할게요.", "Yetib borishim bilan xabar beraman."],
    ["-자마자", 3, "...bilanoq", "как только", "as soon as", "집에 오자마자 잤다.", "Uyga kelishim bilan uxladim."],
    ["-(으)ㄴ 채로", 4, "...gan holda", "в состоянии…, не снимая", "while still (in a state)", "불을 켠 채로 잠이 들었다.", "Chiroqni yoqiq qoldirib uxlab qoldim."],
    ["-는 한", 5, "...ekan, ...gan ekan (shart)", "пока, до тех пор пока", "as long as", "포기하지 않는 한 기회는 있다.", "Taslim bo'lmas ekansan, imkoniyat bor."],
    ["-(으)ㅁ에 따라", 5, "...ga qarab, ...gani sari", "по мере того как", "as, in accordance with", "기술이 발전함에 따라 생활이 편리해졌다.", "Texnologiya rivojlangani sari hayot qulaylashdi."],
    ["-에 비해(서)", 3, "...ga nisbatan", "по сравнению с", "compared to", "작년에 비해 물가가 올랐다.", "O'tgan yilga nisbatan narxlar oshdi."],
    ["-(으)로 인해(서)", 4, "...sababli (rasmiy)", "из-за, вследствие (офиц.)", "due to (formal)", "폭우로 인해 도로가 막혔다.", "Kuchli yomg'ir sababli yo'l to'sildi."],
    ["-에 따르면", 3, "...ga ko'ra (manba)", "согласно", "according to", "조사에 따르면 1인 가구가 늘었다.", "So'rovga ko'ra yolg'iz xonadonlar ko'paygan."],
    ["-(으)ㄹ 따름이다", 6, "faqat ..., xolos (rasmiy)", "лишь, только (офиц.)", "merely, only (formal)", "도와주셔서 감사할 따름입니다.", "Yordamingiz uchun minnatdorman, xolos."],
    ["-(으)ㄹ지언정", 6, "...sa ham, (lekin) hech qachon", "пусть даже…, но ни за что", "even if…, (never)", "굶을지언정 남의 것은 훔치지 않겠다.", "Och qolsam ham, birovning narsasini o'g'irlamayman."],
    ["-(으)ㄴ/는 이상", 5, "...ekan, mayli (shunday ekan)", "раз уж", "now that, since", "약속한 이상 지켜야 한다.", "Va'da berdingmi, bajarishing kerak."],
    ["-기 십상이다", 6, "oson ... bo'lib qoladi (salbiy)", "легко может случиться (плохое)", "be prone to", "서두르면 실수하기 십상이다.", "Shoshilsang, xato qilish oson."],
    ["-는 가운데", 5, "...bo'layotgan bir paytda", "в то время как, среди", "amid", "많은 관심 속에 행사가 열리는 가운데…", "Katta qiziqish ostida tadbir o'tayotgan bir paytda…"],
    ["-(으)ㄴ/는 데다(가)", 4, "...ustiga, yana", "к тому же", "on top of", "비가 오는 데다가 바람도 분다.", "Yomg'ir yog'ayotgani ustiga shamol ham esyapti."],
    ["-(으)ㄹ세라", 6, "...mabodo ... bo'lmasin deb", "боясь, как бы не", "for fear that", "아이가 깰세라 조용히 걸었다.", "Bola uyg'onib ketmasin deb sekin yurdim."],
    ["-노라면", 6, "...qilib yursang (oxiri)", "если продолжать (книжн.)", "if one keeps on (literary)", "살다 보면, 아니 살노라면 좋은 날도 온다.", "Yashayversang, yaxshi kunlar ham keladi."]
  ];

  // ------------------------------------------------------------ SAQLASH
  var DKEY = "pwWriteDraft", RKEY = "pwWriteRes", SKEY = "pwWriteCur";
  function load(k, d) { try { var v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } }
  function save(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  function count(s) { return String(s || "").replace(/\r/g, "").replace(/\n/g, "").length; }

  // Aniqroq: mavjud qismlar bo'yicha ulush → 100 ga
  function estimate100() {
    var r = load(RKEY, []), by = {};
    r.forEach(function (x) { (by[x.no] = by[x.no] || []); if (by[x.no].length < 3) by[x.no].push(x.score / x.max); });
    var got = 0, mx = 0;
    [51, 52, 53, 54].forEach(function (n) { if (by[n]) { mx += MAX[n]; got += MAX[n] * by[n].reduce(function (a, b) { return a + b; }, 0) / by[n].length; } });
    return mx ? { score: Math.round(got / mx * 100), parts: Object.keys(by).length } : null;
  }

  // ------------------------------------------------------------ KO'RINISH
  var cur = null, tab = 51;
  function pick(no, skip) {
    var pool = TASKS.filter(function (t) { return t.no === no; });
    var i = Math.floor(Math.random() * pool.length), t = pool[i];
    if (skip && pool.length > 1 && t.id === skip) t = pool[(i + 1) % pool.length];
    return t;
  }
  function view() {
    var s = $("v-write"); if (!s) return;
    if (!s.dataset.ready) {
      s.dataset.ready = "1";
      s.innerHTML =
        '<h2 style="margin-top:0">✍️ ' + TF("TOPIK II · Yozish (쓰기)", "TOPIK II · Письмо (쓰기)", "TOPIK II · Writing (쓰기)") + '</h2>' +
        '<div class="note" style="margin:-6px 0 12px">' + TF("4 ta savol, 50 daqiqa, 100 ball. AI rasmiy mezonlar bo'yicha baholaydi.", "4 задания, 50 минут, 100 баллов. ИИ оценивает по официальным критериям.", "4 tasks, 50 minutes, 100 points. AI grades by the official criteria.") + '</div>' +
        '<div class="filters" id="wrTabs">' + [51, 52, 53, 54].map(function (n) { return '<button data-n="' + n + '">' + n + '<small style="opacity:.7;font-weight:600"> · ' + MAX[n] + 'b</small></button>'; }).join("") + '</div>' +
        '<div id="wrEst"></div><div id="wrTask"></div><div id="wrOut"></div>' +
        '<details class="card wr-rules"><summary><b>📌 ' + TF("Yozish qoidalari", "Правила письма", "Writing rules") + '</b></summary><ul>' + RULES.map(function (r) { return '<li>' + r + '</li>'; }).join("") + '</ul></details>';
      $("wrTabs").querySelectorAll("button").forEach(function (b) { b.onclick = function () { tab = +b.dataset.n; cur = null; render(); }; });
    }
    var last = load(SKEY, null), forced = 0;
    try { forced = +localStorage.getItem("pwWriteTab") || 0; localStorage.removeItem("pwWriteTab"); } catch (e) {}
    if (forced && MAX[forced]) { tab = forced; cur = null; }
    else if (!cur && last) { cur = TASKS.filter(function (t) { return t.id === last; })[0] || null; if (cur) tab = cur.no; }
    else if (!cur && window.PWLevel) tab = PWLevel.get() >= 4 ? 53 : 51;
    render();
  }
  function render() {
    if (!cur || cur.no !== tab) cur = pick(tab);
    save(SKEY, cur.id);
    $("wrTabs").querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", +b.dataset.n === tab); });
    var e = estimate100();
    $("wrEst").innerHTML = e ? '<div class="note" style="margin:0 0 10px">📊 ' + TF("Yozish bo'yicha taxminiy ball: <b>{s}/100</b> ({p} ta savol turi bo'yicha)", "Оценка за письмо: <b>{s}/100</b> (по {p} типам заданий)", "Estimated writing score: <b>{s}/100</b> (from {p} task types)", { s: e.score, p: e.parts }) + '</div>' : "";
    var t = cur, ins = INST[t.no], d = load(DKEY, {})[t.id] || (t.no <= 52 ? ["", ""] : "");
    var h = '<div class="card wr-card"><div class="row" style="justify-content:space-between;align-items:center"><span class="chip">' + t.no + TF("-savol", "-е задание", " task") + ' · ' + MAX[t.no] + ' ' + TF("ball", "баллов", "pts") + '</span><button class="linkbtn" id="wrNext">🔄 ' + TF("Boshqa topshiriq", "Другое задание", "Another task") + '</button></div>' +
      '<div class="qinst qhead ko" style="margin-top:10px"><span class="qrange">※ [' + t.no + ']</span> ' + esc(ins.ko) + '</div>' +
      '<p class="qinst-uz">' + esc(I ? I.pick(ins) : ins.uz) + '</p>' +
      (t.title ? '<div class="ko" style="font-weight:800;margin:4px 0 8px">' + TF("Mavzu", "Тема", "Topic") + ': ' + esc(t.title) + '</div>' : "") +
      '<div class="passage ko">' + esc(t.text) + '</div>';
    if (t.no <= 52) {
      h += ["㉠", "㉡"].map(function (m, i) { return '<label class="wr-l"><b>' + m + '</b><input class="wr-in ko" data-i="' + i + '" value="' + esc(d[i] || "") + '" placeholder="' + TF("Bitta gap yozing", "Одно предложение", "One sentence") + '"></label>'; }).join("");
    } else {
      h += '<textarea class="wr-ta ko" id="wrTa" rows="' + (t.no === 53 ? 7 : 14) + '" placeholder="' + TF("Shu yerga yozing…", "Пишите здесь…", "Write here…") + '">' + esc(d) + '</textarea>' +
        '<div class="wr-cnt" id="wrCnt"></div>';
    }
    h += '<div class="wr-btns"><button class="btn" id="wrCheck">🤖 ' + TF("AI bilan tekshirish", "Проверить с ИИ", "Check with AI") + '</button>' +
      '<button class="btn ghost" id="wrModel">📄 ' + TF("Namuna javob", "Образец", "Model answer") + '</button></div>' +
      '<div class="wr-model" id="wrModelBox" hidden></div></div>';
    $("wrTask").innerHTML = h;
    $("wrOut").innerHTML = "";
    $("wrNext").onclick = function () { cur = pick(tab, cur.id); render(); };
    function persist() {
      var all = load(DKEY, {});
      all[t.id] = t.no <= 52 ? [].map.call(document.querySelectorAll(".wr-in"), function (x) { return x.value; }) : $("wrTa").value;
      save(DKEY, all);
    }
    if (t.no <= 52) document.querySelectorAll(".wr-in").forEach(function (x) { x.oninput = persist; });
    else { $("wrTa").oninput = function () { persist(); cnt(); }; cnt(); }
    function cnt() {
      var n = count($("wrTa").value), L = LIM[t.no], ok = n >= L[0] && n <= L[1];
      $("wrCnt").innerHTML = TF("Belgilar", "Знаков", "Characters") + ': <b style="color:' + (ok ? "var(--green)" : n ? "var(--red)" : "inherit") + '">' + n + '</b> / ' + L[0] + '–' + L[1];
    }
    $("wrModel").onclick = function () {
      var b = $("wrModelBox"); b.hidden = !b.hidden;
      b.innerHTML = '<div class="sec-t" style="margin-top:12px">' + TF("Namuna javob", "Образец ответа", "Model answer") + '</div>' +
        (t.no <= 52 ? '<div class="ko">㉠ ' + esc(t.model[0]) + '<br>㉡ ' + esc(t.model[1]) + '</div>' : '<div class="ko wr-mt">' + esc(t.model) + '</div><div class="note">' + count(t.model) + ' ' + TF("belgi", "знаков", "characters") + '</div>') +
        '<div class="note" style="margin-top:8px">💡 ' + esc(t.tip) + '</div>';
    };
    $("wrCheck").onclick = function () { check(t, this); };
  }

  function check(t, btn) {
    var ans = t.no <= 52 ? [].map.call(document.querySelectorAll(".wr-in"), function (x) { return x.value.trim(); }) : $("wrTa").value.trim();
    var n = t.no <= 52 ? ans.join("").length : count(ans);
    if (t.no <= 52 ? !(ans[0] || ans[1]) : n < 30) { toast(TF("Avval javob yozing.", "Сначала напишите ответ.", "Write your answer first.")); return; }
    if (!/[가-힣]/.test(t.no <= 52 ? ans.join("") : ans)) { toast(TF("Javobni koreys tilida yozing.", "Пишите по-корейски.", "Write in Korean.")); return; }
    var out = $("wrOut");
    btn.disabled = true;
    out.innerHTML = '<div class="card" style="margin-top:12px"><div class="note">⏳ ' + TF("AI inshoni rasmiy mezonlar bo'yicha tekshirmoqda…", "ИИ проверяет текст по официальным критериям…", "AI is grading by the official criteria…") + '</div></div>';
    H.api("/api/write", { json: { no: t.no, task: (t.title ? t.title + "\n" : "") + t.text, model: t.no <= 52 ? t.model.join(" || ") : t.model, answer: ans, chars: n } }).then(function (r) {
      btn.disabled = false;
      var sc = Math.max(0, Math.min(MAX[t.no], Math.round(+r.score || 0)));
      var res = load(RKEY, []); res.unshift({ no: t.no, id: t.id, score: sc, max: MAX[t.no], t: Date.now() }); save(RKEY, res.slice(0, 60));
      if (window.Komiko && Komiko.Activity && Komiko.Activity.mark) try { Komiko.Activity.mark("write"); } catch (e) {}
      if (H.pushHist) H.pushHist("tests", { exam: "TOPIK II · " + TF("yozish", "письмо", "writing") + " " + t.no, pct: Math.round(sc / MAX[t.no] * 100), date: new Date().toISOString().slice(0, 10) });
      var pc = sc / MAX[t.no];
      var h = '<div class="card wr-res" style="margin-top:12px"><div class="row" style="align-items:center;gap:14px"><div class="wr-sc" style="color:' + (pc >= .7 ? "var(--green)" : pc >= .4 ? "#b7791f" : "var(--red)") + '">' + sc + '<small>/' + MAX[t.no] + '</small></div><div style="flex:1">' + esc(r.summary || "") + '</div></div>';
      (r.criteria || []).forEach(function (c) {
        var m = +c.max || 1, s = Math.max(0, Math.min(m, +c.score || 0));
        h += '<div class="brow"><span>' + esc(c.name || "") + '</span><div class="btrack"><i style="width:' + Math.round(s / m * 100) + '%;background:var(--blue)"></i></div><span>' + s + '/' + m + '</span></div>' + (c.comment ? '<div class="note" style="margin:-4px 0 8px">' + esc(c.comment) + '</div>' : "");
      });
      if ((r.corrections || []).length) {
        h += '<div class="sec-t" style="margin-top:12px">✏️ ' + TF("Tuzatishlar", "Исправления", "Corrections") + '</div>' + r.corrections.slice(0, 12).map(function (c) {
          return '<div class="wr-fix"><div class="ko"><s>' + esc(c.wrong || "") + '</s> → <b>' + esc(c.right || "") + '</b></div><div class="note">' + esc(c.why || "") + '</div></div>';
        }).join("");
      }
      if ((r.tips || []).length) h += '<div class="sec-t" style="margin-top:12px">🎯 ' + TF("Ballni oshirish uchun", "Как поднять балл", "To score higher") + '</div><ul>' + r.tips.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join("") + '</ul>';
      if (r.improved) h += '<details style="margin-top:10px"><summary><b>✨ ' + TF("Sizning matningiz — yaxshilangan variant", "Ваш текст — улучшенный вариант", "Your text — improved version") + '</b></summary><div class="ko wr-mt" style="margin-top:8px">' + esc(r.improved) + '</div></details>';
      h += '</div>';
      out.innerHTML = h;
      out.scrollIntoView({ behavior: "smooth", block: "start" });
      var e = estimate100();
      if (e) $("wrEst").innerHTML = '<div class="note" style="margin:0 0 10px">📊 ' + TF("Yozish bo'yicha taxminiy ball: <b>{s}/100</b> ({p} ta savol turi bo'yicha)", "Оценка за письмо: <b>{s}/100</b> (по {p} типам заданий)", "Estimated writing score: <b>{s}/100</b> (from {p} task types)", { s: e.score, p: e.parts }) + '</div>';
    }).catch(function (err) {
      btn.disabled = false;
      out.innerHTML = '<div class="card err" style="margin-top:12px">' + esc(err.message || String(err)) + '<div class="note" style="margin-top:6px">' + TF("Hozircha namuna javob bilan o'zingiz solishtiring.", "Пока сравните с образцом сами.", "Meanwhile, compare with the model answer yourself.") + '</div></div>';
    });
  }

  // ------------------------------------------------------------ GRAMMATIKA KO'RINISHI
  var glv = 0;
  function gramView() {
    var s = $("v-t2gram"); if (!s) return;
    var LG = I ? I.lang() : "uz", forcedG = 0;
    try { forcedG = +localStorage.getItem("pwGramLv") || 0; localStorage.removeItem("pwGramLv"); } catch (e) {}
    if (forcedG) glv = forcedG; else if (!s.dataset.ready && window.PWLevel) glv = PWLevel.gramLv();
    if (!s.dataset.ready) {
      s.dataset.ready = "1";
      s.innerHTML = '<h2 style="margin-top:0">🧩 ' + TF("TOPIK II grammatikasi (3–6)", "Грамматика TOPIK II (3–6)", "TOPIK II grammar (3–6)") + '</h2>' +
        '<div class="note" style="margin:-6px 0 12px">' + TF("{n} ta asosiy grammatik shakl — imtihonda eng ko'p uchraydiganlari. Bosing — misolni eshiting.", "{n} ключевых конструкций, чаще всего встречающихся на экзамене. Нажмите — прослушайте пример.", "{n} key patterns that appear most on the exam. Tap to hear the example.", { n: GRAM.length }) + '</div>' +
        '<div class="filters" id="gLv"><button data-l="0">' + TF("Hammasi", "Все", "All") + '</button><button data-l="3">3</button><button data-l="4">4</button><button data-l="5">5</button><button data-l="6">6</button></div>' +
        '<input class="gr-q" id="gQ" placeholder="🔎 ' + TF("Qidirish: -는 바람에, sabab…", "Поиск: -는 바람에, причина…", "Search: -는 바람에, cause…") + '"><div id="gList"></div>';
      $("gLv").querySelectorAll("button").forEach(function (b) { b.onclick = function () { glv = +b.dataset.l; list(); }; });
      $("gQ").oninput = list;
    }
    function list() {
      $("gLv").querySelectorAll("button").forEach(function (b) { b.classList.toggle("on", +b.dataset.l === glv); });
      var q = ($("gQ").value || "").trim().toLowerCase();
      var items = GRAM.filter(function (g) { return (!glv || g[1] === glv) && (!q || (g[0] + g[2] + g[3] + g[4] + g[5]).toLowerCase().indexOf(q) >= 0); });
      $("gList").innerHTML = items.map(function (g) {
        var m = LG === "ru" ? g[3] : LG === "en" ? g[4] : g[2];
        return '<div class="card gr-it" data-ex="' + esc(g[5]) + '"><div class="row" style="justify-content:space-between;align-items:center"><b class="ko gr-p">' + esc(g[0]) + '</b><span class="chip">' + g[1] + TF("-daraja", " уровень", " level") + '</span></div>' +
          '<div style="margin:4px 0 6px">' + esc(m) + '</div><div class="ko gr-ex">🔊 ' + esc(g[5]) + '</div><div class="note">' + esc(g[6]) + '</div></div>';
      }).join("") || '<div class="card empty">' + TF("Topilmadi.", "Не найдено.", "Nothing found.") + '</div>';
      $("gList").querySelectorAll(".gr-it").forEach(function (c) { c.onclick = function () { H.speak(c.dataset.ex); }; });
    }
    list();
  }

  window.PWWrite = { estimate: estimate100, TASKS: TASKS, GRAM: GRAM, MAX: MAX };
  var prevOnView = H.onView;
  H.onView = function (v) { if (prevOnView) prevOnView(v); if (v === "write") view(); if (v === "t2gram") gramView(); };
})();
