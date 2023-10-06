import Layout from "../components/layout";
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs";
import {useEffect, useState} from "react";
import {Invoice, InvoiceUser} from "@/src/types/general";
import InvoiceModal from "@/components/modals/InvoiceModal";
import {useSession} from "next-auth/react";
import {collection, deleteDoc, doc, DocumentData, setDoc, updateDoc} from "firebase/firestore";
import {db, firebaseCollections, getCollection} from "@/src/firebase/config";

export const emptyInvoice = {
    supplierName: "",
    supplierTaxNumber: "",
    supplierPostCode: "",
    supplierTown: "",
    supplierStreetName: "",
    supplierStreet: "",
    supplierAddress: "",
    supplierBankAccountNumber: "",

    customerName: "",
    customerTaxNumber: "",
    customerPostCode: "",
    customerTown: "",
    customerStreetName: "",
    customerStreet: "",
    customerAddress: "",
    customerCountry: "",

    invoiceNumber: "",
    invoiceCategory: 'SIMPLIFIED',
    invoiceIssueDate: "",
    invoiceDeliveryDate: "",
    invoiceCurrency: "",
    invoiceExchangeRate: "",
    invoicePaymentMethod: 'CASH',
    invoiceAppearance: 'ELECTRONIC',
    invoiceGrossAmount: "",

    items: [],

    transactionID: "",
    unixID: ""
} as Invoice;

export default function Home() {
    const [users, setUsers] = useState([] as InvoiceUser[]);
    const [invoices, setInvoices] = useState([] as Invoice[]);
    const [showInvoiceModal, setShowInvoiceModal] = useState(false);
    const [currentInvoice, setCurrentInvoice] = useState({...emptyInvoice});
    const session = useSession();

    const saveInvoice = async () => {
        const now = new Date().getTime();
        if (currentInvoice.id) {
            // If there is an ID we need to update
            const userRef = doc(db, firebaseCollections.invoices, currentInvoice.id);
            await updateDoc(userRef, {
                ...currentInvoice,
                modifiedBy: session?.data?.user?.email,
                modifiedAt: now
            } as DocumentData);
            setCurrentInvoice({...emptyInvoice});
            setShowInvoiceModal(false);
            getCollection(firebaseCollections.invoices).then((invoices) => setInvoices(invoices as Invoice[]));
        } else if (currentInvoice.items && currentInvoice.items.length) {
            const userRef = doc(collection(db, firebaseCollections.invoices));
            await setDoc(userRef, {
                ...currentInvoice,
                createdBy: session?.data?.user?.email,
                createdAt: now
            } as DocumentData, {merge: true});
            setCurrentInvoice({...emptyInvoice});
            setShowInvoiceModal(false);
            getCollection(firebaseCollections.invoices).then((invoices) => setInvoices(invoices as Invoice[]));
        } else {
            alert('No items in invoice');
        }
    }

    const deleteInvoice = async (id: string|undefined) => {
        if (id && window.confirm('Are you sure you wish to delete this Invoice?')) {
            await deleteDoc(doc(db, firebaseCollections.invoices, id));
        }
    };

    const openInvoice = (invoice: Invoice) => {
        setCurrentInvoice(Object.assign({}, emptyInvoice, invoice));
        setShowInvoiceModal(true);
    };

    useEffect(() => {
        getCollection(firebaseCollections.users).then((users) => setUsers(users as InvoiceUser[]));
        getCollection(firebaseCollections.invoices).then((invoices) => setInvoices(invoices as Invoice[]));
    }, []);

    return (
        <Layout>
            <div className="flex justify-between max-w-screen-xl m-auto">
                <div />
                <button type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                            focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => setShowInvoiceModal(true)}
                >
                    Create Invoice
                </button>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-xl m-auto w-full mt-2">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Invoice Number
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Customer
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Amount
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created At
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map((invoice) =>
                        <tr key={invoice.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.id}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.invoiceNumber}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.invoiceCategory}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.customerName}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.invoiceGrossAmount}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {invoice.invoiceIssueDate}
                            </th>
                            <td className="px-6 py-4 flex flex-row text-lg">
                                <BsPencilSquare className="cursor-pointer ml-2" onClick={() => openInvoice(invoice)}/>
                                <BsFillTrashFill className="cursor-pointer ml-2" onClick={() =>
                                    deleteInvoice(invoice.id)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <InvoiceModal
                visible={showInvoiceModal}
                onClose={() => setShowInvoiceModal(false)}
                onSave={() => saveInvoice()}
                currentInvoice={currentInvoice}
                setCurrentInvoice={setCurrentInvoice}
                users={users}
            />
        </Layout>

    )
}
