import { promises as fs } from "fs";
import path from "path";
import sharp from "sharp";

class Image {
  constructor(name: string, w?: number, h?: number) {
    this.w = w;
    this.h = h;
    this.fullPath = path.join(path.resolve("./"), `images/full/${name}.jpg`);
    this.thumbnailPath = path.join(
      path.resolve("./"),
      `images/thumbnail/${name}_${w}_${h}.jpg`
    );
  }
  private fullPath;
  private thumbnailPath;
  private w;
  private h;
  private setW_H = async () => {
    const data = await sharp(this.fullPath).metadata();
    if (this.w == undefined) this.w = data.width;
    if (this.h == undefined) this.h = data.height;
  };
  createResizeImage = async (): Promise<void> => {
    const x = await sharp(this.fullPath);
    await this.setW_H();
    await x.resize(this.w, this.h);
    await x.toFile(this.thumbnailPath);
  };
  getImagePath =
    async (): Promise<string> /* return the faster image path*/ => {
      if (this.w === undefined && this.h === undefined) {
        return this.fullPath;
      } else {
        try {
          await fs.stat(this.thumbnailPath);
        } catch {
          await this.createResizeImage();
        }
        return this.thumbnailPath;
      }
    };
}

export default Image;
