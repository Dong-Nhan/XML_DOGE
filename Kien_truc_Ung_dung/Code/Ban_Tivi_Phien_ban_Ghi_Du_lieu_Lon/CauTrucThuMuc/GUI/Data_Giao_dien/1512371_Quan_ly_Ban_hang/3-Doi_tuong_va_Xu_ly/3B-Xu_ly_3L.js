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
  
  let Dia_chi_Media = "http://localhost:3000/Img"
  let Th_Danh_sach = document.createElement("div")
  Th_Danh_sach.className = "row"
  for (let i = 0; i < Danh_sach.length; i++) {
    let Ten = Danh_sach[i].getAttribute(TAG.Ten);
    let Ma_so = Danh_sach[i].getAttribute(TAG.Ma_so);
    let Don_gia_Ban = parseInt(Danh_sach[i].getAttribute(TAG.Don_gia_Ban));
    let So_luong_Ton = parseInt(Danh_sach[i].getAttribute(TAG.So_luong_Ton));
    let Doanh_thu = parseInt(Danh_sach[i].getAttribute(TAG.Doanh_thu));
   
    var Th_Hinh = document.createElement("img");
    Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`;
    Th_Hinh.style.cssText = `width: 80%`;

    //Thể hiện thông tin
    let Th_Thong_tin = document.createElement("div");

    let Th_Ten = document.createElement('div');
    Th_Ten.innerText = Ten;

    let Th_Don_Gia_Ban = document.createElement('div');
    Th_Don_Gia_Ban.id = "DonGiaBan" + Ma_so;
    Th_Don_Gia_Ban.innerText = `Đơn giá Bán: ${Don_gia_Ban.toLocaleString("vi")}`;

    let Th_So_luong_Ton = document.createElement('div');
    Th_So_luong_Ton.innerText = `Số lượng tồn: ${So_luong_Ton}`;
    
let Th_Doanh_thu = document.createElement('div');
    Th_Doanh_thu.innerText = `Doanh thu: ${Doanh_thu.toLocaleString("vi")}`;

    Th_Thong_tin.appendChild(Th_Ten);
    Th_Thong_tin.appendChild(Th_Don_Gia_Ban);
    Th_Thong_tin.appendChild(Th_So_luong_Ton);
    Th_Thong_tin.appendChild(Th_Doanh_thu);

    //Thể hiện cập nhật
    let Th_Cap_nhat_Don_gia_Ban = document.createElement("div");
    let Th_Input = document.createElement("input");
    let Th_Nut_Cap_nhat = document.createElement("button");

    Th_Input.placeholder = "Đơn giá nhập";
    Th_Input.style = "margin-right: 5px";
    Th_Input.id = "Input" + Ma_so;

    Th_Nut_Cap_nhat.innerText = "Cập nhật";
    Th_Nut_Cap_nhat.className = "btn";
    Th_Nut_Cap_nhat.setAttribute("onClick", `Cap_nhat_Don_gia_Ban("${Ma_so}")`);

    Th_Cap_nhat_Don_gia_Ban.appendChild(Th_Input);
    Th_Cap_nhat_Don_gia_Ban.appendChild(Th_Nut_Cap_nhat);

    //Thể hiện mặt hàng
    let Th_Mat_hang = document.createElement("div")
    Th_Mat_hang.className="col-3";
    Th_Mat_hang.appendChild(Th_Hinh);
    Th_Mat_hang.appendChild(Th_Thong_tin);
    Th_Mat_hang.appendChild(Th_Cap_nhat_Don_gia_Ban);

    Th_Danh_sach.appendChild(Th_Mat_hang)
  }
  return Th_Danh_sach;
}

function Tao_Th_Danh_sach_Nhom_Tivi(Danh_sach_Nhom_Tivi) {
  for(let i = 0; i < Danh_sach_Nhom_Tivi.length; i++)
  {
    let Row = document.createElement("tr");

    let Ten = document.createElement("td");
    Ten.innerText = Danh_sach_Nhom_Tivi[i].getAttribute("Ten");
    let SoLuongTon = document.createElement("td");
    SoLuongTon.innerText = Danh_sach_Nhom_Tivi[i].getAttribute("So_luong_Ton");
    let DoanhThu = document.createElement("td");
    DoanhThu.innerText = Danh_sach_Nhom_Tivi[i].getAttribute("Doanh_thu");

    Row.appendChild(Ten);
    Row.appendChild(SoLuongTon);
    Row.appendChild(DoanhThu);

    document.getElementById("Table body").appendChild(Row);
  }
}
//************** Xử lý nghiệp vụ *********** 
function Cap_nhat_Don_gia_Ban(MaTV)
{
  
  let DonGiaBan = document.getElementById("Input" + MaTV).value;
  let Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+`/cap-nhat-don-gia-ban?DonGia=${DonGiaBan}&MaTV=${MaTV}`, false);
  Xu_ly_HTTP.send();
  let Chuoi_Tra_ve = Xu_ly_HTTP.responseText;
  if (Chuoi_Tra_ve == false) {
    alert("Cập nhật không thành công");
    return;
  }
  else
  {
    alert("Cập nhật thành công");
    document.getElementById("DonGiaBan"+MaTV).innerText = "Đơn giá Bán: " + parseInt(DonGiaBan).toLocaleString("vi");
    document.getElementById("Input" + MaTV).value = "";
    return;
  }
}


// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_San_pham() { 
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/lay-thong-tin-tivi?DoiTuong=QLBan', false);
  Xu_ly_HTTP.send();
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName(TAG.Tivi);
  return Danh_sach_Mat_hang;
}

function Doc_Danh_sach_Nhom_Tivi(){
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/lay-thong-tin-tivi-theo-nhom?DoiTuong=QLBan', false);
  Xu_ly_HTTP.send();
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  var Danh_sach_Nhom_Tivi=Du_lieu.getElementsByTagName(TAG.Nhom_Tivi);
  return Danh_sach_Nhom_Tivi;
}


