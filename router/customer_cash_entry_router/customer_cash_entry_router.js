const express = require("express");
const createCustomerCashEntry = require("../../controller/customer_cash_entry/create_customer_cash_entry");
const getCustomerCashEntry = require("../../controller/customer_cash_entry/get_customer_cash_entry");
const customerCashEntryRouter = express.Router();

customerCashEntryRouter.post("/create-customer-cash-entry", createCustomerCashEntry);

customerCashEntryRouter.get("/", getCustomerCashEntry);

module.exports = customerCashEntryRouter;