const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
    id: Number,
    itemNumber: String,
    itemName: String,
    batch: String,
    expDate: String,
    mrp: Number,
    ptr: String,
    invRate: Number,
    free: String,
    discount: Number,
    tax: Number,
    qty: Number,
    amount: Number,
    salesRate: Number,
    profit: Number,
    purchaseBillTotalAmount: Number,
    salesBillTotalAmount: Number,
});

module.exports = mongoose.model("item", itemSchema);