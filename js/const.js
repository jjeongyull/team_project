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
<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
</div>`;