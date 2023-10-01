"use client";
import {useEffect, useState} from "react";
import {collection, addDoc, getDoc, query, onSnapshot, DocumentData, doc, deleteDoc} from 'firebase/firestore';
import {db} from "@/firebase/config";
import {InvoiceUser} from "@/types/general";
import {BsFillTrashFill} from "react-icons/bs";

export default function InvoiceUser() {
    // TODO: Make Root layout to be working here
    const [users, setUsers] = useState([] as InvoiceUser[]);
    const [newUser, setNewUser] = useState({} as InvoiceUser);
    const dbName = 'invoice_users';

    const addUser = async (e) => {
        e.preventDefault();
        if (newUser.login) {
            await addDoc(collection(db, dbName), newUser as DocumentData);
            setNewUser({});
        }
    };

    const deleteUser = async (id) => {
        await deleteDoc(doc(db, dbName, id));
    };

    useEffect(() => {
        // TODO: Env Variables -> Auth -> Test this method
        /*
        const q = query(collection(db, dbName));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const receivedUsers = [];
            querySnapshot.forEach((doc) => {
                receivedUsers.push({ ...doc.data(), id: doc.id });
            });
            setUsers(receivedUsers);
            return () => unsubscribe()
        })*/
    }, []);

    return (
           <div className="relative overflow-x-auto shadow-md sm:rounded-lg max-w-screen-xl w-full mt-4">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                        login
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
                            {user.login}
                        </th>
                        <td className="px-6 py-4 flex flex-row text-lg">
                            <BsFillTrashFill className="cursor-pointer ml-2" onClick={() => deleteUser(user.id)}/>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
