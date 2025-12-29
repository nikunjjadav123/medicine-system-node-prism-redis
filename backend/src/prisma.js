// backend/src/prisma.js
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient(); // ← NO ARGUMENTS

module.exports = prisma;
