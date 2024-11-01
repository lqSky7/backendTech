const http = require("http");
const fs = require("fs");
const path = require("path");

const localhost = '127.0.0.1'
const port = 3001

const something = http.createServer((req, res) => {
if (req.url == "/") {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/plain");
        res.end("hello hi");
}
else{
    res.statusCode = 404;
    res.setHeader("Content-Type", "text/plain")
    res.end("Not Found");
}
})


something.listen(port, localhost,() => {
    console.log("server is listening");
    
})