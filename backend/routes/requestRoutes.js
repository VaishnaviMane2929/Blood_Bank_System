const express = require("express");

const router = express.Router();

const {
  addRequest,
  getRequests,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");

router.post("/", addRequest);

router.get("/", getRequests);

router.put("/:id", updateRequest);

router.delete("/:id", deleteRequest);

module.exports = router;