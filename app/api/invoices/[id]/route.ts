import {getById} from "@/src/firebase/config";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const invoice = await getById(params.id,
        process.env.NEXT_PUBLIC_FIREBASE_DB_INVOICES || 'invoices');
    return Response.json({ invoice })
}
