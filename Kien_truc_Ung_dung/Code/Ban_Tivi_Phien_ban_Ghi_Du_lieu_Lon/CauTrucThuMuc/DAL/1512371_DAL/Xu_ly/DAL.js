var fs = require("fs");
var DuongDan = "../Du_lieu/";
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;
var TenFile = "Danh_sach_Tivi.xml";

//cache dữ liệu trên RAM
var ChuoiDuLieuGoc = fs.readFileSync(DuongDan + TenFile, "utf8");
var DOMDuLieuGoc = new DOMParser().parseFromString(ChuoiDuLieuGoc, "text/xml");
var Danh_sach_Tivi_Goc = DOMDuLieuGoc.getElementsByTagName("Tivi");

//chuỗi dữ liệu trả về là chuỗi rút gọn, không có Danh sách nhập và bán hàng
var ChuoiDuLieuTraVe, DOMRutGon, Danh_sach_Tivi_Rut_gon;
DOMRutGon = new DOMParser().parseFromString(ChuoiDuLieuGoc, "text/xml");
Danh_sach_Tivi_Rut_gon = DOMRutGon.getElementsByTagName("Tivi");
for (let i = 0; i < Danh_sach_Tivi_Rut_gon.length; i++)
{
    Danh_sach_Tivi_Rut_gon[i].removeChild(Danh_sach_Tivi_Rut_gon[i].getElementsByTagName("Danh_sach_Ban_hang")[0]);
    Danh_sach_Tivi_Rut_gon[i].removeChild(Danh_sach_Tivi_Rut_gon[i].getElementsByTagName("Danh_sach_Nhap_hang")[0]);
}
ChuoiDuLieuTraVe = new XMLSerializer().serializeToString(DOMRutGon);


//xử lý với điều kiện tầng BUS đã kiểm tra tính đúng đắn của thông tin
class DAL {
    Doc() {
        return ChuoiDuLieuTraVe;
    }

    CapNhat(Mode, DonGia, MaTV) {
        let i;
        //cập nhật DOM
        switch (Mode) {
            //cập nhật đơn giá bán
            case "Ban":
                i = this.TimTiviTheoMa(MaTV);
                Danh_sach_Tivi_Goc[i].setAttribute("Don_gia_Ban", DonGia);
                Danh_sach_Tivi_Rut_gon[i].setAttribute("Don_gia_Ban", DonGia);
                break;

                //cập nhật đơn giá nhập
            case "Nhap":
                i = this.TimTiviTheoMa(MaTV);
                Danh_sach_Tivi_Goc[i].setAttribute("Don_gia_Nhap", DonGia);
                Danh_sach_Tivi_Rut_gon[i].setAttribute("Don_gia_Nhap", DonGia);
                break;
            default:
                return "";
        }
        //cập nhật dữ liệu cache
        ChuoiDuLieuGoc = new XMLSerializer().serializeToString(DOMDuLieuGoc);
        ChuoiDuLieuTraVe = new XMLSerializer().serializeToString(DOMRutGon);
        //cập nhật file dữ liệu xml
        fs.writeFile(DuongDan + TenFile, ChuoiDuLieuGoc, "utf8", (err) => {
            if (err) throw err;
            console.log("Cap nhat thanh cong");
        });

        return ChuoiDuLieuTraVe;
    }

    Them(Mode, Ngay, Tien, MaTV, SoLuong, DonGia) {
        let NodeTam;
        let ViTri, SoLuongTonMoi, DoanhThuMoi;
        //chuẩn hóa tham số
        if (!Array.isArray(MaTV)){
        MaTV = [MaTV]; SoLuong = [SoLuong]; DonGia = [DonGia]; Tien = [Tien];
        }
        //cập nhật DOM
        for (let i = 0; i < MaTV.length; i++){
        switch (Mode) {
            //bán tivi theo phiếu bán
            case "Ban":
                ViTri = this.TimTiviTheoMa(MaTV[i]);
                let Danh_sach_Ban_hang = Danh_sach_Tivi_Goc[ViTri].getElementsByTagName("Danh_sach_Ban_hang")[0];
                NodeTam = DOMDuLieuGoc.createElement("Ban_hang");
                NodeTam.setAttribute("Ngay", Ngay);
                NodeTam.setAttribute("Don_gia", DonGia[i]);
                NodeTam.setAttribute("So_luong", SoLuong[i]);
                NodeTam.setAttribute("Tien", Tien[i]);

                Danh_sach_Ban_hang.appendChild(NodeTam);
                SoLuongTonMoi = parseInt(Danh_sach_Tivi_Goc[ViTri].getAttribute("So_luong_Ton")) - parseInt(SoLuong[i]);
                DoanhThuMoi = parseInt(Danh_sach_Tivi_Goc[ViTri].getAttribute("Doanh_thu")) + parseInt(Tien[i]);
                Danh_sach_Tivi_Goc[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
                Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
                if (SoLuongTonMoi == 0) {
                    Danh_sach_Tivi_Goc[ViTri].setAttribute("Trang_thai_Con_hang", "false");
                    Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Trang_thai_Con_hang", "false");
                }                    
                else {
                    Danh_sach_Tivi_Goc[ViTri].setAttribute("Trang_thai_Con_hang", "true");
                    Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Trang_thai_Con_hang", "true");
                }
                Danh_sach_Tivi_Goc[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
                Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);                
                break;

                //nhập tivi theo phiếu nhập
            case "Nhap":
                ViTri = this.TimTiviTheoMa(MaTV[i]);
                let Danh_sach_Nhap_hang = Danh_sach_Tivi_Goc[ViTri].getElementsByTagName("Danh_sach_Nhap_hang")[0];
                NodeTam = DOMDuLieuGoc.createElement("Nhap_hang");
                NodeTam.setAttribute("Ngay", Ngay);
                NodeTam.setAttribute("Don_gia", DonGia[i]);
                NodeTam.setAttribute("So_luong", SoLuong[i]);
                NodeTam.setAttribute("Tien", Tien[i]);

                Danh_sach_Nhap_hang.appendChild(NodeTam);
                SoLuongTonMoi = parseInt(Danh_sach_Tivi_Goc[ViTri].getAttribute("So_luong_Ton")) + parseInt(SoLuong[i]);
                DoanhThuMoi = parseInt(Danh_sach_Tivi_Goc[ViTri].getAttribute("Doanh_thu")) - parseInt(Tien[i]);
                Danh_sach_Tivi_Goc[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
                Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("So_luong_Ton", SoLuongTonMoi);
                if (SoLuongTonMoi == 0) {
                    Danh_sach_Tivi_Goc[ViTri].setAttribute("Trang_thai_Con_hang", "false");
                    Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Trang_thai_Con_hang", "false");
                }                    
                else {
                    Danh_sach_Tivi_Goc[ViTri].setAttribute("Trang_thai_Con_hang", "true");
                    Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Trang_thai_Con_hang", "true");
                }
                Danh_sach_Tivi_Goc[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);
                Danh_sach_Tivi_Rut_gon[ViTri].setAttribute("Doanh_thu", DoanhThuMoi);       
                break;
            default:
                return "";
        }
    }
        //cập nhật dữ liệu cache
        ChuoiDuLieuGoc = new XMLSerializer().serializeToString(DOMDuLieuGoc);
        ChuoiDuLieuTraVe = new XMLSerializer().serializeToString(DOMRutGon);
        //cập nhật file dữ liệu xml
        fs.writeFile(DuongDan + TenFile, ChuoiDuLieuGoc, "utf8", (err) => {
            if (err) throw err;
            console.log("Them thanh cong");
        });
        return ChuoiDuLieuTraVe;

    }

    TimTiviTheoMa(MaTV) //trả về số thứ tự của Tivi trong mảng Danh_sach_Tivi
    {
        for (var i = 0; i < Danh_sach_Tivi_Goc.length; i++) {
            if (Danh_sach_Tivi_Goc[i].getAttribute("Ma_so") == MaTV)
                return i;
        }
        return -1;
    }
}

var XuLy = new DAL();
module.exports = XuLy;