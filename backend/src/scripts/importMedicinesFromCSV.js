const fs = require("fs");
const csv = require("csv-parser");
const prisma = require("../prisma");

const medicines = [];

const LOCK_FILE = "medicine-import.lock";

if (fs.existsSync(LOCK_FILE)) {
  console.error("❌ Import already executed");
  process.exit(1);
}

fs.createReadStream("src/data/medicines.csv")
  .pipe(csv())
  .on("data", (row) => {
    medicines.push({
      name: row.name.trim(),
      description: row.description || null,
      price: Number(row.price),
      stock: Number(row.stock),
      isActive: row.isActive === "true",
      isDeleted: false,
      expiry_date: row.expiry_date ? new Date(row.expiry_date) : null,
    });
  })
  .on("end", async () => {
    try {
      await prisma.medicine.createMany({
        data: medicines
      });

      fs.writeFileSync(LOCK_FILE, "done");
      console.log("✅ CSV medicines imported successfully");
    } catch (error) {
      if (error.code === "P2002") {
        console.log("⚠️ Duplicate medicine names skipped");
      }
      console.error("❌ CSV import failed:", error.message);
    } finally {
      await prisma.$disconnect();
    }
  });
