import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import Image from "next/image";

export default function DocumentReviewCard({ data }) {
  const [fileStatus, setFileStatus] = useState(
    data.files.map(() => null) // null means undecided
  );

  const handleMark = (index, status) => {
    const updated = [...fileStatus];
    updated[index] = status;
    setFileStatus(updated);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-xl rounded-2xl p-6 mt-10 space-y-4">
      <h2 className="text-xl font-bold mb-4">Document Review</h2>

      <div className="space-y-2">
        <div>
          <strong>Loan Type:</strong> {data.loanType}
        </div>
        <div>
          <strong>Full Name:</strong> {data.fullName}
        </div>
        <div>
          <strong>Permanent Address:</strong> {data.permanentAddress}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold text-lg mb-2">Documents</h3>
        <div className="grid grid-cols-2 gap-4">
          {data.files.map((fileUrl, index) => (
            <div
              key={index}
              className="relative border rounded-xl overflow-hidden shadow"
            >
              <Image
                src={fileUrl}
                alt={`Document ${index + 1}`}
                className="w-full h-32 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-1">
                <button
                  onClick={() => handleMark(index, "approved")}
                  className={`p-1 rounded-full ${
                    fileStatus[index] === "approved"
                      ? "bg-green-200"
                      : "bg-white"
                  }`}
                >
                  <CheckCircle className="text-green-600 w-5 h-5" />
                </button>
                <button
                  onClick={() => handleMark(index, "rejected")}
                  className={`p-1 rounded-full ${
                    fileStatus[index] === "rejected" ? "bg-red-200" : "bg-white"
                  }`}
                >
                  <XCircle className="text-red-600 w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className="mt-6 w-full py-2 px-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition"
        onClick={() => console.log("Generate clicked!", { fileStatus })}
      >
        Generate
      </button>
    </div>
  );
}
