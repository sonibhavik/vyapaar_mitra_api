const customer_schema = require("../../model/customer/customer_schema");
const counter_schema = require("../../model/counter_schema");
const purchase_bill_schema = require("../../model/purchase/purchase_bill_schema");

const createPurchaseBill = async (req, res) => {
    try {
        let { entryNumber, partyId, entryDate, billNumber, billDate, items, purchasebillTotalAmount, netAmount } = req.body;

        if (!entryNumber || !partyId || !entryDate || !billNumber || !billDate || !items) {
            return res.send({
                success: false,
                message: "fill required fields"
            });
        }

        const customer = await customer_schema.findOne({ id: partyId });

        if (!customer) {
            return res.send({
                success: false,
                message: "customer not found"
            });
        }

        const counter = await counter_schema.findOneAndUpdate(
            { id: "purchaseBillId" },
            { $inc: { seq: 1 } },
            { returnDocument: 'after', upsert: true }
        );

        const purchaseBillId = counter.seq;

        const data = new purchase_bill_schema({
            id: purchaseBillId,
            entryNumber,
            partyId: customer.id,
            party: {
                id: customer.id,
                customerName: customer.customerName,
                address: customer.address,
                mobileNumber: customer.mobileNumber,
                gstIn: customer.gstIn,
                state: customer.state,
                customerPendingAmount: customer.customerPendingAmount,
            },
            entryDate: new Date(entryDate),
            billNumber,
            billDate: new Date(billDate),
            items,
            purchasebillTotalAmount,
            netAmount,
            total: purchasebillTotalAmount,
            status: "purchase bill"
        });

        console.log("party schema type =>", purchase_bill_schema.schema.path("party").instance);

        await data.save();

        res.send({
            success: true,
            message: "purchase bill created successfully",
            data: data
        });

    } catch (e) {
        console.log("error => ", e.message);

        res.send({
            success: false,
            message: "something went wrong, try again later"
        });
    }
};

module.exports = createPurchaseBill;