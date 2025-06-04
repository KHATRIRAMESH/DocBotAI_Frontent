"use client";

import AdminDashboardSideBar from "../../components/admin/AdminDashboardComponent";
import { useUser } from "@clerk/nextjs";

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  // console.log(user?.primaryEmailAddress?.emailAddress);

  return (
    <div className="flex min-h-screen">
      {/* Fixed Sidebar */}
      <aside className="shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-gray-200">
        <AdminDashboardSideBar />
      </aside>

      {/* Scrollable Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#F5F5F5] min-h-screen">
        {children}
      </main>
    </div>
  );
}
