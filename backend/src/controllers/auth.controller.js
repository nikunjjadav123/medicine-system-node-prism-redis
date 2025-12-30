const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const redis = require('../config/redis');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

const register = catchAsync(async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new AppError("All fields are required",404);
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError("User already exists",404);
    }
    const adminExists = await prisma.user.findFirst({
      where: { role: "ADMIN" }
    });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role:adminExists ? undefined : "ADMIN"
      },
    });

    return res.status(201).json({
      success: true,
      message: 'User registered successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
    });
  }
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new AppError("All fields are required",404);
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password",404);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password",404);
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE },
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
});

const profile = catchAsync(async (req, res) => {
  try {
    const redis_cached_user_profile = await redis.get('user_profile');
    if (redis_cached_user_profile) {
      return res.json(JSON.parse(redis_cached_user_profile));
    }
    const user_profile = await prisma.user.findMany({
      where: {
        id: req.user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });
    await redis.set('user_profile', JSON.stringify(user_profile), {
      EX: 60,
    });
    res.status(200).json({
      success: true,
      data: user_profile,
    });
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message,
    });
  }
});

const logout = catchAsync(async (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const expiry =
      jwt.decode(token).exp; /* Just reads the data inside the token */

    const now = Math.floor(Date.now() / 1000);
    const ttl = expiry - now;
    if (ttl > 0) {
      await redis.set(`bl_token:${token}`, 'true', 'EX', ttl);
    }
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully',
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = { register, login, profile, logout };
