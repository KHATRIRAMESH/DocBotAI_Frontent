"use client";

import { useAuth } from "@clerk/nextjs";

export async function getClerkToken(): Promise<string | null> {
  const { getToken } = useAuth();
  const token = await getToken();
  console.log("Clerk token:", token);

  return await getToken();
}
