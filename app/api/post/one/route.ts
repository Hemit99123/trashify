import { prisma } from "@/utils/prisma";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * /api/posts/one:
 *   get:
 *     tags:
 *       - Searching
 *     description: Fetch a single post by its ID if it belongs to the current user
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *           example: 1
 *         description: The ID of the post to fetch. Must be a number.
 *     responses:
 *       200:
 *         description: A single post matching the provided ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request due to invalid ID parameter
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 *       500:
 *         description: Internal server error
 */

export const GET = async (req: NextRequest) => {
    const searchParams = req.nextUrl.searchParams;
    const session = await getSession();
    const id = parseInt(searchParams.get('id') || "");

    if (isNaN(id)) {
        // In case the id is NaN value due to it not being a numerical value
        return NextResponse.json({ success: false, error: "ID is not a number" }, { status: 400 });
    }

    try {
        const data = await prisma.post.findUnique({
            where: {
                id,
                userId: session?.user?.email
            }
        });

        if (!data) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};
