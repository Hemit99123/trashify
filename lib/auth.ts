import { getSession } from "@auth0/nextjs-auth0"
import { NextResponse } from "next/server";

const authenticate = () => {
  const session = getSession();

  if (!session) {
    return NextResponse.json({success: false, error: "Not authenticated"}, {status: 401})
  }
}

export default authenticate