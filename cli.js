let argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error("Please give the file or folder to share.");
} else if (argv.length > 2) {
  console.error("Too much arguments. Please provide only one argument.")
} else if (argv.includes("--help") || argv.includes("-h")) {
  console.log(`shareIt - an easy way to transfer files/folders to different devices
Usage: shareIt ./path/to/file/or/folder
Options:
  -h or --help    Display help message and exit
`)
} else {

const fs = require("fs");
const path = require("path");

let target = argv[0];
if (!path.isAbsolute(target)) {
  target = path.join(process.cwd(), target);
}

}
