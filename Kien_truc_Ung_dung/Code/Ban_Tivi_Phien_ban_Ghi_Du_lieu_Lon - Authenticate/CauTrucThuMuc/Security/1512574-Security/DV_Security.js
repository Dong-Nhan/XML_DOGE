const http = require("http");
const { port, BUS_access_token, pathAccount, URL_BUS } = require("./config.js");
const { Security } = require("./Security.js");
const URL = require("url");
const request = require("request");

http
  .createServer((req, res) => {
    //Ở đây sẽ dựa vào account sẽ phân quyền truy vập và phân quyền thông tin các account
    //In ra request và method
    console.log(req.method, req.url);
    //Set header cho các địa chỉ khác vẫn gửi request đc
    res.setHeader("Access-Control-Allow-Origin", "*");
    if (req.method == "GET") {
      //Decode URL
      const { pathname, query } = URL.parse(req.url, true);
      switch (pathname) {
        case "/login":
        {
          if (query.user == undefined || query.pass == undefined) {
            return res.end();
          }
          let result = Security.login(query.user, query.pass);
          if (result == false) {
            return res.end("false");
          }
          return res.end(result);
        }
          break;
        case "/sign-up":
          {
            if (query.user == undefined || query.pass == undefined) {
              return res.end();
            }
            let result = Security.addAcount(query.user, query.pass);
            if (result == false) {
              return res.end("false");
            }
            return res.end(result);
          }
          break;
        default:
          //Nếu không gửi kèm access_token hoặc sai thì deny
          if (Security.check(req.headers.access_token) == false) {
            return res.end("deny");
          }
          //Đã gửi kèm access_token và xác thực thành công
          //Gọi bus tương ứng và trả dữ liệu về
          request(
            {
              headers: {
                //insert header later
                access_token: BUS_access_token
              },
              uri: URL_BUS + req.url,
              method: "GET"
            },
            (err, resp, body) => {
              if (body == "deny") {
                console.log("wrong access_token to BUS!");
                return reject(new Error("Wrong access_token to BUS!"));
              }
              if (err) {
                console.log(err + "");
                return res.end();
              }
              res.setHeader("Content-type", "text/xml");
              return res.end(body);
            }
          );
          break;
      }
    } else {
      res.end();
    }
  })
  .listen(port, err => {
    if (err) {
      console.log(err + "");
    } else {
      console.log("Server listen on port ", port);
    }
  });
