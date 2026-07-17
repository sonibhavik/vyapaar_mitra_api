const mongoose = require("mongoose");

const companyGrowthSchema = mongoose.Schema({
    date: Date,
    day: Number,
    month: Number,
    year: Number,

    totalSalesAmount: {
        type: Number,
        default: 0
    },

    totalPurchaseAmount: {
        type: Number,
        default: 0
    },

    // optional future use
    totalProfit: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

// 🔥 Prevent duplicate day entries
companyGrowthSchema.index({ day: 1, month: 1, year: 1 }, { unique: true });

module.exports = mongoose.model("companyGrowth", companyGrowthSchema);