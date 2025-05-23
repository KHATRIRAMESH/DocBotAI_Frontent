"use client";

import { usePathname } from "next/navigation";
import { LucideIcon, FileText, Menu } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

interface NavItem {
  name: string;
  href: string;
  icon: LucideIcon;
  icon3D?: React.ElementType;
}

const DashboardSidebar = () => {
  const { user } = useUser();
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const navigationItems: NavItem[] = [
    {
      name: "Generated Documents",
      href: "/protected/generated-documents",
      icon: FileText,
    },
    {
      name: "My Files",
      href: "/protected/my-files",
      icon: FileText,
    },
  ];

  return (
    <>
      {/* Hamburger Button - Mobile Only */}
      {isMobile && (
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-md shadow-md md:hidden"
        >
          <Menu className="h-6 w-6 text-gray-800" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between w-64 min-h-screen transition-transform duration-300",
          isMobile
            ? "fixed top-0 left-0 z-40 min-h-screen" +
                (isSidebarOpen ? " translate-x-0" : " -translate-x-full")
            : "static translate-x-0"
        )}
      >
        {/* Navigation */}
        <nav className="py-4">
          <ul className="space-y-2 px-3 py-10">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon3D = item.icon3D;

              return (
                <li key={item.href}>
                  <Link href={item.href}>
                    <div
                      className={cn(
                        "flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200",
                        isActive
                          ? "bg-gray-100 text-gray-900 font-semibold shadow-inner"
                          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                      )}
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      {Icon3D ? (
                        <div
                          className={cn(
                            "relative flex items-center justify-center mr-3 w-8 h-8 rounded-md",
                            isActive
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-400"
                          )}
                        >
                          {isActive && (
                            <div className="absolute inset-0 bg-blue-100 rounded-md opacity-20 animate-pulse" />
                          )}
                          <Icon3D
                            weight={isActive ? "bold" : "regular"}
                            size={20}
                            className="z-10 transition-all duration-300"
                          />
                        </div>
                      ) : (
                        <item.icon
                          className={cn(
                            "h-5 w-5 mr-3",
                            isActive ? "text-blue-600" : "text-gray-400"
                          )}
                        />
                      )}
                      <span>{item.name}</span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 px-4 py-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
            <div className="ml-3">
              <div className="text-sm font-medium text-gray-800">
                {user?.fullName}
              </div>
              <div className="text-xs text-gray-500">{user?.username}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
