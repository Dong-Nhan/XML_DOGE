//************ Xử lý Thể hiện ***************/
function HienThiNoiDung(Danh_sach){
  var option = [];
  var Mat_Hang=Danh_sach.getElementsByTagName('Mat_hang');
  for(var i = 0; i<Mat_Hang.length;i++){
    var temp = document.createElement('option');
    temp.setAttribute('value',Mat_Hang[i].getAttribute('Ma_so'));
    temp.innerHTML = Mat_Hang[i].getAttribute('Ten');
    option.push(temp);
  }
  return option;
}

//************** Xử lý Nghiệp vụ ***********
//Load thông tin
function LoadThongTin(Danh_sach){
  var Ma_So=document.getElementById('Ma-San-Pham').value;
  var Mat_Hang=Danh_sach.getElementsByTagName('Mat_hang');
  for(var i = 0;i<Mat_Hang.length;i++){
    if(Ma_So == Mat_Hang[i].getAttribute('Ma_so')){
      var image = document.createElement('img');
      image.setAttribute('src','../Media/'+Ma_So+'.png');
      image.setAttribute('alt','Hinh-Anh  ')
      var Ten = document.createElement('h3');
      Ten.innerHTML='Tên mặt hàng: <br/><b>' + Mat_Hang[i].getAttribute('Ten')+'</b>';
      var Ma =document.createElement('h3');
      Ma.innerHTML='Mã số: <br/><b>' + Ma_So + '</b>';
      var Don_Gia=document.createElement('h3');
      Don_Gia.innerHTML='Đơn giá bán: <br/><b>'+Mat_Hang[i].getAttribute('Don_gia_Ban')+'đ</b>';

      //Load thông tin lên các div
      document.getElementsByClassName('Hinh')[0].innerHTML='';
      document.getElementsByClassName('Hinh')[0].appendChild(image);
      document.getElementsByClassName('Noi-dung')[0].innerHTML='';
      document.getElementsByClassName('Noi-dung')[0].appendChild(Ten);
      document.getElementsByClassName('Noi-dung')[0].appendChild(Ma);
      document.getElementsByClassName('Noi-dung')[0].appendChild(Don_Gia);
      //Set focus vào ô nhập số lượng
      document.getElementById('So-Luong').focus();
      document.getElementById('So-Luong').select();
      return;
    }
  }
}

//Tính tiền
function TinhTien(Danh_sach){
  var Ma = document.getElementById('Ma-San-Pham').value;
  var So_Luong = parseInt(document.getElementById('So-Luong').value);
  var Mat_Hang=Danh_sach.getElementsByTagName('Mat_hang');
  for(var i = 0; i<Mat_Hang.length;i++){
    if(Mat_Hang[i].getAttribute('Ma_so') == Ma){
      var Tong_Tien = So_Luong*Mat_Hang[i].getAttribute('Don_gia_Ban')
      document.getElementsByClassName('Tong-tien')[0].innerHTML=Tong_Tien+'đ';
      return;
    }
  }
}

//Xử lý nhập số lượng
//Giới hạn tối đa là 999
function NhapSoLuong(Danh_sach){
  var So_Luong = document.getElementById('So-Luong');
  if(So_Luong.value == ''){
    So_Luong.value='0';
  }
  if(So_Luong.value >999){
    So_Luong.value = parseInt(So_Luong.value/10);
  }
  TinhTien(Danh_sach);
}

// ************** Xử lý Lưu trữ *********** 
// PET : Lưu ý Kỹ thuật này đã lạc lậu
// nhưng rất thích hợp khi Giảng dạy mở đầu
function Doc_Danh_sach_Mat_hang() { 
  var Xu_ly_HTTP = new XMLHttpRequest()
  Xu_ly_HTTP.open("GET", "../2-Du_lieu_Luu_tru/Du_lieu.xml", false)
  Xu_ly_HTTP.send("")
  var Chuoi_XML = Xu_ly_HTTP.responseText
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml").documentElement
  var Danh_sach_Mat_hang=Du_lieu.getElementsByTagName("Danh_sach_Mat_hang")[0]
  return Danh_sach_Mat_hang
}


