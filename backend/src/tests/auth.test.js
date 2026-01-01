const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

jest.mock("../prisma");
jest.mock("../middleware/rateLimiter", () => ({
  createLimiter: (req, res, next) => next(),
}));
const request = require("supertest");
const prisma = require("../prisma");
const app = require("../app");

describe("LOGIN API TESTS", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  // 1️⃣ EMAIL MISSING (JOI) JEST TEST
  it("should return 400 if email is missing", async () => {
     const res = await request(app).post("/api/login").send({password:"Test@1230"});
     expect(res.statusCode).toBe(400);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  });

  // 2️⃣ PASSWORD MISSING (JOI)
  it("should return 400 if password is missing", async () => {
     const res = await request(app).post("/api/login").send({email:"nikunj@gmail.com"});
     expect(res.statusCode).toBe(400);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  });

  // 3️⃣ SHORT PASSWORD TESTING (JOI)
  it("should return 400 if password length is less than 6 ", async () => {
     const res = await request(app).post("/api/login").send({password:"123"});
     expect(res.statusCode).toBe(400);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  });

  // 4️⃣ INVALID EMAIL FORMAT (JOI)
  it("should return 400 for invalid email format", async () => {
     const res = await request(app).post("/api/login").send({email:"nikunj",password:"Test@123"});
     expect(res.statusCode).toBe(400);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  });

  // 5️⃣ USER NOT FOUND
  it("should return 401 for if User not found", async () => {

    prisma.user.findUnique.mockResolvedValue(null);

    const res = await request(app).post("/api/login").send({email:"notfound@gmail.com",password:"Test@123"});
    expect(res.statusCode).toBe(401);         

  });

  // 6️⃣ WRONG PASSWORD
  it("should return 401 for if User not found", async () => {
     const hashedPassword = await bcrypt.hash("Test@123", 10);
     prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "nikunj@gmail.com",
      password: hashedPassword,
    });

     const res = await request(app).post("/api/login").send({email:"nikunj@gmail.com",password:"Wrongpassword123"});
     expect(res.statusCode).toBe(401);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
  });

  // 7️⃣ SUCCESSFUL LOGIN 
  it("should return 200 on successful login", async () => {

    process.env.JWT_SECRET_KEY = "868fc5c1f5d81381c7d11ef36b4d39f5";
    process.env.JWT_EXPIRE = "1d";


    const hashedPassword = await bcrypt.hash("Test@123", 10);

    prisma.user.findUnique.mockResolvedValue({
      id: 1,
      email: "nikunj@gmail.com",
      password: hashedPassword,
    });

    const res = await request(app)
      .post("/api/login")
      .send({
        email: "nikunj@gmail.com",
        password: "Test@123",
      });
      
    expect(res.statusCode).toBe(200);
});


});
