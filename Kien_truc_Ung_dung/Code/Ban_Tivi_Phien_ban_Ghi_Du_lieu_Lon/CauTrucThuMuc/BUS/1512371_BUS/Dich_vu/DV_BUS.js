var http = require("http");
var url = require("url");
var XuLy = require("../Xu_ly/BUS.js");

http.createServer((YeuCau, DapUng) =>{
    var parsedUrl = url.parse(YeuCau.url, true);
    var queryObject = parsedUrl.query;

    switch (parsedUrl.pathname)
    {
        case "/lay-thong-tin-tivi":
            DapUng.setHeader("Content-type", "text/xml");
            DapUng.end(XuLy.LayThongTinTivi(queryObject.DoiTuong));
        break;
        case "/lay-thong-tin-tivi-theo-nhom":
            DapUng.setHeader("Content-type", "text/xml");
            DapUng.end(XuLy.LayThongTinTiviTheoNhom(queryObject.DoiTuong));
        break;
        case "/ban-tivi":
            DapUng.end(XuLy.BanTivi(queryObject.Ngay, queryObject.MaTV, queryObject.SoLuong, queryObject.DonGia, queryObject.Tien));
        break;
        case "/nhap-tivi":
            DapUng.end(XuLy.NhapTivi(queryObject.Ngay, queryObject.MaTV, queryObject.SoLuong, queryObject.DonGia, queryObject.Tien));
        break;
        case "/cap-nhat-don-gia-ban":
            DapUng.end(XuLy.CapNhatDonGiaBan(queryObject.MaTV, queryObject.DonGia));
        break;
        case "/cap-nhat-don-gia-nhap":
            DapUng.end(XuLy.CapNhatDonGiaNhap(queryObject.MaTV, queryObject.DonGia));
        break;
        default:
        console.log("Truy van khong hop le: ", parsedUrl.pathname);
            DapUng.end();
    }

}).listen(3001, (err)=>{
    if(err) console.log("Khong the kich hoat dich vu");
    else console.log("Server dang chay o port 3001, dang cache du lieu...")
})