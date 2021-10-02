console.log(process.argv);
argv = process.argv.slice(1);

let { share } = require("./index.js");
console.log(share);

share(...argv, async (port) => {
  let remakeRoute = true; // will stay true in the case of a route name collision

  console.log("Creating url...")

  const ngrok = require("ngrok");

  const url = await ngrok.connect(port);
  console.log(`Created! Go to ${url} to view your files.`)

  // async function createRoute() {
  //   const namor = require("namor");
  //   const route = namor.generate({ words: 2, saltLength: 5 })

  //   remakeRoute = false;

  //   const url = await ngrok.connect(port);

  //   console.log(url);	

  //   const ip = require("ip");
  //   const addr = ip.address();

  //   try {
  //    const axios = require("axios").default;
  //    let res = await axios.post("http://localhost:3000", {
  //        route: route,
  //        info: {
  //          addr: addr,
  //          port: port
  //        }
  //    })
  //    if (res.data === "route created") {
  //      console.log(`Shared! Go to https://shareit.crazyvideogamer.repl.co/${route}`);
  //      remakeRoute = false;
  //    }
  //   } catch {
  //    console.error("Error: Unable to create url. Our server may be down.");
  //    server.close();
  //    remakeRoute = false;
  //   }
  // }
  // await createRoute();
  // while (remakeRoute === true) {
  //   await createRoute();
  // }
})