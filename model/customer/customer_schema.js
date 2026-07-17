const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    id: Number,
    customerName: String,
    address: String,
    pincode: Number,
    area: String,
    contact: Number,
    mobileNumber: Number,
    gstIn: String,
    pan: String,
    gstRef: String,
    state: String,
    gstType: String,
    type: String,
    mode: String,
    dlNo: String,
    partyType: String,
    invoiceType: String,
    customerAmount: Number,
    customerPendingAmount: Number,
    customerPaidAmount: Number,
    customerPurchaseBillTotalAmount: Number,
    customerSalesBillTotalAmount: Number,
});

module.exports = mongoose.model('customer', customerSchema);