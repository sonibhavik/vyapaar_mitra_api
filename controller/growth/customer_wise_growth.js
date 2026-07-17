const customer_schema = require("../../model/customer/customer_schema");

const customerWiseGrowth = async (req, res) => {
    try {
        let { id } = req.params;

        let customerId = await customer_schema.findOne({ id: Number(id) });

        if (!customerId) {
            return res.send(
                {
                    success: false,
                    message: "customer not found"
                }
            );
        }

        let data = await customer_schema.find({});

        res.send(
            {
                success: true,
                message: "get customer wise growth",
                data: data
            }
        );
    } catch (e) {
        console.log("error =>", e.message);
        res.send({
            success: false,
            message: "something went wrong, try again later"
        });
    }
}

module.exports = customerWiseGrowth;