const http = require("http");
const fs = require("fs");
const url = require("url");
const path = require("path");
const port = 8080;

const server = http.createServer((req, res) => {
  const parsed_url = url.parse(req.url);
  const path_name = parsed_url.pathname;

  let filename;
  if (path_name === "/") {
    filename = "index.html";
  } else if (path_name === "/about") {
    filename = "about.html";
  } else if (path_name === "/contact") {
    filename = "contact.html";
  } else {
    filename = "404.html";
  }

  const file_path = path.join(__dirname, filename);

  fs.readFile(file_path, (error, data) => {
    if (error) {
      res.writeHead(404, { "content-type": "text/html" })
      res.write("404 not found")
    }
    else {
        res.writeHead(200, { "content-type": "text/html" })
        res.write(data)
    }
    res.end()
  });
});

server.listen(port, (error) => {
  if (error) {
    console.log("error", error);
  } else {
    console.log("all good");
  }
});
