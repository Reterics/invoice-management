import React, {ChangeEvent, SyntheticEvent, useState} from "react";
import {InvoiceModalInput} from "@/src/types/modals";
import StyledSelect, {textToOptions} from "@/components/lib/StyledSelect";
import {Invoice, InvoiceConstants, InvoiceItem, InvoiceUser} from "@/src/types/general";
import {StyledSelectOption} from "@/src/types/inputs";
import StyledInput from "@/components/lib/StyledInput";
import InvoiceItemsTable from "@/components/InvoiceItemsTable";
import {it} from "node:test";

export default function InvoiceModal({
    visible,
    onClose,
    currentInvoice,
    setCurrentInvoice,
    users,
    onSave
}: InvoiceModalInput) {

    const [supplier, setSupplier] = useState<InvoiceUser|undefined>(undefined);

    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'InvoiceModal') {
            onClose();
        }
    };

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

    if (!visible) return null;

    return (
        <div
            id="InvoiceModal"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center"
        >
            <div className="bg-white p-4 rounded w-[90vw] dark:bg-gray-900">
                <h1 className="font-semibold text-center text-xl text-gray-700 mb-4">
                    Edit Invoice
                </h1>

                <form className="flex flex-col">
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow
                        dark:bg-gray-800 dark:border-gray-700 mr-1 pt-9">
                            <StyledSelect
                                type="text" name="supplierName"
                                options={users.map(user=> {
                                    return {name: user.supplierName, value: user.id}
                                }) as unknown as StyledSelectOption[]}
                                value={supplier ? supplier.id : undefined}
                                onSelect={(e) => changeSupplier(e)}
                                label={ !supplier ? "Select Supplier" : "Supplier" }
                            />
                        </div>
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow
                        dark:bg-gray-800 dark:border-gray-700 mb-1 pt-9">
                            <StyledSelect
                                type="text" name="customerType"
                                options={textToOptions(InvoiceConstants.customer.customerType, undefined)}
                                value={currentInvoice.customerType ? currentInvoice.customerType : undefined}
                                onSelect={(e) => changeType(
                                    e as unknown as ChangeEvent<HTMLInputElement>, 'customerType')}
                                label="Customer Type"
                            />
                            <StyledInput
                                type="text" name="customerName"
                                value={currentInvoice.customerName}
                                onChange={(e) => changeType(e, 'customerName')}
                                label="Customer Name"
                            />
                            <div className="grid md:grid-cols-3 md:gap-3">
                                <StyledSelect
                                    type="text" name="customerCountry"
                                    options={textToOptions(InvoiceConstants.customer.customerCountry, undefined)}
                                    value={currentInvoice.customerCountry ? currentInvoice.customerCountry : undefined}
                                    onSelect={(e) => changeType(
                                        e as unknown as ChangeEvent<HTMLInputElement>, 'customerCountry')}
                                    label="Country"
                                />
                                <StyledInput
                                    type="text" name="customerPostCode"
                                    value={currentInvoice.customerPostCode}
                                    onChange={(e) => changeType(e, 'customerPostCode')}
                                    label="Post Code"
                                />

                                <StyledInput
                                    type="text" name="customerTown"
                                    value={currentInvoice.customerTown}
                                    onChange={(e) => changeType(e, 'customerTown')}
                                    label="Town"
                                />
                            </div>
                            <div className="grid md:grid-cols-3 md:gap-3">
                                <StyledInput
                                    type="text" name="customerStreetName"
                                    value={currentInvoice.customerStreetName}
                                    onChange={(e) => changeType(e, 'customerStreetName')}
                                    label="Street Type"
                                />
                                <StyledSelect
                                    type="text" name="customerStreetCategory"
                                    options={textToOptions(InvoiceConstants.customer.customerStreetCategory, undefined)}
                                    value={currentInvoice.customerStreetCategory ? currentInvoice.customerStreetCategory : undefined}
                                    onSelect={(e) => changeType(
                                        e as unknown as ChangeEvent<HTMLInputElement>, 'customerStreetCategory')}
                                    label="Street Type"
                                />
                                <StyledInput
                                    type="text" name="customerAddress"
                                    value={currentInvoice.customerAddress}
                                    onChange={(e) => changeType(e, 'customerAddress')}
                                    label="Address"
                                />
                            </div>

                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h4>Invoice Items</h4>
                            <InvoiceItemsTable
                                items={currentInvoice.items}
                                setItems={(items: InvoiceItem[]) => setCurrentInvoice({...currentInvoice, items:items})}
                            />
                        </div>

                    </div>
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            Summary
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
