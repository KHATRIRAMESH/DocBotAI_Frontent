"use client";

import { useAuth } from "@clerk/nextjs";

export function GetClerkToken(): Promise<string | null> {
  const { getToken } = useAuth();
  const token = getToken();
  console.log("Clerk token:", token);

  return getToken();
}
