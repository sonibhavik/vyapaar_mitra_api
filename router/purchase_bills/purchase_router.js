const express = require('express');
const createPurchaseBill = require('../../controller/purchase_bills/create_purchase_bill');
const getPurchaseBill = require('../../controller/purchase_bills/get_purchase_bill');
const purchaseRouter = express.Router();

purchaseRouter.post('/create-purchasebill', createPurchaseBill);

purchaseRouter.get('/', getPurchaseBill);

module.exports = purchaseRouter;