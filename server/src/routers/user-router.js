const { json } = require("body-parser");
const express = require("express");
const { hashPassword, comparePassword } = require("../helpers/bcrypt-helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt-helper");
const { userAuthorization } = require("../middlewares/authorization");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  getUserById,
} = require("../models/user/user-model");

router.all("/", (req, res, next) => {
  //   res.json({ message: "return from user router" });
  next();
});

//Get user profile router
router.get("/", userAuthorization, async (req, res) => {
  //this data is coming from database
  const _id = req.userId;

  const userProfile = await getUserById(_id);

  res.json({ user: userProfile });
});

// Create new user router
router.post("/", async (req, res) => {
  const { name, company, address, phone, email, password } = req.body;
  try {
    // hash password
    const hashedPass = await hashPassword(password);

    const newUserObj = {
      name,
      company,
      address,
      phone,
      email,
      password: hashedPass,
    };

    const result = await insertUser(newUserObj);
    console.log(result);

    res.json({ message: "New user created", result });
  } catch (error) {
    console.log(error);
    res.json({ status: "error", message: error.message });
  }
});

// User sign in router
router.post("/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  /// hash our password and compare with the db one

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submission!" });
  }

  /// get user with email from db

  const user = await getUserByEmail(email);
  console.log(user);

  const passFromDb = user && user._id ? user.password : null;

  if (!passFromDb)
    return res.json({ status: "error", message: "Invalid email or password!" });

  const result = await comparePassword(password, passFromDb);

  if (!result) {
    return res.json({ status: "error", message: "Invalid email or password!" });
  }

  const accessJWT = await createAccessJWT(user.email, `${user._id}`);

  const refreshJWT = await createRefreshJWT(user.email, `${user._id}`);

  console.log(result);

  res.json({
    status: "success",
    message: "Login Successfully!",
    accessJWT,
    refreshJWT,
  });
});

module.exports = router;
