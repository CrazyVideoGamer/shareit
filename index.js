console.log("---------------------") // separater for nodemon dev

let argv = process.argv.slice(2);
if (argv.length < 1) {
  console.error("Please give the file or folder to share.");
} else if (argv.length > 1) {
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
    app.use("/:route", express.static(target), serveIndex(target)); // we use :route because then when you click on a link, it goes to localhost:3000/:route/path/to/file, instead of localhost:3000/path/to/file which doesn't exist.
  } else {
    app.get("/:route", (req, res) => {
      res.download(target);
    })
  }

  const portfinder = require("portfinder");

  portfinder.getPort({
    port: 8000,    // minimum port
    stopPort: 8080 // maximum port
  }, (err, port) => {
    if (err) {
      console.error("Unable to start server. Ports 8000 to 8080 are already be used");
    } else {

    server = app.listen(port, async () => {
      let remakeRoute = true; // will stay true in the case of a route name collision

      console.log("Creating url...")

      async function createRoute() {
        const namor = require("namor");
        const route = namor.generate({ words: 2, saltLength: 5 })

        const ip = require("ip");
        const addr = ip.address();

        try {
          const axios = require("axios").default;
          let res = await axios.post("http://localhost:3000", {
              route: route,
              info: {
                addr: addr,
                port: port
              }
          })
          if (res.data === "route created") {
            console.log(`Shared! Go to https://shareit.crazyvideogamer.repl.co/${route}`);
            remakeRoute = false;
          }
        } catch {
          console.error("Error: Unable to create url. Our server may be down.");
          server.close();
          remakeRoute = false;
        }
      }
      // await createRoute();
      while (remakeRoute === true) {
        await createRoute();
      }
    })

    }

  })

} catch(e) {
  console.error("An error occurred. Please contact the developer.")
  console.log(e);
}

}