import axios from "axios";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3080/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNjY2NjAwNjYxLCJleHAiOjE2NjY2MDE1NjF9.uI9qVb4cK5gktDSPfbPSIzmZ5JF2ci8WG3HVcJYhq9U",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
