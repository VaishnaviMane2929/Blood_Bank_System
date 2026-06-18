const express = require("express");

const router = express.Router();

const {
  addCampaign,
  getCampaigns,
  updateCampaign,
  deleteCampaign,
} = require("../controllers/campaignController");

router.post("/", addCampaign);

router.get("/", getCampaigns);

router.put("/:id", updateCampaign);

router.delete("/:id", deleteCampaign);

module.exports = router;