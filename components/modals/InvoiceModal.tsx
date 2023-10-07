import React, {SyntheticEvent, useState} from "react";
import {InvoiceModalInput} from "@/src/types/modals";
import StyledSelect from "@/components/lib/StyledSelect";
import {InvoiceUser} from "@/src/types/general";
import {StyledSelectOption} from "@/src/types/inputs";

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
            <div className="bg-white p-4 rounded w-[80vw]">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Edit Invoice
                </h1>

                <form className="flex flex-col">
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow
                        dark:bg-gray-800 dark:border-gray-700 mr-1">
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
                        dark:bg-gray-800 dark:border-gray-700 mb-1">
                            Customer Data will be here
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly mb-2">
                        <div className="w-full max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            Items
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
