import React, { useEffect, useState } from 'react'
import { shortText } from '../../utils/validation';

const initialFormData = {
    subject: "",
    issueDate: "",
    details: "",
  };
  
  const initialFormError = {
    subject: false,
    issueDate: false,
    details: false,
  };

const NewTicketForm = () => {
    const [formData, setFormData] = useState(initialFormData);
    const [formDataError, setFormDataError] = useState(initialFormError);
  
    const onChangeHandler = (e) => {
      const { name, value } = e.target;
  
      setFormData({
        ...formData,
        [name]: value,
      });
      console.log(name, value);
    };
  
    const onSubmitHandler = async (e) => {
      e.preventDefault();
  
      setFormDataError(initialFormError)
  
      const isSubjectValid = await shortText(formData.subject)
  
          setFormDataError({
              ...initialFormError,
              subject: !isSubjectValid,
          })
  
      console.log("Form Submit received");
    };
  
    useEffect(() => {}, [formData, formDataError]);
  return (
    <div>
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
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
          <p className='text-danger'>{formDataError.subject && 'Enter a valid subject!'}</p>
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
            htmlFor="details"
          >
            Details
          </label>
          <textarea
            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3"
            name="details"
            value={formData.details}
            rows="5"
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-400 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded w-full"
            type="submit"
          >
            Add Ticket
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default NewTicketForm