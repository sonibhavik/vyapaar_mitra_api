const express = require("express");
const getDoctorBillSummary = require("../../controller/doctor/doctor_bill_summary");
const doctorRouter = express.Router();

doctorRouter.get("/:id", getDoctorBillSummary);

module.exports = doctorRouter;