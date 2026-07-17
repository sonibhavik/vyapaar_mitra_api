const counter_schema = require("../../model/counter_schema");
const purchase_bill_schema = require("../../model/purchase/purchase_bill_schema");

const createPurchaseCashEntry = async (req, res) => {
    try {
        let { vchNo, date, paymentType, pr, accountName, salesMan, remark, pendingAmount, totalAmountReceived } = req.body;

        if (!date || !paymentType || !accountName) {
            return res.send(
                {
                    success: false,
                    message: "date, paymentType and accountName are required"
                }
            );
        }


        const counter = await counter_schema.findOneAndUpdate(
            { id: "purchaseBillId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const purchaseCashEntry = counter.seq;

        let data = await purchase_bill_schema(
            {
                id: purchaseCashEntry,
                vchNo,
                date,
                paymentType,
                pr,
                accountName,
                salesMan,
                remark,
                pendingAmount,
                totalAmountReceived,
                status: "purchase cash entry"
            }
        );

        await data.save();

        res.send(
            {
                success: true,
                message: "purchase cash entry created successfully",
                data: data
            }
        );
    } catch (e) {
        console.log('error => ', e.message);

        res.send(
            {
                success: false,
                message: "something went wrong, try again later"
            }
        );
    }
}

module.exports = createPurchaseCashEntry;