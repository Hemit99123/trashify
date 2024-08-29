import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/utils/prisma';
import { getSession } from "@auth0/nextjs-auth0";
import { UploadApiResponse, v2 as cloudinary } from 'cloudinary';
import { helperCacheFunctionCity } from "@/utils/cache";
import { TYPEOF_STRING_ERROR_MESSAGE } from "@/utils/helper";

// Configure Cloudinary
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

export const GET = async (req: NextRequest) => {
    const session = await getSession();

    const lat = req.nextUrl.searchParams.get('lat') || "";
    const long = req.nextUrl.searchParams.get('long') || "";

    try {
        let city = await helperCacheFunctionCity(lat, long, session);

        if (typeof city !== 'string') {
            throw new Error(TYPEOF_STRING_ERROR_MESSAGE);
        }
        
        const data = await prisma.post.findMany({
            where: { city }
        });

        return NextResponse.json({ success: true, data }, { status: 200 });

    } catch (err: any) {
        console.error("Error fetching posts:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const session = await getSession();
        const body = await req.json();
        const { bin, photo, title, long, lat } = body;
        const city = await helperCacheFunctionCity(lat, long, session);

        if (typeof city !== 'string') {
            throw new Error(TYPEOF_STRING_ERROR_MESSAGE);
        }

        // Upload an image to Cloudinary
        let photoUrl: string | undefined;
        let imagePublicID: string;

        if (photo) {
            const base64Data = photo.split(',')[1]; // Remove the data URL part
            const uploadResult = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`);
            photoUrl = uploadResult.secure_url;
            // Need this for deletion
            imagePublicID = uploadResult.public_id;
        } else {
            throw new Error("No photo data provided");
        }

        // Create a new post record in the database
        const newPost = await prisma.post.create({
            data: {
                userId: session?.user?.email,
                city,
                bin,
                photo: photoUrl,
                title,
                coor: [parseFloat(lat), parseFloat(long)],
                imagePublicID,
            },
        });

        return NextResponse.json({ success: true, data: newPost }, { status: 201 });

    } catch (err: any) {
        console.error("Error creating post:", err);
        return NextResponse.json({ success: false, error: err.message }, { status: 500 });
    }
};

export const DELETE = async (req: NextRequest) => {
    try {
        const body = await req.json();
        const { id } = body;

        const session = await getSession();

    // Fetch the post to get the publicID
    const post = await prisma.post.findUnique({
        where: { id },
        select: { imagePublicID: true }
    });
    // Delete the post from the database
    await prisma.post.delete({
        where: {
            id,
            userId: session?.user?.email
        }
    }).then(async () => {
        if (post?.imagePublicID) {
            // Delete the image from Cloudinary
            await cloudinary.uploader.destroy(post.imagePublicID);
        }    
    })

        return NextResponse.json({ success: true, message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ success: false, message: "Post did not delete" });
    }
};

export const PUT = async (req: NextRequest) => {
    try {
        // setting response type to the api response from cloudinary for typescript validation
        let response: UploadApiResponse;
        const body = await req.json();
        const { bin, title, lat, long, id, photo } = body;
        const session = await getSession();

        const post = await prisma.post.findUnique({
            where: { id },
            select: { imagePublicID: true }
        });

        // Build the data clause dynamically
        const dataClause: any = {};

        if (bin) dataClause.bin = bin;
        if (title) dataClause.title = title;
        if (lat && long) dataClause.coor = [lat, long];

        // Handle photo upload and update in one go
        if (photo) {
            const base64Data = photo.split(',')[1];
            response = await cloudinary.uploader.upload(`data:image/jpeg;base64,${base64Data}`);
            dataClause.photo = response.url;
        }

        // Update the post
        await prisma.post.update({
            where: {
                id,
                userId: session?.user?.id
            },
            data: dataClause
        })
        .then(async () => {
            if (post?.imagePublicID) {
                // Delete the old image from Cloudinary
                await cloudinary.uploader.destroy(post.imagePublicID);
            }
        })

        .catch(async () => {
            // Delete the newly created image as it was not updated into the database solution (since we are catching an error from the promise)
            await cloudinary.uploader.destroy(response.public_id)
        })

        return NextResponse.json({ success: true, message: "Updated your post" });

    } catch (error) {
        console.error("Error updating post:", error);
        return NextResponse.json({ success: false, message: "Post update failed" });
    }
};

