import { reqPasswordReset, reqPasswordUpdate } from "../../api/passwordApi";
import {
  resetRequestFail,
  resetRequestPending,
  resetRequestSuccess,
  updateRequestPending,
  updateRequestSuccess,
  updateRequestFail
} from "./passwordResetSlice";

export const resetPassword = (email) => async (dispatch) => {
  try {
    resetRequestPending();
    const result = await reqPasswordReset(email);
    console.log(result);
    if (result.status === "success") {
      return dispatch(resetRequestSuccess(result.message));
    }
    dispatch(resetRequestFail(result.message));
  } catch (error) {
    dispatch(resetRequestFail(error));
  }
};

export const updatePassword = (passObj) => async (dispatch) => {
  try {
    updateRequestPending();
    const result = await reqPasswordUpdate(passObj);
    console.log(result);
    if (result.status === "success") {
      return dispatch(updateRequestSuccess(result.message));
    }
    dispatch(updateRequestFail(result.message));
  } catch (error) {
    dispatch(updateRequestFail(error));
  }
};
