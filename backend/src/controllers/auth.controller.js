const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const prisma = require('../prisma');
const redis = require('../config/redis');

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required',
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'User already exists',
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required',
    });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email or password',
    });
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    process.env.JWT_SECRET_KEY,
    { expiresIn: process.env.JWT_EXPIRE },
  );

  return res.status(200).json({
    success: true,
    message: 'Login successful',
    token,
  });
};

const profile = async (req, res) => {
  try {
    const redis_cached_user_profile = await redis.get('user_profile');
    if (redis_cached_user_profile) {
      return res.json(JSON.parse(redis_cached_user_profile));
    }
    const user_profile = await prisma.user.findMany({
      where: {
        id: req.user.id,
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
};

const logout = async (req, res) => {
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
};

module.exports = { register, login, profile, logout };
