export type InvoiceCategory = 'SIMPLIFIED'|'NORMAL'|'AGGREGATE';
export type CustomerType = 'PERSON'|'COMPANY_HU'|'COMPANY_EU'|'COMPANY';
export type VatStatus = 'PRIVATE_PERSON'|'DOMESTIC'|'OTHER';
export type PaymentMethod = 'CASH'|'TRANSFER'|'CARD'|'VOUCHER'|'Other';
export type InvoiceAppearance = 'ELECTRONIC'|'PAPER'|'EDI'|'UNKNOWN';
export type ProductCodeCategory = 'OWN'|'VTSZ'|'SZJ'|'KN'|'AHK'|'CSK'|'KT'|'EJ'|'TESZOR'|'OTHER';
export type UnitOfMeasure = 'PIECE'|'KILOGRAM'|'TON'|'KWH'|'DAY'|'HOUR'|'MINUTE'|'MONTH'|'LITER'|'KILOMETER'|
    'CUBIC_METER'|'METER'|'LINEAR_METER'|'CARTON'|'PACK'|'OWN';
export type LineNatureIndicator = 'SERVICE'|'PRODUCT'|'OTHER';

export interface InvoiceUser {
    id?: string,
    supplierName?: string,
    supplierTaxNumber?: string,
    supplierPostCode?: string,
    supplierTown?: string,
    supplierStreetName?: string,
    supplierStreetCategory?: string,
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

export interface InvoicePartner {
    id?: string,
    customerName: string,
    customerTaxNumber: string,
    customerPostCode: string,
    customerTown: string,
    customerStreetName: string,
    customerStreetCategory: string,
    customerAddress: string,
    customerCountry: string,
    customerBankAccountNumber: string,
    customerType: CustomerType,
    customerVatStatus: VatStatus,
}

enum VatRateSimplified {
    _27 = 0.2126,
    _18 = 0.1525,
    _5 = 0.0476,
    _0 = 0,
    TAM = 0,
    AAM = 0
}

enum VatRateNormal {
    _27 = 0.27,
    _18 = 0.18,
    _5 = 0.05,
    _0 = 0,
    TAM = 0,
    AAM = 0
}

export interface InvoiceItem {
    lineNatureIndicator: LineNatureIndicator,
    productCodeCategory: ProductCodeCategory,
    productCodeValue: string,
    quantity: number,
    unitOfMeasure: UnitOfMeasure,
    unitPrice: number,
    lineNetAmountData: number,
    lineVatRate: VatRateSimplified | VatRateNormal,
    lineVatData: number,
    lineGrossAmountData: number,
    lineDescription: string,
}


export interface Invoice {
    id?: string,
    supplierName?: string,
    supplierTaxNumber?: string,
    supplierPostCode?: string,
    supplierTown?: string,
    supplierStreetName?: string,
    supplierStreetCategory?: string,
    supplierAddress?: string,
    supplierCountry?: string,
    supplierBankAccountNumber?: string,

    customerName: string,
    customerTaxNumber: string,
    customerPostCode: string,
    customerTown: string,
    customerStreetName: string,
    customerStreetCategory: string,
    customerAddress: string,
    customerCountry: string,
    customerType: CustomerType,
    customerVatStatus: VatStatus,

    invoiceNumber: string,
    invoiceCategory: InvoiceCategory,
    invoiceIssueDate: string,
    invoiceDeliveryDate: string,
    invoicePaymentDate: string,
    invoiceCurrency: string,
    invoiceExchangeRate: string,
    invoicePaymentMethod: PaymentMethod,
    invoiceAppearance: InvoiceAppearance,
    invoiceGrossAmount: string,

    items: InvoiceItem[],

    transactionID: string,
    unixID: string,

    createdBy?: string,
    createdAt?: number,
    modifiedAt?: number,
    modifiedBy?: string
}

export const InvoiceConstants = {
    invoice: {
        invoiceCategory: ['SIMPLIFIED', 'NORMAL', 'AGGREGATE'],
        invoicePaymentMethod: ['CASH', 'TRANSFER', 'CARD', 'VOUCHER', 'Other'],
        invoiceAppearance: ['ELECTRONIC', 'PAPER', 'EDI', 'UNKNOWN'],
        items: {
            lineNatureIndicator: ['SERVICE', 'PRODUCT', 'OTHER'],
            productCodeCategory: ['OWN', 'VTSZ', 'SZJ', 'KN', 'AHK', 'CSK', 'KT', 'EJ', 'TESZOR', 'OTHER'],
            unitOfMeasure: ["PIECE", "KILOGRAM", "TON", "KWH", "DAY", "HOUR", "MINUTE", "MONTH", "LITER", "KILOMETER",
                "CUBIC_METERI", "METER", "LINEAR_METERE", "CARTONT", "PACK", "OWN"],
            lineVatRateSimplified: [
                VatRateSimplified._27,
                VatRateSimplified._18,
                VatRateSimplified._5,
                VatRateSimplified._0,
                VatRateSimplified.TAM,
                VatRateSimplified.AAM
            ],
            lineVatRateNormal: [
                VatRateNormal._27,
                VatRateNormal._18,
                VatRateNormal._5,
                VatRateNormal._0,
                VatRateNormal.TAM,
                VatRateNormal.AAM
            ]
        },
        invoiceCurrency: ['HUF']
    },
    customer: {
        customerType: ['PERSON', 'COMPANY_HU', 'COMPANY_EU', 'COMPANY'],
        customerVatStatus: ['PRIVATE_PERSON', 'DOMESTIC', 'OTHER'],
        customerCountry: ['HU'],
        customerStreetCategory: [
            "utca",
            "út",
            "útja",
            "allé",
            "alsó rakpart",
            "alsósor",
            "bekötőút",
            "dűlő",
            "fasor",
            "felső rakpart",
            "felsősor",
            "főtér",
            "főút",
            "gát",
            "határ",
            "határsor",
            "határút",
            "hrsz",
            "ipartelep",
            "kert",
            "kertsor",
            "korzó",
            "környék",
            "körönd",
            "körtér",
            "körút",
            "köz",
            "lakópark",
            "lakótelep",
            "lejtő",
            "lépcső",
            "lépcsősor",
            "liget",
            "major",
            "mélyút",
            "negyed",
            "oldal",
            "országút",
            "park",
            "part",
            "pincesor",
            "puszta",
            "rakpart",
            "sétány",
            "sikátor",
            "sor",
            "sugárút",
            "szállás",
            "szektor",
            "szél",
            "szer",
            "sziget",
            "szőlőhegy",
            "tag",
            "tanya",
            "telep",
            "tere",
            "tér",
            "tető",
            "udvar",
            "üdülőpart",
            "üdülősor",
            "üdülőtelep",
            "vár",
            "várkert",
            "város",
            "villasor",
            "völgy",
            "zug",
        ]
    }
}

export interface InvoiceItemsTableType {
    items: InvoiceItem[],
    setItems: Function,
    invoice: Invoice,
    currentItem: InvoiceItem,
    setCurrentItem: Function,
}