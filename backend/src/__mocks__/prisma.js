const prisma = {
  user: {
    findUnique: jest.fn(),
    create: jest.fn(),
  },
};

module.exports = prisma;
