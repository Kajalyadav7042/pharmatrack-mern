const bcrypt = require("bcrypt");
const User = require("../models/User");

// Create User
const createUser = async (req, res) => {
  try {
    const { name, email, password, role } =
      req.body;

      if (role !== "pharmacist") {
  return res.status(400).json({
    message:
      "Only pharmacist accounts can be created",
  });
}

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "User Created Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get Users
const getUsers = async (req, res) => {
  try {

    const users = await User.find()
      .select("-password")
      .sort({ createdAt: -1 });

    res.status(200).json(users);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Get User By Id
const getUserById = async (
  req,
  res
) => {
  try {

    const user =
      await User.findById(
        req.params.id
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json(user);

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

// Update User
const updateUser = async (
  req,
  res
) => {
  try {

    const { password, ...rest } =
      req.body;

    const updatedData = {
      ...rest,
    };

    if (password) {
      updatedData.password =
        await bcrypt.hash(
          password,
          10
        );
    }

    const user =
      await User.findByIdAndUpdate(
        req.params.id,
        updatedData,
        {
          new: true,
        }
      ).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message:
        "User Updated Successfully",
      user,
    });

  } catch (error) {

    res.status(500).json({
      message: error.message,
    });

  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
};