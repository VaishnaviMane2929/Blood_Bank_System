import axios from "axios";

const API_URL =
  "http://localhost:5000/api/donations";

export const getDonations = async () => {
  const response = await axios.get(API_URL);

  return response.data;
};

export const deleteDonation = async (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const addDonation = async (data) => {
  return axios.post(API_URL, data);
};