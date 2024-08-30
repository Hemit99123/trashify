import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * /api/posts/search:
 *   get:
 *     tags:
 *       - Searching
 *     description: Fetch posts based on user email or title
 *     parameters:
 *       - in: query
 *         name: email
 *         schema:
 *           type: string
 *           example: "true"
 *         description: Filter posts by the current user's email if set to "true"; otherwise, use the provided email.
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *           example: "My Post Title"
 *         description: Filter posts by title. If set to "null" or omitted, it will not filter by title.
 *     responses:
 *       200:
 *         description: A list of posts matching the filter criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       500:
 *         description: Internal server error
 */
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
