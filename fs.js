// synchronous way to read and write file

const fs = require("fs");



const text = "learning File System"
fs.writeFileSync("./hellow.tsxt", text)
const data = fs.readFileSync("./hellow.tsxt", { encoding: 'utf8' });

console.log(data)




// Asynchronous way to read and write file