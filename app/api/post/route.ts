import { NextRequest, NextResponse } from "next/server";
import { authenticate } from "../../lib/auth";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const POST = async (req: NextRequest) => {
  try {
    await authenticate();
    
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
};
