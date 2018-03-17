var http = require("http");
var fs = require("fs");

//Khởi tạo server
http
  .createServer(function(req, res) {
    if (req.method == "get" || req.method == "GET") {
      switch (req.url) {
        //Get /data-TV
        case "/data-TV": {
          fs.readFile(__dirname + "/data/Danh_sach_Tivi.xml", (err, data) => {
            if (err) {
              console.log(err);
              res.writeHead(404);
              res.end(err.message);
              return;
            }
            res.writeHead(200);
            res.end(data);
          });
          break;
        }

        //Các route khác
        //Có thể là hình
        default:
          fs.readFile(__dirname + "/public/media" + req.url, (err, data) => {
            //Không tồn tại đường dẫn
            if (err) {
              res.writeHead(404);
              res.end("Can not get " + req.url);
              return;
            }
            res.writeHead(200);
            res.end(data);
          });
          break;
      }
    }
    if (req.method == "post" || req.method == "POST") {
      switch (req.url) {
        default:
          res.writeHead("404");
          res.end("Can not post " + req.url);
          break;
      }
    }
  })
  .listen(3000);
console.log("server listen on port 3000");
