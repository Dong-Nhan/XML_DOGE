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
        console.log("Cache du lieu xong");
    })

})

function CacheDuLieu() {
    if (ChuoiDuLieuGoc != "") {
        DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");

    }
    CacheDuLieuChoKhach();
    CacheDuLieuChoNhanVienNhap();
    CacheDuLieuChoNhanVienBan();
    CacheDuLieuChoQuanLyNhap();
    CacheDuLieuChoQuanLyBan();
    CacheDuLieuNhomTiviChoQuanLyNhap();
    CacheDuLieuNhomTiviChoQuanLyBan();
}

function CacheDuLieuChoKhach() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu cho khach");
        return;
    }
    DOMChoKhach = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
    let Danh_sach_Tivi = DOMChoKhach.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
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
    DOMChoNhanVienNhap = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
    let Danh_sach_Tivi = DOMChoNhanVienNhap.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Nhap" && TenNode != "So_luong_Ton") {
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
    DOMChoNhanVienBan = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
    let Danh_sach_Tivi = DOMChoNhanVienBan.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Ban" && TenNode != "So_luong_Ton" && TenNode != "Doanh_thu") {
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
    DOMChoQuanLyNhap = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
    let Danh_sach_Tivi = DOMChoQuanLyNhap.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Nhap" && TenNode != "So_luong_Ton") {
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
    DOMChoQuanLyBan = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
    let Danh_sach_Tivi = DOMChoQuanLyBan.getElementsByTagName("Tivi");
    //xóa các dữ liệu không cần thiết
    for (let i = 0; i < Danh_sach_Tivi.length; i++) {
        Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Nhom_Tivi")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
        // Danh_sach_Tivi[i].removeChild(Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
        //xóa các thuộc tính không cần thiết
        for (let j = 0; j < Danh_sach_Tivi[i].attributes.length; j++) {
            let TenNode = Danh_sach_Tivi[i].attributes[j].nodeName;
            if (TenNode != "Ten" && TenNode != "Ma_so" && TenNode != "Don_gia_Ban" && TenNode != "So_luong_Ton" && TenNode != "Doanh_thu") {
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
    //Object kiểm tra sự tồn tại của nhóm tivi trong DOM
    let TenCacNhomTivi = {};
    DOMNhomTiviChoQLNhap = DOMParser.parseFromString("<Danh_sach_Nhom_Tivi> </Danh_sach_Nhom_Tivi>", "text/plain");
    for (let i = 0; i < Danh_sach_Nhom_Tivi.length; i++) {
        let ViTriNode = TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")];
        //nếu chưa có tên nhóm tivi trong TenCacNhomTivi
        if (ViTriNode == null) {
            let NodeTam = DOMNhomTiviChoQLNhap.createElement("Nhom_Tivi");
            NodeTam.setAttribute("Ten", Danh_sach_Nhom_Tivi[i].getAttribute("Ten"));
            NodeTam.setAttribute("Ma_so", Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so"));
            NodeTam.setAttribute("So_luong_Ton", Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("So_luong_Ton"));
            DOMNhomTiviChoQLNhap.documentElement.appendChild(NodeTam);
            //đánh dấu vị trí tìm được
            TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")] = DOMNhomTiviChoQLNhap.getElementsByTagName("Nhom_Tivi").length - 1;
        }
        //nếu đã có tên nhóm tivi trong TenCacNhomTivi
        else {
            let NodeTam = DOMNhomTiviChoQLNhap.getElementsByTagName("Nhom_Tivi")[ViTriNode];
            NodeTam.setAttribute("So_luong_Ton", parseInt(NodeTam.getAttribute("So_luong_Ton")) + parseInt(Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("So_luong_Ton")));
        }
    }
    ChuoiDuLieuNhomTiviChoQLNhap = XMLSerializer.serializeToString(DOMNhomTiviChoQLNhap);
}

function CacheDuLieuNhomTiviChoQuanLyBan() {
    if (ChuoiDuLieuGoc == "") {
        console.log("Khong the cache du lieu nhom tivi quan ly ban");
        return;
    }
    let Danh_sach_Nhom_Tivi = DOMDuLieuGoc.getElementsByTagName("Nhom_Tivi");
    //Object kiểm tra sự tồn tại của nhóm tivi trong DOM
    let TenCacNhomTivi = {};
    DOMNhomTiviChoQLBan = DOMParser.parseFromString("<Danh_sach_Nhom_Tivi> </Danh_sach_Nhom_Tivi>", "text/plain");
    for (let i = 0; i < Danh_sach_Nhom_Tivi.length; i++) {
        let ViTriNode = TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")];
        //nếu chưa có tên nhóm tivi trong TenCacNhomTivi
        if (ViTriNode == null) {
            let NodeTam = DOMNhomTiviChoQLBan.createElement("Nhom_Tivi");
            NodeTam.setAttribute("Ten", Danh_sach_Nhom_Tivi[i].getAttribute("Ten"));
            NodeTam.setAttribute("Ma_so", Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so"));
            NodeTam.setAttribute("So_luong_Ton", Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("So_luong_Ton"));
            NodeTam.setAttribute("Doanh_thu", Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("Doanh_thu"));
            DOMNhomTiviChoQLBan.documentElement.appendChild(NodeTam);
            //đánh dấu vị trí tìm được
            TenCacNhomTivi[Danh_sach_Nhom_Tivi[i].getAttribute("Ma_so")] = DOMNhomTiviChoQLBan.getElementsByTagName("Nhom_Tivi").length - 1;
        }
        //nếu đã có tên nhóm tivi trong TenCacNhomTivi
        else {
            let NodeTam = DOMNhomTiviChoQLBan.getElementsByTagName("Nhom_Tivi")[ViTriNode];
            NodeTam.setAttribute("So_luong_Ton", parseInt(NodeTam.getAttribute("So_luong_Ton")) + parseInt(Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("So_luong_Ton")));
            NodeTam.setAttribute("Doanh_thu", parseInt(NodeTam.getAttribute("Doanh_thu")) + parseInt(Danh_sach_Nhom_Tivi[i].parentNode.getAttribute("Doanh_thu")));
        }
    }
    ChuoiDuLieuNhomTiviChoQLBan = XMLSerializer.serializeToString(DOMNhomTiviChoQLBan);
}

function TimTiviTheoMa(MaTV) {
    for (let i = 0; i < DOMChoNhanVienBan.getElementsByTagName("Tivi").length; i++) {
        if (DOMChoNhanVienBan.getElementsByTagName("Tivi")[i].getAttribute("Ma_so") == MaTV) return i;
    }
    return -1;
}

function KiemTraThamSo(Mode, Ngay, ThamSo) {
    console.log("Vo ham");
    if (Array.isArray(Ngay) || Array.isArray(Mode)) return false;
    console.log("Qua ai 0.5");
    for (let i = 0; i < ThamSo.length - 1; i++) {
        if (ThamSo[i].length != ThamSo[i + 1].length) return false;
    }
    console.log("Qua ai 1");
    for (let i = 0; i < ThamSo[0].length; i++) {
        let MaTV = ThamSo[0][i];
        let SoLuong = ThamSo[1][i];
        let DonGia = ThamSo[2][i];
        let Tien = ThamSo[3][i];

        console.log(MaTV, SoLuong, DonGia, Tien);
        let ViTri = TimTiviTheoMa(MaTV);
        if (ViTri == -1) return false;
        if (SoLuong >= 0) {
            let NodeTam;
            switch (Mode) {
                case "Nhap":
                    NodeTam = DOMChoNhanVienNhap.getElementsByTagName("Tivi")[ViTri];
                    if (DonGia.toString() == NodeTam.getAttribute("Don_gia_Nhap") && (DonGia * SoLuong) == Tien) return true;
                    else return false;
                    break;
                case "Ban":
                    NodeTam = DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri];
                    if (SoLuong > parseInt(NodeTam.getAttribute("So_luong_Ton"))) return false;
                    if (DonGia.toString() == NodeTam.getAttribute("Don_gia_Ban") && (DonGia * SoLuong) == Tien) return true;
                    else return false;
                default:
                    return false;
            }
        }
    }

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
        switch (DoiTuong) {
            case "QLNhap":
                return ChuoiDuLieuNhomTiviChoQLNhap;
            case "QLBan":
                return ChuoiDuLieuNhomTiviChoQLBan;
            default:
                console.log("Doi tuong khong dung");
                return ""
        }
    }

    BanTivi(Ngay, MaTV, SoLuong, DonGia, Tien) {
        //Chuẩn hóa tham số để xử lí trường hợp bán nhiều mã TV khác nhau
        var ThamSo = [MaTV, SoLuong, DonGia, Tien];
        for (let i = 0; i < ThamSo.length; i++) {
            if (ThamSo[i] == undefined) return "false";
            if (!Array.isArray(ThamSo[i])) ThamSo[i] = [ThamSo[i]];
        }
        //Kiểm tra tham số
        if (!KiemTraThamSo("Ban", Ngay, ThamSo)) return "false";

        //Cập nhật lại dữ liệu về doanh thu, số lượng tồn và trạng thái còn hàng
        for (let i = 0; i < ThamSo[0].length; i++) {
            let ViTri = TimTiviTheoMa(ThamSo[0][i]);
            let SoLuong = ThamSo[1][i];
            let DonGia = ThamSo[2][i];
            let Tien = ThamSo[3][i];

            let SoLuongTonMoi = parseInt(DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].getAttribute("So_luong_Ton")) - SoLuong;
            let DoanhThuMoi = parseInt(DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].getAttribute("Doanh_thu")) + Tien;

            //cập nhật lại các cache
            DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
            ChuoiDuLieuChoNhanVienBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);

            DOMChoQuanLyBan.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            DOMChoQuanLyBan.getElementsByTagName("Tivi")[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
            ChuoiDuLieuChoQuanLyBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);

            if (SoLuongTonMoi == 0) DOMChoKhach.getElementsByTagName("Tivi")[ViTri].setAttribute("Trang_thai_Con_hang", "false");
            else DOMChoKhach.getElementsByTagName("Tivi")[ViTri].setAttribute("Trang_thai_Con_hang", "true");
            ChuoiDuLieuChoKhach = XMLSerializer.serializeToString(DOMChoKhach);

            DOMChoNhanVienNhap.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            ChuoiDuLieuChoNhanVienNhap = XMLSerializer.serializeToString(DOMChoNhanVienNhap);

            DOMChoQuanLyNhap.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            ChuoiDuLieuChoQuanLyNhap = XMLSerializer.serializeToString(DOMChoQuanLyNhap);
        }

        //Cập nhật dữ liệu về database
        let URL = `http://localhost:3002/insert?Mode=Ban&Ngay=${Ngay}`;
        for (let i = 0; i < ThamSo[0].length; i++)
        {
            URL += `&MaTV=${ThamSo[0][i]}&SoLuong=${ThamSo[1][i]}&DonGia=${ThamSo[2][i]}&Tien=${ThamSo[3][i]}`;
        }
        http.get( URL, (DapUng) => {

            let buffer = "";
            DapUng.setEncoding("utf8");

            DapUng.on("data", (chunk) => {
                buffer += chunk;
            })

            DapUng.on("end", () => {
                if (buffer == "") console.log("Cap nhat khong thanh cong o database");
                else {
                    ChuoiDuLieuGoc = buffer;
                    DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
                    console.log("Cap nhat thanh cong o database");
                }
            })
        })
        return "true";
    }

    NhapTivi(Ngay, MaTV, SoLuong, DonGia, Tien) {
        //Chuẩn hóa tham số để xử lí trường hợp bán nhiều mã TV khác nhau
        var ThamSo = [MaTV, SoLuong, DonGia, Tien];
        for (let i = 0; i < ThamSo.length; i++) {
            if (ThamSo[i] == undefined) return "false";
            if (!Array.isArray(ThamSo[i])) ThamSo[i] = [ThamSo[i]];
        }
        //Kiểm tra tham số
        if (!KiemTraThamSo("Nhap", Ngay, ThamSo)) return "false";

        //Cập nhật lại dữ liệu về doanh thu, số lượng tồn và trạng thái còn hàng
        for (let i = 0; i < ThamSo[0].length; i++) {
            let ViTri = TimTiviTheoMa(ThamSo[0][i]);
            let SoLuong = ThamSo[1][i];
            let DonGia = ThamSo[2][i];
            let Tien = ThamSo[3][i];

            let SoLuongTonMoi = parseInt(DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].getAttribute("So_luong_Ton")) + SoLuong;
            let DoanhThuMoi = parseInt(DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].getAttribute("Doanh_thu")) - Tien;

            //cập nhật lại các cache
            DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            DOMChoNhanVienBan.getElementsByTagName("Tivi")[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
            ChuoiDuLieuChoNhanVienBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);

            DOMChoQuanLyBan.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            DOMChoQuanLyBan.getElementsByTagName("Tivi")[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
            ChuoiDuLieuChoQuanLyBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);

            if (SoLuongTonMoi == 0) DOMChoKhach.getElementsByTagName("Tivi")[ViTri].setAttribute("Trang_thai_Con_hang", "false");
            else DOMChoKhach.getElementsByTagName("Tivi")[ViTri].setAttribute("Trang_thai_Con_hang", "true");
            ChuoiDuLieuChoKhach = XMLSerializer.serializeToString(DOMChoKhach);

            DOMChoNhanVienNhap.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            ChuoiDuLieuChoNhanVienNhap = XMLSerializer.serializeToString(DOMChoNhanVienNhap);

            DOMChoQuanLyNhap.getElementsByTagName("Tivi")[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
            ChuoiDuLieuChoQuanLyNhap = XMLSerializer.serializeToString(DOMChoQuanLyNhap);
        }

        //Cập nhật dữ liệu về database
        let URL = `http://localhost:3002/insert?Mode=Nhap&Ngay=${Ngay}`;
        for (let i = 0; i < ThamSo[0].length; i++)
        {
            URL += `&MaTV=${ThamSo[0][i]}&SoLuong=${ThamSo[1][i]}&DonGia=${ThamSo[2][i]}&Tien=${ThamSo[3][i]}`;
        }
        http.get( URL, (DapUng) => {

            let buffer = "";
            DapUng.setEncoding("utf8");

            DapUng.on("data", (chunk) => {
                buffer += chunk;
            })

            DapUng.on("end", () => {
                if (buffer == "") console.log("Cap nhat khong thanh cong o database");
                else {
                    ChuoiDuLieuGoc = buffer;
                    DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
                    console.log("Cap nhat thanh cong o database");
                }
            })
        })
        return "true";
    }
    CapNhatDonGiaBan(MaTV, DonGia) {

        let i = TimTiviTheoMa(MaTV);
        let KetQua = "true";
        if (i != -1 && parseInt(DonGia) >= 0) {
            //cập nhật lại dữ liệu cho khách, nhân viên bán và quản lý bán
            DOMChoKhach.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Ban", DonGia);
            ChuoiDuLieuChoKhach = XMLSerializer.serializeToString(DOMChoKhach);
            DOMChoNhanVienBan.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Ban", DonGia);
            ChuoiDuLieuChoNhanVienBan = XMLSerializer.serializeToString(DOMChoNhanVienBan);
            DOMChoQuanLyBan.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Ban", DonGia);
            ChuoiDuLieuChoQuanLyBan = XMLSerializer.serializeToString(DOMChoQuanLyBan);

            //cập nhật dữ liệu về database
            let URL = `http://localhost:3002/update?Mode=Ban&MaTV=${MaTV}&DonGia=${DonGia}`;
            http.get( URL, (DapUng) => {
                let buffer = "";
                DapUng.setEncoding("utf8");

                DapUng.on("data", (chunk) => {
                    buffer += chunk;
                })

                DapUng.on("end", () => {
                    if (buffer == "") console.log("Cap nhat khong thanh cong o database");
                    else {
                        ChuoiDuLieuGoc = buffer;
                        DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
                        console.log("Cap nhat thanh cong o database");
                    }
                })

            })
        } else KetQua = "false";
        return KetQua;

    }
    CapNhatDonGiaNhap(MaTV, DonGia) {

        let i = TimTiviTheoMa(MaTV);
        let KetQua = "true";
        if (i != -1 && parseInt(DonGia) >= 0) {
            //cập nhật lại dữ liệu cho nhân viên nhập và quản lý nhập
            DOMChoNhanVienNhap.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Nhap", DonGia);
            ChuoiDuLieuChoNhanVienNhap = XMLSerializer.serializeToString(DOMChoNhanVienNhap);
            DOMChoQuanLyNhap.getElementsByTagName("Tivi")[i].setAttribute("Don_gia_Nhap", DonGia);
            ChuoiDuLieuChoQuanLyNhap = XMLSerializer.serializeToString(DOMChoQuanLyNhap);

            //cập nhật dữ liệu về database
            let URL = `http://localhost:3002/update?Mode=Nhap&MaTV=${MaTV}&DonGia=${DonGia}`;
            http.get( URL, (DapUng) => {

                let buffer = "";
                DapUng.setEncoding("utf8");

                DapUng.on("data", (chunk) => {
                    buffer += chunk;
                })

                DapUng.on("end", () => {
                    ChuoiDuLieuGoc = buffer;
                    DOMDuLieuGoc = DOMParser.parseFromString(ChuoiDuLieuGoc, "text/xml");
                    console.log("Cap nhat thanh cong o database");
                })

            })
        } else KetQua = "false";
        return KetQua;

    }
}


var XuLy = new BUS();
module.exports = XuLy;