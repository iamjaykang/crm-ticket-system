import axios from "axios";

const rootUrl = "http://localhost:3080/v1/";

const passwordResetUrl = rootUrl + "user/reset-password";
const passwordUpdateUrl = rootUrl + "user/update-password";

export const reqPasswordReset = (email) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(passwordResetUrl, {
        email,
      });
      console.log(result);

      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const reqPasswordUpdate = (passObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(passwordUpdateUrl, passObj);
      console.log(result);

      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};
