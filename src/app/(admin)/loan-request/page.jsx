"use client";
import {
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import {
  STATUS_META,
  TITLE_ICONS,
  FILTERS,
} from "../../lib/loan";
import { CrossIcon, LoaderCircle } from "lucide-react";
import { RequestContext } from "@/context/requestContext";
import VerificationCard from "@/components/admin/VerificationCard";
import AdminRoute from "@/components/auth/AdminRoute";




function ApprovalModal({ onClose, onApprove }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const handleVerify = () => {
    if (code === "123456") {
      onApprove();
      onClose();
    } else {
      setError("Invalid verification code. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Approve Loan</h3>
        <p className="text-gray-600 mb-4">
          Enter the verification code to approve this loan application.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Verification Code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setError("");
            }}
            placeholder="Enter 6-digit code "
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            maxLength="6"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <p className="text-xs text-gray-500 mt-1">Demo code: 123456</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleVerify}
            className="flex-1 px-4 py-2 cursor-pointer bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

function LoanCard({ loan, onView }) {
  const meta = STATUS_META[loan?.status] || STATUS_META.pending;
  const TitleIcon = TITLE_ICONS[loan?.loanType] || TITLE_ICONS.default;
  const StatusIcon = meta.icon;

  return (
    <article className="w-full bg-white rounded-xl shadow transition hover:shadow-md p-4 flex flex-col sm:flex-row items-start gap-4">
      <div className="text-2xl text-blue-500 shrink-0 mt-2 sm:mt-5 flex justify-center sm:block w-full sm:w-auto">
        <TitleIcon size={34} />
      </div>

      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-gray-800 flex flex-wrap items-center gap-2 text-center sm:text-left">
          {loan?.loanType || "Loan Application"}
          <span className="text-xs text-gray-500 border bg-gray-200 px-1 rounded-full">
            # {loan?.userId}
          </span>
          <span
            className={clsx(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
              meta.text,
              meta.bg
            )}
          >
            <StatusIcon className="h-3 w-3" />{meta.label}
          </span>
        </h3>
        <p className="mt-1 text-gray-600 line-clamp-2">
          {loan?.description ||
            `${loan?.loanType} application from ${loan?.fullName}`}
        </p>
        <div className="mt-1 text-xs text-gray-400 text-left">
          Applicant: {loan?.fullName} | Address: {loan?.permanentAddress}
        </div>
        <div className="mt-1 text-xs text-gray-400 text-left">
          Documents: {loan?.files ? loan?.files.length : 0} file(s) uploaded
        </div>
      </div>

      <button
        onClick={onView}
        className="shrink-0 mt-4 sm:mt-0 sm:ml-4 w-full sm:w-auto inline-flex justify-center items-center gap-1 rounded-lg border border-blue-500 px-3 py-1.5 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none cursor-pointer"
      >
        View details
      </button>
    </article>
  );
}

function LoanModal({ loan, onClose, onApprove, onResend }) {
  const meta = STATUS_META[loan.status] ?? STATUS_META.pending;
  const StatusIcon = meta.icon;
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showResendModal, setShowResendModal] = useState(false);
  const [comment, setComment] = useState("");
  const [previewUrl, setPreviewUrl] = useState(null);
  const { setGeneratedDocument } = useContext(RequestContext);
    const [dataLoading, setDataLoading] = useState(false);


const handleGenerateDocument = async () => {
  setDataLoading(true);
  try {
    const generatedDocs = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/admin-verify/upload`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: loan.userId,
          loanType: loan.loanType,
          fullName: loan.fullName,
          permanentAddress: loan.permanentAddress,
          files: loan.files,
          status: loan.status,
        }),
      }
    );

    if (!generatedDocs.ok) throw new Error("Failed to generate document");

    const data = await generatedDocs.json();
    setGeneratedDocument(data);
    toast.success("Document generated successfully!");
    onClose();
  } catch (error) {
    console.error("Error generating document:", error);
    toast.error("Failed to generate document. Please try again.");
  } finally {
    setDataLoading(false);
  }
};


  const handleImageClick = (url) => {
    setPreviewUrl(url);
  };

  const closePreview = () => {
    setPreviewUrl(null);
  };

  const handleApprove = () => {
    onApprove(loan.id || loan.userId);
    toast.success("Loan has been approved successfully!");
  };

  const handleResend = () => {
    setShowResendModal(true);
  };

  const handleSendComment = (comment) => {
    onResend(loan.id || loan.userId, comment);
    toast.success(
      "Documents have been sent for reverification with your comments!"
    );
  };

return (
  <>
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 relative">
          <button
            onClick={onClose}
            disabled={dataLoading}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 text-lg cursor-pointer z-10 hover:bg-red-500/40 px-3 py-1 rounded-full"
          >
            ✕
          </button>
          <h4 className="mb-2 flex flex-wrap items-center gap-2 text-xl font-bold text-gray-800">
            {loan.loanType || "Loan Application"}
            <span
              className={clsx(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium ",
                meta.text,
                meta.bg
              )}
            >
              Status: <StatusIcon className="animate-spin"/>{meta.label}
            </span>
          </h4>
          <p className="text-gray-700 flex text-sm justify-between items-center">
            {loan.description || `${loan.loanType} application by ${loan.fullName}.`}
            <span><strong>Loan Code:</strong> {loan.loanCode}</span>
          </p>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-gray-600">
            <span><strong>User ID:</strong> {loan.userId}</span>
            <span>
              <strong>Received At:</strong>{" "}
              {loan.receivedAt ? new Date(loan.receivedAt).toLocaleString() : new Date().toLocaleString()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 scrollbar-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Info Section */}
            <section className="space-y-4 md:col-span-2">
              <h5 className="text-lg font-semibold text-gray-800 border-b pb-2">Personal Information</h5>
              {[
                // { label: "User ID", value: loan.userId },
                { label: "Full Name", value: loan.fullName },
                { label: "Loan Type", value: loan.loanType },
              ].map(({ label, value }) => (
                <div key={label}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
                  <input
                    type="text"
                    value={value || ""}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
                  />
                </div>
              ))}
            </section>

            {/* Uploaded Documents */}
            <section className="space-y-4 md:col-span-2">
              <h5 className="text-lg font-semibold text-gray-800 border-b pb-2">Uploaded Documents</h5>

              {loan.files?.length > 0 ? (
                <div className="flex flex-wrap gap-4">
                  {loan.files.map((fileUrl, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center w-32 cursor-pointer"
                      onClick={() => handleImageClick(fileUrl)}
                    >
                      <img
                        src={fileUrl}
                        alt={`Document ${index + 1}`}
                        className="w-28 h-28 object-cover border rounded hover:scale-105 transition-transform"
                      />
                      <p className="text-xs mt-2 text-center break-words">{fileUrl.split("/").pop()}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No documents uploaded</p>
              )}

              {previewUrl && (
                <div
                  className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center"
                  onClick={closePreview}
                >
                  <div className="relative max-w-full max-h-full p-4" onClick={(e) => e.stopPropagation()}>
                    <button className="absolute top-2 right-2 text-white" onClick={closePreview}>
                      <CrossIcon className="h-6 w-6" />
                    </button>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="max-w-full max-h-screen rounded shadow-lg"
                    />
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 flex gap-3 justify-end">
          {loan.status !== "approved" && (
            <>
              <button
                onClick={handleResend}
                disabled={dataLoading}
                className="px-4 py-2 border cursor-pointer border-gray-300 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Resend Documents
              </button>
              <button
                onClick={handleGenerateDocument}
                disabled={dataLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 cursor-pointer"
              >
                {dataLoading ? <LoaderCircle className="animate-spin" />:"Generate Document"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Modals */}
    {showApprovalModal && (
      <ApprovalModal onClose={() => setShowApprovalModal(false)} onApprove={handleApprove} />
    )}
    {showResendModal && (
      <ResendModal
        onClose={() => {
          setShowResendModal(false);
          setComment("");
        }}
        onSend={handleSendComment}
        comment={comment}
        setComment={setComment}
      />
    )}
  </>
);

}

function ResendModal({ onClose, onSend, comment, setComment }) {
  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-500 hover:text-gray-800 text-lg cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-xl font-bold text-gray-800 mb-4">Add Comments</h3>
        <p className="text-gray-600 mb-4">
          Please provide details about required document changes.
        </p>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Comments
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter your comments here..."
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
          />
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 cursor-pointer px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onSend(comment);
              onClose();
            }}
            className="flex-1 px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LoanRequestsPage() {
  const { loanRequest, setLoanRequest, setError, setLoading } =
    useContext(RequestContext);
  const [filter, setFilter] = useState("all");
  const [openLoan, setOpenLoan] = useState(null);
  const [sortOrder, setSortOrder] = useState("desc"); 

  const loans = loanRequest ;
  console.log("Loan Requests:", loans);

const filteredAndSortedLoans = (loans || [])
  .filter((loan) => {
    if (filter === "all") return true;
    return loan.status === filter; 
  })
  .sort((a, b) => {
    const dateA = new Date(a.submittedAt); 
    const dateB = new Date(b.submittedAt);

    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });



  const handleApprove = (loanId) => {
    console.log("Approving loan:", loanId);
    setOpenLoan(null);
  };

  const handleResend = (loanId) => {
    console.log("Resending documents for loan:", loanId);
    setOpenLoan(false);
  };
 

  return (
    <AdminRoute>
      <div className="flex min-h-screen flex-col bg-slate-50">
        <header className="sticky top-0 z-20 flex flex-wrap items-center justify-between gap-4 bg-white px-4 sm:px-6 py-4 shadow">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Loan Requests
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

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 max-w-4xl mx-auto w-full">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-gray-700">
            All Loan Applications
          </h2>

          <div className="space-y-4">
            {filteredAndSortedLoans && filteredAndSortedLoans.length > 0 ? (
              filteredAndSortedLoans.map((loan, index) => (
                <LoanCard
                  key={index}
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
          <LoanModal
            loan={openLoan}
            onClose={() => setOpenLoan(null)}
            onApprove={handleApprove}
            onResend={handleResend}
          />
        )}
      </div>
    </AdminRoute>
  );
}