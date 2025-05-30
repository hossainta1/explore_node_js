const http = require("http");
const { url } = require("inspector");

const data = [
  {
    "title": "First Note",
    "body": "This is the body of the first note.",
    "createdAt": "2025-05-30T12:00:00Z"
  },
  {
    "title": "Second Note",
    "body": "This is the body of the second note.",
    "createdAt": "2025-05-30T14:30:00Z"
  },
  {
    "title": "Third Note",
    "body": "This is the body of the third note.",
    "createdAt": "2025-05-30T16:45:00Z"
  }
]


const server = http.createServer((req, res) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);

    if (req.url === "/todos" && req.method === "GET") {
        res.writeHead(200, {
            "Content-Type": "application/json",
        });
        // res.setHeader("Content-Type", "text/plain")
        // res.setHeader("email", "ph2@gmail.com")
        // res.statusCode = 201
        res.end(JSON.stringify(data));

    } else if (req.url === "/todos/create-todo" && req.method === "POST") {
        res.end("TODO Created");

    } else {
        res.end("Route Not Found");
    }
});

server.listen(5000, "127.0.0.1", () => {
    console.log("✅ Server is listening on http://127.0.0.1:5000");
});

//  /todo - GET - all todo
//  /todo/create-todo - POST create
// 
