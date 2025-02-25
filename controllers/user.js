const User = require('../models/user');
const bcrypt = require('bcryptjs');  // Import bcryptjs for password hashing

async function handleGetAllUsers(req, res) {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

async function handleCreateNewUser(req, res) {
  try {
    const { username, email, password, first_name, last_name, role } = req.body;  // Use req.body instead of req.query

    if (!username || !email || !password || !first_name || !last_name || !role) {
      return res.status(400).json({ msg: "All fields are required..." });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email is already in use" });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const result = await User.create({
      username,
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role,  // Allow role to be dynamically set (e.g., "author", "admin")
    });

    console.log("User created successfully:", result);
    return res.status(201).json({ msg: "User created successfully", user: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
}

module.exports = {
  handleGetAllUsers,
  handleCreateNewUser
};
