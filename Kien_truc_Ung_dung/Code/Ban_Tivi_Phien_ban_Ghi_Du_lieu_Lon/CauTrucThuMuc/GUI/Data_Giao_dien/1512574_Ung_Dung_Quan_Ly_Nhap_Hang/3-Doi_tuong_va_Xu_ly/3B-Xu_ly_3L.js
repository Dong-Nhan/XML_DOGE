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
  
  let Dia_chi_Media = "http://localhost:3000/Img"
  let Th_Danh_sach = document.createElement("ul")
  Th_Danh_sach.className = 'list-unstyled row'
  for (let i = 0; i < Danh_sach.length; i++) {
    var Ten = Danh_sach[i].getAttribute(TAG.Ten);
    let Ma_so = Danh_sach[i].getAttribute(TAG.Ma_so);
    let Don_gia_Nhap = parseInt(Danh_sach[i].getAttribute(TAG.Don_gia_Nhap));
    let So_luong_Ton = parseInt(Danh_sach[i].getAttribute(TAG.So_luong_Ton));
    if(isNaN(So_luong_Ton)){
      So_luong_Ton = 0;
    }
    
    let Th_Hinh = document.createElement("img");
    Th_Hinh.src = `${Dia_chi_Media}/${Ma_so}.png`;
    Th_Hinh.style.cssText = `width: 80%`;

    let Th_Thong_tin = document.createElement("div");

    let Th_Ten = document.createElement('p');
    Th_Ten.innerText = Ten;

    let Th_Don_Gia_Nhap = document.createElement('p');
    Th_Don_Gia_Nhap.innerText = `Đơn giá nhập: ${Don_gia_Nhap.toLocaleString("vi")}`;
    Th_Don_Gia_Nhap.setAttribute('id',Ma_so);
    
    let Th_So_luong_Ton = document.createElement('p');
    Th_So_luong_Ton.innerText = `Số lượng còn lại: ${So_luong_Ton.toLocaleString("vi")}`;

    Th_Thong_tin.appendChild(Th_Ten);
    Th_Thong_tin.appendChild(Th_Don_Gia_Nhap);
    Th_Thong_tin.appendChild(Th_So_luong_Ton);

    let Th_Thay_doi_don_gia_nhap = document.createElement('div');
    let Th_Input = document.createElement('input');
    Th_Input.setAttribute('type','text');
    Th_Input.setAttribute('id','input-cap-nhat-gia'+'-'+Ma_so);
    Th_Input.setAttribute('placeholder','Nhập giá mới muốn cập nhật');
    Th_Input.style = 'margin-bottom: 10px'
    Th_Input.className= 'form-control';
    let Th_Btn_Thay_Doi_Gia = document.createElement('button');
    Th_Btn_Thay_Doi_Gia.setAttribute('onClick',`CapNhatGiaNhap('${Danh_sach[i].getAttribute(TAG.Ma_so)}','${Ma_so}')`)
    Th_Btn_Thay_Doi_Gia.innerText = 'Cập nhật giá nhập'
    Th_Btn_Thay_Doi_Gia.className = 'btn btn-success'
    
    Th_Thay_doi_don_gia_nhap.appendChild(Th_Input);
    Th_Thay_doi_don_gia_nhap.appendChild(Th_Btn_Thay_Doi_Gia);
    
    let Th_Mat_hang = document.createElement("li")
    Th_Mat_hang.className='col-md-3 col-sm-6 col-12';
    Th_Mat_hang.appendChild(Th_Hinh)
    Th_Mat_hang.appendChild(Th_Thong_tin)
    Th_Mat_hang.appendChild(Th_Thay_doi_don_gia_nhap);
    Th_Mat_hang.style = 'margin-bottom:10px'

    Th_Danh_sach.appendChild(Th_Mat_hang)
  }
  return Th_Danh_sach;
}
function Tao_Th_Danh_sach_Nhom_TiVi(Chuoi_XML) {
  
  let Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement.getElementsByTagName(TAG.Nhom_Tivi);

  let Dia_chi_Media = "http://localhost:3000/Img";
  let Th_Danh_sach = document.createElement("ul");
  Th_Danh_sach.className = 'list-unstyled row';



  for(let i = 0;i< Du_lieu.length;i++){
    let Th_Nhom = document.createElement('li');
    Th_Nhom.className = `col-md-3 col-sm-6 col-12`;
    Th_Nhom.style.cssText = `border: 1px solid black; background-color:antiquewhite`;
    let Ten_Nhom = Du_lieu[i].getAttribute(TAG.Ten);
    let So_luong_Ton = Du_lieu[i].getAttribute(TAG.So_luong_Ton);

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
  let Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/lay-thong-tin-tivi?DoiTuong=QLNhap', false);
  Xu_ly_HTTP.send();
  let Chuoi_XML = Xu_ly_HTTP.responseText;
  let Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement;
  let Danh_sach_Mat_hang=Du_lieu.getElementsByTagName(TAG.Tivi);
  return Danh_sach_Mat_hang;
}

function Doc_Danh_Sach_Nhom_San_Pham(){
  let Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/lay-thong-tin-tivi-theo-nhom?DoiTuong=QLNhap', false);
  Xu_ly_HTTP.send();
  return Xu_ly_HTTP.responseText;
}

function CapNhatGiaNhap(Ma_TiVi,id_input){
  let DonGiaNhapMoi = document.getElementById('input-cap-nhat-gia-'+id_input).value;
  if(DonGiaNhapMoi == ''){
    return;
  }
  let Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
      if(this.responseText == 'false'){
        document.getElementById('input-cap-nhat-gia-'+id_input).value = 'Không thành công!';
        return;
      }
      document.getElementById(id_input).innerText = `Đơn giá nhập: ${DonGiaNhapMoi.toLocaleString("vi")}`;
      document.getElementById('input-cap-nhat-gia-'+id_input).value = '';
    }
  }
  Xu_ly_HTTP.open("GET", 'http://localhost:3001'+'/cap-nhat-don-gia-nhap?DonGia='+DonGiaNhapMoi +'&MaTV='+Ma_TiVi, true);
  Xu_ly_HTTP.send();
}
