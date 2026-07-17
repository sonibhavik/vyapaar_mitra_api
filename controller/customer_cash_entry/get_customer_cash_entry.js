const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema");

const getCustomerCashEntry = async (req, res) => {
    try {
        const data = await sales_bill_schema.find({ status: "customer cash entry" });

        res.send(
            {
                success: true,
                message: "get customer cash entry successfully",
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

module.exports = getCustomerCashEntry;