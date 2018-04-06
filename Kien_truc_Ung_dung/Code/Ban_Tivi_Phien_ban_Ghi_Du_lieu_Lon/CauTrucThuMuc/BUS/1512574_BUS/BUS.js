const request = require("request");
const xml2js = require("xml2js");

module.exports.InitCache = async function() {
  let Cache = {};
  //Lấy toàn bộ dữ liệu từ DAL
  await BUS.readAllDAL(URL_DAL, (err, body) => {
    Cache.AllXML = body;
    console.log("Cache XML from DAL done!");
  });

  //Chuyển từ dạng XML sang DOMXML
  await xml2js.parseString(Cache.AllXML, (err, result) => {
    if (err) {
      Cache.AllXMLDOM = undefined;
      console.log("ParseString XML to XMLDOM False!");
      console.log(err);
    } else {
      Cache.AllXMLDOM = result;
      console.log("ParseString XML to XMLDOM done!");
    }
  });

  //Tiền xử lí dữ liệu trả về cho Khách Tham Quan
  Cache.ThongTinTiViChoKhachXML = BUS.LayThongTinTiViChoKhach(Cache.AllXML);
};

module.exports.readAllDAL = async function(URL_DAL, Callback) {
  await request(
    {
      headers: {
        //insert header later
        lol: "abc"
      },
      uri: URL_DAL + "/read",
      method: "GET"
    },
    (err, res, body) => {
      //it works!
      Callback(err, body);
    }
  );
};

module.exports.LayThongTinTiViChoKhach = function(AllXML) {};
