const Request = require("../models/Request");

const addRequest = async (req, res) => {
  try {
    const request =
      await Request.create(req.body);

    res.status(201).json({
      success: true,
      request,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRequests = async (req, res) => {
  try {
    const requests =
      await Request.find();

    res.json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addRequest,
  getRequests,
};