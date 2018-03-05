//************ Xử lý Thể hiện ***************/
function Tao_Th_Danh_sach_Mat_hang(Danh_sach) {
  var Th_Danh_sach = document.createElement("div");
  
  for(var i = 0; i < Danh_sach.length; i++)
  {
    var Th_Mat_hang = document.createElement("div");
    Th_Mat_hang.className = "Mat_hang";

    var Th_Hinh_anh = document.createElement("img");
    var Th_Thong_tin = document.createElement("div");

    Th_Hinh_anh.setAttribute("src", "../Media/" + Danh_sach[i].getAttribute("Ma_so") + ".png");
    Th_Hinh_anh.setAttribute("alt",Danh_sach[i].getAttribute("Ma_so"));
    Th_Hinh_anh.className = "Hinh_anh";
    
    Th_Thong_tin.innerHTML = Danh_sach[i].getAttribute("Ten") + "<br>" + Danh_sach[i].getAttribute("Don_gia_Ban") + "đ";
    Th_Thong_tin.className = "Thong_tin";

    Th_Mat_hang.appendChild(Th_Hinh_anh);
    Th_Mat_hang.appendChild(Th_Thong_tin);
    Th_Danh_sach.appendChild(Th_Mat_hang);
  }

  return Th_Danh_sach
}

function Tao_Th_Ket_qua_Tra_cuu (Ket_qua_Tra_cuu){
  var Th_Ket_qua_Tra_cuu = document.createElement("div");
  Th_Ket_qua_Tra_cuu.id = "Th_Ket_qua_Tra_cuu";
  Th_Ket_qua_Tra_cuu.innerHTML = Ket_qua_Tra_cuu;
  return Th_Ket_qua_Tra_cuu;
}


//************** Xử lý Nghiệp vụ ***********
// Tra cứu với Phiên bản cải tiến 
function Tra_cuu(Ma_so_Tra_cuu){
  var flag = 0;
  var Ket_qua_Tra_cuu= "";
  for (var i = 0; i < Danh_sach_Mat_hang.length; i++)
  {
    if(Ma_so_Tra_cuu == Danh_sach_Mat_hang[i].getAttribute("Ma_so"))
    {
      flag = 1;
      Ket_qua_Tra_cuu= "Tên mặt hàng: " + Danh_sach_Mat_hang[i].getAttribute("Ten") + "<br>Giá tiền: " + Danh_sach_Mat_hang[i].getAttribute("Don_gia_Ban") + "đ";
    }
  }
  if(flag == 0) Ket_qua_Tra_cuu="Mã số không hợp lệ";
  return Ket_qua_Tra_cuu;
}


// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_Mat_hang() { 
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", "../2-Du_lieu_Luu_tru/Du_lieu.xml", false);
  Xu_ly_HTTP.send("");
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName("Mat_hang");
  return Danh_sach_Mat_hang;
}


