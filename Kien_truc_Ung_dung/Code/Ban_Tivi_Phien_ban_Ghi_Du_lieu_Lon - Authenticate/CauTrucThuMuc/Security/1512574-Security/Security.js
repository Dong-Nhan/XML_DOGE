const { pathAccount } = require("./config.js");
const fs = require("fs");
const xml2js = require("xml2js");

class Security {
  constructor() {
    //console.log(__dirname+'/'+pathAccount);
    let xmlData = fs.readFileSync(__dirname + "/" + pathAccount, {
      encoding: "utf-8"
    });
    xml2js.parseString(xmlData, (err, result) => {
      this.DS_account = result;
      if (this.DS_account.DS_account.account == undefined) {
        this.DS_account.DS_account = { $: {}, account: [] };
      }
    });
  }
  _hash(username, password) {
    let access_token = "";
    let user = new String(username);
    let pass = new String(password);
    for (let i = 0; i < username.length; i++) {
      access_token += String.fromCharCode(5 + user.charCodeAt(i));
    }
    for (let i = 0; i < password.length; i++) {
      access_token += String.fromCharCode(6 + pass.charCodeAt(i));
    }
    return access_token;
  }

  addAcount(username, password) {
    let access_token = this._hash(username, password);
    if (this._find(username) == true) return false;
    this.DS_account.DS_account.account.push({
      $: {
        username: username,
        access_token: access_token
      }
    });
    let Builder = new xml2js.Builder();
    let xmlres = Builder.buildObject(this.DS_account);
    fs.writeFileSync(__dirname + "/" + pathAccount, xmlres);
    return this._hash(username,password);
  }
  _find(username) {
    for (let i = 0; i < this.DS_account.DS_account.account.length; i++) {
      if (this.DS_account.DS_account.account[i].$.username == username) {
        return true;
      }
    }
    return false;
  }
  login(username, password) {
    for (let i = 0; i < this.DS_account.DS_account.account.length; i++) {
      if (this.DS_account.DS_account.account[i].$.username == username) {
        if (
          this.DS_account.DS_account.account[i].$.access_token ==
          this._hash(username, password)
        ) {
          return this.DS_account.DS_account.account[i].$.access_token;
        }
        return false;
      }
    }
    return false;
  }
  check(access_token) {
    for (let i = 0; i < this.DS_account.DS_account.account.length; i++) {
      if (
        this.DS_account.DS_account.account[i].$.access_token == access_token
      ) {
        return true;
      }
    }
    return false;
  }
}

let CSecurity = new Security();
module.exports.Security = CSecurity;
