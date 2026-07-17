const mongoose = require("mongoose");
const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema");

const getDoctorBillSummary = async (req, res) => {
    try {
        const { customerId } = req.params;

        const result = await sales_bill_schema.aggregate([
            {
                $match: { customerId: new mongoose.Types.ObjectId(customerId) }
            },
            {
                $project: {
                    billNumber: 1,
                    date: 1,
                    totalAmount: "$salesBillTotalAmount",
                    type: { $literal: "sales" }
                }
            },
            {
                $unionWith: {
                    coll: "purchaseBill",
                    pipeline: [
                        {
                            $match: {
                                customerId: new mongoose.Types.ObjectId(customerId)
                            }
                        },
                        {
                            $project: {
                                billNumber: 1,
                                date: 1,
                                totalAmount: "$purchaseBillTotalAmount",
                                type: { $literal: "purchase" }
                            }
                        }
                    ]
                }
            },
            {
                $sort: { date: -1 }
            }
        ]);

        res.json({
            success: true,
            data: result
        });

    } catch (e) {
        console.log("error => ", e);

        res.send(
            {
                success: false,
                message: "something went wrong, try again later"
            }
        );
    }
};

module.exports = getDoctorBillSummary