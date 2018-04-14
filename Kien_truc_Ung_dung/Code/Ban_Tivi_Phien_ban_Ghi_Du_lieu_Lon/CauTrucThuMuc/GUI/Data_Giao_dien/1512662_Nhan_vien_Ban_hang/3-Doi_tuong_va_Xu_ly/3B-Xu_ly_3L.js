/* ********* Xử lý Thể hiện ********** */
function Tao_Chuoi_HTML_Danh_sach_Tivi(danh_sach){
    var th_Danh_sach = document.createElement("div");
    th_Danh_sach.className = "row";

    for(var i = 0; i < danh_sach.length;i++){
        var tivi = danh_sach[i];
        var ten = tivi.getAttribute("Ten");
        var don_gia_nhap =tivi.getAttribute("Don_gia_Ban");
        var so_luong_ton = tivi.getAttribute("So_luong_Ton");
        var doanh_thu = tivi.getAttribute("Doanh_thu");

        var th_Hinh = document.createElement("img");
        th_Hinh.src = "../../../Img/" + tivi.getAttribute("Ma_so") + ".png";
        th_Hinh.style.cssText = "width:150px;"
        th_Hinh.className = "mx-auto d-block";

        var th_Thong_tin = document.createElement("div");
        th_Thong_tin.className="btn";
        th_Thong_tin.style.cssText = "text-align: left;";
        th_Thong_tin.innerHTML = `${ten} <br/>Đơn giá Bán: ${don_gia_nhap} <br/>Số lượng tồn: ${so_luong_ton}
        <br/>Doanh thu: ${doanh_thu}`;
        var th_Mat_hang = document.createElement("div");
        th_Mat_hang.style.cssText = "margin-bottom: 10px; width:270px";
        th_Mat_hang.appendChild(th_Hinh);
        th_Mat_hang.appendChild(th_Thong_tin);

        th_Danh_sach.appendChild(th_Mat_hang);
    }
    var chuoi_HTML = th_Danh_sach.outerHTML;
    return chuoi_HTML;
}

//************** Xử lý Nghiệp vụ ***********
function Tra_cuu_Mat_hang(Chuoi_Tra_cuu, Danh_sach) {
    Chuoi_Tra_cuu = Chuoi_Tra_cuu.toUpperCase();
    var Danh_sach_Kq = [];
    for (var i = 0; i < Danh_sach.length; i++) {
        var tivi = Danh_sach[i];
        var ma = tivi.getAttribute("Ma_so").toUpperCase();
        if (ma == Chuoi_Tra_cuu)
            Danh_sach_Kq.push(tivi);
    }
  
    return Danh_sach_Kq;
  }

/* ********* Xử lý Lưu trữ ********** */
function Doc_Danh_sach_Tivi(){
    var Xu_ly_HTTP=new XMLHttpRequest();
    Xu_ly_HTTP.open("GET","http://localhost:3001/lay-thong-tin-tivi?DoiTuong=NVBan",false);
    Xu_ly_HTTP.send();
    var chuoi_XML = Xu_ly_HTTP.responseText;
    
    var du_lieu = new DOMParser().parseFromString(chuoi_XML,"text/xml").documentElement;
    var danh_sach_Tivi = du_lieu.getElementsByTagName("Tivi");
    return danh_sach_Tivi;
}

/* ********* Xử lý tính toán bán hàng ********** */
function Tinh_toan_Ban_hang(tivi){
    //Kiểm tra còn đủ số lượng để bán ko
    if( parseInt(tivi.getAttribute("So_luong_Ton")) < parseInt(Th_So_luong.value) || parseInt(Th_So_luong.value) <= 0){
        return "false";
    }
    //Gửi yêu cầu về server
    var Xu_ly_HTTP=new XMLHttpRequest();
    var localhost = "http://localhost:3001/ban-tivi?Ngay=" + Th_Ngay.value + "&Tien=" + Th_Tien.value + "&MaTV="+Th_Tivi.value.toUpperCase()+"&SoLuong=" +Th_So_luong.value +"&DonGia="+ Th_Don_gia.value;
    Xu_ly_HTTP.open("GET",localhost,false);
    Xu_ly_HTTP.send();
    return Xu_ly_HTTP.responseText;
}

/* ********* Cập nhật sau khi bán ********** */
function Cap_nhat(Chuoi_Tra_cuu, Danh_sach) {
    Chuoi_Tra_cuu = Chuoi_Tra_cuu.toUpperCase();
    var Danh_sach_Kq = [];
    for (var i = 0; i < Danh_sach.length; i++) {
        var tivi = Danh_sach[i];
        var ma = tivi.getAttribute("Ma_so").toUpperCase();
        if (ma == Chuoi_Tra_cuu){
            var so_luong_ton = tivi.getAttribute("So_luong_Ton");
            tivi.setAttribute("So_luong_Ton", parseInt(so_luong_ton) - parseInt(Th_So_luong.value));
            var doanh_thu = tivi.getAttribute("Doanh_thu");
            tivi.setAttribute("Doanh_thu", parseInt(doanh_thu) + parseInt(Th_Tien.value));
        }
        Danh_sach_Kq.push(tivi);
    }
  
    return Danh_sach_Kq;
}