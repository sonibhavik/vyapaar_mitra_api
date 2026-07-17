const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema")

const getSalesBill = async (req, res) => {
    try {
        let data = await sales_bill_schema.find();

        res.send(
            {
                success: true,
                message: "get sales bill successfully",
                data: data
            }
        );
    } catch (e) {
        console.log("error => ", e.message);

        res.send(
            {
                success: false,
                message: "something went wrong, try again later",
            }
        );
    }
}

module.exports = getSalesBill;