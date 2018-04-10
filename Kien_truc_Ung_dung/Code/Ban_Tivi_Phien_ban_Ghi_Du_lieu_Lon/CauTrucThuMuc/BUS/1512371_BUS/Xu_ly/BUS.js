var http = require("http");
var xmldom = require("xmldom");
var DOMParser = new xmldom.DOMParser();
var XMLSerializer = new xmldom.XMLSerializer();

var ChuoiDuLieuGoc, DOMDuLieuGoc;

var ChuoiDuLieuChoKhach, ChuoiDuLieuChoQuanLyNhap, ChuoiDuLieuChoQuanLyBan, ChuoiDuLieuChoNhanVienNhap, ChuoiDuLieuChoNhanVienBan;
var DOMChoKhach, DOMChoQuanLyNhap, DOMChoQuanLyBan, DOMChoNhanVienNhap, DOMChoNhanVienBan;

var ChuoiDuLieuNhomTiviChoQLBan, ChuoiDuLieuNhomTiviChoQLNhap;
var DOMNhomTiviChoQLBan, DOMNhomTiviChoQLNhap;
//lấy chuỗi dữ liệu gốc từ DAL
http.get("http://localhost:3002/read", (DapUng) => {

    let buffer = "";
    DapUng.setEncoding("utf8");

    DapUng.on("data", (chunk) => {
        buffer += chunk;
    })

    DapUng.on("end", () => {
        ChuoiDuLieuGoc = buffer;
        CacheDuLieu();
    })

})

function CacheDuLieu() {
    if (ChuoiDuLieuGoc != "") {
        DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc);
    }
    CacheDuLieuChoKhach();
    CacheDuLieuChoNhanVienNhap();
    CacheDuLieuChoNhanVienBan();
    CacheDuLieuChoQuanLyNhap();
    CacheDuLieuChoQuanLyBan();
    CacheDuLieuNhomTiviChoQuanLyNhap();
}

function CacheDuLieuChoKhach() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho khach");
        return;
    }
    DOMChoKhach = DOMParser.parseFromString(ChuoiDuLieuGoc, "utf8");
    let Danh_sach_Tivi = DOMChoKhach.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Don_gia_Ban" && TenNode != "Trang_thai_Con_hang") {
                Danh_sach_Tivi[i].removeAttributeNode(Danh_sach_Tivi[i].attributes[j]);
                j--;
            }
        }
    }
    //cập nhật chuỗi dữ liệu
    ChuoiDuLieuChoKhach = XMLSerializer.serializeToString(DOMChoKhach);
}

function CacheDuLieuChoNhanVienNhap() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho nhan vien nhap");
        return;
    }
    DOMChoNhanVienNhap = DOMParser.parseFromString(ChuoiDuLieuGoc, "utf8");
    let Danh_sach_Tivi = DOMChoNhanVienNhap.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Nhap" && TenNode != "So_luong_Ton" && TenNode != "Doanh_thu") {
                Danh_sach_Tivi[i].removeAttributeNode(Danh_sach_Tivi[i].attributes[j]);
                j--;
            }
        }
    }
    //cập nhật chuỗi dữ liệu
    ChuoiDuLieuChoNhanVienNhap = XMLSerializer.serializeToString(DOMChoNhanVienNhap);
}

function CacheDuLieuChoNhanVienBan() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho nhan vien ban");
        return;
    }
    DOMChoNhanVienBan = DOMParser.parseFromString(ChuoiDuLieuGoc, "utf8");
    let Danh_sach_Tivi = DOMChoNhanVienBan.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Ban" && TenNode != "So_luong_Ton") {
                Danh_sach_Tivi[i].removeAttributeNode(Danh_sach_Tivi[i].attributes[j]);
                j--;
            }
        }
        //thêm thuộc tính doanh thu
    }
    //cập nhật chuỗi dữ liệu
    ChuoiDuLieuChoNhanVienBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);
}

function CacheDuLieuChoQuanLyNhap() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho quan ly nhap");
        return;
    }
    DOMChoQuanLyNhap = DOMParser.parseFromString(ChuoiDuLieuGoc, "utf8");
    let Danh_sach_Tivi = DOMChoQuanLyNhap.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Nhap" && TenNode != "So_luong_Ton" && TenNode != "Doanh_thu") {
                Danh_sach_Tivi[i].removeAttributeNode(Danh_sach_Tivi[i].attributes[j]);
                j--;
            }
        }
    }
    //cập nhật chuỗi dữ liệu
    ChuoiDuLieuChoQuanLyNhap = XMLSerializer.serializeToString(DOMChoQuanLyNhap);
}

function CacheDuLieuChoQuanLyBan() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho quan ly ban");
        return;
    }
    DOMChoQuanLyBan = DOMParser.parseFromString(ChuoiDuLieuGoc, "utf8");
    let Danh_sach_Tivi = DOMChoQuanLyBan.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Ban" && TenNode != "So_luong_Ton") {
                Danh_sach_Tivi[i].removeAttributeNode(Danh_sach_Tivi[i].attributes[j]);
                j--;
            }
        }
        //thêm thuộc tính doanh thu
    }
    //cập nhật chuỗi dữ liệu
    ChuoiDuLieuChoQuanLyBan = XMLSerializer.serializeToString(DOMChoQuanLyBan);
}

function CacheDuLieuNhomTiviChoQuanLyNhap() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu nhom tivi quan ly nhap");
        return;
    }
    let Danh_sach_Nhom_Tivi = DOMDuLieuGoc.getElementsByTagName("Nhom_Tivi");
    //Mảng kiểm tra sự tồn tại của nhóm tivi trong DOM
    let TenCacNhomTivi = {};
    DOMNhomTiviChoQLNhap = DOMParser.parseFromString("<Danh_sach_Nhom_Tivi> </Danh_sach_Nhom_Tivi>", "utf8");
    console.log(XMLSerializer.serializeToString(DOMNhomTiviChoQLNhap));
    for (let i = 0; i < Danh_sach_Nhom_Tivi.length; i++) {
        if (TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")] == null) {
            let NodeTam = DOMNhomTiviChoQLNhap.createElement("Nhom_Tivi");
            NodeTam.setAttribute("Ten", Danh_sach_Nhom_Tivi[i].getAttribute("Ten"));
            NodeTam.setAttribute("Ma_so", Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so"));
            NodeTam.setAttribute("So_luong_Ton", Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("So_luong_Ton"));
            NodeTam.setAttribute("Doanh_thu", Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("Doanh_thu"));
            DOMNhomTiviChoQLNhap.documentElement.appendChild(NodeTam);

            TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")] = 1;
        }
        else {
        /////////////////làm tiếp////////////////
        }
    }
    ChuoiDuLieuNhomTiviChoQLNhap = XMLSerializer.serializeToString(DOMNhomTiviChoQLNhap);
}


class BUS {
    LayThongTinTivi(DoiTuong) {
        switch (DoiTuong) {
            case "Khach":
                return ChuoiDuLieuChoKhach;
            case "NVNhap":
                return ChuoiDuLieuChoNhanVienNhap;
            case "NVBan":
                return ChuoiDuLieuChoNhanVienBan;
            case "QLNhap":
                return ChuoiDuLieuChoQuanLyNhap;
            case "QLBan":
                return ChuoiDuLieuChoQuanLyBan;
            default:
                console.log("Doi tuong khong dung");
                return "";
        }
    }
    LayThongTinTiviTheoNhom(DoiTuong) { 
        switch(DoiTuong)
        {
            case "QLNhap": return ChuoiDuLieuNhomTiviChoQLNhap;
            default:
                console.log("Doi tuong khong dung");
                return ""
        }
    }

BanTivi(Ngay, Tien, MaTV, SoLuong, DonGia) {

}
NhapTivi(Ngay, Tien, MaTV, SoLuong, DonGia) {

}
CapNhatDonGiaBan(MaTV, DonGia) {

}
CapNhatDonGiaNhap(MaTV, DonGia) {

}
}


var XuLy = new BUS();
module.exports = XuLy;