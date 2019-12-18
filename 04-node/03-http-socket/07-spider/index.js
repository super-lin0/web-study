const originRequest = require("request");
const iconv = require("iconv-lite");
const cheerio = require("cheerio");

function request(url, callback) {
  const options = {
    encoding: null
  };
  originRequest(url, options, callback);
}

// for (let i = 101521; i < 101494; i++) {
const url = `https://www.dy2018.com/i/101521.html`;
console.log("url", url);

request(url, function(err, res, body) {
  console.log("hahah");

  const html = iconv.decode(body, "gb2312");
  // console.log("html:", html);

  const $ = cheerio.load(html);

  console.log($(".title_all h1").text());
});
// }
