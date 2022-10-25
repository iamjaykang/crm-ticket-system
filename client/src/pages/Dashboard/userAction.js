import { fetchUser } from "../../api/userApi";
import { getUserFail, getUserPending, getUserSuccess } from "./userSlice";

export const getUserProfile = () => async (dispatch) => {
  try {
    dispatch(getUserPending());
    //call the api
    const result = await fetchUser();

    if (result.user && result.user._id)
      return dispatch(getUserSuccess(result.user));
  } catch (error) {
    dispatch(getUserFail(error));
  }
};
