import { getServerSession } from "next-auth"


import Google from "next-auth/providers/google"

// Read more at: https://next-auth.js.org/getting-started/typescript#module-augmentation
declare module "next-auth/jwt" {
    interface JWT {
        /** The user's role. */
        userRole?: "admin"
    }
}

export const config = {
    providers: [
        Google({ clientId: process.env.AUTH_GOOGLE_ID, clientSecret: process.env.AUTH_GOOGLE_SECRET })
    ],
    callbacks: {
        async jwt({ token }) {
            token.userRole = "admin"
            return token
        },
    },
};

// Helper function to get session without passing config every time
// https://next-auth.js.org/configuration/nextjs#getserversession
export function auth(...args: []) {
    return getServerSession(...args, config as any)
}

// We recommend doing your own environment variable validation
declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            NEXTAUTH_SECRET: string

            AUTH_GOOGLE_ID: string
            AUTH_GOOGLE_SECRET: string
        }
    }
}
