// 게시판 그리기
async function draw_contact_table(){
  let target = $('#rows');
  let tempHTML = "";
  let { data: record, error } = await client.from('pages').select('*');
  g_contact_list = record;
  $.each(record, function(key, items){
    let date = items.created_at;
    date = date.substr(0,10);
    tempHTML = tempHTML + `<tr>
    <td class="pl-6 py-3 text-left text-xs uppercase tracking-wider">${items.id}</td>
    <td class="px-10 py-3 text-center text-xs uppercase tracking-wider"><p class='btn_contact_view' data-bs-toggle="modal" data-bs-target="#exampleModal" data-id='${items.id}'>${items.contact_name}</p></td>
    <td class="px-3 py-3 text-center text-xs uppercase tracking-wider">${date}</td>
  </tr>`
  });
  target.html(tempHTML);
	
  new DataTable('#contact_table');
}

// 서브페이지 그리기
function draw_sub_page(idx){
  let tempJSON = data_json.filter((items) => {
    return Number(items.idx) === Number(idx);
  });

  tempJSON = tempJSON[0];

  let img = `<img class="sub-img" src=${tempJSON.img} alt="">`;
  $('#sub_img').html(img);
  $('#sub_h2').text(tempJSON.title);
  $('#sub_p').text(tempJSON.info);
}