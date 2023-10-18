import React, {ChangeEvent, ReactEventHandler, SyntheticEvent} from "react";
import {InvoicePartnerModalInput, InvoiceUserModalInput} from "@/src/types/modals";
import {InvoiceConstants, InvoicePartner} from "@/src/types/general";
import StyledInput from "@/components/lib/StyledInput";
import StyledSelect, {textToOptions} from "@/components/lib/StyledSelect";


export default function InvoicePartnerModal({ visible, onClose, currentPartner, setCurrentPartner, onSave }: InvoicePartnerModalInput) {

    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'InvoicePartnerModal') {
            onClose();
        }
    };

    const changeCustomerType = (event: SyntheticEvent<HTMLSelectElement, Event>) => {
        const target = event.target as HTMLSelectElement;
        const customerType = target.value;
        let customerVatStatus: 'PRIVATE_PERSON'|'DOMESTIC'|'OTHER';
        switch (customerType) {
            case 'COMPANY_EU':
            case 'COMPANY':
                customerVatStatus =  'OTHER';
                break;
            case 'COMPANY_HU':
                customerVatStatus =  'DOMESTIC';
                break;
            default:
                customerVatStatus =  'PRIVATE_PERSON';
        }
        setCurrentPartner({...currentPartner, customerType, customerVatStatus});
    }

    const changeType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setCurrentPartner((currentPartner: InvoicePartner) => {
            const obj = {...currentPartner};
            // @ts-ignore
            obj[key] = value;
            return obj;
        });
    };

    if (!visible) return null;

    return (
        <div
            id="InvoicePartnerModal"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center"
        >
            <div className="bg-white p-4 rounded w-[36rem] dark:bg-gray-900">
                <h1 className="font-semibold text-center text-xl text-gray-700 mb-4">
                    Edit Invoice Partner
                </h1>

                <form>
                    <StyledInput
                        type="text" name="customerName"
                        value={currentPartner.customerName}
                        onChange={(e) => changeType(e, 'customerName')}
                        label="Name"
                    />

                    <StyledSelect
                        type="text" name="customerType"
                        options={textToOptions(InvoiceConstants.customer.customerType, undefined)}
                        value={currentPartner.customerType ? currentPartner.customerType : undefined}
                        onSelect={changeCustomerType}
                        label="Customer Type"
                    />

                    <div className="grid md:grid-cols-2 md:gap-6">
                        <StyledInput
                            type="text" name="customerTaxNumber"
                            value={currentPartner.customerTaxNumber}
                            onChange={(e) => changeType(e, 'customerTaxNumber')}
                            label="Tax Number"
                            pattern="[0-9]{8}[-]{1}[0-9]{1}[-]{1}[0-9]{2}"
                            maxLength={13}
                        />
                        <StyledInput
                            type="text" name="customerBankAccountNumber"
                            value={currentPartner.customerBankAccountNumber}
                            onChange={(e) => changeType(e, 'customerBankAccountNumber')}
                            label="Back Account"
                            pattern="[0-9]{8}-[0-9]{8}-[0-9]{8}|[0-9]{8}-[0-9]{8}|[A-Z]{2}[0-9]{2}[0-9A-Za-z]{11,30}"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-3">
                        <StyledSelect
                            type="text" name="customerCountry"
                            options={textToOptions(InvoiceConstants.customer.customerCountry, undefined)}
                            value={currentPartner.customerCountry ? currentPartner.customerCountry : undefined}
                            onSelect={(e) => changeType(
                                e as unknown as ChangeEvent<HTMLInputElement>, 'customerCountry')}
                            label="Country"
                        />
                        <StyledInput
                            type="text" name="customerPostCode"
                            value={currentPartner.customerPostCode}
                            onChange={(e) => changeType(e, 'customerPostCode')}
                            label="Post Code"
                        />

                        <StyledInput
                            type="text" name="customerTown"
                            value={currentPartner.customerTown}
                            onChange={(e) => changeType(e, 'customerTown')}
                            label="Town"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-3">
                        <StyledInput
                            type="text" name="customerStreetName"
                            value={currentPartner.customerStreetName}
                            onChange={(e) => changeType(e, 'customerStreetName')}
                            label="Street Name"
                        />
                        <StyledSelect
                            type="text" name="customerStreetCategory"
                            options={textToOptions(InvoiceConstants.customer.customerStreetCategory, undefined)}
                            value={currentPartner.customerStreetCategory ? currentPartner.customerStreetCategory : undefined}
                            onSelect={(e) => changeType(
                                e as unknown as ChangeEvent<HTMLInputElement>, 'customerStreetCategory')}
                            label="Street Type"
                        />
                        <StyledInput
                            type="text" name="customerAddress"
                            value={currentPartner.customerAddress}
                            onChange={(e) => changeType(e, 'customerAddress')}
                            label="Address"
                        />
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
