'use client';
import React from 'react';
import { signIn } from "next-auth/react"

export default function Login() {
    return (
        <div className="flex flex-col h-screen justify-between">
            <header className="relative">
                <div className="px-4 sm:px-6 md:px-8">


                    <div className="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32"><h1
                        className="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight
                        text-center dark:text-white">Invoice Management</h1>
                        <div className="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">

                            <a
                            className="bg-slate-900 hover:bg-slate-700 focus:outline-none focus:ring-2
                            focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50
                            text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center
                            sm:w-auto dark:bg-sky-500 dark:highlight-white/20 dark:hover:bg-sky-400"
                            href={`/api/auth/signin`} onClick={(e) => {
                                e.preventDefault()
                                void signIn('google')
                            }}>Login to start</a>
                        </div>
                    </div>
                </div>
            </header>
            <footer className="pb-16 text-sm leading-6">
                <div className="max-w-7xl mx-auto divide-y divide-slate-200 px-4 sm:px-6 md:px-8 dark:divide-slate-700">

                    <div className="mt-16 pt-10">
                        <a href="#" className="flex items-center">
                            <img src="./logo.png" className="h-8 mr-3" alt="Reterics Logo"/>
                            <div
                                className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white flex-row flex">Invoice Management
                                <div className="text-sm pt-1 text ml-1">by Attila Reterics</div></div>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    )
}
