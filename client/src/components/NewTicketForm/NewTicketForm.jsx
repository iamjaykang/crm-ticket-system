import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../pages/Dashboard/userAction";
import { shortText } from "../../utils/validation";
import { openNewTicket } from "./newTicketAction";
import { resetSuccessMsg } from "./newTicketSlice";

const initialFormData = {
  subject: "",
  issueDate: "",
  message: "",
};

const initialFormError = {
  subject: false,
  issueDate: false,
  message: false,
};

const NewTicketForm = () => {
  const dispatch = useDispatch();
  const {
    user: { name, type },
  } = useSelector((state) => state.user);
  const { isLoading, successMsg, error } = useSelector(
    (state) => state.openTicket
  );
  const [formData, setFormData] = useState(initialFormData);
  const [formDataError, setFormDataError] = useState(initialFormError);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    setFormDataError(initialFormError);

    const isSubjectValid = await shortText(formData.subject);

    setFormDataError({
      ...initialFormError,
      subject: !isSubjectValid,
    });

    dispatch(openNewTicket({ ...formData, sender: name, type: type }));
  };

  useEffect(() => {
    if (!name) {
      dispatch(getUserProfile());
    }
    return ()=>{
      successMsg && dispatch(resetSuccessMsg())
    }
  }, [dispatch, formData, formDataError]);
  return (
    <div className="text-xl">
      <div className="bg-gray-100 shadow-2xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
        <h1 className="font-bold border-b text-2xl p-2">Add New Ticket</h1>
        <form autoComplete="Off" onSubmit={onSubmitHandler}>
          <div className="my-4">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="subject"
            >
              Subject
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
              type="text"
              name="subject"
              value={formData.subject}
              placeholder="Subject"
              maxLength="100"
              onChange={onChangeHandler}
              required
            />
            <p className="text-danger">
              {formDataError.subject && "Enter a valid subject!"}
            </p>
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="Issue Found At"
            >
              Issue Found At
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="issueDate"
              value={formData.issueDate}
              onChange={onChangeHandler}
              type="date"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-grey-darker text-sm font-bold mb-2"
              htmlFor="message"
            >
              Details
            </label>
            <textarea
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
              name="message"
              value={formData.message}
              rows="5"
              onChange={onChangeHandler}
            />
          </div>
          {successMsg && (
            <div
              className="p-4 my-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-greeen-200 dark:text-green-800"
              role="alert"
            >
              {successMsg}
            </div>
          )}
          {error && (
            <div
              className="p-4 my-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className="flex items-center justify-between">
            <button
              className="bg-cyan-500 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
              type="submit"
            >
              Add Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewTicketForm;
