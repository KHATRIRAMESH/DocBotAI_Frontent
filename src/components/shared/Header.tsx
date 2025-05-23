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
    <header className="flex justify-between items-center px-6 py-5 bg-white shadow-md h-16">
      {/* Left: Logo/Title */}
      <div className="text-xl font-bold text-blue-600">
        <Link href="/">DocBot</Link>
      </div>

      {/* Center: Nav links */}
      <nav className="hidden md:flex gap-6 text-gray-700 font-medium">
        <Link href="/" className="hover:text-blue-600 transition">
          Home
        </Link>
        <Link href="/#loan-types" className="hover:text-blue-600 transition">
          Loan Types
        </Link>
        <Link href="/about" className="hover:text-blue-600 transition">
          About
        </Link>
        <Link href="/contact" className="hover:text-blue-600 transition">
          Contact
        </Link>
      </nav>

      {/* Right: Auth area */}
      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="px-4 py-2 text-sm font-semibold border border-blue-600 text-blue-600 rounded hover:bg-blue-100 transition">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
