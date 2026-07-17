const express = require("express");
const addCustomer = require("../../controller/customer/add_customer");
const getCustomer = require("../../controller/customer/get_customer");
const updateCustomer = require("../../controller/customer/update_customer");
const getCustomerSalesReport = require("../../controller/customer/get_customer_sales_report");
const customerRouter = express.Router();

customerRouter.post("/add-customer", addCustomer);

customerRouter.put("/:id", updateCustomer);

customerRouter.get("/", getCustomer);

customerRouter.get("/sales/customer-report/:customerId", getCustomerSalesReport);

module.exports = customerRouter;