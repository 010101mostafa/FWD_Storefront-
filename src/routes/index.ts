import express, { Request ,Response }from "express";


const MainRouter = express.Router();

MainRouter.get('/', function (req: Request, res: Response) {
    res.send('Hello World!')
})


export default MainRouter;
