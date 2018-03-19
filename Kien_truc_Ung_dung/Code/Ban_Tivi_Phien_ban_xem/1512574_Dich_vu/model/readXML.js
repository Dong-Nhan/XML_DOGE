var xml2js = require("xml2js");
var fs = require("fs");

TAG = {
  Danh_sach_Tivi: "Danh_sach_Tivi",
  Tivi: "Tivi",
  Nhom_Tivi: "Nhom_Tivi",
  Ten: "Ten",
  Ma_so: "Ma_so",
  Don_gia_Ban: "Don_gia_Ban",
  So_luong_Ton: "So_luong_Ton",
  Trang_thai_Con_hang: "Trang_thai_Con_hang"
};

module.exports = {
  layDuLieuChoNhanVienVaKhach: function(req, res) {
    fs.readFile(__dirname + "/../data/Danh_sach_Tivi.xml", (err, xml) => {
      if (err) {
        console.log(err);
        res.writeHead(304);
        return res.end();
      }
      xml2js.parseString(xml, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(304);
          return res.end();
        }
        for (let i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
          delete data.Danh_sach_Tivi.Tivi[i].Danh_sach_Ban_hang;
          delete data.Danh_sach_Tivi.Tivi[i].Danh_sach_Nhap_hang;
        }
        res.writeHead(200);
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.end(xml);
      });
    });
  },
  layDuLieuChoQuanLiNhapHang: function(req, res) {
    fs.readFile(__dirname + "/../data/Danh_sach_Tivi.xml", (err, xml) => {
      if (err) {
        console.log(err);
        res.writeHead(304);
        return res.end();
      }
      xml2js.parseString(xml, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(304);
          return res.end();
        }
        for (let i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
          delete data.Danh_sach_Tivi.Tivi[i].Danh_sach_Ban_hang;
        }
        res.writeHead(200);
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.end(xml);
      });
    });
  },
  layDuLieuChoQuanLiBanHang: function(req, res) {
    fs.readFile(__dirname + "/../data/Danh_sach_Tivi.xml", (err, xml) => {
      if (err) {
        console.log(err);
        res.writeHead(304);
        return res.end();
      }
      xml2js.parseString(xml, (err, data) => {
        if (err) {
          console.log(err);
          res.writeHead(304);
          return res.end();
        }
        for (let i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
          delete data.Danh_sach_Tivi.Tivi[i].Danh_sach_Nhap_hang;
        }
        res.writeHead(200);
        var builder = new xml2js.Builder();
        var xml = builder.buildObject(data);
        res.end(xml);
      });
    });
  }
};
