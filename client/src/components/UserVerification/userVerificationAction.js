import { userVerificationApi } from "../../api/userApi";
import {
  verificationFail,
  verificationPending,
  verificationSuccess,
} from "./userVerificationSlice";

export const userVerification = (formData) => async (dispatch) => {
  dispatch(verificationPending());
  try {
    //api
    const result = await userVerificationApi(formData);
    console.log(result);
    //feedback
    //updates redux store
    if (result.status === "success") {
      return dispatch(verificationSuccess(result.message));
    }
    dispatch(verificationFail(result.message));
  } catch (error) {
    dispatch(verificationFail(error.message));
  }
};
