import { NextRequest, NextResponse } from "next/server";
import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import path from 'path';
import { prisma } from '@/utils/prisma';
import { helperCacheFunctionCity } from "@/utils/cache";
import { getSession } from "@auth0/nextjs-auth0";
import { TYPEOF_STRING_ERROR_MESSAGE } from "@/utils/helper";

const PROTO_PATH = path.join(process.cwd(), 'proto', 'main.proto');

interface CoordinateArray {
  coor: number[];
}

interface NearestLocationResponse {
  nearest_location: CoordinateArray;
}

export const GET = async (req: NextRequest) => {
  const session = await getSession();
  const searchParams = req.nextUrl.searchParams;
  const latitude = parseFloat(searchParams.get('lat') || "0.0");
  const longitude = parseFloat(searchParams.get('long') || "0.0");
  const city = await helperCacheFunctionCity(latitude.toString(), longitude.toString(), session);

  console.log(city)

  if (typeof city !== 'string') {
    throw new Error(TYPEOF_STRING_ERROR_MESSAGE);
  }

  try {
    const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
      keepCase: true,
      longs: String,
      enums: String,
      defaults: true,
      oneofs: true
    });

    const trashifyPackage = (grpc.loadPackageDefinition(packageDefinition) as any).unary;
    const client = new trashifyPackage.Trashify(
      /* Use production gRPC server or a local development one */
      process.env.GRPC_SERVER_ADDRESS || 'localhost:50051',
      grpc.credentials.createInsecure()
    );

    const coordinates = await prisma.post.findMany({
      where: { city },
      select: { coor: true }
    });

    // Ensure coordinates array is not empty
    if (coordinates.length === 0) {
      return NextResponse.json({ success: false, error: 'No coordinates found.' }, { status: 400 });
    }

    const grpcResponse = await new Promise<NearestLocationResponse>((resolve, reject) => {
      client.GetNearestCoor(
        { coordinates, query_location: { coor: [latitude, longitude] } },
        (error: any, response: NearestLocationResponse) => {
          if (error) {
            reject(error);
          } else {
            resolve(response);
          }
        }
      );
    });

    const { nearest_location } = grpcResponse;

    const finalResponse = await prisma.post.findMany({
      where: {  
        coor: {
          has: nearest_location.coor[0] // Adjust based on how you want to filter
        }
      }
    });

    return NextResponse.json({ success: true, data: finalResponse, nearest_location }, { status: 200 });
  } catch (err: any) {
    console.error('gRPC error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
};
