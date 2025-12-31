const request = require("supertest");
jest.mock("../prisma.js");
jest.mock("../config/redis");

const app = require("../app.js");


describe("LOGIN API TESTS", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return error if email or password missing", async () => {
    const res = await request(app)
      .post("/api/login")
      .send({ email: "" });

    expect(res.statusCode).toBe(404);
  });

});
