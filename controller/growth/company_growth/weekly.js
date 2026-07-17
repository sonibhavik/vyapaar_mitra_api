const company_growth_schema = require("../../../model/growth/company_growth_schema");

const getWeeklyGrowth = async (req, res) => {
    try {
        const now = new Date();

        const data = await company_growth_schema.aggregate([
            {
                $match: {
                    month: now.getMonth() + 1,
                    year: now.getFullYear()
                }
            },
            {
                $addFields: {
                    week: { $ceil: { $divide: ["$day", 7] } }
                }
            },
            {
                $group: {
                    _id: "$week",
                    total: { $sum: "$totalSalesAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        let result = Array(5).fill(0);

        data.forEach(item => {
            if (item._id >= 1 && item._id <= 5) {
                result[item._id - 1] = item.total;
            }
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

module.exports = getWeeklyGrowth;