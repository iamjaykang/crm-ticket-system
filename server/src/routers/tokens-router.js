const express = require("express");
const { verifyRefreshJWT, createAccessJWT } = require("../helpers/jwt-helper");
const { getUserByEmail } = require("../models/user/user-model");
const router = express.Router();

//return refresh jwt
router.get("/", async (req, res, next) => {
  const { authorization } = req.headers;
  // TODO
  // 1. make sure the token is valid
  const decoded = await verifyRefreshJWT(authorization);
  if (decoded.email) {
    // 2. check if the jwt exists in database
    const userProfile = await getUserByEmail(decoded.email);
    if (userProfile._id) {
      let tokenExp = userProfile.refreshJWT.addedAt;
      const dbRefreshToken = userProfile.refreshJWT.token;

      tokenExp = tokenExp.setDate(
        tokenExp.getDate() + +process.env.JWT_REFRESH_SECRET_EXP_DAY
      );
      const today = new Date();
      // 3. check if its not expired and valid
      if (dbRefreshToken !== authorization && tokenExp < today) {
        return res.status(403).json({ message: "Forbidden" });
      }

      const accessJWT = await createAccessJWT(
        decoded.email,
        userProfile._id.toString()
      );

      //delete old token from redis db

      return res.json({ status: "success", accessJWT });
    }
  }

  res.status(403).json({ message: "Forbidden" });
});

module.exports = router;
