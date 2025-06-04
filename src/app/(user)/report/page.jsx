"use client";

import { FaCircleExclamation } from "react-icons/fa6";
import { reports } from "../../lib/dummyData";
import { SiTicktick } from "react-icons/si";
import UserRoute from "@/components/auth/UserRoute";

// Utility function
const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const LoanReportPage = () => (
  <UserRoute>

  <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-500 text-center">
      Loan Application Reports
    </h1>

    <div className="no-scrollbar overflow-y-auto max-h-[75vh] space-y-4 sm:space-y-6 pr-1">
      {reports.map((r, i) => (
        <div
        key={i}
        className={`rounded-xl p-4 sm:p-5 shadow-md border-l-8 ${
          r.status === "Accepted"
              ? "border-green-600 bg-green-50"
              : "border-red-600 bg-red-50"
          }`}
        >
          {/* title + submitted-at */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-1">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
              {r.title}
            </h2>
            <span className="text-sm text-gray-600">
              Submitted: {fmt(r.submittedAt)}
            </span>
          </div>

          {/* description */}
          <p className="text-gray-700 text-sm sm:text-base mb-3 sm:mb-4">{r.description}</p>

          {/* note + reviewed-at */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center text-sm text-gray-600 gap-2">
            <span className="flex items-center gap-1 font-medium">
              {r.status === "Rejected" ? (
                <>
                  <FaCircleExclamation className="text-red-500" />
                  Note: Please reapply for the loan.
                </>
              ) : (
                <>
                  <SiTicktick className="text-green-700" />
                  Congratulations! The loan has been approved.
                </>
              )}
            </span>
            <span className="text-xs sm:text-sm text-right sm:text-left">
              Reviewed: {fmt(r.reviewedAt)}
            </span>
          </div>
        </div>
      ))}
    </div>
  </div>
      </UserRoute>
);

export default LoanReportPage;
