import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        const session = await getSession();
        const searchParams = req.nextUrl.searchParams;

        const email = searchParams.get('email');
        const title = searchParams.get('title');

        // Build the where clause dynamically
        const whereClause: { userId?: string; title?: string } = {};

        // Populate whereClause based on query parameters
        if (email === "true" && session?.user?.email) {
            whereClause.userId = session.user.email;
        } else {
            whereClause.userId = email || ""
        }

        // Handle title parameter, consider empty string or "null" as no filter
        if (title && title !== "null") {
            whereClause.title = title;
        }

        // Fetch data from the database
        const data = await prisma.post.findMany({
            where: whereClause,
        });

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (err: unknown) {
        // Handle unexpected errors
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        return NextResponse.json({ success: false, error: errorMessage }, { status: 500 });
    }
};
