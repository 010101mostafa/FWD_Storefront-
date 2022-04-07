import express from "express";

import images from "./ImagesRouter";
const MainRouter = express.Router();

MainRouter.use("/images", images);

MainRouter.get("/", (req: express.Request, res: express.Response): void => {
  res.send("hello to the image processing app");
});

export default MainRouter;
