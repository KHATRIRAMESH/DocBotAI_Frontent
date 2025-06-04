"use client";

import { useContext, useEffect, useState } from "react";
import AdminDashboardSideBar from "../../components/admin/AdminDashboardComponent";
import { useUser } from "@clerk/nextjs";
import { socket } from "@/utils/socket"; // Ensure this path is correct
import {
  RequestContextProvider,
  RequestContext,
} from "../../context/requestContext.js";
import AdminRoute from "@/components/auth/AdminRoute";

export default function DashboardLayout({ children }) {

  
const AdminSocketListener = () => {
  const { setLoanRequest } = useContext(RequestContext);

  useEffect(() => {
    socket.emit("join-admin-room");

    socket.on("new-document-submission", (data) => {
      setLoanRequest(data);
      console.log("New document submitted:", data);
    });

    socket.on("reUpload", ({ userId, documentId }) => {
      console.log(`User ${userId} reuploaded ${documentId}`);
    });

    return () => {
      socket.off("new-document-submission");
      socket.off("reUpload");
    };
  }, []);

  return null; // no UI needed, only listens
};
  const { user } = useUser();
  // console.log(user?.primaryEmailAddress?.emailAddress);

  return (
    <AdminRoute>
    <RequestContextProvider>
      <div className="flex min-h-screen">
        {/* Fixed Sidebar */}
        <aside className="shrink-0 h-screen sticky top-0 overflow-y-auto border-r border-gray-200">
          <AdminDashboardSideBar />
        </aside>

        {/* Scrollable Main Content */}
        <main className="flex-1 overflow-y-auto bg-[#F5F5F5] min-h-screen">
          <AdminSocketListener />
          {children}
        </main>
      </div>
    </RequestContextProvider>
    </AdminRoute>
  );
}

