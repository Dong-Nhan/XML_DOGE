var TAG = {
  Tivi:'Tivi',
  Nhom_Tivi:'Nhom_Tivi',
  Ten:'Ten',
  Ma_so:'Ma_so',
  Don_gia_Ban:'Don_gia_Ban',
  Don_gia_Nhap:'Don_gia_Nhap',
  So_luong_Ton:'So_luong_Ton',
  Doanh_thu:'Doanh_thu',
  Trang_thai_Con_hang:'Trang_thai_Con_hang' 
}

//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_San_pham(Danh_sach) {
  
  var Dia_chi_Media = "http://localhost:3000/Img"
  var Th_Danh_sach = document.createElement("ul")
  Th_Danh_sach.className = 'list-unstyled row'
  for (var i = 0; i < Danh_sach.length; i++) {
    var Ten = Danh_sach[i].getAttribute(TAG.Ten);
    var Ma_so = Danh_sach[i].getAttribute(TAG.Ma_so);
    var Don_gia_Ban = parseInt(Danh_sach[i].getAttribute(TAG.Don_gia_Ban));
    var Trang_Thai_Con_Hang = Danh_sach[i].getAttribute(TAG.Trang_thai_Con_hang);
    if(Trang_Thai_Con_Hang == 'true'){
      Trang_Thai_Con_Hang = `Còn`;
    }
    else if(Trang_Thai_Con_Hang == 'false'){
      Trang_Thai_Con_Hang = `Không`;
    }
    else if(Trang_Thai_Con_Hang == undefined){
      Trang_Thai_Con_Hang = `Không rõ`;
    }
    
    var Th_Hinh = document.createElement("img");
    Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`;
    Th_Hinh.style.cssText = `width: 80%`;

    var Th_Thong_tin = document.createElement("div");

    var Th_Ten = document.createElement('p');
    Th_Ten.innerText = Ten;

    var Th_Don_Gia_Ban = document.createElement('p');
    Th_Don_Gia_Ban.innerText = `Đơn giá Bán: ${Don_gia_Ban.toLocaleString("vi")}`;
    
    var Th_Trang_Thai_Con_Hang = document.createElement('p');
    Th_Trang_Thai_Con_Hang.innerText = `Còn hàng: ${Trang_Thai_Con_Hang}`;

    Th_Thong_tin.appendChild(Th_Ten);
    Th_Thong_tin.appendChild(Th_Don_Gia_Ban);

    var Th_Mat_hang = document.createElement("li")
    Th_Mat_hang.className='col-md-3 col-sm-6 col-12';
    Th_Mat_hang.appendChild(Th_Hinh)
    Th_Mat_hang.appendChild(Th_Thong_tin)
    Th_Mat_hang.appendChild(Th_Trang_Thai_Con_Hang);

    Th_Danh_sach.appendChild(Th_Mat_hang)
  }
  return Th_Danh_sach;
}
//************** Xử lý Nghiệp vụ ***********
// Tra cứu với Phiên bản cải tiến 


// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_San_pham() { 
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/lay-thong-tin-tivi?DoiTuong=Khach', false);
  Xu_ly_HTTP.send();
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName(TAG.Tivi);
  return Danh_sach_Mat_hang;
}


