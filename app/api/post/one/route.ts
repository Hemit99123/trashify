import { prisma } from "@/utils/prisma"
import { getSession } from "@auth0/nextjs-auth0"
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const session = await getSession();
    const id = parseInt(searchParams.get('id') || "")

    if (typeof id !== "number") {
        // In case the id is NaN value due to it not being a numerical value
        return NextResponse.json({success: false, error: "ID is not a number"}, {status: 500})
    }

    try {
        const data = await prisma.post.findUnique({
            where: {
                id,
                userId: session?.user?.email
            }
        })

        return NextResponse.json({success: true, data}, {status: 200})
    } catch(err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
}