const mongoose = require("mongoose");

// ✅ Minimal party snapshot (NOT full customer schema)
const partySchema = new mongoose.Schema({
    id: Number,
    customerName: String,
    mobileNumber: Number,
    gstIn: String,
    state: String
}, { _id: false });

const purchaseBillSchema = new mongoose.Schema({

    id: Number,
    entryNumber: Number,

    // ✅ Reference to customer
    partyId: Number,

    // ✅ Snapshot of customer at bill time
    party: {
        type: partySchema
    },

    entryDate: Date,
    billNumber: Number,
    billDate: Date,

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

    // ✅ FIXED FIELD NAME
    total: Number,

    SGST: Number,
    CGST: Number,
    IGST: Number,
    netAmount: Number,

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
    timestamps: true // optional but recommended
});

module.exports = mongoose.models.purchaseBill || mongoose.model("purchaseBill", purchaseBillSchema);