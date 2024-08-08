import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { randomBytes, randomUUID } from "crypto";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";


const prisma = new PrismaClient()

export const options: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_AUTH_CLIENTID || '',
            clientSecret: process.env.GOOGLE_AUTH_CLIENTSECRET || ''
        })
        
    ],
    callbacks: {
        async signIn({account, profile}) {
            if (!profile?.email) {
                throw new Error('no profile')
            }
            
            return true
        }
    },
    adapter: PrismaAdapter(prisma),
    secret: 'yoitsmee',
    session: {
        // Choose how you want to save the user session. In this case it is through db instead of jwt (preferred so you don't have to implement complex refresh token)
        strategy: "database",
      
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        
        updateAge: 24 * 60 * 60, // 24 hours
      
        // The session token is usually either a random UUID or string, however if you
        // need a more customized session token string, you can define your own generate function.
        generateSessionToken: () => {
          return randomUUID?.() ?? randomBytes(32).toString("hex")
        }
    },
    pages: {
        signIn: "/signin",
        signOut: "/signout"
    }
};
