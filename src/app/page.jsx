"use client";

import Header from "@/components/shared/Header";
import { useAuth } from "@clerk/nextjs";
// import Image from "next/image";
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
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-28 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
            Get Your Loan Approved — <br /> Fast, Secure & Hassle-Free
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed tracking-wide">
            Experience real-time loan application with live document
            verification and instant updates. Whether it’s personal, home, or
            education — we’ve got you covered.
          </p>
          <div className="mt-12 flex justify-center gap-6">
            <a
              href="/login"
              className="px-8 py-4 bg-blue-700 text-white rounded-full text-lg font-semibold shadow-lg hover:bg-blue-800 transition"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="px-8 py-4 border-2 border-blue-700 text-blue-700 rounded-full text-lg font-semibold hover:bg-blue-100 transition"
            >
              Learn More
            </a>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white py-20 shadow-inner">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-12 text-center">
            {[
              {
                icon: "🔒",
                title: "Secure",
                desc: "Your data is encrypted and securely stored.",
              },
              {
                icon: "⚡",
                title: "Real-time",
                desc: "Live sessions with loan agents for instant feedback.",
              },
              {
                icon: "✅",
                title: "Verified",
                desc: "All documents are verified by authorized agents.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-gradient-to-br from-blue-50 to-white rounded-xl p-8 shadow-md hover:shadow-lg transition"
              >
                <div className="text-5xl mb-4">{icon}</div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Loan Types Section */}
        <section id="loan-types" className="py-24 bg-blue-50">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-14 drop-shadow-sm">
              Choose Your Loan Type
            </h2>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {[
                {
                  icon: "🏠",
                  title: "Home Loan",
                  desc: "Low interest rates for your dream house.",
                  color: "from-green-100 to-green-50",
                },
                {
                  icon: "🎓",
                  title: "Education Loan",
                  desc: "Invest in your future with flexible education loans.",
                  color: "from-yellow-100 to-yellow-50",
                },
                {
                  icon: "💼",
                  title: "Personal Loan",
                  desc: "Quick cash for any personal needs, anytime.",
                  color: "from-purple-100 to-purple-50",
                },
              ].map(({ icon, title, desc, color }) => (
                <div
                  key={title}
                  className={`bg-gradient-to-br ${color} rounded-xl shadow-lg p-8 cursor-pointer hover:shadow-2xl transition`}
                >
                  <div className="text-6xl mb-4">{icon}</div>
                  <h4 className="text-2xl font-semibold mb-3 text-gray-900">
                    {title}
                  </h4>
                  <p className="text-gray-700 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="max-w-7xl mx-auto px-6 py-24">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-14 drop-shadow-sm">
            What Our Customers Say
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Jane Doe",
                role: "Entrepreneur",
                feedback:
                  "DocBot made my home loan application so easy and quick. Highly recommend their hassle-free process!",
                avatar: "https://randomuser.me/api/portraits/women/68.jpg",
              },
              {
                name: "John Smith",
                role: "Student",
                feedback:
                  "Thanks to DocBot, I secured an education loan fast with all my documents verified in real-time.",
                avatar: "https://randomuser.me/api/portraits/men/45.jpg",
              },
              {
                name: "Mary Johnson",
                role: "Freelancer",
                feedback:
                  "The personal loan process was smooth, secure, and transparent. DocBot truly cares about their users.",
                avatar: "https://randomuser.me/api/portraits/women/45.jpg",
              },
            ].map(({ name, role, feedback }) => (
              <div
                key={name}
                className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center hover:shadow-2xl transition"
              >
                {/* <Image
                  width={80}
                  height={80}
                  src={avatar}
                  alt={name}
                  className="w-20 h-20 rounded-full mb-6 ring-4 ring-blue-300"
                  loading="lazy"
                /> */}
                <p className="text-gray-700 italic mb-6">
                  &apos;{feedback}&apos;
                </p>
                <h5 className="font-semibold text-gray-900">{name}</h5>
                <span className="text-blue-600 text-sm">{role}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-10 text-gray-500 text-sm border-t border-gray-200">
          &copy; {new Date().getFullYear()} DocBot — All rights reserved.
        </footer>
      </main>
    </>
  );
}
