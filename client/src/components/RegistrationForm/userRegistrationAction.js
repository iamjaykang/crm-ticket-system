import { userRegistrationApi } from "../../api/userApi";
import {
  registrationFail,
  registrationPending,
  registrationSuccess,
} from "./userRegistrationSlice";

export const userRegistration = (formData) => async (dispatch) => {
  dispatch(registrationPending());
  try {
    //api
    const result = await userRegistrationApi(formData);
    console.log(result)
    //feedback
    //updates redux store
    result.status === "success"
      ? dispatch(registrationSuccess(result.message))
      : dispatch(registrationFail(result.message));
  } catch (error) {
    dispatch(registrationFail(error.message));
  }
};
