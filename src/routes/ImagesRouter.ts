import express from "express";
import getImage from "./../controllers/imagesController";

const images = express.Router();
images.get("/:imageName", getImage);
export default images;
