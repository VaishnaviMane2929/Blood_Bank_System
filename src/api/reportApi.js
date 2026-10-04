import axios from "axios";

const API_URL = "http://localhost:5000/api";

export const getReports = async () => {
  const response = await axios.get(
    `${API_URL}/reports`
  );

  console.log(
    "REPORT API RESPONSE:",
    response.data
  );

  return response.data;
};