import app from "../server";
import supertest from "supertest";

const request = supertest(app);
describe("test FWD_Storefront app ", () => {
  it("app startup and 404 not found working", () => {
    request.get("/anyPosition").expect(404);
  });
});
