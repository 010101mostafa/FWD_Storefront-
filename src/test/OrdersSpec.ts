import app from "../server";
import supertest from "supertest";
import ordersModel from "../models/Orders";

const request = supertest(app);
let token = "";
describe("test orders", () => {
  describe("test  orders router", () => {
    beforeAll(async () => {
      try {
        token = (
          await request
            .post("/user/login/")
            .send({ userId: "1", password: "123" })
        ).body.token;
      } catch {}
    });
    it("orders should send a jwt to show", async () => {
      await request.get("/orders/").expect(401);
    });
    it("current orders ", async () => {
      await request
        .get("/orders/")
        .set({ Authorization: "token " + token })
        .expect(200);
    });
    it("completed orders ", async () => {
      await request
        .get("/orders/completed")
        .set({ Authorization: "token " + token })
        .expect(200);
    });
  });
  describe("test  orders model", () => {
    it("current orders ", async () => {
      expect(await ordersModel.currentOrder(1)).toBeTruthy();
    });
    it("completed orders ", async () => {
      expect(await ordersModel.completedOrders(1)).toBeTruthy();
    });
  });
});
