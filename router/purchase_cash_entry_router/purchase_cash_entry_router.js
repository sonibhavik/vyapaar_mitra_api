const express = require("express");
const createPurchaseCashEntry = require("../../controller/purchase_cash_entry/create_purchase_cash_entry");
const getPurchaseCashEntry = require("../../controller/purchase_cash_entry/get_purchase_cash_entry");
const purchaseCashEntryRouter = express.Router();

purchaseCashEntryRouter.post("/create-purchase-cash-entry", createPurchaseCashEntry);

purchaseCashEntryRouter.get("/", getPurchaseCashEntry);

module.exports = purchaseCashEntryRouter;