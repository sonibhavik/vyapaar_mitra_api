const company_growth_schema = require("../../../model/growth/company_growth_schema");

const getDailyGrowth = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const last7Days = new Date(today);
        last7Days.setDate(today.getDate() - 6);

        const rawData = await company_growth_schema.find({
            date: { $gte: last7Days }
        });

        let result = Array(7).fill(0);

        rawData.forEach(item => {
            const itemDate = new Date(item.date);
            itemDate.setHours(0, 0, 0, 0);

            const diffDays = Math.floor((itemDate - last7Days) / (1000 * 60 * 60 * 24));

            if (diffDays >= 0 && diffDays < 7) {
                result[diffDays] += item.totalSalesAmount || 0; // ✅ FIXED
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
        return res.send({
            success: false,
            message: e.message
        });
    }
};

module.exports = getDailyGrowth;