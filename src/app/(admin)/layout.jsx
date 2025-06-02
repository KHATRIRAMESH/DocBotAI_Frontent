"use client";

import { useEffect, useState } from "react";
import AdminDashboardSideBar from "../../components/admin/AdminDashboardComponent";
import { useUser } from "@clerk/nextjs";
import { socket } from "@/utils/socket"; // Ensure this path is correct

export default function DashboardLayout({ children }) {
  const { user } = useUser();
  console.log(user?.primaryEmailAddress?.emailAddress);
  const [room, setRoom] = useState("");

  useEffect(() => {
    socket.on("new-document-submission", ({ userId, documentId, fileURL }) => {
      setRoom(userId);
      console.log("New document submitted:", {
        userId,
        documentId,
        fileURL,
      });
      socket.emit("join-admin-to-user-room", {
        room,
      });

      // You can update state or show a notification here
    });
    socket.on("reUpload", ({ userId, documentId }) => {
      console.log(`User ${userId} reuploaded ${documentId}`);
    });

    return () => {
      socket.off("documentSubmitted");
      socket.off("reUpload");
    };
  }, []);

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
