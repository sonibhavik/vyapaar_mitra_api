const purchase_bill_schema = require("../../model/purchase/purchase_bill_schema");

const getPurchaseBill = async (req, res) => {
    try {
        let data = await purchase_bill_schema.find();
        res.send(
            {
                success: true,
                message: "get purchase bill successfully",
                data: data
            }
        );
    } catch (e) {

        console.log("error => ", e.message);
        res.send(
            {
                success: false,
                message: "something went wrong, try again later"
            }
        );
    }
};

module.exports = getPurchaseBill;