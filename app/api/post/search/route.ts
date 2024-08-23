import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const searchParams = req.nextUrl.searchParams;

        const query = searchParams.get('query') || ""

        const data = await prisma.post.findMany({
            where: {
                title: query
            }
        })

        return NextResponse.json({success: true, data}, {status: 200})

    } catch(err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}