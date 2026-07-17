const item_schema = require("../../model/items/item_schema")

const getItems = async (req, res) => {
    try {
        const data = await item_schema.find();

        res.send(
            {
                success: true,
                message: "get items successfully",
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

module.exports = getItems;