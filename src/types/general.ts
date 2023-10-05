
export interface InvoiceUser {
    id?: string,
    supplierName?: string,
    supplierTaxNumber?: string,
    supplierPostCode?: string,
    supplierTown?: string,
    supplierStreetName?: string,
    supplierStreet?: string,
    supplierAddress?: string,
    supplierCountry?: string,
    supplierBankAccountNumber?: string,

    login?: string,
    password?: string,
    signKey?: string,
    exchangeKey?: string,

    createdBy?: string,
    createdAt?: number,
    modifiedAt?: number,
    modifiedBy?: string
}

export interface Customer {
    id?: string,
    customerName: string,
    customerTaxNumber: string,
    customerPostCode: string,
    customerTown: string,
    customerStreetName: string,
    customerStreet: string,
    customerAddress: string,
    customerCountry: string,
}

enum VatRate {
    27 = 0.2126,
    18 = 0.1525,
    5 = 0.0476,
    0 = 0,
    TAM = 0,
    AAM = 0
}

export interface InvoiceItem {
    lineNatureIndicator: 'SERVICE'|'PRODUCT'|'OTHER',
    productCodeCategory: 'OWN'|'VTSZ'|'SZJ'|'KN'|'AHK'|'CSK'|'KT'|'EJ'|'TESZOR'|'OTHER',
    productCodeValue: string,
    quantity: number,
    unitOfMeasure: "PIECE"|"KILOGRAM"|"TON"|"KWH"|"DAY"|"HOUR"|"MINUTE"|"MONTH"|"LITER"|"KILOMETER"|"CUBIC_METERI"|"METER"|"LINEAR_METERE"|"CARTONT"|"PACK"|"OWN",
    unitPrice: number,
    lineNetAmountData: number,
    lineVatRate: VatRate,
    lineVatData: number,
    lineGrossAmountData: number,
}

export interface Invoice {
    id?: string,
    supplierName?: string,
    supplierTaxNumber?: string,
    supplierPostCode?: string,
    supplierTown?: string,
    supplierStreetName?: string,
    supplierStreet?: string,
    supplierAddress?: string,
    supplierCountry?: string,
    supplierBankAccountNumber?: string,

    customerName: string,
    customerTaxNumber: string,
    customerPostCode: string,
    customerTown: string,
    customerStreetName: string,
    customerStreet: string,
    customerAddress: string,
    customerCountry: string,

    invoiceNumber: string,
    invoiceCategory: 'SIMPLIFIED'|'NORMAL'|'AGGREGATE',
    invoiceIssueDate: string,
    invoiceDeliveryDate: string,
    invoiceCurrency: string,
    invoiceExchangeRate: string,
    invoicePaymentMethod: 'CASH'|'TRANSFER'|'CARD'|'VOUCHER'|'Other',
    invoiceAppearance: 'ELECTRONIC'|'PAPER'|'EDI'|'UNKNOWN',
    invoiceGrossAmount: string,

    items: InvoiceItem[],

    transactionID: string,
    unixID: string,

    createdBy?: string,
    createdAt?: number,
    modifiedAt?: number,
    modifiedBy?: string
}
