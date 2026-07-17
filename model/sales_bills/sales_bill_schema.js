const mongoose = require('mongoose');

// ✅ Minimal customer snapshot (IMPORTANT)
const customerSchema = new mongoose.Schema({
    id: Number,
    customerName: String,
    mobileNumber: Number,
    gstIn: String,
    state: String
}, { _id: false });

const salesBillSchema = new mongoose.Schema({

    /// sales bill
    id: Number,
    billNumber: Number,

    // ✅ reference
    customerId: Number,

    // ✅ FIXED (embedded schema)
    customer: {
        type: customerSchema
    },

    date: Date,
    paymentType: String,
    gstType: String,

    items: [
        {
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
            profit: Number
        }
    ],

    // ✅ FIXED naming
    total: Number,

    SGST: Number,
    CGST: Number,
    IGST: Number,
    net: Number,

    vchNo: String,
    date: Date,
    paymentType: String,
    pr: String,
    accountName: String,
    salesMan: String,
    remark: String,
    pendingAmount: Number,
    totalAmountReceived: Number,
    
    status: String

}, {
    timestamps: true
});

// ✅ FIX: remove delete model logic
module.exports = mongoose.models.salesBill || mongoose.model("salesBill", salesBillSchema);