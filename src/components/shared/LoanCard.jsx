"use client";

import React from "react";
import MultiStepModal from "../Modal"

const LoanCard = ({ icon, name, description }) => {
  return (
    <div className="relative w-full max-w-sm mx-auto">
      {/* Outer shell */}
      <div className="bg-gradient-to-br from-white to-blue-50 rounded-3xl shadow-xl p-2 transition hover:scale-[1.02] duration-300 ease-in-out">
        {/* Inner Card */}
        <div className="rounded-3xl bg-white p-10 min-h-[250px] flex flex-col justify-between backdrop-blur-sm border-3 border-gray-400 hover:border-blue-600 duration-300 cursor-pointer">
          
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
          <MultiStepModal loanType={name}/>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoanCard;
