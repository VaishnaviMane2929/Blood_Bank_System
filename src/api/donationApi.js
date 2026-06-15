import axios from "axios";

const API =
  "http://localhost:5000/api/donations";

export const getDonations = async () => {
  const res = await axios.get(API);
  return res.data;
};

export const addDonation = async (data) => {
  const res = await axios.post(
    API,
    data
  );

  return res.data;
};

export const updateDonation = async (
  id,
  data
) => {
  const res = await axios.put(
    `${API}/${id}`,
    data
  );

  return res.data;
};

export const deleteDonation = async (
  id
) => {
  const res = await axios.delete(
    `${API}/${id}`
  );

  return res.data;
};