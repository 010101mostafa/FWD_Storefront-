import app from "../server";
import supertest from "supertest";
import { user } from "../types";
import userModel from "../models/User";

const request = supertest(app);
let token = "";
describe("User", () => {
  describe("user endpoints ", () => {
    beforeAll(async () => {
      try {
        token = (
          await request
            .post("/user/login/")
            .send({ userId: "1", password: "123" })
        ).body.token;
      } catch {}
    });
    it("create endpoint should send the user data", async () => {
      await request.post("/user/").expect(400);
    });
    it("the create endpoint", async () => {
      await request
        .post("/user/")
        .send({
          firstname: "mostafa",
          lastname: "safwat",
          password: "123",
        } as user)
        .expect(200);
    });
    it("should login with the correct password", async () => {
      await request
        .post("/user/login")
        .send({
          userId: "1",
          password: "password",
        })
        .expect(400);
    });
    it("the login endpoint", async () => {
      await request
        .post("/user/login")
        .send({
          userId: "1",
          password: "123",
        })
        .expect(200);
    });
    it("index should send a jwt in token part in Authorization .", async () => {
      await request.get("/user/").expect(401);
    });
    it("index endpoint", async () => {
      await request
        .get("/user/")
        .set({ Authorization: "token " + token })
        .expect(200);
    });
    it("show other user not authotized.", async () => {
      await request
        .get("/user/3")
        .set({ Authorization: "token " + token })
        .expect(401);
    });
    it("show endpoint", async () => {
      await request
        .get("/user/1")
        .set({ Authorization: "token " + token })
        .expect(200);
    });
  });
  describe("User model", () => {
    it("test create", async () => {
      expect(
        (
          await userModel.create({
            firstname: "mostafa",
            lastname: "safwat",
            password: "123",
          } as user)
        ).token
      ).toBeInstanceOf(String);
    });
  });
});
