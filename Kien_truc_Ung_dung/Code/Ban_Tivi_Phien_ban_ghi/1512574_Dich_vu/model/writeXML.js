var xml2js = require("xml2js");
var fs = require("fs");

module.exports = {
  Nhap: function(req, res, dataNhap) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let Ngay = dataNhap.Ngay;
    let TongTien = dataNhap.TongTien;
    let MaTV = dataNhap.MaTV;
    let SoLuong = dataNhap.SoLuong;
    let DonGia = dataNhap.DonGia;

    if (
      Ngay == undefined ||
      TongTien == undefined ||
      MaTV == undefined ||
      SoLuong == undefined ||
      DonGia == undefined
    ) {
      return res.end("erorr");
    }
    //let Tien = dataNhap.Tien;

    var xml = fs.readFileSync(
      __dirname + "/../data/Danh_sach_Tivi.xml",
      "utf-8"
    );
    if (xml == null) {
      console.log(err);
      return res.end("erorr");
    }
    xml2js.parseString(xml, (err, data) => {
      if (err) {
        console.log(err);
        return res.end("erorr");
      }
      //insert data
      let i;
      for (i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
        if (data.Danh_sach_Tivi.Tivi[i].$.Ma_so == MaTV) {
          //console.log(data.Danh_sach_Tivi.Tivi[i].Danh_sach_Nhap_hang[0]);
          data.Danh_sach_Tivi.Tivi[i].Danh_sach_Nhap_hang[0].Nhap_hang.push({
            $: {
              Ngay: Ngay,
              Don_gia: DonGia,
              So_luong: SoLuong,
              Tien: TongTien
            }
          });
          break;
        }
      }
      //không tìm thấy sản phẩm
      if(i == data.Danh_sach_Tivi.Tivi.length){
        return res.end('erorr');
      }
      var builder = new xml2js.Builder();
      var xmlres = builder.buildObject(data);
      fs.writeFileSync(__dirname + "/../data/Danh_sach_Tivi.xml", xmlres, {
        encoding: "utf-8",
        flag: "w"
      });
      return res.end("success");
    });
  },
  Ban: function(req, res, dataBan) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let HoTen = dataBan.HoTen;
    let Ngay = dataBan.Ngay;
    let TongTien = dataBan.TongTien;
    let MaTV = dataBan.MaTV;
    let SoLuong = dataBan.SoLuong;
    let DonGia = dataBan.DonGia;
    //let Tien = dataNhap.Tien;

    if (
      HoTen == undefined ||
      Ngay == undefined ||
      TongTien == undefined ||
      MaTV == undefined ||
      SoLuong == undefined ||
      DonGia == undefined
    ) {
      return res.end("erorr");
    }
    var xml = fs.readFileSync(
      __dirname + "/../data/Danh_sach_Tivi.xml",
      "utf-8"
    );
    if (xml == null) {
      console.log(err);
      return res.end("erorr");
    }
    xml2js.parseString(xml, (err, data) => {
      if (err) {
        console.log(err);
        return res.end("erorr");
      }
      //insert data
      let i;
      for (i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
        if (data.Danh_sach_Tivi.Tivi[i].$.Ma_so == MaTV) {
          //console.log(data.Danh_sach_Tivi.Tivi[i].Danh_sach_Nhap_hang[0]);
          data.Danh_sach_Tivi.Tivi[i].Danh_sach_Ban_hang[0].Ban_hang.push({
            $: {
              Ngay: Ngay,
              Don_gia: DonGia,
              So_luong: SoLuong,
              Tien: TongTien
            }
          });
          break;
        }
      }
      //không tìm thấy sản phẩm
      if(i == data.Danh_sach_Tivi.Tivi.length){
        return res.end('erorr');
      }
      
      var builder = new xml2js.Builder();
      var xmlres = builder.buildObject(data);
      fs.writeFileSync(__dirname + "/../data/Danh_sach_Tivi.xml", xmlres, {
        encoding: "utf-8",
        flag: "w"
      });
      return res.end("success");
    });
  },
  CapNhatGiaBan:function(req, res, dataCapNhatGiaBan) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let MaTV = dataCapNhatGiaBan.MaTV;
    let DonGiaBan = dataCapNhatGiaBan.DonGiaBan;
    //let Tien = dataNhap.Tien;

    if (
      MaTV == undefined ||
      DonGiaBan == undefined
    ) {
      return res.end("erorr");
    }
    var xml = fs.readFileSync(
      __dirname + "/../data/Danh_sach_Tivi.xml",
      "utf-8"
    );
    if (xml == null) {
      console.log(err);
      return res.end("erorr");
    }
    xml2js.parseString(xml, (err, data) => {
      if (err) {
        console.log(err);
        return res.end("erorr");
      }
      //insert data
      let i;
      for (i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
        if (data.Danh_sach_Tivi.Tivi[i].$.Ma_so == MaTV) {
            data.Danh_sach_Tivi.Tivi[i].$.Don_gia_Ban = DonGiaBan;
          break;
        }
      }
      //không tìm thấy sản phẩm
      if(i == data.Danh_sach_Tivi.Tivi.length){
        return res.end('erorr');
      }
      var builder = new xml2js.Builder();
      var xmlres = builder.buildObject(data);
      fs.writeFileSync(__dirname + "/../data/Danh_sach_Tivi.xml", xmlres, {
        encoding: "utf-8",
        flag: "w"
      });
      return res.end("success");
    });
  },
  CapNhatGiaNhap:function(req, res, dataCapNhatGiaNhap) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    let MaTV = dataCapNhatGiaNhap.MaTV;
    let DonGiaNhap = dataCapNhatGiaNhap.DonGiaNhap;
    //let Tien = dataNhap.Tien;

    if (
      MaTV == undefined ||
      DonGiaNhap == undefined
    ) {
      return res.end("erorr");
    }
    var xml = fs.readFileSync(
      __dirname + "/../data/Danh_sach_Tivi.xml",
      "utf-8"
    );
    if (xml == null) {
      console.log(err);
      return res.end("erorr");
    }
    xml2js.parseString(xml, (err, data) => {
      if (err) {
        console.log(err);
        return res.end("erorr");
      }
      //insert data
      let i;
      for (i = 0; i < data.Danh_sach_Tivi.Tivi.length; i++) {
        if (data.Danh_sach_Tivi.Tivi[i].$.Ma_so == MaTV) {
            data.Danh_sach_Tivi.Tivi[i].$.Don_gia_Nhap = DonGiaNhap;
          break;
        }
      }
      //không tìm thấy sản phẩm
      if(i == data.Danh_sach_Tivi.Tivi.length){
        return res.end('erorr');
      }
      var builder = new xml2js.Builder();
      var xmlres = builder.buildObject(data);
      fs.writeFileSync(__dirname + "/../data/Danh_sach_Tivi.xml", xmlres, {
        encoding: "utf-8",
        flag: "w"
      });
      return res.end("success");
    });
  }
};
