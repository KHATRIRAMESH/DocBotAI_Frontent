"use client";

import AdminDashboardSideBar from "../../components/admin/AdminDashboardComponent";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}) {
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);

  return (
    <div className="flex min-h-screen">   
      <aside className="shrink-0">         
        <AdminDashboardSideBar />
      </aside>

      {/* ----- Page content ----- */}
      <main className="flex-1 overflow-y-auto bg-[#F5F5F5]">
        {children}
      </main>
    </div>
  );
}
