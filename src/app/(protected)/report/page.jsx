"use client";
import { FaCircleExclamation } from "react-icons/fa6";
import { reports } from "../../lib/dummyData";


//util function
const fmt = (iso) =>
  new Date(iso).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short"
  });


const LoanReportPage = () => (
  <div className="max-w-5xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">
      Loan Application Reports
    </h1>

    <div className="no-scrollbar overflow-y-auto max-h-[75vh] space-y-6 pr-1">
      {reports.map((r, i) => (
        <div
          key={i}
          className={`rounded-xl p-5 shadow-md border-l-8 ${
            r.status === "Accepted"
              ? "border-green-600 bg-green-50"
              : "border-red-600 bg-red-50"
          }`}
        >
          {/* title + submitted-at */}
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-semibold text-gray-800">{r.title}</h2>
            <span className="text-sm text-gray-600">
              Submitted: {fmt(r.submittedAt)}
            </span>
          </div>

          {/* description */}
          <p className="text-gray-700 mb-4">{r.description}</p>

          {/* note + reviewed-at */}
          <div className="text-sm text-gray-600 flex justify-between">
  {r.status === "Rejected" ? (
    <span className="flex items-center justify-center gap-1">
      <FaCircleExclamation className="text-red-500" />
      Note: Please reapply for the loan.
    </span>
  ):(<span></span>)}
  <span>Reviewed: {fmt(r.reviewedAt)}</span>
</div>
        </div>
      ))}
    </div>
  </div>
);

export default LoanReportPage;
