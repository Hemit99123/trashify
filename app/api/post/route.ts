import { NextResponse, NextRequest } from "next/server";
import { prisma } from '@/utils/prisma';
import { getSession } from "@auth0/nextjs-auth0";
import { S3Client, CreateMultipartUploadCommand, UploadPartCommand, CompleteMultipartUploadCommand } from "@aws-sdk/client-s3";
import { randomUUID } from "crypto";
import { helperCacheFunctionCity } from "@/utils/cache";

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_S3 || '',
    secretAccessKey: process.env.SECRET_ACCESS_KEY_S3 || '',
  }
});

const BUCKET_NAME = 'mydemobucket121212';

const TYPEOF_STRING_ERROR_MESSAGE = "Invalid string value";

export const GET = async (req: NextRequest) => {
    const lat = req.nextUrl.searchParams.get('lat') || "";
    const long = req.nextUrl.searchParams.get('long') || "";

    try {
        let city = await helperCacheFunctionCity(lat, long);

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
        const body = await req.json();
        const { bin, photo, title, longitude, latitude } = body;
        const city = await helperCacheFunctionCity(latitude, longitude);

        const session = await getSession();

        // Generate a unique filename
        const fileName = `${randomUUID()}.jpg`;

        // Decode base64 photo
        let photoBuffer: Buffer | undefined;
        if (photo) {
            const base64Data = photo.split(',')[1]; // Remove the data URL part
            photoBuffer = Buffer.from(base64Data, 'base64'); // Convert base64 to Buffer
        }

        if (!photoBuffer) {
            throw new Error("No photo data provided");
        }

        // Start multipart upload (optimized uploading feature provided by AWS)
        const { UploadId } = await s3.send(new CreateMultipartUploadCommand({
            Bucket: BUCKET_NAME,
            Key: fileName,
            ContentType: 'image/jpeg',
        }));

        // Upload parts
        const uploadPromises = [];
        const chunkSize = 5 * 1024 * 1024; // 5 MB
        for (let start = 0; start < photoBuffer.length; start += chunkSize) {
            const end = Math.min(photoBuffer.length, start + chunkSize);
            const partNumber = Math.floor(start / chunkSize) + 1;
            const partBuffer = photoBuffer.slice(start, end);
            uploadPromises.push(
                s3.send(new UploadPartCommand({
                    Bucket: BUCKET_NAME,
                    Key: fileName,
                    PartNumber: partNumber,
                    UploadId: UploadId!,
                    Body: partBuffer,
                }))
            );
        }

        const uploadedParts = await Promise.all(uploadPromises);

        // Complete multipart upload
        await s3.send(new CompleteMultipartUploadCommand({
            Bucket: BUCKET_NAME,
            Key: fileName,
            UploadId: UploadId!,
            MultipartUpload: {
                Parts: uploadedParts.map((part, index) => ({
                    ETag: part.ETag!,
                    PartNumber: index + 1,
                })),
            },
        }));

        if (typeof city !== 'string') {
            throw new Error(TYPEOF_STRING_ERROR_MESSAGE);
        }

        // Create a new post record in the database
        const newPost = await prisma.post.create({
            data: {
                userId: session?.user?.email,
                city,
                bin,
                photo: `https://s3.us-east-1.amazonaws.com/${BUCKET_NAME}/${fileName}`,
                title,
                coor: `${longitude}, ${latitude}`,
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

        // No need to double check if session is null due to the auth0 middleware logic!
        await prisma.post.delete({
            where: {
                id,
                userId: session?.user?.email
            }
        });

        return NextResponse.json({ success: true, message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error);
        return NextResponse.json({ success: false, message: "Post did not delete" });
    }
};
