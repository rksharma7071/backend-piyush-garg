const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/users")
  .then(() => console.log("Mongodb connected!"))
  .catch((err) => console.log("Mongoose Error: ", err));

// User Schema
const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  email: { type: String, required: true, unique: true },
  jobTitle: { type: String },
  gender: { type: String },
}, {
  timestamps: true
});

const User = mongoose.model("user", userSchema);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Get all users (from JSON file)
app.get("/api/users", async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// Create a new user
app.post("/api/users", async (req, res) => {
  try {
    const body = req.query;

    console.log(body);
    if (!body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title) {
      return res.status(400).json({ msg: "All fields are required..." });
    }

    const result = await User.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      gender: body.gender,
      jobTitle: body.job_title,
    });

    console.log("Result: ", result);
    return res.status(201).json({ msg: "User created successfully", user: result });
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

// Get, Update, Delete User by ID
app.route("/api/users/:id")
  .get(async (req, res) => {
    const users = await User.findById(req.params.id);
    // const id = Number(req.params.id);
    // const user = users.find((user) => user.id === id);

    // if (!user) {
    //   return res.status(404).json({ status: "error", message: "User not found" });
    // }

    res.json(users);
  })
  .patch( async(req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      lastName: "Updated Name"
    })
      res.json({ status: "success"});
  })
  .delete(async(req, res) => {
    await User.findByIdAndDelete(req.params.id);
      res.json({ status: "success", message: "User deleted successfully" });
    
  });

// Get users list in HTML format
app.get("/users",  async (req, res) => {
  const users = await User.find({});
  const html = `
    <table border='1'>
    <tr>
      <th>First Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Gender</th>
      <th>Job Title</th>
      </tr>
    ${users.map((user) => `
      <tr>
      <td>${user.firstName}</td>
      <td>${user.lastName}</td>
      <td>${user.email}</td>
      <td>${user.gender}</td>
      <td>${user.jobTitle}</td>
      </tr>
      `).join("")}
    </table>
  `;
  res.send(html);
});

// Start Server
app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));