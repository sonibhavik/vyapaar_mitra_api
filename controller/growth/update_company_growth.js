const company_growth_schema = require("../../model/growth/company_growth_schema");

const updateCompanyGrowth = async (amount, type, billDate) => {
    try {
        if (!amount || amount <= 0) return; // ✅ safety check

        const now = billDate ? new Date(billDate) : new Date();

        const day = now.getDate();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();

        const updateField =
            type === "sales"
                ? { totalSalesAmount: amount }
                : { totalPurchaseAmount: amount };

        await company_growth_schema.findOneAndUpdate(
            { day, month, year },
            {
                $inc: updateField,
                $setOnInsert: {
                    date: now,
                    day,
                    month,
                    year
                }
            },
            { upsert: true }
        );

    } catch (e) {
        console.log("Growth error =>", e.message);
    }
};

module.exports = updateCompanyGrowth;