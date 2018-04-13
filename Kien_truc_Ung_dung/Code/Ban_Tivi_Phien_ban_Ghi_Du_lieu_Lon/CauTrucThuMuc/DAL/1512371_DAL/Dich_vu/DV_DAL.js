var XuLy = require("../Xu_ly/DAL.js");
var http = require("http");
var url = require("url");
var DOMParser = require("xmldom").DOMParser;
var XMLSerializer = require("xmldom").XMLSerializer;

http.createServer((YeuCau, DapUng) =>{
    var parsedUrl = url.parse(YeuCau.url, true);
    var queryObject = parsedUrl.query;
    DapUng.setHeader("Content-type", "text/xml");
    
    //xử lý các đường dẫn
    switch(parsedUrl.pathname)
    {
        //đọc dữ liệu
        case "/read":
            DapUng.end(XuLy.Doc());
        break;
        //cập nhật dữ liệu
        case "/update":
            DapUng.end(XuLy.CapNhat(queryObject.Mode, queryObject.DonGia, queryObject.MaTV));
        break;
        //thêm dữ liệu
        case "/insert":
            DapUng.end(XuLy.Them(queryObject.Mode, queryObject.Ngay, queryObject.Tien, queryObject.MaTV, queryObject.SoLuong, queryObject.DonGia))
        break;
        default:
            console.log("Truy van khong hop le: ", parsedUrl.pathname);
            DapUng.end();
    }
 
}).listen(3002, (err) =>{
    if(err) console.log("Khong the kich hoat dich vu");
    else console.log("Server dang chay o port 3002");
})