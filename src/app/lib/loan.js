const loanFormConfig = {
  "Home Loan": {
    description: "Competitive rates and flexible terms for your dream home.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice", 
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text"},
      // { name: "email", label: "Email Address", type: "email" },
      // { name: "phone", label: "Phone Number", type: "tel" },
      // { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
      // { name: "dob", label: "Date of Birth", type: "date" },
    ],
    addressInfo: [
      { name: "permanentAddress", label: "Permanent Address", type: "text" },
      // { name: "currentAddress", label: "Current Address", type: "text" },
    ],
    bankDetails: [
      { name: "bankName", label: "Bank Name", type: "text" },
      // { name: "accountNumber", label: "Account Number", type: "text" },
      // { name: "voucherNumber", label: "VoucherNumber", type: "text" },
      // { name: "monthlyIncome", label: "Monthly Income", type: "number" },
    ],
    documents: [
      { name: "citizenshipDoc", label: "Citizenship Certificate", type: "file" },
      // { name: "quotationDoc", label: "Quotation / Pro-forma Invoice", type: "file" },
      // { name: "salarySlip", label: "Salary Slip or Income Proof", type: "file" },
      // { name: "bankStatement", label: "Bank Statement (6 months)", type: "file" },
      // { name: "passportPhoto", label: "Passport-Size Photo", type: "file" },
    ],
  },

  "Car Loan": {
    description: "Low rates to finance your next vehicle smoothly.",
    requiredDocs: [
      "Citizenship Certificate",
      "Vehicle Quotation",
      "Salary Slip or Income Proof", 
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
    ],
    addressInfo: [
      { name: "permanentAddress", label: "Permanent Address", type: "text" },
      { name: "currentAddress", label: "Current Address", type: "text" },
    ],
    bankDetails: [
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "voucherNumber", label: "VoucherNumber", type: "text" },
      { name: "monthlyIncome", label: "Monthly Income", type: "number" },
    ],
    documents: [
      { name: "citizenshipDoc", label: "Citizenship Certificate", type: "file" },
      { name: "vehicleQuotation", label: "Vehicle Quotation", type: "file" },
      { name: "salarySlip", label: "Salary Slip or Income Proof", type: "file" },
      { name: "bankStatement", label: "Bank Statement (6 months)", type: "file" },
      { name: "passportPhoto", label: "Passport-Size Photo", type: "file" },
    ],
  },

  "Education Loan": {
    description: "Affordable funding for higher education and future goals.",
    requiredDocs: [
      "Citizenship Certificate",
      "Admission Letter",
      "Academic Transcripts",
      "Bank Statement (6 months)", 
      "Passport-Size Photo",
    ],
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
    ],
    addressInfo: [
      { name: "permanentAddress", label: "Permanent Address", type: "text" },
      { name: "currentAddress", label: "Current Address", type: "text" },
     
    ],
    bankDetails: [
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "voucherNumber", label: "VoucherNumber", type: "text" },
      { name: "courseFee", label: "Total Course Fee", type: "number" },
      { name: "familyIncome", label: "Family Monthly Income", type: "number" },
    ],
    documents: [
      { name: "citizenshipDoc", label: "Citizenship Certificate", type: "file" },
      { name: "admissionLetter", label: "Admission Letter", type: "file" },
      { name: "academicTranscripts", label: "Academic Transcripts", type: "file" },
      { name: "bankStatement", label: "Bank Statement (6 months)", type: "file" },
      { name: "passportPhoto", label: "Passport-Size Photo", type: "file" },
    ],
  },

  "Personal Loan": {
    description: "Quick cash for personal needs with easy repayment terms.",
    requiredDocs: [
      "Citizenship Certificate",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Employment Letter",
      "Passport-Size Photo",
    ],
    personalInfo: [
      { name: "fullName", label: "Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
      { name: "dob", label: "Date of Birth", type: "date" },
    ],
    addressInfo: [
      { name: "permanentAddress", label: "Permanent Address", type: "text" },
      { name: "currentAddress", label: "Current Address", type: "text" },
      
    ],
    bankDetails: [
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "voucherNumber", label: "VoucherNumber", type: "text" },
      { name: "monthlyIncome", label: "Monthly Income", type: "number" },
      { name: "loanAmount", label: "Requested Loan Amount", type: "number" },
    ],
    documents: [
      { name: "citizenshipDoc", label: "Citizenship Certificate", type: "file" },
      { name: "salarySlip", label: "Salary Slip or Income Proof", type: "file" },
      { name: "bankStatement", label: "Bank Statement (6 months)", type: "file" },
      { name: "employmentLetter", label: "Employment Letter", type: "file" },
      { name: "passportPhoto", label: "Passport-Size Photo", type: "file" },
    ],
  },

  "Business Loan": {
    description: "Tailored financing solutions to support your business growth.",
    requiredDocs: [
      "Business Registration",
      "Financial Statements",
      "Tax Returns",
      "Bank Statement (12 months)",
      "Business Plan",
    ],
    personalInfo: [
      { name: "businessName", label: "Business Name", type: "text" },
      { name: "ownerName", label: "Owner Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "businessType", label: "Business Type", type: "text" },
    ],
    addressInfo: [
      { name: "businessAddress", label: "Business Address", type: "text" },
      { name: "ownerAddress", label: "Owner Address", type: "text" },
      
    ],
    bankDetails: [
      { name: "bankName", label: "Business Bank Name", type: "text" },
      { name: "accountNumber", label: "Business Account Number", type: "text" },
      { name: "voucherNumber", label: "VoucherNumber", type: "text" },
      { name: "monthlyRevenue", label: "Monthly Revenue", type: "number" },
      { name: "loanAmount", label: "Requested Loan Amount", type: "number" },
    ],
    documents: [
      { name: "businessRegistration", label: "Business Registration", type: "file" },
      { name: "financialStatements", label: "Financial Statements", type: "file" },
      { name: "taxReturns", label: "Tax Returns", type: "file" },
      { name: "bankStatement", label: "Bank Statement (12 months)", type: "file" },
      { name: "businessPlan", label: "Business Plan", type: "file" },
    ],
  },

  "Medical Loan": {
    description: "Fast financial assistance for medical emergencies and treatments.",
    requiredDocs: [
      "Medical Reports",
      "Treatment Estimate",
      "Citizenship Certificate",
      "Income Proof",
      "Bank Statement",
    ],
    personalInfo: [
      { name: "patientName", label: "Patient Full Name", type: "text" },
      { name: "applicantName", label: "Applicant Full Name", type: "text" },
      { name: "email", label: "Email Address", type: "email" },
      { name: "phone", label: "Phone Number", type: "tel" },
      { name: "relationship", label: "Relationship to Patient", type: "text" },
    ],
    addressInfo: [
      { name: "patientAddress", label: "Patient Address", type: "text" },
      { name: "applicantAddress", label: "Applicant Address", type: "text" },
      
    ],
    bankDetails: [
      { name: "bankName", label: "Bank Name", type: "text" },
      { name: "accountNumber", label: "Account Number", type: "text" },
      { name: "voucherNumber", label: "Voucher Number", type: "text" },
      { name: "monthlyIncome", label: "Monthly Income", type: "number" },
      { name: "treatmentCost", label: "Estimated Treatment Cost", type: "number" },
    ],
    documents: [
      { name: "medicalReports", label: "Medical Reports", type: "file" },
      { name: "treatmentEstimate", label: "Treatment Cost Estimate", type: "file" },
      { name: "citizenshipDoc", label: "Citizenship Certificate", type: "file" },
      { name: "incomeProof", label: "Income Proof", type: "file" },
      { name: "bankStatement", label: "Bank Statement", type: "file" },
    ],
  },
};

export default loanFormConfig;