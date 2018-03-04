//************ Xử lý Thể hiện ***************/
function Tao_Th_Doanh_Thu_Theo_Ma(Ma_so_Nhom_Mat_hang, Du_lieu) {
  var Th_Doanh_Thu = document.createElement("h1");
  var Tong_Doanh_Thu = 0;
  var Ten_Nhom;
  var Danh_Sach_Mat_Hang = Du_lieu.getElementsByTagName("Mat_hang");
  for (var i = 0; i < Danh_Sach_Mat_Hang.length; i++) {
    var Mat_hang = Danh_Sach_Mat_Hang[i];
    var Nhom_Mat_hang = Mat_hang.getElementsByTagName("Nhom_Mat_hang");
    var Ma_so_Nhom = Nhom_Mat_hang[0].getAttribute("Ma_so");
    var Ten_Nhom_temp = Nhom_Mat_hang[0].getAttribute("Ten");
    var Ten = Mat_hang.getAttribute("Ten");
    var Ma_so = Mat_hang.getAttribute("Ma_so");
    var Don_gia_Ban = Mat_hang.getAttribute("Don_gia_Ban");
    var Danh_sach_Ban_hang = Mat_hang.getElementsByTagName(
      "Danh_sach_Ban_hang"
    );
    var Ban_hang = Danh_sach_Ban_hang[0].getElementsByTagName("Ban_hang");
    var Doanh_Thu_Mat_Hang = 0;
    if (Ma_so_Nhom == Ma_so_Nhom_Mat_hang || Ma_so_Nhom_Mat_hang == "Tat_Ca") {
      for (var j = 0; j < Ban_hang.length; j++) {
        Doanh_Thu_Mat_Hang += parseInt(Ban_hang[j].getAttribute("Tien"));
      }
      Tong_Doanh_Thu += Doanh_Thu_Mat_Hang;
      Ten_Nhom = Ten_Nhom_temp;
    }
  }
  if (Ma_so_Nhom_Mat_hang != "Tat_Ca")
    Th_Doanh_Thu.innerHTML = `Tổng doanh thu: ${Tong_Doanh_Thu}đ đối với ${Ten_Nhom}`;
  else
    Th_Doanh_Thu.innerHTML = `Tổng doanh thu: ${Tong_Doanh_Thu}đ`;
  return Th_Doanh_Thu;
}
function Tao_Th_Danh_sach_Mat_hang(Du_lieu) {
  var Dia_chi_Media = "../Media";
  var Th_Danh_sach = document.createElement("ul");

  var Danh_Sach_Mat_Hang = Du_lieu.getElementsByTagName("Mat_hang");
  for (var i = 0; i < Danh_Sach_Mat_Hang.length; i++) {
    var Mat_hang = Danh_Sach_Mat_Hang[i];
    var Ten = Mat_hang.getAttribute("Ten");
    var Ma_so = Mat_hang.getAttribute("Ma_so");
    var Don_gia_Ban = Mat_hang.getAttribute("Don_gia_Ban");
    var Danh_sach_Ban_hang = Mat_hang.getElementsByTagName(
      "Danh_sach_Ban_hang"
    );
    var Ban_hang = Danh_sach_Ban_hang[0].getElementsByTagName("Ban_hang");
    var So_Luong = 0;
    for (var j = 0; j < Ban_hang.length; j++) {
      So_Luong += parseInt(Ban_hang[j].getAttribute("So_luong"));
    }

    var item = document.createElement("li");
    item.className = "item";

    //Thêm tên
    var Node_Ten = document.createElement("p");
    Node_Ten.innerHTML = `Tên: ${Ten}`;
    item.appendChild(Node_Ten);

    //Thêm hình
    var Node_Hinh = document.createElement("img");
    Node_Hinh.setAttribute("src", `${Dia_chi_Media}/${Ma_so}.png`);
    item.appendChild(Node_Hinh);

    //Thêm giá bán
    var Node_Gia = document.createElement("p");
    Node_Gia.innerHTML = `Giá: ${Don_gia_Ban}đ`;
    item.appendChild(Node_Gia);

    //Thêm doanh thu
    var Node_Doanh_Thu = document.createElement("p");
    Node_Doanh_Thu.innerHTML = `Doanh thu: ${Tinh_Doanh_Thu(
      Don_gia_Ban,
      So_Luong
    )}đ`;
    item.appendChild(Node_Doanh_Thu);

    //Thêm vào số lượng bán
    var Node_So_Luong = document.createElement("p");
    Node_So_Luong.innerHTML = `Số lượng bán được: ${So_Luong} sản phẩm`;
    item.appendChild(Node_So_Luong);

    //Thêm item vào list
    Th_Danh_sach.appendChild(item);
  }
  return Th_Danh_sach;
}

function Tao_Th_Button(Du_lieu) {
  var Th_Button = document.createElement("ul");

  var Ma_So_Nhom_mat_hang_truoc = "";
  var Mat_hang = Du_lieu.getElementsByTagName("Mat_hang");
  for (var i = 0; i < Mat_hang.length; i++) {
    var Nhom_mat_hang = Mat_hang[i].getElementsByTagName("Nhom_Mat_hang");
    var Ten = Nhom_mat_hang[0].getAttribute("Ten");
    var Ma_so = Nhom_mat_hang[0].getAttribute("Ma_so");
    if (Ma_So_Nhom_mat_hang_truoc != Ma_so) {
      Ma_So_Nhom_mat_hang_truoc = Ma_so;
      var buton = document.createElement("button");
      buton.innerHTML = Ten;
      buton.setAttribute(
        "onclick",
        `Loc_Mat_Hang('danh-sach-mat-hang','${Ma_so}',Danh_sach_Mat_hang)`
      );

      Th_Button.appendChild(buton);
    }
  }
  //Thêm button tất cả
  var buton = document.createElement("button");
  buton.innerHTML = "Tất cả";
  buton.setAttribute(
    "onclick",
    `Loc_Mat_Hang('danh-sach-mat-hang','Tat_Ca',Danh_sach_Mat_hang)`
  );

  Th_Button.appendChild(buton);
  return Th_Button;
}

function Tao_Th_Danh_sach_Mat_hang_Theo_Ma(Ma_so_Mat_hang, Du_lieu) {
  //Add dữ liệu mới
  var Dia_chi_Media = "../Media";
  var Th_Danh_sach = document.createElement("ul");

  var Danh_Sach_Mat_Hang = Du_lieu.getElementsByTagName("Mat_hang");
  for (var i = 0; i < Danh_Sach_Mat_Hang.length; i++) {
    var Mat_hang = Danh_Sach_Mat_Hang[i];
    var Ten = Mat_hang.getAttribute("Ten");
    var Ma_so = Mat_hang.getAttribute("Ma_so");
    var Don_gia_Ban = Mat_hang.getAttribute("Don_gia_Ban");
    var Danh_sach_Ban_hang = Mat_hang.getElementsByTagName(
      "Danh_sach_Ban_hang"
    );
    var Ban_hang = Danh_sach_Ban_hang[0].getElementsByTagName("Ban_hang");
    var So_Luong = 0;
    for (var j = 0; j < Ban_hang.length; j++) {
      So_Luong += parseInt(Ban_hang[j].getAttribute("So_luong"));
    }

    var Nhom_Mat_hang = Mat_hang.getElementsByTagName("Nhom_Mat_hang");
    var Ma_Nhom = Nhom_Mat_hang[0].getAttribute("Ma_so");

    if (Ma_Nhom == Ma_so_Mat_hang || Ma_so_Mat_hang == "Tat_Ca") {
      var item = document.createElement("li");
      item.className = "item";

      //Thêm tên
      var Node_Ten = document.createElement("p");
      Node_Ten.innerHTML = `Tên: ${Ten}`;
      item.appendChild(Node_Ten);

      //Thêm hình
      var Node_Hinh = document.createElement("img");
      Node_Hinh.setAttribute("src", `${Dia_chi_Media}/${Ma_so}.png`);
      item.appendChild(Node_Hinh);

      //Thêm giá bán
      var Node_Gia = document.createElement("p");
      Node_Gia.innerHTML = `Giá: ${Don_gia_Ban}đ`;
      item.appendChild(Node_Gia);

      //Thêm doanh thu
      var Node_Doanh_Thu = document.createElement("p");
      Node_Doanh_Thu.innerHTML = `Doanh thu: ${Tinh_Doanh_Thu(
        Don_gia_Ban,
        So_Luong
      )}đ`;
      item.appendChild(Node_Doanh_Thu);

      //Thêm vào số lượng bán
      var Node_So_Luong = document.createElement("p");
      Node_So_Luong.innerHTML = `Số lượng bán được: ${So_Luong} sản phẩm`;
      item.appendChild(Node_So_Luong);

      //Thêm item vào list
      Th_Danh_sach.appendChild(item);
    }
  }
  return Th_Danh_sach;
}

//************** Xử lý Nghiệp vụ ***********
function Tinh_Doanh_Thu(Don_Gia, So_Luong) {
  return parseInt(Don_Gia) * parseInt(So_Luong);
}

function Loc_Mat_Hang(id, Ma_so_Nhom_Mat_hang, Du_lieu) {
  //Xóa hết dữ liệu cũ
  var Danh_Sach = document.getElementById(id);
  Danh_Sach.innerHTML = "";

  Th_Danh_sach_theo_ma = Tao_Th_Danh_sach_Mat_hang_Theo_Ma(
    Ma_so_Nhom_Mat_hang,
    Du_lieu
  );
  Danh_Sach.appendChild(Th_Danh_sach_theo_ma);

  //Xóa hết tổng doanh thu và update lại
  var Doanh_Thu = document.getElementById("tong-doanh-thu");
  Doanh_Thu.innerHTML = "";
  var Th_Doanh_Thu_Moi = Tao_Th_Doanh_Thu_Theo_Ma(Ma_so_Nhom_Mat_hang, Du_lieu);
  Doanh_Thu.appendChild(Th_Doanh_Thu_Moi);
}

// ************** Xử lý Lưu trữ ***********
function Doc_Danh_sach_Mat_hang() {
  var Xu_ly_HTTP = new XMLHttpRequest();
  Xu_ly_HTTP.open("GET", "../2-Du_lieu_Luu_tru/Du_lieu.xml", false);
  Xu_ly_HTTP.send("");
  var Chuoi_XML = Xu_ly_HTTP.responseText;
  var Du_lieu = new DOMParser().parseFromString(Chuoi_XML, "text/xml")
    .documentElement;
  var Danh_sach_Mat_hang = Du_lieu.getElementsByTagName(
    "Danh_sach_Mat_hang"
  )[0];
  return Danh_sach_Mat_hang;
}
