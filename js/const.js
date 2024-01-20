const supabaseUrl = 'https://oamygecysptavghpoyhg.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hbXlnZWN5c3B0YXZnaHBveWhnIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDM0MzQ2NiwiZXhwIjoyMDE5OTE5NDY2fQ.lzVKvnYodUaFnjiK8YBPVzSom6vsQf7QHEcQllVNzwo";
const client = supabase.createClient(supabaseUrl, supabaseKey);

// 게시판 변수
let g_contact_list;

// 비밀번호 모달
const passwrod_modal = `<div class="modal-header">
<h1 class="modal-title fs-5" id="exampleModalLabel">비밀번호를 입력하세요.</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<div class="modal-body">
 <input type="hidden" id="pw">
 <input type="hidden" id="idx">
 <div class="flex items-center mb-2">
 <label class="label w-1/5 text-sm" for="chk_pw">비밀번호</label>
 <input class="input w-4/5 text-sm" id="chk_pw" type="text" placeholder="비밀번호를 입력하세요.">
</div>
</div>
<div class="modal-footer">
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
<button type="button" class="btn btn-primary" id="btn_pw_check">확인</button>
</div>`;

// 게시판 모달
const contact_modal = `<div class="modal-header">
<h1 class="modal-title fs-5" id="exampleModalLabel">비밀번호를 입력하세요.</h1>
<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
</div>
<input type='hidden' id='idx'>
<div class="modal-body">
 <div class="flex items-center mb-2">
 <label class="label w-1/5 text-sm">이름</label>
 <p class="w-4/5 text-sm" id="name">
</div>
 <div class="flex items-center mb-2">
 <label class="label w-1/5 text-sm">전화번호</label>
 <p class="w-4/5 text-sm" id="phone">
</div>
 <div class="flex items-center mb-2">
 <label class="label w-1/5 text-sm">문의내용</label>
 <p class="w-4/5 text-sm" id="info">
</div>
</div>
<div class="modal-footer">
<button type="button logout" class="btn btn-danger" id='btn_board_del'>삭제</button>
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>`;

const data_json = [
  {
    idx: 1,
    img: 'https://search.pstatic.net/common/?src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMTA5MDZfMTIw%2FMDAxNjMwODkwMDE5MDAy.E7vGqiw6KcAFWfRBj4YID-yHYLJ5N-Lkrkjl6j_mFbMg.y_8XC3TcLspBTHEx7ODcW6yyR4cmrgs9umVpSf3xAtYg.JPEG.newlooks1%2F201912191727666.jpg&type=sc960_832',
    title: '100 베스테 플라카테',
    info: '2001년 독일, 오스트리아, 스위스에서 시작됐으며,독일어권 내에서 제작된 참신한 디자인과 다양한 기법의 포스터 작품 100 점을 선정해 보여준다.'
  },
  {
    idx: 2,
    img: 'http://img.newspim.com/news/2018/03/30/1803301513441630.jpg',
    title: '미술관은 무엇을 연구하는가',
    info: '미술관이 이론과 실천, 사유와 감각, 시각예술과 언어, 테크놀로지와 아날로그 등 다양한 축과 어떻게 균형을 맞춰갈 것인가 탐구한다.'
  },
  {
    idx: 3,
    img: 'http://www.sulki-min.com/wp/wp-content/uploads/2018/03/MMCA-2018-poster-print.png',
    title: '다원예술',
    info: '남화연, 호추니엔, 고이즈미 메이로, 다이첸리안, 로이스 응 등 아시아에서 가장 주목받고 있는 작가 5인의 신작을 만나볼 수 있다.'
  },
  {
    idx: 4,
    img: 'https://art-map.co.kr/art-map/public//upload/2023/11/exhibition/4bf80a9709f76f4349c122245f94509b_%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B720231101%EC%98%A4%ED%9B%844.44.34.png',
    title: '한국의 기하학적 추상미술',
    info: '기하학적 추상미술은 기하학적 형태, 원색의 색채, 화면의 평면성을 강조하는 회화의 한 경향이다.'
  },
  {
    idx: 5,
    img: 'https://art-map.co.kr/art-map/public//upload/2023/12/exhibition/06493cb1a3007529c4138adf70a63c23_Whalesandi_KVPoster_V8_A_A%ED%98%95.png',
    title: '《Whales and I: 고래와나》',
    info: '경이로운 고래의 세계와 지구환경을 다루는 전시'
  },
  {
    idx: 6,
    img: 'https://art-map.co.kr/art-map/public//upload/2023/11/exhibition/b94c9d253d40f961a59d6883bcd692ca_23FW_6%ED%9A%8C%EC%9D%BC%EB%9F%AC%EC%8A%A4%ED%8A%B8%EC%A0%84%EC%8B%9C_%ED%8F%AC%EC%8A%A4%ED%84%B0_%EC%B5%9C%EC%A2%85.jpg',
    title: '자코모 옴니버스[우리들의 소파 이야기]Episode1 《오늘, 여기, 앉다》',
    info: '소파 전문 브랜드 ‘자코모(JAKOMO)’의 자코모 옴니버스 첫 전시 ‘오늘, 여기. 앉다’ 전시회를 자코모 직영 플래그십 남양주 본점 디자인하우스 2층에서 개최한다.'
  }
]