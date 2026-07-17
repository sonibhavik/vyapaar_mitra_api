const counter_schema = require("../../model/counter_schema");
const customer_schema = require("../../model/customer/customer_schema");

const addCustomer = async (req, res) => {
    try {
        const {
            customerName, address, pincode, area, contact, mobileNumber, gstIn, pan, gstRef, state, gstType, type, mode, dlNo, partyType, invoiceType
        } = req.body;

        if (!customerName || !address || !pincode || !area || !contact || !mobileNumber || !gstIn || !pan || !state || !gstType || !type || !mode || !partyType) {
            return res.status(400).json({ error: 'fill required fields' });
        }

        const availableCustomerName = await customer_schema.findOne({ customerName: customerName });

        if (availableCustomerName) {
            return res.send(
                {
                    success: false,
                    message: "customer name already exists"
                }
            );
        }

        const counter = await counter_schema.findOneAndUpdate(
            { id: "customerId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );

        const customerId = counter.seq;

        const data = await customer_schema(
            {
                id: customerId,
                customerName,
                address,
                pincode,
                area,
                contact,
                mobileNumber,
                gstIn, pan,
                gstRef,
                state,
                gstType,
                type,
                mode,
                dlNo,
                partyType,
                invoiceType,
                customerAmount: 0
            }
        );

        await data.save();

        res.send(
            {
                success: true,
                message: "customer added successfully",
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

module.exports = addCustomer;