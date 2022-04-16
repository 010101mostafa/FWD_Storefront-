import { Request, Response } from "express";

import _user from "./../models/User";

const index = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await _user.index());
  } catch (err) {
    res.status(400).json(err);
  }
};
const show = async (req: Request, res: Response): Promise<void> => {
  try {
    if (req.body.userId != req.params.id)
      res.status(401).json("not authotized");
    res.json(await _user.show(req.body.userId));
  } catch (err) {
    res.status(400).json(err);
  }
};
const create = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await _user.create(req.body));
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
const login = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await _user.login(req.body.userId, req.body.password));
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};
export default { index, show, create, login };
