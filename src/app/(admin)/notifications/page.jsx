"use client";

import { reports } from "@/app/lib/adminData";
import { FilePlus2 } from "lucide-react";
import { FaCircleExclamation } from "react-icons/fa6";
import { SiTicktick } from "react-icons/si";

// Format date utility
const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });

const LoanReportPage = () => (
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
    <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-blue-600 text-center">
      Loan Application Reports
    </h1>

    <div className="space-y-6 overflow-y-auto no-scrollbar max-h-[80vh] pr-1">
      {reports.map((r, i) => {
        let borderColor = "";
        let bgColor = "";
        let statusIcon = null;
        let statusMessage = "";

        switch (r.status) {
          case "New":
            borderColor = "border-blue-600";
            bgColor = "bg-blue-50";
            statusIcon = <FilePlus2 className="text-blue-600" size={16} />;
            statusMessage = "New Application!";
            break;
          case "In Review":
            borderColor = "border-yellow-500";
            bgColor = "bg-yellow-50";
            statusIcon = <FaCircleExclamation className="text-yellow-600" />;
            statusMessage = "Under Review!";
            break;
          case "Accepted":
            borderColor = "border-green-600";
            bgColor = "bg-green-50";
            statusIcon = <SiTicktick className="text-green-700" />;
            statusMessage = "Loan Approved!";
            break;
          case "Rejected":
            borderColor = "border-red-600";
            bgColor = "bg-red-50";
            statusIcon = <FaCircleExclamation className="text-red-600" />;
            statusMessage = "Please reapply for the loan.";
            break;
          default:
            borderColor = "border-gray-300";
            bgColor = "bg-gray-50";
        }

        return (
          <div
            key={i}
            className={`rounded-xl p-4 sm:p-5 shadow-md border-l-8 ${borderColor} ${bgColor}`}
          >
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2 gap-2 sm:gap-4">
              <h2 className="text-lg sm:text-xl font-semibold text-gray-800 flex flex-wrap items-center gap-2">
                {r.title}
                <span className="rounded bg-gray-200 px-2 py-0.5 text-xs font-mono text-gray-600">
                  {r.loanCode}
                </span>
              </h2>
              <span className="text-sm text-gray-600">
                Submitted: {fmt(r.submittedAt)}
              </span>
            </div>

            <p className="text-gray-700 text-sm sm:text-base mb-4">{r.description}</p>

            <div className="text-sm sm:text-base text-gray-600 flex flex-col sm:flex-row justify-between gap-2 sm:items-center">
              <span className="flex items-center gap-2 font-semibold">
                {statusIcon}
                {statusMessage}
              </span>
              <span>
                Reviewed: {r.reviewedAt ? fmt(r.reviewedAt) : "—"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

export default LoanReportPage;
