import axios from "axios";

const API_URL = "http://localhost:5000/api";

// ==========================================
// DASHBOARD
// ==========================================
export const getDashboardStats = async () => {
  const response = await axios.get(
    `${API_URL}/dashboard`
  );

  return response.data;
};

// ==========================================
// BLOOD STOCK
// ==========================================
export const getBloodStock = async () => {
  const response = await axios.get(
    `${API_URL}/blood-stock`
  );

  return response.data;
};

// ==========================================
// DONATIONS
// ==========================================
export const getDonations = async () => {
  const response = await axios.get(
    `${API_URL}/donations`
  );

  return response.data;
};

// ==========================================
// ADD DONATION
// ==========================================
export const addDonation = async (donationData) => {
  const response = await axios.post(
    `${API_URL}/donations`,
    donationData
  );

  return response.data;
};

// ==========================================
// ADD BLOOD REQUEST
// ==========================================
export const addBloodRequest = async (requestData) => {
  const response = await axios.post(
    `${API_URL}/requests`,
    requestData
  );

  return response.data;
};