const company_growth_schema = require("../../../model/growth/company_growth_schema");

const getMonthlyGrowth = async (req, res) => {
    try {
        const year = new Date().getFullYear();

        const data = await company_growth_schema.aggregate([
            { $match: { year } },
            {
                $group: {
                    _id: "$month",
                    totalSalesAmount: { $sum: "$totalSalesAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        let result = Array(12).fill(0);

        data.forEach(item => {
            result[item._id - 1] = item.totalSalesAmount;
        });

        return res.send({
            success: true,
            data: result.map((val, index) => ({
                id: index + 1,
                total: val
            }))
        });

    } catch (e) {
        return res.send({ success: false, message: e.message });
    }
};

module.exports = getMonthlyGrowth;