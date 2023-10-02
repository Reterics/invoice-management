import Login from "@/app/Login";
import {useSession} from "next-auth/react";
import Header from "./header";


export default function Layout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const session = useSession();
    console.error(session);

    return (
        <>
            {!session || session.status === 'unauthenticated' ? (<Login /> ): (<div><Header />{children}</div>)}
        </>
    )
}
