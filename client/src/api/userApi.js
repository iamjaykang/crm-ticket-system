import axios from "axios";

const signinUrl = "http://localhost:3080/v1/user/login";

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
