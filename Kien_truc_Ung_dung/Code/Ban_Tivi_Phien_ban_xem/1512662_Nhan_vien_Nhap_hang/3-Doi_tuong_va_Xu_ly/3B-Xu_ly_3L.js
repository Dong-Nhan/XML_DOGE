/* ********* Xử lý Thể hiện ********** */
function Tao_Chuoi_HTML_Danh_sach_Tivi(danh_sach){
    var th_Danh_sach = document.createElement("div");
    th_Danh_sach.className = "row";

    for(var i = 0; i < danh_sach.length;i++){
        var tivi = danh_sach[i];
        var ten = tivi.getAttribute("Ten");
        var don_gia_nhap =tivi.getAttribute("Don_gia_Nhap");
        var so_luong_ton = tivi.getAttribute("So_luong_Ton");

        var th_Hinh = document.createElement("img");
        th_Hinh.src = "http://localhost:3000/" + tivi.getAttribute("Ma_so") + ".png";
        th_Hinh.style.cssText = "width:150px;"
        th_Hinh.className = "mx-auto d-block";

        var th_Thong_tin = document.createElement("div");
        th_Thong_tin.className="btn";
        th_Thong_tin.style.cssText = "text-align: left;";
        th_Thong_tin.innerHTML = `${ten} <br/>Đơn giá Nhập: ${don_gia_nhap} <br/>Số lượng tồn: ${so_luong_ton}`;
        var th_Mat_hang = document.createElement("div");
        th_Mat_hang.style.cssText = "margin-bottom: 10px; width:270px";
        th_Mat_hang.appendChild(th_Hinh);
        th_Mat_hang.appendChild(th_Thong_tin);

        th_Danh_sach.appendChild(th_Mat_hang);
    }
    var chuoi_HTML = th_Danh_sach.outerHTML;
    return chuoi_HTML;
}

/* ********* Xử lý Lưu trữ ********** */
function Doc_Danh_sach_Tivi(){
    var Xu_ly_HTTP=new XMLHttpRequest();
    Xu_ly_HTTP.open("GET","http://localhost:3000/data-Khach-va-Nhan-Vien",false);
    Xu_ly_HTTP.send();
    var chuoi_XML = Xu_ly_HTTP.responseText;
    
    var du_lieu = new DOMParser().parseFromString(chuoi_XML,"text/xml").documentElement;
    var danh_sach_Tivi = du_lieu.getElementsByTagName("Tivi");
    return danh_sach_Tivi;
}