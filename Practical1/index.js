var http = require("http")

const PORT = 3000;

server = http.createServer(function(req, res){
    res.writeHead(200, {"content-type" : "text/html"});
    res.end("<h1>This is my First Server!<h1>");

}).listen(PORT, ()=>{
    console.log(`Server is Running on : http://localhost:${PORT}`)
})

/*server = http.createServer(function(req, res){
    res.writeHead(200, {"content-type" : "text/html"});
    res.end("<h1>This is my First Server!<h1>");

}).listen(3000)*/