const Campaign = require("../models/Campaign");

// ADD
const addCampaign = async (req, res) => {
  try {
    const campaign =
      await Campaign.create(req.body);

    res.status(201).json({
      success: true,
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET
const getCampaigns = async (req, res) => {
  try {
    const campaigns =
      await Campaign.find();

    res.json({
      success: true,
      campaigns,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE
const updateCampaign = async (
  req,
  res
) => {
  try {
    const campaign =
      await Campaign.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

    res.json({
      success: true,
      campaign,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE
const deleteCampaign = async (
  req,
  res
) => {
  try {
    await Campaign.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
};