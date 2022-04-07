import { Request, Response, NextFunction } from "express";

import Image from "./../models/imagesModel";

const getImage = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let w: number | undefined, h: number | undefined;
    if (req.query.w != undefined) {
      w = parseFloat(req.query.w as string);
      if (isNaN(w)) throw null;
    }
    if (req.query.h != undefined) {
      h = parseFloat(req.query.h as string);
      if (isNaN(h)) throw null;
    }
    const image = new Image(req.params.imageName, w, h);
    try {
      res.sendFile(await image.getImagePath());
    } catch {
      next();
    }
  } catch {
    res.status(400).send("the prameter don't match well");
  }
};
export default getImage;
