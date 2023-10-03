import React from "react";


export default function InvoiceUserModal({ visible, onClose, currentUser, setCurrentUser, onSave }) {

    const handleOnClose = (e: React.MouseEvent) => {
        const target = e.target as HTMLElement;
        if (target.id === 'modalContainer') {
            onClose();
        }
    };

    const changeType = (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
        const value = e.target.value;
        setCurrentUser(currentUser => {
            const obj = {...currentUser};
            obj[key] = value;
            return obj;
        });
    };

    if (!visible) return null;

    return (
        <div
            id="modalContainer"
            onClick={handleOnClose}
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
            flex justify-center items-center"
        >
            <div className="bg-white p-2 rounded w-[36rem]">
                <h1 className="font-semibold text-center text-xl text-gray-700">
                    Add Invoice User
                </h1>
                <p className="text-center text-gray-700 mb-5">Get info from <a
                    href="https://onlineszamla.nav.gov.hu/home">onlineszamla.nav.gov.hu</a></p>

                <form>
                    <div className="relative z-0 w-full mb-6 group">
                        <input type="email" name="supplierName" id="supplierName"
                               value={currentUser.supplierName}
                               onChange={(e) => changeType(e, 'supplierName')}
                               className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                           border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                           dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                               placeholder=" " required/>
                        <label htmlFor="supplierName"
                               className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                           duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0
                           peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100
                           peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Name
                        </label>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="login"
                                   id="login"
                                   value={currentUser.login}
                                   onChange={(e) => changeType(e, 'login')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                                   border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                                   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="login"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Login</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="password" id="password"
                                   value={currentUser.password}
                                   onChange={(e) => changeType(e, 'password')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="password"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Password</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="signKey"
                                   id="signKey"
                                   value={currentUser.signKey}
                                   onChange={(e) => changeType(e, 'signKey')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                                   border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                                   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="signKey"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Sign Key</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="exchangeKey" id="exchangeKey"
                                   value={currentUser.exchangeKey}
                                   onChange={(e) => changeType(e, 'exchangeKey')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="exchangeKey"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Exchange Key</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="supplierTaxNumber"
                                   id="supplierTaxNumber"
                                   value={currentUser.supplierTaxNumber}
                                   onChange={(e) => changeType(e, 'supplierTaxNumber')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                                   border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                                   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierTaxNumber"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Tax Number</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="supplierBankAccountNumber" id="supplierBankAccountNumber"
                                   value={currentUser.supplierBankAccountNumber}
                                   onChange={(e) =>
                                       changeType(e, 'supplierBankAccountNumber')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierBankAccountNumber"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Back Account</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-3 md:gap-4">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="supplierPostCode"
                                   id="supplierPostCode"
                                   value={currentUser.supplierPostCode}
                                   onChange={(e) => changeType(e, 'supplierPostCode')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                                   border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                                   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierPostCode"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Post Code</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="supplierTown" id="supplierTown"
                                   value={currentUser.supplierTown}
                                   onChange={(e) => changeType(e, 'supplierTown')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierTown"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Town</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="supplierStreetName" id="supplierStreetName"
                                   value={currentUser.supplierStreetName}
                                   onChange={(e) => changeType(e, 'supplierStreetName')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierStreetName"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Street Type</label>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="supplierStreet"
                                   id="supplierStreet"
                                   value={currentUser.supplierStreet}
                                   onChange={(e) => changeType(e, 'supplierStreet')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0
                                   border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600
                                   dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierStreet"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Street</label>
                        </div>
                        <div className="relative z-0 w-full mb-6 group">
                            <input type="text" name="supplierAddress" id="supplierAddress"
                                   value={currentUser.supplierAddress}
                                   onChange={(e) => changeType(e, 'supplierAddress')}
                                   className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent
                                   border-0 border-b-2 border-gray-300 appearance-none dark:text-white
                                   dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none
                                   focus:ring-0 focus:border-blue-600 peer"
                                   placeholder=" " required/>
                            <label htmlFor="supplierAddress"
                                   className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400
                                   duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0]
                                   peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500
                                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0
                                   peer-focus:scale-75 peer-focus:-translate-y-6">Address</label>
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
