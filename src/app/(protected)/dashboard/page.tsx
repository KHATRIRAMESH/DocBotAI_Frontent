"use client";

import AdminDashboardComponent from "@/components/AdminDashboardComponent";
import UserDashboardComponent from "@/components/UserDashboardComponent";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Dashboard = () => {
  const { isLoaded, isSignedIn, userId, sessionId, getToken } = useAuth();
  const [role, setRole] = useState("user");
  const router = useRouter();

  // console.log("User ID:", userId);
  // console.log("Session ID:", sessionId);
  // console.log("Token:", getToken);
  console.log("isSignedIn:", isSignedIn); 

  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  if (!isSignedIn) {
    router.push("/login");
    return <div>Sign in to view this page</div>;
  }

  if (isSignedIn && role === "user") {
    return (
      <div>
        <UserDashboardComponent />
      </div>
    );
  }

  if (isSignedIn && role === "admin") {
    return (
      <div>
        <AdminDashboardComponent />
      </div>
    );
  }
};
export default Dashboard;
