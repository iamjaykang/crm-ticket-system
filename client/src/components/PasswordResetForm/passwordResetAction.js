import { reqPasswordReset } from "../../api/passwordApi";
import {
  resetRequestFail,
  resetRequestPending,
  resetRequestSuccess,
} from "./passwordResetSlice";

export const resetPassword = (email) => async (dispatch) => {
  try {
    resetRequestPending();
    const result = await reqPasswordReset(email);
    console.log(result);
    if (result.status === "success") {
      return dispatch(resetRequestSuccess(result.message, result.email));
    }
    dispatch(resetRequestFail(result.message));
  } catch (error) {
    dispatch(resetRequestFail(error));
  }
};
