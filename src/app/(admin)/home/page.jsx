"use client";

import React, { useState, useMemo, useRef, useEffect, useContext } from "react";
import { FaSearch, FaUserCircle } from "react-icons/fa";
import { ChartLine, CircleFadingPlus } from "lucide-react";
import { seedLoans, statusStyles, ranges } from "../../lib/adminData";
import { RequestContext } from "../../../context/requestContext.js";

const Dashboard = () => {
  const [loans] = useState(seedLoans);
  const [search, setSearch] = useState("");
  const [rangeKey, setRangeKey] = useState("all");
  const [showCreate, setShowCreate] = useState(false);
  const [showSearchDD, setShowSearchDD] = useState(false);
  const searchBox = useRef(null);
  const { loanRequest } = useContext(RequestContext);
  console.log("Current request in Dashboard:", loanRequest);

  useEffect(() => {
    const handler = (e) => {
      if (searchBox.current && !searchBox.current.contains(e.target)) {
        setShowSearchDD(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const searchResults = useMemo(() => {
    if (!search.trim()) return [];
    const q = search.toLowerCase();
    return loans.filter(
      (l) =>
        l.userId.toLowerCase().includes(q) || l.title.toLowerCase().includes(q)
    );
  }, [search, loans]);

  const filteredLoans = useMemo(() => {
    if (rangeKey === "all") return loans;

    const months = ranges[rangeKey];
    const start = new Date();
    start.setMonth(start.getMonth() - months);

    return loans.filter((l) => new Date(l.createdAt) >= start);
  }, [loans, rangeKey]);

  const total = filteredLoans.length;
  const approved = filteredLoans.filter((l) => l.status === "approved").length;
  const pending = filteredLoans.filter((l) => l.status === "pending").length;
  const newest = filteredLoans.filter((l) => l.status === "new").length;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <main className="flex-1 p-6 space-y-8">
        {/* Search */}
        <section
          className="relative w-full flex justify-center"
          ref={searchBox}
        >
          <div className="w-full max-w-4xl">
            <div className="relative  flex items-center bg-gray-200 border border-gray-300 rounded-full px-4 py-3">
              <FaSearch className="text-gray-400 text-lg" />
              <div className="h-5 w-px bg-gray-300 mx-3" />
              <input
                type="text"
                onFocus={() => setShowSearchDD(true)}
                placeholder="Search by User ID or Loan Type…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none bg-transparent"
              />
              {showSearchDD && searchResults.length > 0 && (
                <div className="absolute top-full mt-1 left-0 right-0 bg-white rounded-lg shadow-lg max-h-60 overflow-y-auto z-20 scrollbar-hidden">
                  {searchResults.map((res) => (
                    <div
                      key={res.id}
                      className="flex gap-3 items-start p-3 hover:bg-gray-50 cursor-pointer"
                    >
                      <FaUserCircle className="text-2xl mt-2 text-gray-400" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {res.user}{" "}
                          <span className="text-xs text-gray-500">
                            ({res.userId})
                          </span>
                        </p>
                        <p className="text-sm text-gray-600">
                          {res.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Header & Create */}
        <section className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
          <div>
            <h1 className="text-3xl font-bold text-blue-500">DocBot</h1>
            <p className="text-gray-600">Smart AI Document Manager</p>
          </div>
          <button
            onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
          >
            <CircleFadingPlus />
            New Category
          </button>
        </section>

        {/* Key Performance Card */}
        <section className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
          <div className="bg-white shadow rounded-xl p-6 min-h-[160px] flex flex-col justify-between">
            <h3 className="text-sm text-gray-500">Total Requests</h3>
            <p className="mt-2 text-4xl font-semibold text-gray-800">{total}</p>
          </div>
          <div className="bg-green-100 shadow rounded-xl p-6 min-h-[160px] flex flex-col justify-between">
            <h3 className="text-sm text-green-600">Approved Loans</h3>
            <p className="mt-2 text-4xl font-semibold text-green-700">
              {approved}
            </p>
          </div>
          <div className="bg-yellow-50 shadow rounded-xl p-6 min-h-[160px] flex flex-col justify-between">
            <h3 className="text-sm text-yellow-600">Pending Loans</h3>
            <p className="mt-2 text-4xl font-semibold text-yellow-700">
              {pending}
            </p>
          </div>
          <div className="bg-blue-100 shadow rounded-xl p-6 min-h-[160px] flex flex-col justify-between">
            <h3 className="text-sm text-blue-600">New Requests</h3>
            <p className="mt-2 text-4xl font-semibold text-blue-700">
              {newest}
            </p>
          </div>
        </section>

        {/* Loan Requests + Trendings */}
        <section className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-6 space-y-4">
            <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <h2 className="text-xl font-semibold text-gray-800">
                Loan Requests
              </h2>
              <select
                value={rangeKey}
                onChange={(e) => setRangeKey(e.target.value)}
                className="w-full sm:w-48 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="3m">Last 3 months</option>
                <option value="6m">Last 6 months</option>
                <option value="1y">Last 1 year</option>
              </select>
            </header>

            <div className="max-h-[480px] overflow-y-auto pr-2 space-y-4 scrollbar-hidden">
              {filteredLoans.map((loan) => {
                const s = statusStyles[loan.status];
                return (
                  <article
                    key={loan.id}
                    className={`border-l-4 ${s.border} ${s.bg} p-5 rounded-xl shadow-sm hover:shadow-md transition `}
                  >
                    <div className="flex justify-between items-start scrollbar-hide">
                      <h3 className="font-semibold text-gray-800">
                        {loan.title}
                      </h3>
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded-full ${s.badgeBg} ${s.badgeText}`}
                      >
                        {s.label}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {loan.user} &middot; {loan.userId}
                    </p>
                    <p className="mt-2 text-gray-700">{loan.description}</p>
                    <p className="mt-3 text-xs text-gray-500">
                      Submitted at:{" "}
                      <strong>
                        {new Date(loan.createdAt).toLocaleDateString("en-GB", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </strong>
                    </p>
                  </article>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-500">
              <span className="flex items-center justify-center gap-2">
                <ChartLine /> Top Trendings
              </span>
            </h2>
            {(() => {
              const counts = {};
              loans.forEach((l) => {
                const key = l.title;
                counts[key] = (counts[key] || 0) + 1;
              });
              const top = Object.entries(counts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 5);

              return top.map(([name, cnt], idx) => {
                const textColor =
                  idx === 0
                    ? "text-green-600"
                    : idx === top.length - 1
                    ? "text-red-600"
                    : "text-gray-600";

                const bgColor =
                  idx === 0
                    ? "bg-green-200"
                    : idx === top.length - 1
                    ? "bg-red-200"
                    : "bg-gray-200";

                return (
                  <div
                    key={name}
                    className={`flex items-center gap-4 shadow rounded-xl p-4 ${bgColor}`}
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-full grid place-items-center">
                      <span className="text-blue-500 text-sm font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <span className="flex-1 font-medium text-gray-800 truncate">
                      {name}
                    </span>
                    <span className={`font-semibold ${textColor}`}>{cnt}</span>
                  </div>
                );
              });
            })()}
          </aside>
        </section>
      </main>

      {/* Modal */}
      {showCreate && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
          onClick={() => setShowCreate(false)} // close on outside click
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent closing on inner click
            className="bg-white w-[90%] max-w-lg p-6 rounded-2xl shadow-2xl relative"
          >
            {/* Close Cross */}
            <button
              onClick={() => setShowCreate(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 cursor-pointer text-2xl font-bold"
              aria-label="Close modal"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Create Loan Category
            </h3>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                // Add your form submit logic here, e.g., API call or state update
                setShowCreate(false); // close modal after submission
              }}
              className="space-y-4"
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Category Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  placeholder="Enter category name"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Code */}
              <div>
                <label
                  htmlFor="code"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Code
                </label>
                <input
                  type="text"
                  id="code"
                  name="code"
                  required
                  placeholder="Enter category code"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Description */}
              <div>
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  placeholder="Write a brief description"
                  rows={3}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Interest Rate */}
              <div>
                <label
                  htmlFor="interestRate"
                  className="block text-gray-700 font-medium mb-1"
                >
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  id="interestRate"
                  name="interestRate"
                  step="0.01"
                  min="0"
                  placeholder="e.g., 7.5"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
                >
                  Create Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
