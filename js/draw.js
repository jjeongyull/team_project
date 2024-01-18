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