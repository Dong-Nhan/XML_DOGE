var TAG = {
  Tivi: 'Tivi',
  Nhom_Tivi: 'Nhom_Tivi',
  Ten: 'Ten',
  Ma_so: 'Ma_so',
  Don_gia_Ban: 'Don_gia_Ban',
  Don_gia_Nhap: 'Don_gia_Nhap',
  So_luong_Ton: 'So_luong_Ton',
  Doanh_thu: 'Doanh_thu',
  Trang_thai_Con_hang: 'Trang_thai_Con_hang',
  Danh_sach_Nhap_hang: 'Danh_sach_Nhap_hang'
}
//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_Mat_hang(Danh_sach) {
  var Th_Danh_sach = document.createElement("div");

  for (var i = 0; i < Danh_sach.length; i++) {
    var Th_Mat_hang = document.createElement("div");
    Th_Mat_hang.className = "Mat_hang";

    var Th_Hinh_anh = document.createElement("img");
    var Th_Thong_tin = document.createElement("div");
    var Th_Doanh_thu_Mat_hang = document.createElement("div");

    Th_Hinh_anh.setAttribute("src", "http://localhost:3000/" + Danh_sach[i].getAttribute("Ma_so") + ".png");
    Th_Hinh_anh.setAttribute("alt", Danh_sach[i].getAttribute("Ma_so"));
    Th_Hinh_anh.className = "Hinh_anh";

    Th_Thong_tin.innerHTML = Danh_sach[i].getAttribute("Ten") + "<br>" + "Giá tiền: " + Danh_sach[i].getAttribute("Don_gia_Ban") + "đ";
    Th_Thong_tin.className = "Thong_tin";

    Th_Doanh_thu_Mat_hang.innerHTML = "Doanh thu: " + Tinh_Doanh_thu_Mat_hang(Danh_sach[i]) + "đ";
    Th_Doanh_thu_Mat_hang.className = "Doanh_thu_Mat_hang";

    Th_Mat_hang.appendChild(Th_Hinh_anh);
    Th_Mat_hang.appendChild(Th_Thong_tin);
    Th_Mat_hang.appendChild(Th_Doanh_thu_Mat_hang);
    Th_Danh_sach.appendChild(Th_Mat_hang);

  }

  return Th_Danh_sach;
}

//************** Xử lý Nghiệp vụ ***********

function Tinh_Doanh_thu_Mat_hang(Mat_hang) {
  var Doanh_thu_Mat_hang = 0;
  var Danh_sach_Ban_hang = Mat_hang.getElementsByTagName("Ban_hang");

  for (var i = 0; i < Danh_sach_Ban_hang.length; i++) {
    Doanh_thu_Mat_hang += parseInt(Danh_sach_Ban_hang[i].getAttribute("Tien"));
  }
  return Doanh_thu_Mat_hang;
}

// ************** Xử lý Lưu trữ *********** 
function Doc_Danh_sach_San_pham() {
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3000' + '/data-Quan-Li-Ban-Hang', false);
  Xu_ly_HTTP.send();
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang = Du_lieu.getElementsByTagName(TAG.Tivi);
  return Danh_sach_Mat_hang;
}