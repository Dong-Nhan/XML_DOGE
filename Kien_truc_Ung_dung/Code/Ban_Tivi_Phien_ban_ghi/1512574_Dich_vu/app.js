var http = require("http");
var fs = require("fs");
const URL= require('url');

var readXML = require('./model/readXML');
var writeXML = require('./model/writeXML');

//Khởi tạo server
http
  .createServer(function(req, res) {
    if (req.method == "get" || req.method == "GET") {

      //Decode URL
      const myURL = URL.parse(req.url,true);

      switch (myURL.pathname) {
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
        case "/nhap":
        {
          // console.log(fs.readFileSync('data/abc.txt','utf-8'));
          // fs.writeFileSync('data/abc.txt','tin đẹp trai',{encoding:'utf-8',flag:'w'});
          writeXML.Nhap(req,res,myURL.query);
          break;
        }
        case "/ban":
        {
          writeXML.Ban(req,res,myURL.query);
          break;
        }
        case "/cap-nhat-don-gia-nhap":
        {
          writeXML.CapNhatGiaNhap(req,res,myURL.query);
          break;
        }
        
        case "/cap-nhat-don-gia-ban":
        {
          writeXML.CapNhatGiaBan(req,res,myURL.query);
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
