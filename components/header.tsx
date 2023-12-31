'use client';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {signOut, useSession} from "next-auth/react";
import Image from "next/image";

export default function Header() {
    const pathname = usePathname()
    const session = useSession();

    return (
        <header>
            <nav className="w-full bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <a href="https://reterics.com/" className="flex items-center">
                        <Image src="/logo.png" width={30} height={32} className="h-8 mr-3" alt="Reterics Logo"/>
                        <div
                            className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white flex-row flex">Invoice
                            <div className="text-sm pt-1 text">Management</div></div>
                    </a>
                    <button data-collapse-toggle="navbar-default" type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            aria-controls="navbar-default" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                             viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link href='/'
                                      className={pathname === '/' ?
                                          "block py-2 pl-3 pr-4 text-white bg-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500" :
                                          "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white md:dark:hover:bg-transparent"}
                                      aria-current="page">Invoices</Link>
                            </li>
                            <li>
                                <Link href='/invoice-user'
                                      className={pathname === '/invoice-user' ?
                                          "block py-2 pl-3 pr-4 text-white bg-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500" :
                                          "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white md:dark:hover:bg-transparent"}
                                >Invoice Users</Link>
                            </li>
                            <li>
                                <Link href='/invoice-partner'
                                      className={pathname === '/invoice-partner' ?
                                          "block py-2 pl-3 pr-4 text-white bg-gray-900 rounded md:bg-transparent md:text-gray-700 md:p-0 dark:text-white md:dark:text-gray-500" :
                                          "block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-500 md:hover:bg-transparent md:border-0 md:hover:text-gray-900 md:p-0 dark:text-white md:dark:hover:text-gray-900 dark:hover:bg-gray-900 dark:hover:text-white md:dark:hover:bg-transparent"}
                                >Invoice Partners</Link>
                            </li>
                            <li className="font-normal">
                                Welcome {session?.data?.user?.name}
                                <button onClick={() => signOut()} className="font-medium ml-3">Logout</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

        </header>
    )
}
