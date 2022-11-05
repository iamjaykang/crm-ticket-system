const express = require("express");
const { hashPassword, comparePassword } = require("../helpers/bcrypt-helper");
const { emailProcessor } = require("../helpers/email-helper");
const { createAccessJWT, createRefreshJWT } = require("../helpers/jwt-helper");
const { deleteJWT } = require("../helpers/redis-helper");
const { userAuthorization } = require("../middlewares/authorization");
const {
  resetPassReqValidation,
  updatePassValidation,
  newUserValidation,
} = require("../middlewares/formValidation-middleware");
const {
  setPasswordResetPin,
  getPinByEmailPin,
  deletePin,
} = require("../models/resetPin/resetPin-model");
const router = express.Router();
const {
  insertUser,
  getUserByEmail,
  getUserById,
  updatePassword,
  storeUserRefreshJWT,
  verifyUser,
} = require("../models/user/user-model");
const { randomPinNumber } = require("../utils/randomGenerator");

router.all("/", (req, res, next) => {
  //   res.json({ message: "return from user router" });
  next();
});

//Verify user after sign up
router.patch("/verify", async (req, res) => {
  try {
    //this data is coming from database
    const { _id, pin } = req.body;
    //update our user database
    const result = await verifyUser(_id, pin);

    if (result && result._id) {
      return res.json({
        status: "success",
        message: "Your account has been activated, you may sign in now.",
      });
    }
    return res.json({
      status: "error",
      message: "Invalid request!",
    });
  } catch (error) {
    return res.json({
      status: "error",
      message: error.message,
    });
  }
});

//Get user profile router
router.get("/", userAuthorization, async (req, res) => {
  //this data is coming from database
  const _id = req.userId;

  const userProfile = await getUserById(_id);

  const { name, email } = userProfile;

  res.json({
    user: {
      _id,
      name,
      email,
    },
  });
});

// Create new user router
router.post("/", newUserValidation, async (req, res) => {
  const { name, company, email, type, password } = req.body;
  try {
    // hash password
    const hashedPass = await hashPassword(password);
    // random 6 pin for verification
    const pinLength = 6;
    const randPin = await randomPinNumber(pinLength);

    const newUserObj = {
      name,
      company,
      email,
      type,
      password: hashedPass,
      pin: randPin,
    };

    const result = await insertUser(newUserObj);
    console.log(result);

    await emailProcessor({
      email: email,
      pin: randPin,
      type: "new-user-confirmation-required",
      verificationLink:
        `${process.env.VERIFICATION_URL}verification/` + result._id,
    });
    res.json({ status: "success", message: "Your account has been created, please check your email to verify your account", result });
  } catch (error) {
    console.log(error);
    console.log(error.message)
    let message =
      "Unable to create a new account at the moment, please try again later";
    if (error.message.includes("duplicate key error collection")) {
      message = "this email is already registered";
    }
    res.json({ status: "error", message });
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

  if (!user.isVerified) {
    return res.json({
      status: "error",
      message:
        "Your account has not been verified. Please verify your email before you login",
    });
  }
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
    message: "Login Successful!",
    accessJWT,
    refreshJWT,
  });
});

// Admin sign in router
router.post("/admin/login", async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  /// hash our password and compare with the db one

  if (!email || !password) {
    return res.json({ status: "error", message: "Invalid form submission!" });
  }

  /// get user with email from db

  const user = await getUserByEmail(email);

  //check if user type is admin and if not throw error

  if (user.type != 'admin') {
    return res.json({
      status: "error",
      message:
        "Your account does not have access. Please login using the right portal",
    });
  }
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
    message: "Login Successful!",
    accessJWT,
    refreshJWT,
  });
});

// A. Create and send password reset pin number
// 1. receive email
// 2. check if user exists for the email
// 3. create unique 6 digit pin
// 4. save pin and email in db
// 5. email the pin

// C. Server side form validation
// 1. middleware to validate form data

// reset password router

router.post("/reset-password", resetPassReqValidation, async (req, res) => {
  const { email } = req.body;
  const user = await getUserByEmail(email);
  if (user && user._id) {
    const setPin = await setPasswordResetPin(email);
    await emailProcessor({
      email: email,
      pin: setPin.pin,
      passwordResetLink:
        `${process.env.VERIFICATION_URL}update-password/` +
        setPin.pin +
        `/${email}`,
      type: "request-new-password",
    });
  }

  return res.json({
    status: "success!",
    message:
      "If your account exists, the password reset pin will be sent shortly",
  });
});

// B. update password in db
// 1. receive email, pin and new password
// 2. validate pin
// 3. encrypt new password
// 4. update password in db
// 5. send email notification

// C. Server side form validation
// 1. middleware to validate form data

//update password router
router.patch("/update-password", updatePassValidation, async (req, res) => {
  const { pin, email, newPassword } = req.body;

  const getPin = await getPinByEmailPin(email, pin);

  if (getPin._id) {
    const dbDate = getPin.addedAt;
    const expiresIn = 15;
    let expDate = dbDate.setMinutes(dbDate.getMinutes() + expiresIn);

    const today = new Date();

    if (today > expDate) {
      return res.json({ status: "error", message: "Invalid or expired pin" });
    }
    const hashedPass = await hashPassword(newPassword);

    const user = await updatePassword(email, hashedPass);

    if (user._id) {
      await emailProcessor({ email: email, type: "password-update-success" });
      deletePin(email, pin);
      return res.json({
        status: "success",
        message: "Your password has been updated",
      });
    }
  }
  res.json({
    status: "error",
    message: "Unable to update your password",
  });
});

// User logout and invalidate jwts
// 1. get jwt and verify
// 2. delete accessJWT from redis db
// 3. delete refreshJWT from mongodb

router.delete("/logout", userAuthorization, async (req, res) => {
  const { authorization } = req.headers;

  const _id = req.userId;

  deleteJWT(authorization);

  const result = await storeUserRefreshJWT(_id, "");
  if (result._id) {
    return res.json({ status: "success", message: "Logged out Successfully!" });
  }
  res.json({ status: "error", message: "Unable to logout, please try again" });
});

module.exports = router;
