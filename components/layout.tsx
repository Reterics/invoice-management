import Login from "@/app/Login";
import {useSession} from "next-auth/react";
import Header from "./header";


export default function Layout({
     children,
 }: {
    children: React.ReactNode
}) {
    const session = useSession();
    return (
        <>
            {!session || session.status === 'unauthenticated' ? (<Login /> ): (<div><Header />
                <div className="p-2">{children}</div></div>)}
        </>
    )
}
