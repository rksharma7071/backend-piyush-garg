const http = require("http");
const fs = require('fs');
const url = require("url");


const myServer = http.createServer((req, res) => {

  if(req.url == "/favicon.ico") return res.end();
  const timestamp = Date.now();
  const formattedDate = new Date(timestamp).toLocaleString();

  const log = `${formattedDate}: ${req.url} : New request received\n`;

  const myUrl = url.parse(req.url ,true);
  console.log(myUrl);

  fs.appendFile('log.txt', log, (err, data) => {
    switch (myUrl.pathname) {
      case '/':
        res.end("Home Page");
        break;
      case '/about':
        const username = myUrl.query.username;
        res.end(`Hi ${username}`);
        break;
      default:
        res.end("404 Page Not Found!");
    }
  })
})

myServer.listen(8000, () => console.log("Server Started..."));