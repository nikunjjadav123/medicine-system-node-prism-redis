const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const medicineRoute = require('./routes/route.medicine');
const userRoutes = require('./routes/route.user');
const adminRoutes = require('./routes/route.admin');
const prisma = require("./prisma");
const errorMiddleware = require("./middleware/error.middleware");
const path = require("path");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use('/api', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/medicine', medicineRoute);
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

app.use(errorMiddleware);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


// Graceful shutdown (important for Prisma)
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});
