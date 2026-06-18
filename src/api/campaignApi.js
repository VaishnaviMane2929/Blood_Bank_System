import axios from "axios";

const API =
  "http://localhost:5000/api/campaigns";

export const getCampaigns =
  async () => {
    const res =
      await axios.get(API);

    return res.data;
  };

export const addCampaign =
  async (data) => {
    const res =
      await axios.post(
        API,
        data
      );

    return res.data;
  };

export const updateCampaign =
  async (id, data) => {
    const res =
      await axios.put(
        `${API}/${id}`,
        data
      );

    return res.data;
  };

export const deleteCampaign =
  async (id) => {
    const res =
      await axios.delete(
        `${API}/${id}`
      );

    return res.data;
  };