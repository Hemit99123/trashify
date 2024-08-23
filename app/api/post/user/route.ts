import {prisma} from '@/utils/prisma'
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;
        const email = searchParams.get('email')

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