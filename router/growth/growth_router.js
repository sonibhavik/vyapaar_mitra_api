const express = require("express");
const getDailyGrowth = require("../../controller/growth/company_growth/daily");
const getWeeklyGrowth = require("../../controller/growth/company_growth/weekly");
const getMonthlyGrowth = require("../../controller/growth/company_growth/monthly");
const getYearlyGrowth = require("../../controller/growth/company_growth/yearly");
const growthRouter = express.Router();

growthRouter.get("/daily", getDailyGrowth);
growthRouter.get("/weekly", getWeeklyGrowth);
growthRouter.get("/monthly", getMonthlyGrowth);
growthRouter.get("/yearly", getYearlyGrowth);

module.exports = growthRouter;