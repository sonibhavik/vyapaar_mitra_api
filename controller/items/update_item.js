const item_schema = require("../../model/items/item_schema");

const updateItem = async (req, res) => {
    try {
        let { id } = req.params;
        let { name, price, free, discount, tax, qty, amount, purchaseBillTotalAmount, salesBillTotalAmount, salesRate } = req.body;


        let item = await item_schema.findOne({ id: Number(id) });
        if (!item) {
            return res.send(
                {
                    success: false,
                    message: "item not found"
                }
            );
        }

        let data = {
            itemName: name,
            ptr: price,
            free: free,
            discount: discount,
            tax: tax,
            salesRate: salesRate,
            qty: qty,
            amount: amount,
            purchaseBillTotalAmount: purchaseBillTotalAmount,
            salesBillTotalAmount: salesBillTotalAmount
        };

        await item_schema.findOneAndUpdate(
            { id: Number(id) },
            data,
            { new: true }
        );

        res.send(
            {
                success: true,
                message: "item updated successfully"
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

module.exports = updateItem;