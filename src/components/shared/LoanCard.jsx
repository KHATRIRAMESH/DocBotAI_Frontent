"use client";

import React from "react";
import SinglePageLoanModal from "../user/SinglePageLoanModal";

const LoanCard = ({ icon, name, description }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer shell */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-2 transition hover:scale-[1.02] duration-300 ease-in-out">
        {/* Inner Card */}
      <div className="bg-white rounded-xl border-3 shadow p-6 flex flex-col justify-between min-h-[260px] hover:shadow-lg transition hover:border-blue-500  cursor-pointer">

          
          <div>
            {/* Title */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <h4 className="text-2xl font-outfit font-semibold text-blue-600">
                {name}
              </h4>
              <span className="text-blue-600">{icon}</span>
            </div>

            {/* Description */}
            <p className="text-lg opacity-90 leading-relaxed text-[#1B1B1B]">
              {description}
            </p>
          </div>

          {/* Apply Button */}
          <div className="mt-6 flex justify-center">
          {/* <MultiStepModal loanType={name}/> */}
          <SinglePageLoanModal loantype={name} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanCard;
