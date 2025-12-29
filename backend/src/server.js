const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const medicineRoute = require("./routes/route.medicine");
const userRoutes = require("./routes/route.user");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/',userRoutes);
app.use('/medicine',medicineRoute);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Graceful shutdown (important for Prisma)
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
