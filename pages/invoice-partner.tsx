import {useEffect, useState} from "react";
import {useSession} from "next-auth/react";
import {InvoicePartner} from "@/src/types/general";
import Layout from "@/components/layout";
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs";
import {collection, deleteDoc, doc, DocumentData, setDoc, updateDoc} from "firebase/firestore";
import {db, firebaseCollections, getCollection} from "@/src/firebase/config";
import InvoicePartnerModal from "@/components/modals/InvoicePartnerModal";


export const emptyInvoicePartner = {
    customerName: "",
    customerTaxNumber: "",
    customerPostCode: "",
    customerTown: "",
    customerStreetName: "",
    customerStreetCategory: "",
    customerAddress: "",
    customerCountry: "",
    customerType: 'PERSON'
}


export default function InvoicePartner() {
    const [partners, setPartners] = useState([] as InvoicePartner[]);
    const [currentPartner, setCurrentPartner] = useState({...emptyInvoicePartner} as InvoicePartner);
    const [showNewPartner, setShowNewPartner] = useState(false);
    const session = useSession();

    const savePartner = async () => {
        const now = new Date().getTime();
        if (currentPartner.id) {
            // If there is an ID we need to update
            const userRef = doc(db, firebaseCollections.partners, currentPartner.id);
            await updateDoc(userRef, {
                ...currentPartner,
                modifiedBy: session?.data?.user?.email,
                modifiedAt: now
            } as DocumentData);
            setCurrentPartner({...emptyInvoicePartner} as InvoicePartner);
            setShowNewPartner(false);
            getCollection(firebaseCollections.partners).then((partners) => setPartners(partners as InvoicePartner[]));
        } else if (currentPartner.customerName) {
            const userRef = doc(collection(db, firebaseCollections.partners));
            await setDoc(userRef, {
                ...currentPartner,
                createdBy: session?.data?.user?.email,
                createdAt: now
            } as DocumentData, {merge: true});
            setCurrentPartner({...emptyInvoicePartner} as InvoicePartner);
            setShowNewPartner(false);
            getCollection(firebaseCollections.partners).then((partners) => setPartners(partners as InvoicePartner[]));
        } else {
            alert('Name is mandatory field');
        }
    }

    const deletePartner = async (id: string|undefined) => {
        if (id && window.confirm('Are you sure you wish to delete this Partner?')) {
            await deleteDoc(doc(db, firebaseCollections.partners, id));
        }
    };

    const openPartner = (partner: InvoicePartner) => {
        setCurrentPartner(Object.assign({}, emptyInvoicePartner, partner));
        setShowNewPartner(true);
    };

    useEffect(() => {
        getCollection(firebaseCollections.partners).then((partners) => setPartners(partners as InvoicePartner[]));
    }, []);

    return (
        <Layout>
            <div className="flex justify-between max-w-screen-xl m-auto">
                <div />
                <button type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                            focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => setShowNewPartner(true)}
                >
                    Add Partner
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
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Type
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {partners.map((partner) =>
                        <tr key={partner.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {partner.id}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {partner.customerName}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {partner.customerType}
                            </th>
                            <td className="px-6 py-4 flex flex-row text-lg">
                                <BsPencilSquare className="cursor-pointer ml-2" onClick={() => openPartner(partner)}/>
                                <BsFillTrashFill className="cursor-pointer ml-2" onClick={() => deletePartner(partner.id)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <InvoicePartnerModal
                visible={showNewPartner}
                onClose={() => setShowNewPartner(false)}
                onSave={() => savePartner()}
                currentPartner={currentPartner}
                setCurrentPartner={setCurrentPartner}
            />
        </Layout>

    );
}