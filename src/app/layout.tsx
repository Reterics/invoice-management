import './globals.css'
import { Inter } from 'next/font/google'
import {getServerSession} from "next-auth";
import {authOptions} from "../../pages/api/auth/[...nextauth]";
import SessionProvider from "@/app/SessionProvider";
import Login from "@/app/Login";
import Header from "@/components/header";

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions as any);
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionProvider session={session}>
          {!session ? (<Login /> ): (<div><Header />{children}</div>)}
      </SessionProvider>
      </body>
    </html>
  )
}
