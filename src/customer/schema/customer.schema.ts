import * as mongoose from 'mongoose';
import { CustomerTypeSchema } from './customer-type.schema';
import { ContactSchema } from './contact.schema';
import { AddressSchema } from '../../shared/schema/address.model';
import { SkuSchema } from '../../sku/schema/sku.schema';

export const CustomerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    kbo: { type: String, required: true },
    type: CustomerTypeSchema,
    address: AddressSchema,
    contacts: [ContactSchema],
    linkedSkus: [SkuSchema]
}, { collection: 'Customer', timestamps:{} });