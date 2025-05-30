"use client";

import { usePathname } from "next/navigation";
import { FileText, Menu, Settings, LogOut, X, ClipboardPlus, LayoutDashboard, Headset } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignedIn, UserButton, useUser,useClerk  } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const DashboardSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const clerk = useClerk();

   const handleLogout = () => {
    clerk.signOut(); 
  };

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navigationItems = [
      {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: 3
    },
    {
      name: "My Files",
      href: "/my-files",
      icon: FileText,
      badge: 12
    },
    {
      name: "Applied Loans",
      href: "/applied-loan",
      icon: FileText,
      badge: 12
    },
    {
      name: "Report",
      href: "/report",
      icon: ClipboardPlus,
      badge: 12,
    },
  ];

  const bottomNavItems = [
    {
      name: "Support",
      href: "/help",
      icon: Headset ,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-6 left-6 z-50 p-3 bg-white rounded-xl shadow-lg border border-gray-200 md:hidden hover:shadow-xl transition-all duration-200"
        >
          {!isSidebarOpen ? <Menu className="h-5 w-5 text-gray-700" />:<X className="h-5 w-5 text-gray-700"/>}
        </button>
      )}

      <div
        className={cn(
          "bg-gradient-to-b from-blue-600 via-blue-700 to-blue-800 shadow-2xl flex flex-col justify-between w-80 min-h-screen transition-all duration-300 ease-in-out ",
          isMobile
            ? "fixed top-0 left-0 z-40 min-h-screen" +
                (isSidebarOpen ? " translate-x-0" : " -translate-x-full")
            : "static translate-x-0"
        )}
      >
        <div className="px-6 py-8">
          <Link href="/dashboard" className="block">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-blue-600 font-bold text-xl">📑</span>
              </div>
              <div>
                <h1 className="text-white font-bold text-2xl tracking-tight">DocBot</h1>
                <p className="text-white/90 text-sm font-medium">Manage all your documents</p>
              </div>
            </div>
          </Link>

          <h1 className="text-white/90 text-xs uppercase  mb-1">Menu</h1>

          <nav>
            <ul className="space-y-2">
             {navigationItems.map((item) => {
  const isActive = pathname === item.href;

  return (
    <li key={item.href}>
      <Link href={item.href}>
        <div
          className={cn(
            "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group relative overflow-hidden",
            isActive
              ? "bg-white text-blue-600 shadow-lg transform scale-105"
              : "text-blue-100 hover:bg-blue-500/50 hover:text-white hover:transform hover:scale-105"
          )}
          onClick={() => isMobile && setIsSidebarOpen(false)}
        >
          <div className={cn(
            "absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform transition-transform duration-300",
            isActive ? "translate-x-0" : "-translate-x-full group-hover:translate-x-0"
          )} />
          
          <div className="flex items-center relative z-10">
            <div className={cn(
              "p-2 rounded-lg mr-3 transition-all duration-200",
              isActive
                ? "bg-blue-100 text-blue-600"
                : "bg-blue-500/30 text-blue-200 group-hover:bg-blue-400/50 group-hover:text-white"
            )}>
              <item.icon className="h-5 w-5" />
            </div>
            <span className={cn(
              "font-medium text-base",
              isActive ? "text-blue-600" : "text-white"
            )}>
              {item.name}
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
})}
            </ul>
          </nav>
        </div>

        <div className="px-6 pb-8 space-y-4">
          <nav>
                      <h1 className="text-white/90 text-xs uppercase mb-1">General</h1>

            <ul className="space-y-2">
              {bottomNavItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  
                  <li key={item.href}>
                    <Link href={item.href}>
                      <div
                        className={cn(
                          "flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group",
                          isActive
                            ? "bg-white text-blue-600 shadow-lg"
                            : "text-blue-100 hover:bg-blue-500/50 hover:text-white"
                        )}
                        onClick={() => isMobile && setIsSidebarOpen(false)}
                      >
                        <div className={cn(
                          "p-2 rounded-lg mr-3 transition-all duration-200",
                          isActive
                            ? "bg-blue-100 text-blue-600"
                            : "bg-blue-500/30 text-blue-200 group-hover:bg-blue-400/50 group-hover:text-white"
                        )}>
                          <item.icon className="h-5 w-5" />
                        </div>
                        <span className={cn(
  "text-base font-medium",
  isActive ? "text-blue-600" : "text-white/90"
)}>
  {item.name}
</span>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* User Profile */}
          <div className="border-t border-blue-400/20 pt-4">
            <div className="flex items-center p-4 bg-blue-500/20 rounded-xl border border-blue-400/20 hover:bg-blue-500/30 transition-all duration-200 cursor-pointer">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-blue-600 font-bold text-lg shadow-lg ">
                  <SignedIn>
                    <UserButton />
                  </SignedIn>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-blue-600"></div>
              </div>
              <div className="ml-4 flex-1">
                <div className="text-sm text-white font-bold">
                  {user?.fullName || "User"}
                </div>
                <div className="text-xs text-blue-200 font-medium">
                  {user?.primaryEmailAddress?.emailAddress || "Professional Plan"}
                </div>
              </div>
              <div className="ml-1 rounded-lg p-2 transition-all duration-200 hover:bg-white/20">
                <LogOut onClick={handleLogout} className="w-5 h-5 text-blue-200 transition-colors duration-200 cursor-pointer" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-30 transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;