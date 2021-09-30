function share(onServerStart, target, port) {

const fs = require("fs");
const path = require("path");

let stats = undefined;

try {
  stats = fs.statSync(target);
} catch(e) {
  console.error(`File/folder ${target} does not exist.`)
  // console.error(e);
}

try {
  const express = require("express");
  const serveIndex = require("serve-index");

  const app = express();

  if (stats.isDirectory()) {
    app.use("/", express.static(target), serveIndex(target)); // nevermind `we use :route because then when you click on a link, it goes to localhost:3000/:route/path/to/file, instead of localhost:3000/path/to/file which doesn't exist`, b/c i am using ngrok now.
  } else {
    app.get("/", (req, res) => {
      res.download(target);
    })
  }

  const portfinder = require("portfinder");

  portfinder.getPort({
    port: port || 8000,    // minimum port
    stopPort: port || 8080 // maximum port
  }, (err, port) => {
    if (err) {
      console.error("Unable to start server. Ports 8000 to 8080 are already be used");
    } else {

    server = app.listen(port, async () => {
      await onServerStart();
    })

    }

  })

} catch(e) {
  console.error("An error occurred. Please contact the developer.")
  console.log(e);
}

}


module.exports = {
	share: share
}
