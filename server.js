require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const customerRouter = require("./router/customer/customer_router");
const itemRouter = require("./router/items/item_router");
const purchaseRouter = require("./router/purchase_bills/purchase_router");
const salesBillRouter = require("./router/sales_bills/sales_bill_router");
const purchaseCashEntryRouter = require("./router/purchase_cash_entry_router/purchase_cash_entry_router");
const customerCashEntryRouter = require("./router/customer_cash_entry_router/customer_cash_entry_router");
const growthRouter = require("./router/growth/growth_router");
const doctorRouter = require("./router/doctor/doctor_schema");

const app = express();
app.use(express.json());

/// customers
app.use("/api/vyapaar-mitra/customer", customerRouter);

/// items
app.use("/api/vyapaar-mitra/items", itemRouter);

/// purchase bills
app.use("/api/vyapaar-mitra/purchase-bills", purchaseRouter);

/// purchase cash entry
app.use("/api/vyapaar-mitra/purchase-cash-entry", purchaseCashEntryRouter);

/// sales bills
app.use("/api/vyapaar-mitra/sales-bills", salesBillRouter);

/// customer cash entry
app.use("/api/vyapaar-mitra/customer-cash-entry", customerCashEntryRouter);

/// company growth
app.use("/api/vyapaar-mitra/company-growth", growthRouter);

/// doctor
app.use("/api/vyapaar-mitra/doctor", doctorRouter);

mongoose.connect(process.env.DB_URL).then(() => {
    console.log('Connected to MongoDB')
    let PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server is running on port http://localhost:${PORT}`);
    });
}).catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
});