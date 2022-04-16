import app from "../server";
import supertest from "supertest";
import { product } from "../types";
import productModel from "../models/Product";

const request = supertest(app);
let token = "";
describe("test product", () => {
  describe("test product endpoints ", () => {
    beforeAll(async () => {
      try {
        token = (
          await request
            .post("/user/login/")
            .send({ userId: "1", password: "123" })
        ).body.token;
      } catch {}
    });
    it("add product should send product data", async () => {
      await request
        .post("/product/")
        .set({ Authorization: "token " + token })
        .expect(400);
    });
    it("test add product endpoint", async () => {
      await request
        .post("/product/")
        .send({ name: "pc", price: 20, category: "hw" } as product)
        .set({ Authorization: "token " + token })
        .expect(200);
    });
    it("test product index endpoint", async () => {
      await request.get("/product/").expect(200);
    });
    it("show should send an integer parameter", async () => {
      await request.get("/product/mostafa").expect(400);
    });
    it("show a product endpoint", async () => {
      await request.get("/product/1").expect(200);
    });
    it("show the products py category endpoint", async () => {
      await request.get("/product/category/hw").expect(200);
    });
    it("show topFive products endpoint", async () => {
      await request.get("/product/topfive").expect(200);
    });
  });
  describe("test product model", () => {
    it("add product model", async () => {
      expect(
        await productModel.create({
          name: "pc",
          price: 20,
          category: "hw",
        } as product)
      ).toBeTruthy();
    });
    it("topfive model", async () => {
      expect(await productModel.topFive()).toBeTruthy();
    });
  });
});
