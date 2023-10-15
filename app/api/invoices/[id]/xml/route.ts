import {getById} from "@/src/firebase/config";
import { promises as fs } from 'fs';
import {Invoice} from "@/src/types/general";
import {render} from '@redaty/lejs';
import {auth} from "@/auth";
import {NextApiRequest} from "next";

export async function GET(
    request: NextApiRequest,
    { params }: { params: { id: string } }
) {
    const session = await auth(request, null);

    if (session && session.user) {
        const invoice = await getById(params.id,
            process.env.NEXT_PUBLIC_FIREBASE_DB_INVOICES || 'invoices') as Invoice;
        let body = invoice.invoiceCategory ?
            (await fs.readFile(process.cwd() + '/src/templates/' + invoice.invoiceCategory.toLowerCase() + '.xml',
                'utf8')) : '<?xml version="1.0" encoding="UTF-8"?>';

        if (invoice) {
            body = render(body, invoice, undefined);
        }

        return new Response(body, { headers: { "Content-Type": "text/xml" } });
    }

    return new Response("Unauthorized", {
        status: 401,
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
