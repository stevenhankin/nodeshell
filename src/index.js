const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

const { spawn } = require("child_process");

app.get("/api", (req, res) => {
  // const ls = spawn("ls", ["-lh", "/usr"]);
  const encoded = req.query.command;
  const buff = Buffer.from(encoded, "base64");
  const decoded = buff.toString("utf8");
//   console.log(decoded);
  const args = decoded.split(/\s/);
  console.log(args[0], args.slice(1))
  const cmd = spawn(args[0], args.slice(1));

  res.setHeader('Content-Type', 'text/html');

  cmd.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
    console.log("now sending to client")
    // res.set('Content-Type', 'text/html')
    res.write(data);
  });
  cmd.stdout.on("close", (data) => {
    console.log(`closed`);
    // res.set('Content-Type', 'text/html')
    // res.send("done");
    res.end();
  });
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
