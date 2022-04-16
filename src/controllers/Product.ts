import { Request, Response } from "express";

import product from "./../models/Product";

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await product.index());
  } catch (err) {
    res.status(400).json(err);
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await product.show(parseInt(req.params.id)));
  } catch (err) {
    res.status(400).json(err);
  }
};
const topFive = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await product.topFive());
  } catch (err) {
    res.status(400).json(err);
  }
};
const showCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await product.showCategory(req.params.category));
  } catch (err) {
    res.status(400).json(err);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await product.create(req.body));
  } catch (err) {
    res.status(400).json(err);
  }
};
export default { index, show, create, topFive, showCategory };
