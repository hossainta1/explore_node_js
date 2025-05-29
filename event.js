const EventEmitter = require('node:events');

class SchoolBell extends EventEmitter {} // Use PascalCase for class name

const schoolBell = new SchoolBell(); // Use camelCase for variable

schoolBell.on("Ring", () => {
    console.log("Fish for Today");
});

schoolBell.emit("Ring");
