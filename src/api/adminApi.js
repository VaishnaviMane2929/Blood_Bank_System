import axios from "axios";

export const adminLogin =
async (data) => {
  const res = await axios.post(
    "http://localhost:5000/api/admin/login",
    data
  );

  return res.data;
};