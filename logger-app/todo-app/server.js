const http = require("http");
const { url } = require("inspector");

const server = http.createServer((req, res) => {
    //     console.log(req.url, res.method)
    //    res.end("welcome to TODO app")
    if (req.url === "/todos" && req.method === "GET") {
       res.end("All TODO")
    } else if(req.url === "/todos/create-todo" && req.method === "POST"){
       res.end("TODO Created")
    }
    else{
         res.end("Route Not Found")
    }
});

server.listen(5000, "127.0.0.1", () => {
    console.log("✅ Server listing on port 5000")
});

//  /todo - GET - all todo
//  /todo/create-todo - POST create
// 
