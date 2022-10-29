import axios from "axios";

const rootUrl = process.env.REACT_APP_ROOT_URL;

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
