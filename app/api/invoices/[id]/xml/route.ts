import {getById} from "@/src/firebase/config";
import { promises as fs } from 'fs';
import {Invoice} from "@/src/types/general";

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    const invoice = await getById(params.id,
        process.env.NEXT_PUBLIC_FIREBASE_DB_INVOICES || 'invoices') as Invoice;
    const xmlTemplate = await fs.readFile(process.cwd() + '/src/templates/simplified.xml', 'utf8');

    let body = '<?xml version="1.0" encoding="UTF-8"?>';
    if (invoice) {
        body = xmlTemplate;
        Object.keys(invoice).forEach((key: string) => {
            // @ts-ignore
            if (typeof invoice[key] === 'string') {
                // @ts-ignore
                body = body.replaceAll('{{'+key+'}}', invoice[key]);
            }
        })
        return new Response(body, { headers: { "Content-Type": "text/xml" } });

    }
    return new Response(body, { headers: { "Content-Type": "text/xml" } });
}
