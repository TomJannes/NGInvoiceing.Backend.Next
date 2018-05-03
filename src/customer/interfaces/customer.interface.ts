import { CustomerType } from "./customer-type.interface";
import { Contact } from "./contact.interface";
import { Address } from "../../shared/interfaces/address.interface";
import { Document } from 'mongoose';
import { Sku } from "../../sku/interfaces/sku.interface";

export interface Customer extends Document {
    readonly name: string;
    readonly kbo?: string;
    type: CustomerType;
    address: Address;
    contacts: Contact[];
    linkedSkus: Sku[];
}