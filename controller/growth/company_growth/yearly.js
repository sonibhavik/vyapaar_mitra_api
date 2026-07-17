const company_growth_schema = require("../../../model/growth/company_growth_schema");

const getYearlyGrowth = async (req, res) => {
    try {
        const currentYear = new Date().getFullYear();
        const startYear = currentYear - 4;

        const data = await company_growth_schema.aggregate([
            {
                $match: {
                    year: { $gte: startYear }
                }
            },
            {
                $group: {
                    _id: "$year",
                    totalSalesAmount: { $sum: "$totalSalesAmount" }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        let result = Array(5).fill(0);

        data.forEach(item => {
            const index = item._id - startYear; // map year → index
            if (index >= 0 && index < 5) {
                result[index] = item.totalSalesAmount;
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

module.exports = getYearlyGrowth;