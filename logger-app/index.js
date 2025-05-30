const path = require("path");
const fs = require("fs");

const inpustArgument = process.argv.slice(2);

// Validation: Check if arguments were passed
if (inpustArgument.length === 0) {
    console.log("❌ Please provide a message to log");
    console.log("Example: node index.js Hello world");
    process.exit(1);
}

const text = inpustArgument.join(" ");
const timestamp = new Date().toISOString();
const message = `${text} - ${timestamp}\n`;

const filePath = path.join(__dirname, "log.txt");

fs.appendFile(filePath, message, { encoding: "utf-8" }, (err) => {
    if (err) {
        console.error("❌ Error writing to file:", err);
        return;
    }
    console.log("✅ Your log was added successfully!");
});

console.log("📁 Saved to:", filePath);
