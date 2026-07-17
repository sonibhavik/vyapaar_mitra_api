const customer_schema = require("../../model/customer/customer_schema");
const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema");

const getCustomerSalesReport = async (req, res) => {
    try {
        const { customerId } = req.params;
        const { period } = req.query;

        const customerIdNum = Number(customerId);

        const customer = await customer_schema.findOne({ id: customerIdNum });
        if (!customer) {
            return res.send({ success: false, message: "Customer not found" });
        }

        const now = new Date();
        let data = [];

        switch (period) {

            case 'daily': {
                const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
                for (let i = 6; i >= 0; i--) {
                    const date = new Date(now);
                    date.setDate(now.getDate() - i);

                    const start = new Date(date);
                    start.setHours(0, 0, 0, 0);

                    const end = new Date(date);
                    end.setHours(23, 59, 59, 999);

                    const bills = await sales_bill_schema.find({
                        "customer.id": customerIdNum,  // ✅ correct field
                        date: { $gte: start, $lte: end }
                    });

                    // ✅ use net instead of total
                    const salesAmount = bills.reduce((sum, bill) => sum + (bill.net ?? 0), 0);
                    data.push({
                        label: days[start.getDay()],
                        date: start.toISOString().split('T')[0],
                        salesAmount
                    });
                }
                break;
            }

            case 'weekly': {
                for (let i = 3; i >= 0; i--) {
                    const weekEnd = new Date();
                    weekEnd.setDate(now.getDate() - (i * 7));
                    weekEnd.setHours(23, 59, 59, 999);

                    const weekStart = new Date(weekEnd);
                    weekStart.setDate(weekEnd.getDate() - 6);
                    weekStart.setHours(0, 0, 0, 0);

                    const bills = await sales_bill_schema.find({
                        "customer.id": customerIdNum,  // ✅ correct field
                        date: { $gte: weekStart, $lte: weekEnd }
                    });

                    const salesAmount = bills.reduce((sum, bill) => sum + (bill.net ?? 0), 0);
                    data.push({
                        label: `W${4 - i}`,
                        weekStart: weekStart.toISOString().split('T')[0],
                        salesAmount
                    });
                }
                break;
            }

            case 'monthly': {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                const year = now.getFullYear();

                for (let i = 0; i < 12; i++) {
                    const start = new Date(year, i, 1, 0, 0, 0, 0);
                    const end = new Date(year, i + 1, 0, 23, 59, 59, 999);

                    const bills = await sales_bill_schema.find({
                        "customer.id": customerIdNum,  // ✅ correct field
                        date: { $gte: start, $lte: end }
                    });

                    const salesAmount = bills.reduce((sum, bill) => sum + (bill.net ?? 0), 0);
                    data.push({ label: months[i], month: i + 1, salesAmount });
                }
                break;
            }

            case 'yearly': {
                const currentYear = now.getFullYear();
                for (let i = 4; i >= 0; i--) {
                    const year = currentYear - i;
                    const start = new Date(year, 0, 1, 0, 0, 0, 0);
                    const end = new Date(year, 11, 31, 23, 59, 59, 999);

                    const bills = await sales_bill_schema.find({
                        "customer.id": customerIdNum,  // ✅ correct field
                        date: { $gte: start, $lte: end }
                    });

                    const salesAmount = bills.reduce((sum, bill) => sum + (bill.net ?? 0), 0);
                    data.push({ label: `${year}`, year, salesAmount });
                }
                break;
            }

            default:
                return res.send({ success: false, message: "Invalid period" });
        }

        res.send({ success: true, period, customerId: customerIdNum, data });

    } catch (e) {
        console.log("error =>", e.message);
        res.send({ success: false, message: "something went wrong" });
    }
};

module.exports = getCustomerSalesReport;