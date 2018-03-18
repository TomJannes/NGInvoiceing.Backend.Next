import { InvoiceLineSchema } from "./invoice-line.Schema";
import { Schema } from "mongoose";
import { InvoiceStateSchema } from "./invoice-state.schema";
import { CustomerSchema } from "../../customer/schema/customer.schema";

export const InvoiceSchema = new Schema({
    customer: CustomerSchema,
    number: { type: Number, required: false },
    state: InvoiceStateSchema,
    invoiceDate: { type: Date, required: true },
    total: { type: Number, required: true },
    totalInc: { type: Number, required: true },
    totalVat: { type: Number, required: true },
    lines: [InvoiceLineSchema]
}, { collection: 'Invoice', timestamps:{} });