import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {InvoiceModalInput} from "@/src/types/modals";
import StyledSelect, {textToOptions} from "@/components/lib/StyledSelect";
import {Invoice, InvoiceConstants, InvoiceItem, InvoicePartner, InvoiceUser} from "@/src/types/general";
import {StyledSelectOption} from "@/src/types/inputs";
import StyledInput from "@/components/lib/StyledInput";
import InvoiceItemsTable from "@/components/InvoiceItemsTable";

export const emptyInvoiceItem = {
    lineNatureIndicator: 'SERVICE',
    productCodeCategory: 'OWN',
    productCodeValue: '',
    quantity: 1,
    unitOfMeasure: "OWN",
    unitPrice: 0,
    lineNetAmountData: 0,
    lineVatRate: InvoiceConstants.invoice.items.lineVatRateSimplified[0],
    lineVatData: 0,
    lineGrossAmountData: 0,
    lineDescription: "",
};

export const getEmptyInvoiceItem = (invoiceCategory: string): InvoiceItem => {
    if (invoiceCategory === 'SIMPLIFIED') {
        return {
            ...emptyInvoiceItem,
            lineVatRate: InvoiceConstants.invoice.items.lineVatRateSimplified[0]} as InvoiceItem;
    }
    return {
        ...emptyInvoiceItem,
        lineVatRate: InvoiceConstants.invoice.items.lineVatRateNormal[0]} as InvoiceItem;

}

export default function InvoiceModal({
    visible,
    onClose,
    currentInvoice,
    setCurrentInvoice,
    users,
    partners,
    onSave
}: InvoiceModalInput) {

    const [supplier, setSupplier] = useState<InvoiceUser|undefined>(undefined);
    const [partner, setPartner] = useState<InvoicePartner|undefined>(undefined);
    const [currentItem, setCurrentItem] =
        useState<InvoiceItem>(getEmptyInvoiceItem(currentInvoice.invoiceCategory))

    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'InvoiceModal') {
            onClose();
        }
    };

    const changeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
        changeType(e, 'invoiceCategory');
        setCurrentItem(getEmptyInvoiceItem(e.target.value));
    }

    const changeType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setCurrentInvoice((currentInvoice: Invoice) => {
            const obj = {...currentInvoice};
            // @ts-ignore
            obj[key] = value;
            return obj;
        });
    };

    const changeSupplier = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
        const select = e.target as HTMLSelectElement;
        const value = select.options[select.selectedIndex].value;

        const selected = users.find(user=> value === user.id);

        setSupplier(selected ? {...selected} : undefined);
    };

    const changePartner = (e: SyntheticEvent<HTMLSelectElement, Event>) => {
        const select = e.target as HTMLSelectElement;
        const value = select.options[select.selectedIndex].value;

        const selected = partners.find(user=> value === user.id);

        setPartner(selected ? {...selected} : undefined);
    };

    if (!visible) return null;

    return (
        <div
            id="InvoiceModal"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center"
        >
            <div className="bg-white p-4 rounded w-[90vw] dark:bg-gray-900">
                <h1 className="font-semibold text-center text-xl text-gray-700 mb-4 dark:text-gray-200">
                    Edit Invoice
                </h1>

                <form className="flex flex-col">
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow
                        dark:bg-gray-800 dark:border-gray-700 mr-1 pt-9">
                            <div className="flex md:gap-3">

                                <StyledSelect
                                    type="text" name="supplierName"
                                    options={users.map(user=> {
                                        return {name: user.supplierName, value: user.id}
                                    }) as unknown as StyledSelectOption[]}
                                    value={supplier ? supplier.id : undefined}
                                    onSelect={(e) => changeSupplier(e)}
                                    label={ !supplier ? "Select Supplier" : "Supplier" }
                                />
                                <button type="button" className="text-gray-900 bg-white border border-gray-300
                                focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200
                                font-medium rounded-lg text-sm px-5 mr-2 dark:bg-gray-800
                                dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                                dark:focus:ring-gray-700 whitespace-nowrap">Add User</button>
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-3">
                                <StyledSelect
                                    type="text" name="invoiceCategory"
                                    options={textToOptions(InvoiceConstants.invoice.invoiceCategory, undefined)}
                                    value={currentInvoice.invoiceCategory ? currentInvoice.invoiceCategory : undefined}
                                    onSelect={(e) => changeCategory(
                                        e as unknown as ChangeEvent<HTMLInputElement>)}
                                    label="Invoice Type"
                                />
                                <StyledSelect
                                    type="text" name="invoiceAppearance"
                                    options={textToOptions(InvoiceConstants.invoice.invoiceAppearance, undefined)}
                                    value={currentInvoice.invoiceAppearance ? currentInvoice.invoiceAppearance : undefined}
                                    onSelect={(e) => changeType(
                                        e as unknown as ChangeEvent<HTMLInputElement>, 'invoiceAppearance')}
                                    label="Invoice Appearance"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-3">
                                <StyledInput
                                    type="text" name="invoiceNumber"
                                    value={currentInvoice.invoiceNumber}
                                    onChange={(e) => changeType(e, 'invoiceNumber')}
                                    label="Issue Number"
                                />
                                <StyledSelect
                                    type="text" name="invoicePaymentMethod"
                                    options={textToOptions(InvoiceConstants.invoice.invoicePaymentMethod, undefined)}
                                    value={currentInvoice.invoicePaymentMethod ? currentInvoice.invoicePaymentMethod : undefined}
                                    onSelect={(e) => changeType(
                                        e as unknown as ChangeEvent<HTMLInputElement>, 'invoicePaymentMethod')}
                                    label="Payment Method"
                                />
                            </div>
                        </div>
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow
                        dark:bg-gray-800 dark:border-gray-700 mb-1 pt-9">
                            <div className="flex md:gap-3">
                                <StyledSelect
                                    type="text" name="customer"
                                    options={partners.map(user=> {
                                        return {name: user.customerName, value: user.id}
                                    }) as unknown as StyledSelectOption[]}
                                    value={partner ? partner.id : undefined}
                                    onSelect={(e) => changePartner(e)}
                                    label={ !partner ? "Select Partner" : "Partner" }
                                />
                                <button type="button" className="text-gray-900 bg-white border border-gray-300
                                focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200
                                font-medium rounded-lg text-sm px-5 mr-2 dark:bg-gray-800
                                dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600
                                dark:focus:ring-gray-700 whitespace-nowrap">Add Partner</button>
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-3">
                                <StyledInput
                                    type="date" name="invoiceIssueDate"
                                    value={currentInvoice.invoiceIssueDate}
                                    onChange={(e) => changeType(e, 'invoiceIssueDate')}
                                    label="Issue Date"
                                />
                                <StyledInput
                                    type="date" name="invoiceDeliveryDate"
                                    value={currentInvoice.invoiceDeliveryDate}
                                    onChange={(e) => changeType(e, 'invoiceDeliveryDate')}
                                    label="Delivery Date"
                                />
                                <StyledInput
                                    type="date" name="invoicePaymentDate"
                                    value={currentInvoice.invoicePaymentDate}
                                    onChange={(e) => changeType(e, 'invoicePaymentDate')}
                                    label="Payment Deadline"
                                />
                            </div>
                            <div className="grid md:grid-cols-2 md:gap-3">
                                <StyledSelect
                                    type="text" name="invoiceCurrency"
                                    options={textToOptions(InvoiceConstants.invoice.invoiceCurrency, undefined)}
                                    value={currentInvoice.invoiceCurrency ? currentInvoice.invoiceCurrency : undefined}
                                    onSelect={(e) => changeType(
                                        e as unknown as ChangeEvent<HTMLInputElement>, 'invoiceCurrency')}
                                    label="Currency"
                                />
                                <StyledInput
                                    type="number" name="invoiceExchangeRate"
                                    value={currentInvoice.invoiceExchangeRate}
                                    onChange={(e) => changeType(e, 'invoiceExchangeRate')}
                                    label="Exchange Rate"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <InvoiceItemsTable
                                invoice={currentInvoice}
                                items={currentInvoice.items}
                                setItems={(items: InvoiceItem[]) => setCurrentInvoice({...currentInvoice, items:items})}
                                currentItem={currentItem}
                                setCurrentItem={setCurrentItem}
                            />
                        </div>

                    </div>
                    <div className="flex flex-row justify-end mb-2">
                        <div className="w-full max-w-[380px] p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h4>Summary</h4>
                            <table className="w-full text-xl text-left text-gray-500 dark:text-gray-400">
                                <tbody>
                                    <tr>
                                        <td>Tax:</td>
                                        <td>0 Ft</td>
                                    </tr>
                                    <tr>
                                        <td>Grand Total:</td>
                                        <td>0 Ft</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </form>

                <div className="flex justify-between">
                    <button type="button"
                            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                            focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={() => onSave()}
                    >Save
                    </button>
                    <button type="button"
                            className="text-gray-900 bg-white border border-gray-300 focus:outline-none
                            hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg
                            text-sm px-5 py-2.5 mr-2 dark:bg-gray-800 dark:text-white dark:border-gray-600
                            dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            onClick={() => onClose()}
                    >Cancel
                    </button>

                </div>
            </div>
        </div>
    )
}
