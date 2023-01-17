const request = require("supertest");
const server = require("../../app.js");

describe("Testing Static Routes", () => {
  describe("Homepage Get Endpoint", () => {
    it("Should return homepage data with status 200", async () => {
      const res = await request(server).get("/api/home/");
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty("data");
    });
  });
});
