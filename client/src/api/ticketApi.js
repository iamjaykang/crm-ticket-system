import axios from "axios";

const rootUrl = process.env.REACT_APP_ROOT_URL;
const ticketUrl = rootUrl + "ticket/";
const adminTicketUrl = rootUrl + "ticket/admin/";
const adminTicketsUrl = rootUrl + "ticket/all-tickets";
const updateStatusUrl = rootUrl + "ticket/close-ticket/";
const adminUpdateStatusUrl = rootUrl + "ticket/admin/close-ticket/";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const adminGetAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(adminTicketsUrl, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleTicket = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(ticketUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getSingleTicketAdmin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get(adminTicketUrl + _id, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateReplyTicket = (_id, msgObj) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.put(ticketUrl + _id, msgObj, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateTicketStatusClosed = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        updateStatusUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const updateTicketStatusClosedAdmin = (_id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        adminUpdateStatusUrl + _id,
        {},
        {
          headers: {
            Authorization: sessionStorage.getItem("accessJWT"),
          },
        }
      );
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};

export const createNewTicket = (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.post(ticketUrl, formData, {
        headers: {
          Authorization: sessionStorage.getItem("accessJWT"),
        },
      });
      resolve(result.data);
    } catch (error) {
      reject(error);
    }
  });
};
