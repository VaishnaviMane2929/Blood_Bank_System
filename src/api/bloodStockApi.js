import axios from "axios";

const API =
  "http://localhost:5000/api/blood-stock";

export const getStocks = async () => {
  const res = await axios.get(API);

  return res.data;
};

export const addStock = async (data) => {
  const res = await axios.post(
    API,
    data
  );

  return res.data;
};

export const updateStock = async (
  id,
  data
) => {
  const res = await axios.put(
    `${API}/${id}`,
    data
  );

  return res.data;
};

export const deleteStock = async (
  id
) => {
  const res = await axios.delete(
    `${API}/${id}`
  );

  return res.data;
};