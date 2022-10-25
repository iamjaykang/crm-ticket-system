import axios from "axios";

export const getAllTickets = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("http://localhost:3080/v1/ticket", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QxQHRlc3QuY29tIiwiaWF0IjoxNjY2Njc0MTA3LCJleHAiOjE2NjY3NjA1MDd9.E5ak1XOeGRLmgvfKmyys6_GUene1RDAmWNG_akWQyv4",
        },
      });
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
