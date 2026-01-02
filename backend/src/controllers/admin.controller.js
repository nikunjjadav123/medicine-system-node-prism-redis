const prisma = require("../prisma");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

const updateUserRole = catchAsync(async (req, res) => {
  const { role } = req.body;
  const userId = req.params.id;

  console.log("Updating user ID:", userId); // debug

  if (!userId) {
    throw new AppError("User ID missing in URL", 400);
  }

  // 🔍 Check user exists
  const existingUser = await prisma.user.findUnique({
    where: { id: userId }
  });

  if (!existingUser) {
    throw new AppError("User not found", 404);
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: { role }
  });

  res.status(200).json({
    message: "Role updated successfully",
    userId: user.id,
    newRole: user.role
  });
});

module.exports = updateUserRole;
