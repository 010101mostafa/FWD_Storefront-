import express from "express";
import { promises as fs } from "fs";
import path from "path";

import routers from "./routes/.";

const app = express();
app.listen(3333, (): void =>
  console.log(
    "the server is running on port 3333 \napp link:  http://localhost:3333/"
  )
);

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
