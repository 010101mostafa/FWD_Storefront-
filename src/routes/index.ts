import express, { Request, Response } from "express";
import Product from "./Product";
import orders from "./Orders";
import user from "./User";

const MainRouter = express.Router();
MainRouter.use("/Product", Product);
MainRouter.use("/orders", orders);
MainRouter.use("/user", user);
MainRouter.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default MainRouter;
