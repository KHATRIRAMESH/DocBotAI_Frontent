"use client";

import { socket } from "@/utils/socket";
import { FilePlus2 } from "lucide-react";
import { useEffect, useState } from "react";
import { FaCircleExclamation } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";
import AdminRoute from "@/components/auth/AdminRoute";
export default function LoanReportPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fmt = (iso) =>
    new Date(iso).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const res = await fetch(
          "https://docbotai-backend.onrender.com/api/notification",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch notifications");
        const body = await res.json();
        setNotifications(body.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  useEffect(() => {
    if (loading) return;

    const handler = ({ notificationId }) => {
      setNotifications((prev) =>
        prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
      );
    };

    socket.on("notification-read-updated", handler);
    return () => socket.off("notification-read-updated", handler);
  }, [loading]);

  const handleOpenNotification = (notificationId) => {
    socket.emit("mark-notification-read", { notificationId });
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, isRead: true } : n))
    );
  };

  return (
    <AdminRoute>
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 text-center">
        Notifications
      </h1>

      {loading && (
        <div className="text-center text-gray-500">Loading…</div>
      )}
      {error && (
        <div className="text-center text-red-600">Error: {error}</div>
      )}

      {!loading && !error && (
        <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[80vh] pr-1">
          {notifications.length === 0 && (
            <div className="text-center text-gray-600">
              No notifications to display.
            </div>
          )}

          {notifications.map((n) => {
            const borderColor = n.isRead ? "border-gray-300" : "border-blue-600";
            const bgColor = n.isRead ? "bg-gray-50" : "bg-blue-50";

            let IconComponent = <FilePlus2 size={16} className="text-blue-600" />;
            if (n.type === "document_submission") {
              IconComponent = <FilePlus2 size={16} className="text-blue-600" />;
            }

            return (
              <div
                key={n.id}
                className={`rounded-xl p-4 sm:p-5 shadow-md border-l-8 ${borderColor} ${bgColor} hover:cursor-pointer transition-all duration-200 ease-in-out hover:shadow-lg`}
                // onClick={() => handleOpenNotification(n.id)}
              >
                {/* Top Row: Title + Date */}
                <div className="flex justify-between items-start gap-4">
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex items-center gap-2">
                    {IconComponent}
                    {n.title}
                  </h2>
                {/* ID just below the title */}
                <p className="mt-1 text-xs text-gray-500 ml-6">
                  ID: #{n.id}
                </p>
                </div>

                <div className="mt-1 text-xs text-gray-500 ml-6">
                  
                </div>

                {/* Message */}
                <p className="text-gray-700 text-sm sm:text-base mt-3 mb-4">
                  {n.message}
                </p>

                {/* Bottom Row: Status + ID again */}
                <div className="text-sm sm:text-base text-gray-600 flex justify-between items-center">
                  <span className="text-sm text-gray-600 whitespace-nowrap">Submitted on: <strong>{fmt(n.createdAt)}</strong> </span>
                  <div className="text-xs sm:text-sm text-gray-400">
                   <div className="flex items-center gap-1">
                    Status:{" "}
                    {n.isRead ? (
                      <span className="flex items-center gap-1 text-green-700">
                        <SiTicktick /> Read
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-yellow-600">
                        <FaCircleExclamation /> Unread
                      </span>
                    )}
                  </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </AdminRoute>
  );
}
