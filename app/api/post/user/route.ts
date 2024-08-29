import {prisma} from '@/utils/prisma'
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
        const session = await getSession()
        const email = session?.user?.email

        if (!email) {
            return NextResponse.json({success: false, error: "Email is not defined properly! Try again!"}, {status: 500})
        }

        const data = await prisma.post.findMany({
            where:{
                userId: email
            }
        })

        return NextResponse.json({success: true, data}, {status: 200})
    } catch(err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}