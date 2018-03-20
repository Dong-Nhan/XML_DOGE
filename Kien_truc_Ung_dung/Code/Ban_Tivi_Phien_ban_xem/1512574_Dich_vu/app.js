var http = require("http");
var fs = require("fs");

var readXML = require('./model/readXML.js');

//Khởi tạo server
http
  .createServer(function(req, res) {
    if (req.method == "get" || req.method == "GET") {
      switch (req.url) {
        //Get /data-TV
        case "/data-Khach-va-Nhan-Vien": {
          readXML.layDuLieuChoNhanVienVaKhach(req,res);
          break;
        }
        case "/data-Quan-Li-Nhap-Hang":
        {
          readXML.layDuLieuChoQuanLiNhapHang(req,res);
          break;
        }
        case "/data-Quan-Li-Ban-Hang":
        {
          readXML.layDuLieuChoQuanLiBanHang(req,res);
          break;
        }

        //Các route khác
        //Có thể là hình
        default:
          fs.readFile(__dirname + "/public/media" + req.url, (err, data) => {
            //Không tồn tại đường dẫn
            if (err) {
              res.setHeader("Access-Control-Allow-Origin", '*')
              res.end("Can not get " + req.url);
              return;
            }
            res.setHeader("Access-Control-Allow-Origin", '*')
            res.end(data);
          });
          break;
      }
    }
    if (req.method == "post" || req.method == "POST") {
      switch (req.url) {
        default:
          res.setHeader("Access-Control-Allow-Origin", '*')
          res.end("Can not post " + req.url);
          break;
      }
    }
  })
  .listen(3000);
console.log("server listen on port 3000");
