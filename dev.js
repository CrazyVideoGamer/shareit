let app = require("nodemon")({
  // watch: ["server"],
  exec: [process.argv[0]],
  script: "server/index.js",
  args: ["server"]
});