const customer_schema = require("../../model/customer/customer_schema");

const getCustomer = async (req, res) => {
    try {
        let data = await customer_schema.find();
        res.send(
            {
                success: true,
                message: "get customer successfully",
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
}

module.exports = getCustomer;