import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";

export const useRole = () => {
  const { user, isLoaded } = useUser();
  
  useEffect(() => {
    // Auto-assign 'user' role if no role exists
    if (isLoaded && user && !user.publicMetadata?.role) {
      user.update({
        publicMetadata: {
          ...user.publicMetadata,
          role: 'user'
        }
      });
    }
  }, [isLoaded, user]);
  
  const role = user?.publicMetadata?.role || 'user';
  const isAdmin = role === 'admin';
  const isUser = role === 'user';
  
  return {
    role,
    isAdmin,
    isUser,
    isLoaded,
    user
  };
};
