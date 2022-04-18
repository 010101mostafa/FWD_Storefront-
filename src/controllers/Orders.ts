import { Request, Response } from "express";

import orders from "./../models/Orders";

const currentOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await orders.currentOrder(res.locals.userId));
  } catch (err) {
    res.status(400).json(err);
  }
};
const completedOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    res.json(await orders.completedOrders(res.locals.userId));
  } catch (err) {
    res.status(400).json(err);
  }
};

export default { currentOrder, completedOrders };
