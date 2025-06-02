import {
  AiOutlineCheckCircle,
  AiOutlineClockCircle,
  AiOutlineHourglass,
  AiOutlineCloseCircle,
} from "react-icons/ai";

import {
  FaHome,
  FaGraduationCap,
  FaMoneyCheckAlt,
  FaCar,
  FaUser,
  FaBriefcase,
  FaHeartbeat,
} from "react-icons/fa";


export const loanFormConfig = {
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
      { name: "quotationDoc", label: "Quotation / Pro-forma Invoice", type: "file" },
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

export const STATUS_META = {
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
  new_application: {
    label: "New Application",
    text: "text-white/90",
    bg: "bg-purple-400",
    icon: AiOutlineCloseCircle,
  },
};

export const TITLE_ICONS = {
  "Home Loan": FaHome,
  "Education Loan": FaGraduationCap,
  "Car Loan": FaCar,
  "Personal Loan": FaUser,
  "Business Loan": FaBriefcase,
  "Medical Loan": FaHeartbeat,
  default: FaMoneyCheckAlt,
};

export const sampleData = {
  1: {
    fullName: "John Doe",
    email: "john.doe@email.com",
    phone: "+977-9812345678",
    citizenshipNumber: "12345678901234",
    dob: "1990-05-15",
    permanentAddress: "Kathmandu, Nepal",
    currentAddress: "Lalitpur, Nepal",
    bankName: "Nepal Investment Bank",
    accountNumber: "1234567890123456",
    courseFee: "500000",
    familyIncome: "80000",
    documents: {
      citizenshipDoc: "citizenship_john_doe.pdf",
      admissionLetter: "admission_letter_tribhuvan.pdf",
      academicTranscripts: "transcripts_bachelor.pdf",
      bankStatement: "bank_statement_6months.pdf",
      passportPhoto: "passport_photo_john.jpg",
    }
  },
  2: {
    fullName: "Jane Smith",
    email: "jane.smith@email.com",
    phone: "+977-9823456789",
    citizenshipNumber: "23456789012345",
    dob: "1985-08-22",
    permanentAddress: "Pokhara, Nepal",
    currentAddress: "Kathmandu, Nepal",
    bankName: "Standard Chartered Bank",
    accountNumber: "2345678901234567",
    monthlyIncome: "120000",
    documents: {
      citizenshipDoc: "citizenship_jane_smith.pdf",
      quotationDoc: "home_renovation_quote.pdf",
      salarySlip: "salary_slip_jane.pdf",
      bankStatement: "bank_statement_6months_jane.pdf",
      passportPhoto: "passport_photo_jane.jpg",
    }
  },
  3: {
    fullName: "Ram Sharma",
    email: "ram.sharma@email.com",
    phone: "+977-9834567890",
    citizenshipNumber: "34567890123456",
    dob: "1988-12-10",
    permanentAddress: "Bhaktapur, Nepal",
    currentAddress: "Kathmandu, Nepal",
    bankName: "Nabil Bank",
    accountNumber: "3456789012345678",
    monthlyIncome: "95000",
    loanAmount: "200000",
    documents: {
      citizenshipDoc: "citizenship_ram_sharma.pdf",
      salarySlip: "salary_slip_ram.pdf",
      bankStatement: "bank_statement_6months_ram.pdf",
      employmentLetter: "employment_letter_ram.pdf",
      passportPhoto: "passport_photo_ram.jpg",
    }
  },
  4: {
    businessName: "Sweet Dreams Bakery",
    ownerName: "Sita Gurung",
    email: "sita.gurung@sweetdreams.com",
    phone: "+977-9845678901",
    businessType: "Food & Beverage",
    businessAddress: "Thamel, Kathmandu",
    ownerAddress: "Baneshwor, Kathmandu",
    bankName: "Himalayan Bank",
    accountNumber: "4567890123456789",
    monthlyRevenue: "300000",
    loanAmount: "1500000",
    documents: {
      businessRegistration: "business_registration_sweet_dreams.pdf",
      financialStatements: "financial_statements_2023.pdf",
      taxReturns: "tax_returns_2023.pdf",
      bankStatement: "bank_statement_12months_business.pdf",
      businessPlan: "expansion_business_plan.pdf",
    }
  }
};

export const FILTERS = [
  { value: "all", label: "All" },
  { value: "new_application", label: "New Application" },
  { value: "approved", label: "Approved" },
  { value: "pending", label: "Pending" },
  { value: "in_review", label: "In Review" },
];

export const dummyLoans = [
  {
    id: 1,
    userId: 101,
    title: "Education Loan",
    description: "Loan to cover university tuition and books for Computer Science degree at Tribhuvan University.",
    status: "approved",
    receivedAt: new Date("2024-05-15").toISOString(),
    reviewedAt: new Date("2024-05-20").toISOString(),
  },
  {
    id: 2,
    userId: 102,
    title: "Home Loan",
    description: "Funds for renovating kitchen and bathroom in family home.",
    status: "in_review",
    receivedAt: new Date("2024-05-28").toISOString(),
    reviewedAt: null,
  },
  {
    id: 3,
    userId: 103,
    title: "Personal Loan",
    description: "Short-term loan for medical expenses and emergency costs.",
    status: "pending",
    receivedAt: new Date("2024-05-29").toISOString(),
    reviewedAt: null,
  },
  {
    id: 4,
    userId: 104,
    title: "Business Loan",
    description: "Capital to expand a local bakery and purchase new equipment.",
    status: "new_application",
    receivedAt: new Date("2024-05-30").toISOString(),
    reviewedAt: null,
  },
];
