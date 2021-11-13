const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const dbConnect = require("./lib/db/dbConnect");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => dbConnect())
  .then(() => {
    createServer((req, res) => {
      const parsedUrl = parse(req.url, true);

      handle(req, res, parsedUrl);
    }).listen(3000, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log("> Ready on http://localhost:3000");
    });
  });
