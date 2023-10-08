import React from "react";
import {InvoiceUserModalInput} from "@/src/types/modals";
import {InvoiceUser} from "@/src/types/general";
import StyledInput from "@/components/lib/StyledInput";


export default function InvoiceUserModal({ visible, onClose, currentUser, setCurrentUser, onSave }: InvoiceUserModalInput) {

    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'InvoiceUserModal') {
            onClose();
        }
    };

    const changeType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setCurrentUser((currentUser: InvoiceUser) => {
            const obj = {...currentUser};
            // @ts-ignore
            obj[key] = value;
            return obj;
        });
    };

    if (!visible) return null;

    return (
        <div
            id="InvoiceUserModal"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center"
        >
            <div className="bg-white p-4 rounded w-[36rem] dark:bg-gray-900">
                <h1 className="font-semibold text-center text-xl text-gray-700 mb-4">
                    Edit Invoice User
                </h1>
                <p className="text-center text-gray-700 mb-5">Get info from <a
                    href="https://onlineszamla.nav.gov.hu/home">onlineszamla.nav.gov.hu</a></p>

                <form>
                    <StyledInput
                        type="text" name="supplierName"
                        value={currentUser.supplierName}
                        onChange={(e) => changeType(e, 'supplierName')}
                        label="Name"
                    />
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <StyledInput
                            type="text" name="login"
                            value={currentUser.login}
                            onChange={(e) => changeType(e, 'login')}
                            label="Login"
                        />
                        <StyledInput
                            type="password" name="password"
                            value={currentUser.password}
                            onChange={(e) => changeType(e, 'password')}
                            label="Password"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <StyledInput
                            type="text" name="signKey"
                            value={currentUser.signKey}
                            onChange={(e) => changeType(e, 'signKey')}
                            label="Sign Key"
                        />
                        <StyledInput
                            type="text" name="exchangeKey"
                            value={currentUser.exchangeKey}
                            onChange={(e) => changeType(e, 'exchangeKey')}
                            label="Exchange Key"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <StyledInput
                            type="text" name="supplierTaxNumber"
                            value={currentUser.supplierTaxNumber}
                            onChange={(e) => changeType(e, 'supplierTaxNumber')}
                            label="Tax Number"
                        />
                        <StyledInput
                            type="text" name="supplierBankAccountNumber"
                            value={currentUser.supplierBankAccountNumber}
                            onChange={(e) => changeType(e, 'supplierBankAccountNumber')}
                            label="Back Account"
                        />
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-4">
                        <StyledInput
                            type="text" name="supplierPostCode"
                            value={currentUser.supplierPostCode}
                            onChange={(e) => changeType(e, 'supplierPostCode')}
                            label="Post Code"
                        />

                        <StyledInput
                            type="text" name="supplierTown"
                            value={currentUser.supplierTown}
                            onChange={(e) => changeType(e, 'supplierTown')}
                            label="Town"
                        />
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-6">
                        <StyledInput
                            type="text" name="supplierStreetName"
                            value={currentUser.supplierStreetName}
                            onChange={(e) => changeType(e, 'supplierStreetName')}
                            label="Street Type"
                        />
                        <StyledInput
                            type="text" name="supplierStreetCategory"
                            value={currentUser.supplierStreetCategory}
                            onChange={(e) => changeType(e, 'supplierStreetCategory')}
                            label="Street"
                        />
                        <StyledInput
                            type="text" name="supplierAddress"
                            value={currentUser.supplierAddress}
                            onChange={(e) => changeType(e, 'supplierAddress')}
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
