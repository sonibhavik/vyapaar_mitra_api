const customer_schema = require("../../model/customer/customer_schema");

const updateCustomer = async (req, res) => {
    try {
        let { id } = req.params;
        let { customerAmount, customerPaidAmount, customerPendingAmount, customerPurchaseBillTotalAmount, customerSalesBillTotalAmount } = req.body;

        let customerId = await customer_schema.findOne({ id: Number(id) });

        if (!customerId) {
            return res.send(
                {
                    success: false,
                    message: "customer not found"
                }
            );
        }

        let data = await customer_schema.findOneAndUpdate(
            { id: Number(id) },
            {
                customerAmount: customerAmount,
                customerPaidAmount: customerPaidAmount,
                customerPendingAmount: customerPendingAmount,
                customerPurchaseBillTotalAmount: customerPurchaseBillTotalAmount,
                customerSalesBillTotalAmount: customerSalesBillTotalAmount
            },
            { new: true }
        );

        res.send(
            {
                success: true,
                message: "customer updated successfully",
                data: data
            }
        );
    } catch (e) {

        console.log("error =>", e.message);
        res.send(
            {
                success: false,
                message: "something went wrong, try again later"
            }
        );
    }
}

module.exports = updateCustomer;