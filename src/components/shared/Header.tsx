import Link from "next/link";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow-lg sticky top-0 z-50 h-16">
      {/* Left: Logo/Title */}
      <div className="text-2xl font-extrabold text-blue-600 hover:text-blue-700 transition cursor-pointer select-none">
        <Link href="/">DocBot</Link>
      </div>

      {/* Center: Nav links */}
      <nav className="hidden md:flex gap-10 text-gray-700 font-semibold tracking-wide">
        <Link
          href="/"
          className="relative group hover:text-blue-600 transition"
        >
          Home
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all"></span>
        </Link>
        <Link
          href="/#loan-types"
          className="relative group hover:text-blue-600 transition"
        >
          Loan Types
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all"></span>
        </Link>
        <Link
          href="/about"
          className="relative group hover:text-blue-600 transition"
        >
          About
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all"></span>
        </Link>
        <Link
          href="/contact"
          className="relative group hover:text-blue-600 transition"
        >
          Contact
          <span className="absolute bottom-0 left-0 w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all"></span>
        </Link>
      </nav>

      {/* Right: Auth area */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-5 py-2 text-sm font-semibold border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-100 transition shadow-sm cursor-pointer">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-5 py-2 text-sm font-semibold bg-blue-600 text-white rounded-full hover:bg-blue-700 transition shadow-md cursor-pointer">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "ring-2 ring-blue-600",
              },
            }}
          />
        </SignedIn>
      </div>
    </header>
  );
}
