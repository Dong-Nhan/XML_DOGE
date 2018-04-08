var fs = require("fs");
var DuongDan = "../Du_lieu/";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

//cache dữ liệu trên RAM
//var ChuoiDuLieu = fs.readFileSync(DuongDan + "Danh_sach_Tivi.xml", "utf8");

//dữ liệu nhỏ để test
var ChuoiDuLieu = fs.readFileSync(DuongDan + "Test.xml", "utf8");

var DOMDuLieu = new DOMParser().parseFromString(ChuoiDuLieu, "text/xml");
var Danh_sach_Tivi = DOMDuLieu.getElementsByTagName("Tivi");

class DAL {
    Doc() {
        return ChuoiDuLieu;
    }

    CapNhat(Mode, DonGia, MaTV) {
        let i;
        //cập nhật DOM
        switch (Mode) {
            //cập nhật đơn giá bán
            case "Ban":
                i = this.TimTiviTheoMa(MaTV);
                if (i != -1) {
                    Danh_sach_Tivi[i].setAttribute("Don_gia_Ban", DonGia);
                } else return "";
                break;

                //cập nhật đơn giá nhập
            case "Nhap":
                i = this.TimTiviTheoMa(MaTV);
                if (i != -1) {
                    Danh_sach_Tivi[i].setAttribute("Don_gia_Nhap", DonGia);
                } else return "";
                break;

            default:
                return "";
        }
        //cập nhật dữ liệu cache
        ChuoiDuLieu = new XMLSerializer().serializeToString(DOMDuLieu);
        //cập nhật file dữ liệu xml
        fs.writeFileSync(DuongDan + "Test.xml", ChuoiDuLieu, "utf8");
        console.log("Cap nhat thanh cong");

        return ChuoiDuLieu;
    }

    Them(Mode, Ngay, Tien, MaTV, SoLuong, DonGia) {
        let NodeTam;
        let i, SoLuongTonMoi;
        //cập nhật DOM
        switch (Mode) {
            //bán tivi theo phiếu bán
            case "Ban":
                i = this.TimTiviTheoMa(MaTV);
                if (i != -1) {
                    let Danh_sach_Ban_hang = Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Ban_hang")[0];
                    NodeTam = DOMDuLieu.createElement("Ban_hang");
                    NodeTam.setAttribute("Ngay", Ngay);
                    NodeTam.setAttribute("Don_gia", DonGia);
                    NodeTam.setAttribute("So_luong", SoLuong);
                    NodeTam.setAttribute("Tien", Tien);

                    Danh_sach_Ban_hang.appendChild(NodeTam);
                    SoLuongTonMoi = parseInt(Danh_sach_Tivi[i].getAttribute("So_luong_Ton")) - parseInt(SoLuong);
                    Danh_sach_Tivi[i].setAttribute("So_luong_Ton", SoLuongTonMoi);
                } else return "";
                break;

                //nhập tivi theo phiếu nhập
            case "Nhap":
                i = this.TimTiviTheoMa(MaTV);
                if (i != -1) {
                    let Danh_sach_Nhap_hang = Danh_sach_Tivi[i].getElementsByTagName("Danh_sach_Nhap_hang")[0];
                    NodeTam = DOMDuLieu.createElement("Nhap_hang");
                    NodeTam.setAttribute("Ngay", Ngay);
                    NodeTam.setAttribute("Don_gia", DonGia);
                    NodeTam.setAttribute("So_luong", SoLuong);
                    NodeTam.setAttribute("Tien", Tien);

                    Danh_sach_Nhap_hang.appendChild(NodeTam);
                    SoLuongTonMoi = parseInt(Danh_sach_Tivi[i].getAttribute("So_luong_Ton")) + parseInt(SoLuong);
                    Danh_sach_Tivi[i].setAttribute("So_luong_Ton", SoLuongTonMoi);
                } else return "";
                break;

            default:
                return "";
        }
        //cập nhật dữ liệu cache
        ChuoiDuLieu = new XMLSerializer().serializeToString(DOMDuLieu);
        //cập nhật file dữ liệu xml
        fs.writeFileSync(DuongDan + "Test.xml", ChuoiDuLieu, "utf8");
        console.log("Them thanh cong");
        return ChuoiDuLieu;

    }

    TimTiviTheoMa(MaTV) //trả về số thứ tự của Tivi trong mảng Danh_sach_Tivi
    {
        for (var i = 0; i < Danh_sach_Tivi.length; i++) {
            if (Danh_sach_Tivi[i].getAttribute("Ma_so") == MaTV)
                return i;
        }
        return -1;
    }
}

var XuLy = new DAL();
module.exports = XuLy;