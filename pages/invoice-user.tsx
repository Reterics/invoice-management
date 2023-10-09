"use client";
import {useEffect, useState} from "react";
import {
    collection,
    DocumentData,
    doc,
    deleteDoc,
    setDoc,
    updateDoc
} from 'firebase/firestore';
import {BsFillTrashFill, BsPencilSquare} from "react-icons/bs";
import Layout from "../components/layout";
import {InvoiceUser} from "@/src/types/general";
import InvoiceUserModal from "@/components/modals/InvoiceUserModal";
import {db, firebaseCollections, getCollection} from "@/src/firebase/config";
import {useSession} from "next-auth/react";

export const emptyInvoiceUser = {
    supplierName: "",
    supplierTaxNumber: "",
    supplierPostCode: "",
    supplierTown: "",
    supplierStreetName: "",
    supplierStreet: "",
    supplierAddress: "",
    supplierBankAccountNumber: "",

    login: "",
    password: "",
    signKey: "",
    exchangeKey: "",
};

export default function InvoiceUser() {
    const [users, setUsers] = useState([] as InvoiceUser[]);
    const [currentUser, setCurrentUser] = useState({...emptyInvoiceUser} as InvoiceUser);
    const [showNewUser, setShowNewUser] = useState(false);
    const session = useSession();

    const saveUser = async () => {
        const now = new Date().getTime();
        if (currentUser.id) {
            // If there is an ID we need to update
            const userRef = doc(db, firebaseCollections.users, currentUser.id);
            await updateDoc(userRef, {
                ...currentUser,
                modifiedBy: session?.data?.user?.email,
                modifiedAt: now
            } as DocumentData);
            setCurrentUser({...emptyInvoiceUser});
            setShowNewUser(false);
            getCollection(firebaseCollections.users).then((users) => setUsers(users as InvoiceUser[]));
        } else if (currentUser.supplierName) {
            const userRef = doc(collection(db, firebaseCollections.users));
            await setDoc(userRef, {
                ...currentUser,
                createdBy: session?.data?.user?.email,
                createdAt: now
            } as DocumentData, {merge: true});
            setCurrentUser({...emptyInvoiceUser});
            setShowNewUser(false);
            getCollection(firebaseCollections.users).then((users) => setUsers(users as InvoiceUser[]));
        } else {
            alert('Name is mandatory field');
        }
    };

    const deleteUser = async (id: string|undefined) => {
        if (id && window.confirm('Are you sure you wish to delete this User?')) {
            await deleteDoc(doc(db, firebaseCollections.users, id));
        }
    };

    const openUser = (user: InvoiceUser) => {
        setCurrentUser(Object.assign({}, emptyInvoiceUser, user));
        setShowNewUser(true);
    };

    useEffect(() => {
        getCollection(firebaseCollections.users).then((users) => setUsers(users as InvoiceUser[]));
    }, []);

    return (
        <Layout>
            <div className="flex justify-between max-w-screen-xl m-auto">
                <div />
                <button type="button"
                        className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none
                            focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2
                            dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                        onClick={() => setShowNewUser(true)}
                >
                    Add User
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
                            Login
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) =>
                        <tr key={user.id} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">

                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.id}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.supplierName}
                            </th>
                            <th scope="row"
                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {user.login}
                            </th>
                            <td className="px-6 py-4 flex flex-row text-lg">
                                <BsPencilSquare className="cursor-pointer ml-2" onClick={() => openUser(user)}/>
                                <BsFillTrashFill className="cursor-pointer ml-2" onClick={() => deleteUser(user.id)}/>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
            <InvoiceUserModal
                visible={showNewUser}
                onClose={() => setShowNewUser(false)}
                onSave={() => saveUser()}
                currentUser={currentUser}
                setCurrentUser={setCurrentUser}
            />
        </Layout>

    );
}
