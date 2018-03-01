//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_Mat_hang(Du_lieu) {

  var Dia_chi_Media = "../Media";
  var Th_Danh_sach = document.createElement("ul");

  var Danh_Sach_Mat_Hang = Du_lieu.getElementsByTagName('Mat_hang');
  for (var i = 0; i < Danh_Sach_Mat_Hang.length; i++) {
    var Mat_hang = Danh_Sach_Mat_Hang[i];
    var Ten = Mat_hang.getAttribute('Ten');
    var Ma_so = Mat_hang.getAttribute('Ma_so');
    var Don_gia_Ban = Mat_hang.getAttribute('Don_gia_Ban');

    var item = document.createElement('li');
    item.className = 'item';

    //Thêm tên
    var Node_Ten = document.createElement('p');
    Node_Ten.innerHTML = `Tên: ${Ten}`;
    item.appendChild(Node_Ten);

    //Thêm hình
    var Node_Hinh = document.createElement('img');
    Node_Hinh.setAttribute('src', `${Dia_chi_Media}/${Ma_so}.png`);
    item.appendChild(Node_Hinh);

    //Thêm giá bán
    var Node_Gia = document.createElement('p');
    Node_Gia.innerHTML = `Giá: ${Don_gia_Ban}đ`;
    item.appendChild(Node_Gia);

    //Thêm item vào list
    Th_Danh_sach.appendChild(item);
  }
  return Th_Danh_sach;
}

function Tao_Th_Button(Du_lieu) {
  var Th_Button = document.createElement('ul');

  var Ma_So_Nhom_mat_hang_truoc = '';
  var Mat_hang = Du_lieu.getElementsByTagName('Mat_hang');
  for (var i = 0; i < Mat_hang.length; i++) {
    var Nhom_mat_hang = Mat_hang[i].getElementsByTagName('Nhom_Mat_hang');
    var Ten = Nhom_mat_hang[0].getAttribute('Ten');
    var Ma_so = Nhom_mat_hang[0].getAttribute('Ma_so');
    if (Ma_So_Nhom_mat_hang_truoc != Ma_so) {
      Ma_So_Nhom_mat_hang_truoc = Ma_so;
      var buton = document.createElement('button');
      buton.innerHTML = Ten;
      buton.setAttribute('onclick', `Loc_Mat_Hang('danh-sach-mat-hang','${Ma_so}',Danh_sach_Mat_hang)`);

      Th_Button.appendChild(buton);
    }
  }
  //Thêm button tất cả
  var buton = document.createElement('button');
      buton.innerHTML = 'Tất cả';
      buton.setAttribute('onclick', `Loc_Mat_Hang('danh-sach-mat-hang','Tat_Ca',Danh_sach_Mat_hang)`);

      Th_Button.appendChild(buton);
  return Th_Button;
}

//************** Xử lý Nghiệp vụ ***********
function Loc_Mat_Hang(id, Ma_so_Mat_hang, Du_lieu) {
  //Xóa hết dữ liệu cũ
  var Danh_Sach_Moi = document.getElementById(id);
  Danh_Sach_Moi.innerHTML = '';

  //Add dữ liệu mới
  var Dia_chi_Media = "../Media";
  var Th_Danh_sach = document.createElement("ul");

  var Danh_Sach_Mat_Hang = Du_lieu.getElementsByTagName('Mat_hang');
  for (var i = 0; i < Danh_Sach_Mat_Hang.length; i++) {
    var Mat_hang = Danh_Sach_Mat_Hang[i];
    var Ten = Mat_hang.getAttribute('Ten');
    var Ma_so = Mat_hang.getAttribute('Ma_so');
    var Don_gia_Ban = Mat_hang.getAttribute('Don_gia_Ban');

    var Nhom_Mat_hang = Mat_hang.getElementsByTagName('Nhom_Mat_hang');
    var Ma_Nhom = Nhom_Mat_hang[0].getAttribute('Ma_so');

    if (Ma_Nhom == Ma_so_Mat_hang || Ma_so_Mat_hang == 'Tat_Ca') {

      var item = document.createElement('li');
      item.className = 'item';

      //Thêm tên
      var Node_Ten = document.createElement('p');
      Node_Ten.innerHTML = `Tên: ${Ten}`;
      item.appendChild(Node_Ten);

      //Thêm hình
      var Node_Hinh = document.createElement('img');
      Node_Hinh.setAttribute('src', `${Dia_chi_Media}/${Ma_so}.png`);
      item.appendChild(Node_Hinh);

      //Thêm giá bán
      var Node_Gia = document.createElement('p');
      Node_Gia.innerHTML = `Giá: ${Don_gia_Ban}đ`;
      item.appendChild(Node_Gia);

      //Thêm item vào list
      Th_Danh_sach.appendChild(item);
    }
  }
  Danh_Sach_Moi.appendChild(Th_Danh_sach);
}

// ************** Xử lý Lưu trữ *********** 
function Doc_Danh_sach_Mat_hang() {
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", "../2-Du_lieu_Luu_tru/Du_lieu.xml", false);
  Xu_ly_HTTP.send("");
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang = Du_lieu.getElementsByTagName('Danh_sach_Mat_hang')[0];
  return Danh_sach_Mat_hang;
}