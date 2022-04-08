import express from "express";
import bodyParser from 'body-parser'
import { promises as fs } from "fs";
import path from "path";

import routers from "./routes/.";

const app = express()
const address = "0.0.0.0:3000"

app.listen(3000, (): void =>
    console.log(`starting app on: ${address}`)
);
app.use(bodyParser.json());
app.use(routers);
app.use(async (req: express.Request, res: express.Response): Promise<void> => {
  const filePath = path.join(path.resolve("./"), "static files/NotFound.html");
  try {
    const fileInfo = await fs.stat(filePath);
    if (fileInfo.isFile()) {
      res.status(404);
      res.sendFile(filePath);
    }
  } catch (err) {
    res.status(404);
    return;
  }
});
export default app;
