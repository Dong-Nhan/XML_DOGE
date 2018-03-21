var TAG = {
  Tivi:'Tivi',
  Nhom_Tivi:'Nhom_Tivi',
  Ten:'Ten',
  Ma_so:'Ma_so',
  Don_gia_Ban:'Don_gia_Ban',
  Don_gia_Nhap:'Don_gia_Nhap',
  So_luong_Ton:'So_luong_Ton',
  Doanh_thu:'Doanh_thu',
  Trang_thai_Con_hang:'Trang_thai_Con_hang',
  Danh_sach_Nhap_hang: 'Danh_sach_Nhap_hang'
}

//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_TiVi(Danh_sach) {
  
  var Dia_chi_Media = "http://localhost:3000"
  var Th_Danh_sach = document.createElement("ul")
  Th_Danh_sach.className = 'list-unstyled row'
  for (var i = 0; i < Danh_sach.length; i++) {
    var Ten = Danh_sach[i].getAttribute(TAG.Ten);
    var Ma_so = Danh_sach[i].getAttribute(TAG.Ma_so);
    var Don_gia_Nhap = parseInt(Danh_sach[i].getAttribute(TAG.Don_gia_Nhap));
    var So_luong_Ton = parseInt(Danh_sach[i].getAttribute(TAG.So_luong_Ton));
    if(isNaN(So_luong_Ton)){
      So_luong_Ton = 0;
    }
    
    var Th_Hinh = document.createElement("img");
    Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`;
    Th_Hinh.style.cssText = `width: 80%`;

    var Th_Thong_tin = document.createElement("div");

    var Th_Ten = document.createElement('p');
    Th_Ten.innerText = Ten;

    var Th_Don_Gia_Nhap = document.createElement('p');
    Th_Don_Gia_Nhap.innerText = `Đơn giá nhập: ${Don_gia_Nhap.toLocaleString("vi")}`;
    
    var Th_So_luong_Ton = document.createElement('p');
    Th_So_luong_Ton.innerText = `Số lượng còn lại: ${So_luong_Ton.toLocaleString("vi")}`;

    Th_Thong_tin.appendChild(Th_Ten);
    Th_Thong_tin.appendChild(Th_Don_Gia_Nhap);
    Th_Thong_tin.appendChild(Th_So_luong_Ton);

    var Th_Mat_hang = document.createElement("li")
    Th_Mat_hang.className='col-md-3 col-sm-6 col-12';
    Th_Mat_hang.appendChild(Th_Hinh)
    Th_Mat_hang.appendChild(Th_Thong_tin)

    Th_Danh_sach.appendChild(Th_Mat_hang)
  }
  return Th_Danh_sach;
}
function Tao_Th_Danh_sach_Nhom_TiVi(Danh_sach) {
  
  var Dia_chi_Media = "http://localhost:3000";
  var Th_Danh_sach = document.createElement("ul");
  Th_Danh_sach.className = 'list-unstyled row';

  var Nhom_Tivi = [];
  var Ma_Nhom_TiVi = [];
  for (var i = 0; i < Danh_sach.length; i++) {
    let Nhom = Danh_sach[i].getElementsByTagName(TAG.Nhom_Tivi)[0];
    //let Danh_sach_Mat_hang = Danh_sach.getElementsByTagName(TAG.Danh_sach_Nhap_hang)[0];
    if(Nhom_Tivi[Nhom.getAttribute(TAG.Ma_so)] == undefined){
      Nhom_Tivi[Nhom.getAttribute(TAG.Ma_so)] = {Ten:Nhom.getAttribute(TAG.Ten),So_luong_Ton:0};
      Nhom_Tivi[Nhom.getAttribute(TAG.Ma_so)] 
      Ma_Nhom_TiVi.push(Nhom.getAttribute(TAG.Ma_so));
    }
    Nhom_Tivi[Nhom.getAttribute(TAG.Ma_so)].So_luong_Ton++;
  }

  for(let i = 0;i< Ma_Nhom_TiVi.length;i++){
    let Th_Nhom = document.createElement('li');
    Th_Nhom.className = `col-md-3 col-sm-6 col-12`;
    Th_Nhom.style.cssText = `border: 1px solid black; background-color:antiquewhite`;
    let Ten_Nhom = Nhom_Tivi[Ma_Nhom_TiVi[i]].Ten;
    let So_luong_Ton = Nhom_Tivi[Ma_Nhom_TiVi[i]].So_luong_Ton;

    let Th_Thong_tin =  document.createElement('div');
    let Th_Ten_Nhom = document.createElement('p');
    Th_Ten_Nhom.innerHTML = `Tên nhóm: <b>${Ten_Nhom}</b>`;
    let Th_So_luong_Ton = document.createElement('p');
    Th_So_luong_Ton.innerHTML = `Số lượng tồn: <b>${So_luong_Ton.toLocaleString("vi")}</b> `

    Th_Thong_tin.appendChild(Th_Ten_Nhom);
    Th_Thong_tin.appendChild(Th_So_luong_Ton);

    Th_Nhom.appendChild(Th_Thong_tin);

    Th_Danh_sach.appendChild(Th_Nhom);
  };
  return Th_Danh_sach;
}
//************** Xử lý Nghiệp vụ ***********
// Tra cứu với Phiên bản cải tiến 


// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_San_pham() { 
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3000'+'/data-Quan-Li-Nhap-Hang', false);
  Xu_ly_HTTP.send();
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName(TAG.Tivi);
  return Danh_sach_Mat_hang;
}


