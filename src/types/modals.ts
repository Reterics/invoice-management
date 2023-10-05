import {Invoice, InvoiceUser} from "@/src/types/general";

export interface InvoiceModalInput {
    visible: boolean,
    onClose: Function,
    currentInvoice: Invoice,
    setCurrentInvoice: Function,
    users: InvoiceUser[],
    onSave: Function
}

export interface InvoiceUserModalInput {
    visible: boolean,
    onClose: Function,
    currentUser: InvoiceUser,
    setCurrentUser: Function,
    onSave: Function
}
