const jwt = require("jsonwebtoken");
const { setJWT } = require("./redis-helper");
const { storeUserRefreshJWT } = require("../models/user/user-model");

const createAccessJWT = async (email, _id) => {
  try {
    const accessJWT = jwt.sign({ email }, process.env.JWT_ACCESS_SECRET, {
      expiresIn: process.env.ACCESS_JWT_EXPIRES_IN,
    });

    await setJWT(accessJWT, _id);

    return Promise.resolve(accessJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const createRefreshJWT = async (email, _id) => {
  try {
    const refreshJWT = jwt.sign({ email }, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_JWT_EXPIRES_IN,
    });

    await storeUserRefreshJWT(_id, refreshJWT);
    return Promise.resolve(refreshJWT);
  } catch (error) {
    return Promise.reject(error);
  }
};

const verifyAccessJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_ACCESS_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

const verifyRefreshJWT = (userJWT) => {
  try {
    return Promise.resolve(jwt.verify(userJWT, process.env.JWT_REFRESH_SECRET));
  } catch (error) {
    return Promise.resolve(error);
  }
};

module.exports = {
  createAccessJWT,
  createRefreshJWT,
  verifyAccessJWT,
  verifyRefreshJWT
};
