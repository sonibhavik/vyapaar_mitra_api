const purchase_bill_schema = require("../../model/purchase/purchase_bill_schema")

const getPurchaseCashEntry = async (req, res) => {
    try {
        const data = await purchase_bill_schema.find({ status: "purchase cash entry" });

        res.send(
            {
                success: true,
                message: "get purchase cash entry successfully",
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

module.exports = getPurchaseCashEntry;