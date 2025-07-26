import User from "../models/userModel.js";

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export const getAllUsers = async (req, res) => {
  try {
    const user = req.user;

    // Superadmin condition – tweak as needed
    const isSuperAdmin =
      user.role === "admin" && user.email === "btech11021.24@bitmesra.ac.in";

    const users = isSuperAdmin
      ? await User.find().select("-password")
      : await User.find({ hostel: user.hostel }).select("-password");

    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const { id } = req.params;

    if (!["student", "admin", "mess-secretary", "maintenance-secretary", "sports-secretary"].includes(role)) {
      return res.status(400).json({ message: "Invalid role." });
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });

    if (!user) return res.status(404).json({ message: "User not found." });

    res.status(200).json({ message: "Role updated!", user });
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
    }).select("-password");

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update Profile Error:", err);
    res.status(500).json({ message: "Failed to update profile" });
  }
};
