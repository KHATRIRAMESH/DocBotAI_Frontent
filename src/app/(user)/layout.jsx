"use client";

import UserRoute from "@/components/auth/UserRoute";
import DashboardSidebar from "../../components/user/DashboardSideBar";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  // console.log(user?.primaryEmailAddress?.emailAddress);

  return (
    <UserRoute>
    <div className="flex min-h-screen">
      {/* Sidebar: fixed height, sticky */}
      <aside className="shrink-0 h-screen sticky top-0">
        <DashboardSidebar />
      </aside>

      {/* Page content: scrollable only */}
      <main className="flex-1 overflow-y-auto h-screen bg-[#F5F5F5]">
        {children}
      </main>
    </div>
    </UserRoute>
  );
}
