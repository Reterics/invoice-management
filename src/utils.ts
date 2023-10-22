import { TaxNumber } from "@/src/types/utils";
import {InvoiceCategory, InvoiceItem} from "@/src/types/general";

export const getTaxNumberDetails = (taxNumber: TaxNumber) => {
    const parts = taxNumber.split("-");
    if (parts.length === 3 &&
        parts[0].length === 8 &&
        parts[1].length === 1 &&
        parts[2].length === 2) {
        return {
            taxpayerId: parts.shift(),
            vatCode: parts.shift(),
            countryCode: parts.shift()
        }
    }
    return null;
}


export const updateItemNumbersByUnitPrice = (invoiceItem: InvoiceItem, invoiceCategory: InvoiceCategory) => {
    const lineVatRate = invoiceItem.lineVatRate;

    const quantity = invoiceItem.quantity
    const unitPrice = invoiceItem.unitPrice

    if (invoiceCategory === "SIMPLIFIED") {
        if (!Number.isNaN(quantity) && !Number.isNaN(unitPrice)) {
            invoiceItem.lineGrossAmountData = quantity * unitPrice;
        }
        const lineGrossAmountData = invoiceItem.lineGrossAmountData;
        if (!Number.isNaN(lineGrossAmountData) && !Number.isNaN(lineVatRate)) {
            const vatValue = Number((lineGrossAmountData * lineVatRate).toFixed(2));

            invoiceItem.lineVatData = vatValue;
            invoiceItem.lineNetAmountData = Number((lineGrossAmountData - vatValue).toFixed(2));
        }
    } else {
        if (!Number.isNaN(quantity) && !Number.isNaN(unitPrice)) {
            invoiceItem.lineNetAmountData = quantity * unitPrice
        }
        const lineNetAmountData = invoiceItem.lineNetAmountData;
        if (!Number.isNaN(lineVatRate) && !Number.isNaN(lineNetAmountData)) {
            const vatValue = Number((lineNetAmountData * lineVatRate).toFixed(2));
            invoiceItem.lineGrossAmountData = lineNetAmountData + vatValue;
            invoiceItem.lineVatData = vatValue;
        }
    }
    return invoiceItem;
};