const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema");


const getItemWiseSalesReport = async (req, res) => {
    try {
        let { id } = req.params;

        console.log("Incoming ID =>", id);

        const data = await sales_bill_schema.findOne({ id: Number(id) });

        if (!data) {
            return res.send(
                {
                    success: false,
                    message: "sales bill not found for this item"
                }
            );
        }

        console.log("DB Result =>", data);

        res.send({
            success: true,
            message: "get item wise sales report successfully",
            data: data
        });

    } catch (e) {
        console.log("error => ", e);

        res.send({
            success: false,
            message: "something went wrong"
        });
    }
};

module.exports = getItemWiseSalesReport;