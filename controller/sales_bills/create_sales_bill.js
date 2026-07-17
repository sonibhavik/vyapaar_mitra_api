const counter_schema = require("../../model/counter_schema");
const customer_schema = require("../../model/customer/customer_schema");
const sales_bill_schema = require("../../model/sales_bills/sales_bill_schema");
const updateCompanyGrowth = require("../growth/update_company_growth");

const createSalesBill = async (req, res) => {
    try {
        let { billNumber, customerId, date, paymentType, gstType, items, salesBillTotalAmount, net } = req.body;

        if (!customerId) {
            return res.send({
                success: false,
                message: "customerId is required"
            });
        }

        const customer = await customer_schema.findOne({ id: customerId });

        if (!customer) {
            return res.send(
                {
                    success: false,
                    message: "customer not found"
                }
            );
        }

        const counter = await counter_schema.findOneAndUpdate(
            { id: "salesBillId" },
            { $inc: { seq: 1 } },
            { new: true, upsert: true }
        );
        const salesBillId = counter.seq;

        const data = await sales_bill_schema(
            {
                id: salesBillId,
                billNumber,
                customer: {
                    id: customer.id,
                    customerName: customer.customerName,
                    address: customer.address,
                    mobileNumber: customer.mobileNumber,
                    gstIn: customer.gstIn,
                    state: customer.state
                },
                date,
                paymentType,
                gstType,
                items,
                salesBillTotalAmount,
                total: salesBillTotalAmount,
                net: net,
                status: "sales bill"
            }
        );

        await data.save();

        await updateCompanyGrowth(net, "sales", date);


        res.send(
            {
                success: true,
                message: "sales bill created successfully",
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

module.exports = createSalesBill;