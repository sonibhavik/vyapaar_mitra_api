const express = require('express');
const createSalesBill = require('../../controller/sales_bills/create_sales_bill');
const getSalesBill = require('../../controller/sales_bills/get_sales_bill');
const getItemWiseSalesReport = require('../../controller/sales_bills/item_wise_sales_report');
const salesBillRouter = express.Router();

salesBillRouter.post("/create-salesbill", createSalesBill);

salesBillRouter.get("/", getSalesBill);

salesBillRouter.get("/report/:id", getItemWiseSalesReport);

module.exports = salesBillRouter;