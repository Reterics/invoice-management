
export interface InvoiceUser {
    id?: number|string,
    supplierName?: string,
    supplierTaxNumber?: string,
    supplierPostCode?: string,
    supplierTown?: string,
    supplierStreetName?: string,
    supplierStreet?: string,
    supplierAddress?: string,
    supplierBankAccountNumber?: string,

    login?: string,
    password?: string,
    signKey?: string,
    exchangeKey?: string,
}
