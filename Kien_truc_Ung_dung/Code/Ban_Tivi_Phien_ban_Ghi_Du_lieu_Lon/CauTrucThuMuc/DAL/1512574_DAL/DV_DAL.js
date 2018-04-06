const http = require("http");
const { port, pathData } = require("./config.js");
const URL = require("url");
const DAL = require("./DAL.js");
const fs = require("fs");
const xml2js = require("xml2js");

// Tag = {
//   Danh_sach_Tivi: "Danh_sach_Tivi",
//   Tivi: "Tivi",
//   Nhom_Tivi: "Nhom_Tivi"
// };

// Atrib = {
//   Ten: "Ten",
//   Ma_so: "Ma_so",
//   Don_gia_Ban: "Don_gia_Ban",
//   So_luong_Ton: "So_luong_Ton",
//   Trang_thai_Con_hang: "Trang_thai_Con_hang"
// };

//Đọc sẵn dữ liệu để cache
let CacheXML = fs.readFileSync(__dirname + "/" + pathData).toString();
let CacheXMLDOM;
xml2js.parseString(CacheXML, (err, result) => {
  CacheXMLDOM = result;
});

http
  .createServer(async (req, res) => {
    console.log(req.method, req.url);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-type", "text/xml");

    if (req.method == "GET" || req.method == "get") {
      //Decode URL
      const { pathname, query } = URL.parse(req.url, true);
      //API
      switch (pathname) {
        case "/read":
          {
            if (CacheXML == "") {
              CacheXML = await DAL.read(__dirname + "/" + pathData);
              console.log("reread");
            }
            res.setHeader("Content-type", "text/xml");
            res.end(CacheXML);
          }
          break;
        case "/update":
          {
            if (query.Mode == "Ban") {
              if (query.DonGia != undefined && query.MaTV != undefined) {
                let result = await DAL.updateBan(
                  __dirname + "/" + pathData,
                  CacheXMLDOM,
                  query.DonGia,
                  query.MaTV
                );
                if (result != false) {
                  CacheXMLDOM = result[0];
                  CacheXML = result[1];
                  //console.log(CacheXMLDOM.Danh_sach_Tivi.Tivi[0]);
                  return res.end(CacheXML);
                } else {
                  return res.end();
                }
              } else {
                return res.end();
              }
            } else if (query.Mode == "Nhap") {
              if (query.DonGia != undefined && query.MaTV != undefined) {
                let result = await DAL.updateNhap(
                  __dirname + "/" + pathData,
                  CacheXMLDOM,
                  query.DonGia,
                  query.MaTV
                );
                if (result != false) {
                  CacheXMLDOM = result[0];
                  CacheXML = result[1];
                  //console.log(CacheXMLDOM.Danh_sach_Tivi.Tivi[0]);
                  return res.end(CacheXML);
                } else {
                  return res.end();
                }
              } else {
                return res.end();
              }
            }
            res.end();
          }
          break;
        case "/insert":
          {
            if (query.Mode == "Ban") {
              if (
                query.Ngay != undefined &&
                query.Tien != undefined &&
                query.MaTV != undefined &&
                query.SoLuong != undefined &&
                query.DonGia != undefined
              ) {
                let result = await DAL.insertBan(
                  __dirname + "/" + pathData,
                  CacheXMLDOM,
                  query.Ngay,
                  query.Tien,
                  query.MaTV,
                  query.SoLuong,
                  query.DonGia
                );
                if (result != false) {
                  CacheXMLDOM = result[0];
                  CacheXML = result[1];
                  //console.log(CacheXMLDOM.Danh_sach_Tivi.Tivi[0]);
                  return res.end(CacheXML);
                } else {
                  return res.end();
                }
              } else {
                return res.end();
              }
            } else if (query.Mode == "Nhap") {
              if (
                query.Ngay != undefined &&
                query.Tien != undefined &&
                query.MaTV != undefined &&
                query.SoLuong != undefined &&
                query.DonGia != undefined
              ) {
                let result = await DAL.insertNhap(
                  __dirname + "/" + pathData,
                  CacheXMLDOM,
                  query.Ngay,
                  query.Tien,
                  query.MaTV,
                  query.SoLuong,
                  query.DonGia
                );
                if (result != false) {
                  CacheXMLDOM = result[0];
                  CacheXML = result[1];
                  //console.log(CacheXMLDOM.Danh_sach_Tivi.Tivi[0]);
                  return res.end(CacheXML);
                } else {
                  return res.end();
                }
              } else {
                return res.end();
              }
            }
            res.end();
          }
          break;
        default:
          res.end();
          break;
      }
    } else {
      res.end();
    }
  })
  .listen(port, server => {
    console.log("Listen on port ", port);
  });
