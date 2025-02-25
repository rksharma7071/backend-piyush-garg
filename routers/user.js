const express = require("express");
const {
  handleGetAllUsers,
  handleCreateNewUser
} = require('../controllers/user');

const router = express.Router();

// Get all users, Create new user
router.route('/')
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);

module.exports = router;
