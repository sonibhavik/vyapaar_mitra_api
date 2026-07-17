const counter_schema = require("../../model/counter_schema");
const item_schema = require("../../model/items/item_schema");

const addItem = async (req, res) => {
    try {
        let { itemNumber, itemName, batch, expDate, mrp, ptr, invRate, free, discount, tax } = req.body;

        if (!itemName) {
            return res.status(400).json({ message: "item name is required" });
        }


        const availableItemName = await item_schema.findOne({ itemName: itemName });

        if (availableItemName) {
            return res.send(
                {
                    success: false,
                    message: "item name already exists"
                }
            );
        }


        const counter = await counter_schema.findOneAndUpdate(
            { id: "itemId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const itemId = counter.seq;

        const data = await item_schema(
            {
                id: itemId,
                itemNumber,
                itemName,
                batch,
                expDate,
                mrp,
                ptr,
                invRate,
                free,
                discount,
                tax
            }
        );

        await data.save();

        res.send(
            {
                success: true,
                message: "item added successfully",
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

module.exports = addItem;