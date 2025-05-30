"use client";

import React, { useState } from "react";
import ReactDOM from "react-dom";
import {loanFormConfig} from "../../app/lib/loan";
import toast from "react-hot-toast";
import { BiChevronRight } from "react-icons/bi";
import { useAuth } from "@clerk/nextjs";

const SinglePageLoanModal = ({ loantype }) => {
  const { userId } = useAuth();
  const config = loanFormConfig[loantype];
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ documents: [] }); // Initialize with documents array
  const [agreed, setAgreed] = useState(false);

  if (!config) return null;

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      // Convert FileList to Array and add to documents[]
      const newFiles = Array.from(files);

      setFormData((prev) => ({
        ...prev,
        documents: [...(prev.documents || []), ...newFiles],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const prepareFormData = (data) => {
    const formPayload = new FormData();
    formPayload.append("userId", userId); // Add userId to the form data

    Object.entries(data).forEach(([key, value]) => {
      if (key === "documents" && Array.isArray(value)) {
        value.forEach((fileObj) => {
          formPayload.append("documents", fileObj); // assumes it's an array of File
        });
      } else {
        formPayload.append(key, value); // append string fields
      }
    });

    return formPayload;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) {
      toast.error("Please agree to the terms before submitting.");
      return;
    }

    const formPayload = prepareFormData(formData);
    console.log("Form Data to be submitted:", formPayload);
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin-verify/upload",
        {
          method: "POST",
          body: formPayload,
        }
      );

      if (!response.ok) throw new Error("Upload failed");

      const result = await response.json();
      console.log("Response from server:", result);
      toast.success("Application submitted!");
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setFormData({ documents: [] }); // Reset documents array
      setAgreed(false); // Reset agreement checkbox
      setIsOpen(false);
    }
  };

  const renderFields = (fields, title) => (
    <div className="mb-6 ">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ name, label, type }) => (
          <div key={name}>
            <label className="block text-sm font-medium mb-1" htmlFor={name}>
              {label}
            </label>

            {/* File input styled with gray background */}
            {type === "file" ? (
              <input
                type={type}
                name={name}
                id={name}
                onChange={handleChange}
                multiple // if you want to allow multiple files
                className="w-full border rounded px-3 py-2 bg-gray-200 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition cursor-pointer"
                required
              />
            ) : (
              <input
                type={type}
                name={name}
                id={name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                required
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setIsOpen(false);
    }
  };

  const modalContent = (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-transparent rounded-lg bg-opacity-60 backdrop-blur-sm px-4 py-6"
    >
      <div className="scrollbar-hidden bg-white rounded-lg p-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="relative mb-6 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-2">
            {loantype} Application
          </h2>
          <p className="text-gray-700 text-lg text-center max-w-xl">
            {config.description}
          </p>

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-0 right-0 text-blue-700 p-1 px-3 rounded-full hover:bg-red-500/60 hover:text-gray-800 text-3xl font-bold cursor-pointer transition-all duration-300"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {renderFields(config.personalInfo, "Personal Information")}
          <hr className="my-6 border- border-gray-300  rounded-xl" />
          {renderFields(config.addressInfo, "Address Information")}
          <hr className="my-6 border-2 border-gray-300 rounded-xl" />
          {renderFields(config.bankDetails, "Bank Details")}
          <hr className="my-6 border-2 border-gray-300  rounded-xl" />
          {renderFields(config.documents, "Upload Documents")}

          <div className="flex items-center mb-6 mt-4">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={() => setAgreed(!agreed)}
              className="mr-2 w-4 h-4 text-blue-600"
            />
            <label htmlFor="agree" className="text-sm text-gray-700">
              I confirm that the information provided is accurate and complete.
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-lg shadow-md transition cursor-pointer"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => {
          setIsOpen(true);
          setFormData((prev) => ({ ...prev, loanType: loantype }));
        }}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer"
      >
        Apply Now
        <BiChevronRight className="inline-block ml-1" size={22} />
      </button>

      {isOpen && typeof window !== "undefined"
        ? ReactDOM.createPortal(
            modalContent,
            document.getElementById("modal-root")
          )
        : null}
    </>
  );
};

export default SinglePageLoanModal;
