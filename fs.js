// synchronous way to read and write file

// const fs = require("fs");



// const text = "learning File System"
// fs.writeFileSync("./hellow.tsxt", text)
// const data = fs.readFileSync("./hellow.tsxt", { encoding: 'utf8' });

// console.log(data)




// Asynchronous way to read and write file

const fs = require('fs');

fs.readFile('./hellow.tsxt', { encoding: 'utf8' }, (err, data) => {
    if (err) {
        console.log("Something went wrong:", err);
        return;
    }
    console.log(data);
});
