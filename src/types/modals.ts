import {Invoice, InvoicePartner, InvoiceUser} from "@/src/types/general";

export interface InvoiceModalInput {
    visible: boolean,
    onClose: Function,
    currentInvoice: Invoice,
    setCurrentInvoice: Function,
    users: InvoiceUser[],
    partners: InvoicePartner[],
    onSave: Function
}

export interface InvoiceUserModalInput {
    visible: boolean,
    onClose: Function,
    currentUser: InvoiceUser,
    setCurrentUser: Function,
    onSave: Function
}

export interface InvoicePartnerModalInput {
    visible: boolean,
    onClose: Function,
    currentPartner: InvoicePartner,
    setCurrentPartner: Function,
    onSave: Function
}
