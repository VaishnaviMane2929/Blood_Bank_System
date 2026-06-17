import axios from "axios";

const API =
"http://localhost:5000/api/requests";

export const getRequests =
async () => {
  const res =
  await axios.get(API);

  return res.data;
};

export const addRequest =
async (data) => {
  const res =
  await axios.post(API, data);

  return res.data;
};

export const updateRequest =
async (id, data) => {
  const res =
  await axios.put(
    `${API}/${id}`,
    data
  );

  return res.data;
};

export const deleteRequest =
async (id) => {
  const res =
  await axios.delete(
    `${API}/${id}`
  );

  return res.data;
};