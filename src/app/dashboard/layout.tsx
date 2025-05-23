"use client";

import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);
  return (
    <section className=" min-h-screen">
      <div>{children}</div>
    </section>
  );
}
//
