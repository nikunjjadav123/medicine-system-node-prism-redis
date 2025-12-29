const prisma = require('../prisma');
const redis = require('../config/redis');

const createMedicine = async (req, res) => {
  try {
    const { name, description, price, stock, expiry_date } = req.body;

    const existingMedicine = await prisma.medicine.findFirst({
      where: { name },
    });

    if (existingMedicine) {
      return res.status(409).json({
        error: 'Medicine already exists',
      });
    }

    const medicine = await prisma.medicine.create({
      data: {
        name: name,
        description: description,
        price: price,
        stock: stock,
        expiry_date: expiry_date ? new Date(expiry_date) : null,
      },
    });
    await redis.del('all_medicines');

    res.status(201).json(medicine);
  } catch (error) {
    console.error('PRISMA ERROR FULL:', error);
    res.status(500).json({ error: error.message });
  }
};

const GetAllMedicines = async (req, res) => {
  try {
    const redis_cached_medicines = await redis.get('medicines');
    if (redis_cached_medicines) {
      return res.json(JSON.parse(redis_cached_medicines));
    }

    const medicines = await prisma.medicine.findMany({
      where: {
        isActive: true,
        isDeleted: false,
        OR: [{ expiry_date: null }, { expiry_date: { gt: new Date() } }],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    await redis.set('medicines', JSON.stringify(medicines), {
      EX: 60,
    });
    res.status(200).json({
      success: true,
      data: medicines,
    });
  } catch (error) {
    console.error('GetAllMedicines error:', error);

    res.status(500).json({
      success: false,
      message: 'Failed to fetch medicines',
    });
  }
};

const deleteMedicine = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: 'Medicine ID is required',
      });
    }

    const updatedMedicine = await prisma.medicine.update({
      where: {
        id: id,
      },
      data: {
        isDeleted: true,
      },
    });
    await redis.del('all_medicines');

    return res.status(200).json({
      success: true,
      message: 'Medicine updated successfully',
      data: updatedMedicine,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error,
    });
  }
};

module.exports = { createMedicine, GetAllMedicines, deleteMedicine };
