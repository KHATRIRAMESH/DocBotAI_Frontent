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
    steps: [
      [
        { name: "fullName", label: "Full Name", type: "text" },
        // { name: "email", label: "Email Address", type: "email" },
        // { name: "phone", label: "Phone Number", type: "tel" },
        // { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
        // { name: "dob", label: "Date of Birth", type: "date" },
      ],
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        // { name: "zipCode", label: "ZIP Code", type: "text" },
        // { name: "postalCode", label: "Postal Code", type: "text" },
        // { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        // { name: "document2", label: "Upload Document 2", type: "file" },
        // { name: "document3", label: "Upload Document 3", type: "file" },
        // { name: "document4", label: "Upload Document 4", type: "file" },
        // { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document11", label: "Upload Document 11", type: "file" },
        // { name: "document12", label: "Upload Document 12", type: "file" },
        // { name: "document13", label: "Upload Document 13", type: "file" },
        // { name: "document14", label: "Upload Document 14", type: "file" },
        // { name: "document15", label: "Upload Document 15", type: "file" },
      ],
    ],
  },

  "Car Loan": {
    description: "Low rates to finance your next vehicle smoothly.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
    steps: [
      [
        { name: "fullName", label: "Full Name", type: "text" },
        { name: "email", label: "Email Address", type: "email" },
        { name: "phone", label: "Phone Number", type: "tel" },
        { name: "citizenshipNumber", label: "Citizenship Number", type: "text" },
        { name: "dob", label: "Date of Birth", type: "date" },
      ],
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        { name: "zipCode", label: "ZIP Code", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        { name: "document2", label: "Upload Document 2", type: "file" },
        { name: "document3", label: "Upload Document 3", type: "file" },
        { name: "document4", label: "Upload Document 4", type: "file" },
        { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document6", label: "Upload Document 6", type: "file" },
        { name: "document7", label: "Upload Document 7", type: "file" },
        { name: "document8", label: "Upload Document 8", type: "file" },
        { name: "document9", label: "Upload Document 9", type: "file" },
        { name: "document10", label: "Upload Document 10", type: "file" },
      ]
    ],
  },
  "Education Loan": {
    description: "Affordable funding for higher education and future goals.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
     steps: [
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        { name: "zipCode", label: "ZIP Code", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        { name: "document2", label: "Upload Document 2", type: "file" },
        { name: "document3", label: "Upload Document 3", type: "file" },
        { name: "document4", label: "Upload Document 4", type: "file" },
        { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document6", label: "Upload Document 6", type: "file" },
        { name: "document7", label: "Upload Document 7", type: "file" },
        { name: "document8", label: "Upload Document 8", type: "file" },
        { name: "document9", label: "Upload Document 9", type: "file" },
        { name: "document10", label: "Upload Document 10", type: "file" },
      ],
      [
        { name: "document11", label: "Upload Document 11", type: "file" },
        { name: "document12", label: "Upload Document 12", type: "file" },
        { name: "document13", label: "Upload Document 13", type: "file" },
        { name: "document14", label: "Upload Document 14", type: "file" },
        { name: "document15", label: "Upload Document 15", type: "file" },
      ],
    ],
  },
  "Personal Loan": {
    description: "Quick cash for personal needs with easy repayment and terms.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
     steps: [
      
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        { name: "zipCode", label: "ZIP Code", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        { name: "document2", label: "Upload Document 2", type: "file" },
        { name: "document3", label: "Upload Document 3", type: "file" },
        { name: "document4", label: "Upload Document 4", type: "file" },
        { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document6", label: "Upload Document 6", type: "file" },
        { name: "document7", label: "Upload Document 7", type: "file" },
        { name: "document8", label: "Upload Document 8", type: "file" },
        { name: "document9", label: "Upload Document 9", type: "file" },
        { name: "document10", label: "Upload Document 10", type: "file" },
      ],
      [
        { name: "document11", label: "Upload Document 11", type: "file" },
        { name: "document12", label: "Upload Document 12", type: "file" },
        { name: "document13", label: "Upload Document 13", type: "file" },
        { name: "document14", label: "Upload Document 14", type: "file" },
        { name: "document15", label: "Upload Document 15", type: "file" },
      ],
    ],
  },
  "Business Loan": {
    description: "Tailored loans to support your business growth.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
    steps: [
      
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        { name: "zipCode", label: "ZIP Code", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        { name: "document2", label: "Upload Document 2", type: "file" },
        { name: "document3", label: "Upload Document 3", type: "file" },
        { name: "document4", label: "Upload Document 4", type: "file" },
        { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document6", label: "Upload Document 6", type: "file" },
        { name: "document7", label: "Upload Document 7", type: "file" },
        { name: "document8", label: "Upload Document 8", type: "file" },
        { name: "document9", label: "Upload Document 9", type: "file" },
        { name: "document10", label: "Upload Document 10", type: "file" },
      ],
      [
        { name: "document11", label: "Upload Document 11", type: "file" },
        { name: "document12", label: "Upload Document 12", type: "file" },
        { name: "document13", label: "Upload Document 13", type: "file" },
        { name: "document14", label: "Upload Document 14", type: "file" },
        { name: "document15", label: "Upload Document 15", type: "file" },
      ],
    ],
  },
  "Medical Loan": {
    description: "Fast financial help for medical emergencies.",
    requiredDocs: [
      "Citizenship Certificate",
      "Quotation / Pro-forma Invoice",
      "Salary Slip or Income Proof",
      "Bank Statement (6 months)",
      "Passport-Size Photo",
    ],
    steps: [
     
      [
        { name: "permanentAddress", label: "Permanent Address", type: "text" },
        { name: "currentAddress", label: "Current Address", type: "text" },
        { name: "zipCode", label: "ZIP Code", type: "text" },
        { name: "postalCode", label: "Postal Code", type: "text" },
        { name: "areaCode", label: "Area Code", type: "text" },
      ],
      [
        { name: "document1", label: "Upload Document 1", type: "file" },
        { name: "document2", label: "Upload Document 2", type: "file" },
        { name: "document3", label: "Upload Document 3", type: "file" },
        { name: "document4", label: "Upload Document 4", type: "file" },
        { name: "document5", label: "Upload Document 5", type: "file" },
      ],
      [
        { name: "document6", label: "Upload Document 6", type: "file" },
        { name: "document7", label: "Upload Document 7", type: "file" },
        { name: "document8", label: "Upload Document 8", type: "file" },
        { name: "document9", label: "Upload Document 9", type: "file" },
        { name: "document10", label: "Upload Document 10", type: "file" },
      ],
      [
        { name: "document11", label: "Upload Document 11", type: "file" },
        { name: "document12", label: "Upload Document 12", type: "file" },
        { name: "document13", label: "Upload Document 13", type: "file" },
        { name: "document14", label: "Upload Document 14", type: "file" },
        { name: "document15", label: "Upload Document 15", type: "file" },
      ],
    ],
  },
};

export default loanFormConfig