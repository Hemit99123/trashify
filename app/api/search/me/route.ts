import { prisma } from '@/utils/prisma';
import { getSession } from '@auth0/nextjs-auth0';
import { NextRequest, NextResponse } from "next/server";


/**
 * @swagger
 * /api/search/me:
 *   get:
 *     tags:
 *       - Searching
 *     description: Fetch all posts belonging to the currently authenticated user
 *     responses:
 *       200:
 *         description: A list of posts for the authenticated user
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
 *         description: Internal server error due to session or database issues
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */
export const GET = async (req: NextRequest) => {
    try {
        const session = await getSession();
        const email = session?.user?.email;

        if (!email) {
            return NextResponse.json({ success: false, error: "Email is not defined properly! Try again!" }, { status: 500 });
        }

        const data = await prisma.post.findMany({
            where: {
                userId: email
            }
        });

        return NextResponse.json({ success: true, data }, { status: 200 });
    } catch (err: any) {
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};
