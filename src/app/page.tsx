// import Image from "next/image";
"use client"

import Header from "@/components/shared/Header";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  if (isSignedIn) {
    router.push("/dashboard");
  }
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-r from-white to-blue-500">
        <section className="max-w-6xl mx-auto px-6 py-24 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Get Your Loan Approved — <br /> Fast, Secure & Hassle-Free
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Experience real-time loan application with live document
            verification and instant updates. Whether it’s personal, home, or
            education — we’ve got you covered.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a
              href="/login"
              className="px-6 py-3 bg-blue-600 text-white rounded-full text-lg font-semibold hover:bg-blue-700 transition"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full text-lg font-semibold hover:bg-blue-100 transition"
            >
              Learn More
            </a>
          </div>
        </section>

        <section className="bg-white py-16">
          <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
            <div>
              <h3 className="text-xl font-semibold text-gray-900">🔒 Secure</h3>
              <p className="mt-2 text-gray-600">
                Your data is encrypted and securely stored.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                ⚡ Real-time
              </h3>
              <p className="mt-2 text-gray-600">
                Live sessions with loan agents for instant feedback.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                ✅ Verified
              </h3>
              <p className="mt-2 text-gray-600">
                All documents are verified by authorized agents.
              </p>
            </div>
          </div>
        </section>

        <section id="loan-types" className="py-20 bg-blue-50">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
              Choose Your Loan Type
            </h2>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  🏠 Home Loan
                </h4>
                <p className="text-gray-600">
                  Low interest rates for your dream house.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  🎓 Education Loan
                </h4>
                <p className="text-gray-600">
                  Invest in your future with flexible education loans.
                </p>
              </div>
              <div className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                <h4 className="text-xl font-semibold mb-2 text-gray-900">
                  💼 Personal Loan
                </h4>
                <p className="text-gray-600">
                  Quick cash for any personal needs, anytime.
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="text-center py-10 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} DocBot — All rights reserved.
        </footer>
      </main>
    </>
  );
}
