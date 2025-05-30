const http = require("http");
const { url } = require("inspector");
const path = require("path");
const fs = require("fs")

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;


    // Get all todos

    if (pathname === "/todos" && req.method === "GET") {

        const data = fs.readFileSync(filePath, { encoding: "utf8" })
        res.writeHead(200, {
            "Content-Type": "application/json",
        });

        res.end(data);

    }

    // Post a Todos


    else if (pathname === "/todos/create-todo" && req.method === "POST") {

        let data = ""

        req.on("data", (chunk) => {
            data = data + chunk

        })

        req.on("end", () => {

            const { title, body } = JSON.parse(data);

            const createdAt = new Date().toLocaleString();

            const allTodos = fs.readFileSync(filePath, { encoding: "utf8" });
            const parseAllTodos = JSON.parse(allTodos);

            parseAllTodos.push({ title, body, createdAt })

            fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), { encoding: "utf8" });

            res.end(JSON.stringify({ title, body, createdAt }, null, 2));
        })


    }

    //  Get Single todo

    else if (pathname === "/todo" && req.method === "GET") {
        const title = url.searchParams.get("title");
        console.log(title);

        const data = fs.readFileSync(filePath, { encoding: "utf8" });
        const parseData = JSON.parse(data);

        const todo = parseData.find((todo) => todo.title === title);

        res.writeHead(200, {
            "Content-Type": "application/json",
        });

        if (todo) {
            res.end(JSON.stringify(todo, null, 2));
        } else {
            res.writeHead(404, {
                "Content-Type": "application/json",
            });
            res.end(JSON.stringify({ error: "Todo not found" }));
        }
    }
    //  update todo
    else if (pathname === "/todos/update-todo" && req.method === "PATCH") {
        const title = url.searchParams.get("title");

        let data = "";

        req.on("data", (chunk) => {
            data += chunk;
        });

        req.on("end", () => {
            const { body } = JSON.parse(data);

            const allTodos = fs.readFileSync(filePath, { encoding: "utf8" });
            const parseAllTodos = JSON.parse(allTodos);

            const todoIndex = parseAllTodos.findIndex((todo) => todo.title === title);

            if (todoIndex === -1) {
                res.writeHead(404, { "Content-Type": "application/json" });
                return res.end(JSON.stringify({ error: "Todo not found" }));
            }

            parseAllTodos[todoIndex].body = body;

            fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), { encoding: "utf8" });

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(parseAllTodos[todoIndex], null, 2));
        });
    }



    else {
        res.end("Route Not Found");
    }
});

server.listen(5000, "127.0.0.1", () => {
    console.log("✅ Server is listening on http://127.0.0.1:5000");
});

//  /todo - GET - all todo
//  /todo/create-todo - POST create
// 
