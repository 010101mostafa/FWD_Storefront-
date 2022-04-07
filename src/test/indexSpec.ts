import app from "../.";
import supertest from "supertest";
import Image from "./../models/imagesModel";

const request = supertest(app);
describe("test image processing app ", () => {
  it("app startup and 404 not found working", () => {
    request.get("/anyPosition").expect(404);
  });
  describe("test image router ", () => {
    it("test if the image not found ", () => {
      request.get("/images/anyname").expect(404);
    });
    it("test if one missing parameter set as default (full image)", () => {
      request.get("/images/encenadaport?h=155").expect(200);
    });
    it("test if one parameter isn't a number (bad request )", () => {
      request.get("/images/encenadaport?w=a&h=155").expect(400);
    });
    it("test if everything is right two parameter (OK)", () => {
      request.get("/images/encenadaport?w=400&h=155").expect(200);
    });
    it("test if everything is right no-parameter (OK)", () => {
      request.get("/images/encenadaport").expect(200);
    });
    it("test without sending a request to server.", async () => {
      const image = new Image("encenadaport", 300, 600);
      expect(
        (await image.getImagePath()).split("\\").slice(-3).join("\\")
      ).toEqual("images\\thumbnail\\encenadaport_300_600.jpg");
    });
  });
});
