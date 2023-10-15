import {getById} from "@/src/firebase/config";
import {auth} from "@/auth";
import {NextApiRequest} from "next";

export async function GET(
    request: NextApiRequest,
    { params }: { params: { id: string } }
) {
    const session = await auth(request, null);

    if (session && session.user) {
        const invoice = await getById(params.id,
            process.env.NEXT_PUBLIC_FIREBASE_DB_INVOICES || 'invoices');
        return Response.json({ invoice })
    }

    return new Response(JSON.stringify({message: "Unauthorized"}), {
        status: 401,
        headers: {
            'Content-Type': 'application/json',
        },
    });

}
