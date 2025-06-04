// components/auth/UserRoute.jsx
import { useRole } from "@/hooks/useRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function UserRoute({ children }) {
  const { isUser, isLoaded } = useRole();
  const router = useRouter();
  
  useEffect(() => {
    if (isLoaded && !isUser) {
      router.push('/home');
    }
  }, [isLoaded, isUser, router]);
  
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!isUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-600">Access Denied</h1>
          <p className="text-gray-600 mt-2">This page is for regular users only.</p>
        </div>
      </div>
    );
  }
  
  return children;
}