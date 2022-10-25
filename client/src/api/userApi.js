import axios from "axios";

const rootUrl = "http://localhost:3080/v1/";

const signinUrl = rootUrl + "user/login";
const userProfileUrl = rootUrl + "user";

export const userSignin = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await axios.post(signinUrl, formData);

      resolve(res.data);

      if (res.data.status === "success") {
        sessionStorage.setItem("accessJWT", res.data.accessJWT);
        localStorage.setItem(
          "crmSite",
          JSON.stringify({ refreshJWT: res.data.refreshJWT })
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const fetchUser = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const accessJWT = sessionStorage.getItem("accessJWT");

      if (!accessJWT) {
        reject("Token not found!");
      }

      const res = await axios.get(userProfileUrl, {
        headers: {
          Authorization: accessJWT,
        },
      });

      resolve(res.data);
    } catch (error) {
      reject(error.message);
    }
  });
};
