import { Model } from 'mongoose';
import { Component } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QueryHelpers } from '../shared/helpers/query-helpers';
import { ServerResponse } from 'http';
import { InvoiceSchema } from './schema/invoice.schema';
import { Invoice } from './interfaces/invoice.interface';
import { InvoiceDto } from './dto/invoice.dto';
import { InvoiceSearchParamsDto } from './dto/invoice-search-params.dto';

@Component()
export class InvoiceService {
    
    constructor(@InjectModel(InvoiceSchema) private readonly invoiceModel: Model<Invoice>){}

    async create(invoice: InvoiceDto): Promise<Invoice> {
        const createdInvoice = new this.invoiceModel(invoice);
        return await createdInvoice.save();
    }

    async find(parameters: InvoiceSearchParamsDto, res: ServerResponse): Promise<Invoice[]> {
        var searchParams: any = {};
        if (parameters.number) searchParams.number = parameters.number;
        if (parameters.customer) searchParams["customer.name"] = { $regex: new RegExp(`^${parameters.customer.name}`, 'i') };

        return await QueryHelpers.find(this.invoiceModel, searchParams, parameters, res);
    }

    async findOne(invoiceId: string): Promise<Invoice> {
        return await this.invoiceModel.findById(invoiceId);
    }

    async update(invoiceId: string, invoice: InvoiceDto): Promise<Invoice> {
        return await this.invoiceModel.findOneAndUpdate({ _id: invoiceId }, { $set: invoice }, {new: true});
    }
}