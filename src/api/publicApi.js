// src/api/publicApi.js

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

// Get all donors
export const getDonations = async () => {
  const response = await axios.get(
    `${API_URL}/donations`
  );

  return response.data;
};


// Add donor
export const addDonation = async (donationData) => {
  const response = await axios.post(
    `${API_URL}/donations`,
    donationData
  );

  return response.data;
};


// ==========================================
// BLOOD REQUESTS
// ==========================================

// Add blood request
export const addBloodRequest = async (requestData) => {
  const response = await axios.post(
    `${API_URL}/requests`,
    requestData
  );

  console.log(
    "BLOOD REQUEST API RESPONSE:",
    response.data
  );

  return response.data;
};


// Get all blood requests
export const getBloodRequests = async () => {
  const response = await axios.get(
    `${API_URL}/requests`
  );

  return response.data;
};


// ==========================================
// CONTACT
// ==========================================

// Add contact message
export const addContact = async (contactData) => {
  const response = await axios.post(
    `${API_URL}/contacts`,
    contactData
  );

  console.log(
    "CONTACT API RESPONSE:",
    response.data
  );

  return response.data;
};


// Get all contact messages
export const getContacts = async () => {
  const response = await axios.get(
    `${API_URL}/contacts`
  );

  return response.data;
};


// Update contact message
export const updateContact = async (
  id,
  contactData
) => {
  const response = await axios.put(
    `${API_URL}/contacts/${id}`,
    contactData
  );

  return response.data;
};


// Delete contact message
export const deleteContact = async (id) => {
  const response = await axios.delete(
    `${API_URL}/contacts/${id}`
  );

  return response.data;
};

// ==========================================
// ABOUT
// ==========================================

export const getAbout = async () => {
  const response = await axios.get(`${API_URL}/about`);

  return response.data;
};

export const updateAbout = async (aboutData) => {
  const response = await axios.put(
    `${API_URL}/about`,
    aboutData
  );

  return response.data;
};