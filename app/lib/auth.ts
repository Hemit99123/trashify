import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { getSession } from "next-auth/react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export const authenticate = async () => {
  const session = await getServerSession(options);

  if (!session) {
    const error:any = new Error("authentication failed :(");
    error.statusCode = 401; // Unauthorized status code
    throw error;
  }

  return session;
};


  export const authenticateClient = async (router: AppRouterInstance) => {

    const session = await getSession();

    if (!session) {
      router.replace('/signin')
    }

    return session;
  };

