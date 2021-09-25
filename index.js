function share(target, port) {

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
    port: 8000,    // minimum port
    stopPort: 8080 // maximum port
  }, (err, port) => {
    if (err) {
      console.error("Unable to start server. Ports 8000 to 8080 are already be used");
    } else {

    server = app.listen(port, async () => {
      let remakeRoute = true; // will stay true in the case of a route name collision

      console.log("Creating url...")

			const ngrok = require("ngrok")

      async function createRoute() {
        const namor = require("namor");
        const route = namor.generate({ words: 2, saltLength: 5 })

				remakeRoute = false;

				const url = await ngrok.connect(port);

				console.log(url);	

        //const ip = require("ip");
        //const addr = ip.address();

        //try {
        //  const axios = require("axios").default;
        //  let res = await axios.post("http://localhost:3000", {
        //      route: route,
        //      info: {
        //        addr: addr,
        //        port: port
        //      }
        //  })
        //  if (res.data === "route created") {
        //    console.log(`Shared! Go to https://shareit.crazyvideogamer.repl.co/${route}`);
        //    remakeRoute = false;
        //  }
        //} catch {
        //  console.error("Error: Unable to create url. Our server may be down.");
        //  server.close();
        //  remakeRoute = false;
        //}
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


module.exports = {
	share: share
}
