const http = require("http");
const { port, URL_DAL } = require("./config.js");
const URL = require("url");
const BUS = require("./BUS.js");

let Cache = BUS.InitCache();

http
  .createServer((req, res) => {
    console.log(req.method, req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method == "GET" || req.method == "get") {
      //Decode URL
      const { pathname, query } = URL.parse(req.url, true);
      //API
      switch (pathname) {
        case "/lay-thong-tin-tivi": {
          //console.log(Cache.AllXML);
          if (query.DoiTuong == undefined) {
            //console.log(Cache.AllXML);
            return res.end();
          }
          switch (query.DoiTuong) {
            case "Khach":
              break;
            case "NVNhap":
              break;
            case "QLNhap":
              break;
            case "NVBan":
              break;
            case "QLBan":
              break;

            default:
              return res.end();
              break;
          }
        }
        default:
          return res.end();
          break;
      }
    } else {
      return res.end();
    }
  })
  .listen(port, server => {
    console.log("server listen on", port);
  });
