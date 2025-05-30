"use client";

import { useMemo, useState } from "react";
import {
  FaHome,
  FaGraduationCap,
  FaMoneyCheckAlt,
} from "react-icons/fa";
import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineHourglass,
  AiOutlineCloseCircle,
} from "react-icons/ai";
import clsx from "clsx";

/* ─── visual lookup tables ────────────────────────────── */
const STATUS_META = {
  approved: {
    label: "Approved",
    text: "text-green-700",
    bg: "bg-green-100",
    icon: AiOutlineCheckCircle,
  },
  pending: {
    label: "Pending",
    text: "text-yellow-800",
    bg: "bg-yellow-100",
    icon: AiOutlineHourglass,
  },
  in_review: {
    label: "In Review",
    text: "text-blue-700",
    bg: "bg-blue-100",
    icon: AiOutlineClockCircle,
  },
  not_reviewed: {
    label: "Not Reviewed",
    text: "text-gray-700",
    bg: "bg-gray-100",
    icon: AiOutlineCloseCircle,
  },
};

const TITLE_ICONS = {
  "Home-Renovation Loan": FaHome,
  "Education Loan": FaGraduationCap,
  default: FaMoneyCheckAlt,
};

/* ─── card component ─────────────────────────── */
function MyLoanCard({ loan, onView }) {
  const meta = STATUS_META[loan.status] ?? STATUS_META.pending;
  const TitleIcon = TITLE_ICONS[loan.title] ?? TITLE_ICONS.default;
  const StatusIcon = meta.icon;

  return (
    <article className="w-full bg-white rounded-xl shadow transition hover:shadow-md p-4 flex flex-col sm:flex-row items-start gap-4">
      {/* icon ─ center on mobile, left on ≥ sm */}
      <div className="text-2xl text-blue-500 shrink-0 sm:mt-5 flex justify-center sm:block w-full sm:w-auto">
        <TitleIcon size={34} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 flex flex-wrap items-center gap-2 text-center sm:text-left">
          {loan.title}
          <span className="text-xs text-gray-700 border rounded-full px-2 py-0.5 bg-gray-300 select-none">
            #{loan.id}
          </span>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              meta.text,
              meta.bg
            )}
          >
            <StatusIcon className="h-3 w-3" /> {meta.label}
          </span>
        </h3>

        <p className="mt-1 text-gray-600 line-clamp-2">{loan.description}</p>
        <div className="mt-1 text-[11px] sm:text-xs text-gray-600 text-left">
          Applied&nbsp;on&nbsp;
          {new Date(loan.receivedAt).toLocaleString()}
        </div>
      </div>

      <button
        onClick={onView}
        className="shrink-0 w-full sm:w-auto mt-4 sm:mt-0 sm:ml-4 inline-flex justify-center items-center gap-1 rounded-lg border border-blue-500 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
      >
        View&nbsp;details
      </button>
    </article>
  );
}

/* ─── modal ─────────────────────────────────────── */
function MyLoanModal({ loan, onClose }) {
  const meta = STATUS_META[loan.status] ?? STATUS_META.pending;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-3 cursor-pointer top-3 text-xl text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        <h4 className="mb-2 flex flex-wrap items-center gap-2 text-lg sm:text-xl font-bold text-gray-800">
          {loan.title}
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              meta.text,
              meta.bg
            )}
          >
            {meta.label}
          </span>
        </h4>

        <p className="text-gray-700 whitespace-pre-wrap">{loan.description}</p>

        <div className="mt-4 space-y-1 text-sm  text-gray-800">
          <p className="text-left">
            <strong>Applied&nbsp;on:</strong>&nbsp;
            {new Date(loan.receivedAt).toLocaleString()}
          </p>
          <p>
            <strong>Reviewed&nbsp;on:</strong>&nbsp;
            {loan.reviewedAt
              ? new Date(loan.reviewedAt).toLocaleString()
              : "—"}
          </p>
          <p>
            <strong>Status:</strong>&nbsp;{meta.label}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ─── filters ─────────────────────────────── */
const FILTERS = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In Review" },
  { value: "not_reviewed", label: "Not Reviewed" },
];

/* ─── dummy data ───────────────────────────── */
const userLoans = [
  {
    id: 201,
    title: "Education Loan",
    description: "Covering semester fees and hostel charges.",
    status: "approved",
    receivedAt: new Date().toISOString(),
    reviewedAt: new Date().toISOString(),
  },
  {
    id: 202,
    title: "Home-Renovation Loan",
    description: "Bathroom and living room remodeling.",
    status: "in_review",
    receivedAt: new Date().toISOString(),
    reviewedAt: null,
  },
  {
    id: 203,
    title: "Personal Loan",
    description: "Emergency fund for hospital bills.",
    status: "pending",
    receivedAt: new Date().toISOString(),
    reviewedAt: null,
  },
];

/* ─── main page ───────────────────────────── */
export default function MyLoansPage({ loans = userLoans }) {
  const [filter, setFilter] = useState("all");
  const [openLoan, setOpenLoan] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "all") return loans;
    return loans.filter((l) => l.status === filter);
  }, [filter, loans]);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 bg-white px-4 sm:px-6 py-4 shadow">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          My Loan Applications
        </h1>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none"
        >
          {FILTERS.map((f) => (
            <option key={f.value} value={f.value}>
              {f.label}
            </option>
          ))}
        </select>
      </header>

      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 max-w-4xl mx-auto w-full">
        <h2 className="mb-4 text-lg sm:text-xl font-semibold text-gray-700">
          Your Applications
        </h2>

        <div className="space-y-4">
          {filtered.length ? (
            filtered.map((loan) => (
              <MyLoanCard
                key={loan.id}
                loan={loan}
                onView={() => setOpenLoan(loan)}
              />
            ))
          ) : (
            <p className="text-center text-gray-500">No loans found.</p>
          )}
        </div>
      </main>

      {openLoan && (
        <MyLoanModal loan={openLoan} onClose={() => setOpenLoan(null)} />
      )}
    </div>
  );
}
