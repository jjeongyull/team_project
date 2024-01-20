$(document).on('click', '#btn_contact', async function(){
  let contact_name = $('#contact_name').val();
  let contact_pw = $('#contact_pw').val();
  let contact_phone = $('#contact_phone').val();
  let contact_info = $('#contact_info').val();

  if(contact_name === ""){
    alert('이름을 입력하세요.');
    $('#contact_name').focus();
    return;
  }
  if(contact_pw === ""){
    alert('비밀번호를 입력하세요.');
    $('#contact_pw').focus();
    return;
  }
  if(contact_phone === ""){
    alert('전화번호를 입력하세요.');
    $('#contact_phone').focus();
    return;
  }
  const { data, error } = await client
  .from('pages')
  .insert([
    { 
      contact_name: contact_name, 
      contact_pw: contact_pw,
      contact_phone: contact_phone,
      contact_info: contact_info
    },
  ]);
  if(error){
    alert('문의 도중 에러가 발생했습니다.');
    return;
  }else{
    alert('문의사항이 정상적으로 등록되었습니다.')
  }
});


// 전화번호 입력시 자동 하이픈입력
$(document).on('input', '#contact_phone' ,function() {
  // 현재 입력된 전화번호 값
  var inputValue = $(this).val();

  // 하이픈을 제외한 숫자만 남기기
  var cleanedValue = inputValue.replace(/\D/g, '');

  // 전화번호 형식에 따라 하이픈 추가
  if (cleanedValue.length <= 3) {
    $(this).val(cleanedValue);
  } else if (cleanedValue.length <= 7) {
    $(this).val(cleanedValue.slice(0, 3) + '-' + cleanedValue.slice(3));
  } else {
    $(this).val(cleanedValue.slice(0, 3) + '-' + cleanedValue.slice(3, 7) + '-' + cleanedValue.slice(7));
  }
});

// 게시판 클릭 시 상세보기
$(document).on('click', '.btn_contact_view', function(){
  var loginCookie = document.cookie.replace(/(?:(?:^|.*;\s*)login\s*\=\s*([^;]*).*$)|^.*$/, "$1");
  let id = $(this).data('id');
  let pw = g_contact_list.filter((items) => {
    return Number(items.id) === Number(id);
  });
  pw = pw[0].contact_pw;
  if (loginCookie === "true") {
    let contact = g_contact_list.filter((items) => {
      return Number(items.id) === Number(id);
    });
    contact = contact[0];
    $('#modal_body').empty();
    $('#modal_body').html(contact_modal);
    $('#name').text(contact.contact_name);
    $('#phone').text(contact.contact_phone);
    $('#info').text(contact.contact_info);
    $('#idx').val(id);
  }else{
    $('#modal_body').html(passwrod_modal);
    $('#pw').val(pw);
    $('#idx').val(id);
  }
});

// 게시판 비밀번호 체크
$(document).on('click', '#btn_pw_check', function(){
  let id = $('#idx').val();
  let org_pw = $('#pw').val();
  let chk_pw = $('#chk_pw').val();
  let contact = g_contact_list.filter((items) => {
    return Number(items.id) === Number(id);
  });
  contact = contact[0];

  if(org_pw != chk_pw){
    alert('비밀번호가 옳지 않습니다.');
    return;
  }else{
    $('#modal_body').empty();
    $('#modal_body').html(contact_modal);
    $('#name').text(contact.contact_name);
    $('#phone').text(contact.contact_phone);
    $('#info').text(contact.contact_info);
    $('#btn_board_del').css('display', 'inline-block')
  }
});

// 로그인버튼 클릭 시
$(document).on('click', '#btn_login', async function(){
  let admin_id = $('#user_id').val();
  let admin_pw = $('#user_pw').val();

  let { data: record, error } = await client.from('member').select('*');
  let admin = record[0];

  if(admin_id != admin.admin_id){
    alert('아이디가 맞지않습니다.');
    return;
  }
  if(admin_pw != admin.admin_pw){
    alert('비밀번호가 맞지않습니다.');
    return;
  }

  setCookie("login", "true", 1);
  alert('로그인이 완료되었습니다');
  window.location.href = 'index.html';
});

// 게시판 삭제
$(document).on('click', '#btn_board_del', async function(){
  let id = $('#idx').val();
  const { error } = await client
  .from('pages')
  .delete()
  .eq('id', id);

  if(!error){
    alert('고객문의가 삭제되었습니다.');
    draw_contact_table();
    $('[data-bs-dismiss="modal"]').trigger('click');
  }else{
    alert('삭제도중 에러가 발생하였습니다.');
    return;
  }
});

// 로그아웃버튼 클릭 시
$(document).on('click', '#btn_logout', async function(){
  deleteCookie("login");
  window.location.href = 'index.html';
});

// 서브페이지 이동
$(document).on('click', '.btn_go_sub', function(){
  let idx = $(this).data('idx');
  window.location.href = `sub.html?idx=${idx}`;
});

// 쿠키 설정 함수
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// 쿠키 삭제 함수
function deleteCookie(name) {
  document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}