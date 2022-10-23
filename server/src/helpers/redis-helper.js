const redis = require("redis");
const client = redis.createClient(process.env.REDIS_URL);

client.on("error", async (err) => console.log("Redis Client Error", err));

// let loaded = false;

// if (!loaded) {
//   client.connect();
//   loaded = !loaded;
// } else {
//   client.disconnect();
//   loaded = !loaded;
// }

const setJWT = (key, value) => {
  console.log(key);
  return new Promise(async (resolve, reject) => {
    try {
      client.set(key, value, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getJWT = (key) => {
  return new Promise((resolve, reject) => {
    try {
      client.get(key, (err, res) => {
        if (err) reject(err);
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteJWT = (key) => {
  try {
    client.del(key);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setJWT,
  getJWT,
  deleteJWT,
};
