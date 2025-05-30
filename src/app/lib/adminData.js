// Dummy Data
export const seedLoans = [
  {
    id: 101,
    userId: "USR001",
    user: "John Doe",
    title: "Home Loan",
    description: "NPR 2 000 000 requested for full interior makeover.",
    createdAt: "2025-03-01T10:45:00+05:45",
    status: "pending",
  },
  {
    id: 102,
    userId: "USR002",
    user: "Jane Smith",
    title: "Education Loan",
    description: "Under-grad tuition fees abroad.",
    createdAt: "2025-02-15T14:20:00+05:45",
    status: "approved",
  },
  {
    id: 103,
    userId: "USR003",
    user: "Bob Martin",
    title: "Vehicle Loan",
    description: "Purchase of EV four-wheeler.",
    createdAt: "2025-04-10T09:30:00+05:45",
    status: "new",
  },
  {
    id: 104,
    userId: "USR007",
    user: "Jenn Marley",
    title: "Education Loan",
    description: "MBA in Ohio University.",
    createdAt: "2025-04-10T09:30:00+05:45",
    status: "approved",
  },
  {
    id: 105,
    userId: "USR025",
    user: "Sabrina Carepnter",
    title: "Medical Loan",
    description: "Medical Insurance.",
    createdAt: "2025-04-10T09:30:00+05:45",
    status: "approved",
  },
   {
    id: 106,
    userId: "USR029",
    user: "Jane Donyell",
    title: "Business Loan",
    description: "Business development.",
    createdAt: "2025-04-18T09:30:00+05:45",
    status: "approved",
  },
  {
    id: 107,
    userId: "RSR059",
    user: "Jake Paul",
    title: "Personal Loan",
    description: "House repairment & reconditioning.",
    createdAt: "2025-09-10T09:30:00+05:45",
    status: "pending",
  },
];

export const ranges = { all:null,"3m": 3, "6m": 6, "1y": 12 };

export const statusStyles = {
  approved: {
    border: "border-green-500",
    bg: "bg-green-50",
    badgeBg: "bg-green-100",
    badgeText: "text-green-800",
    label: "Approved",
  },
  pending: {
    border: "border-yellow-500",
    bg: "bg-yellow-50",
    badgeBg: "bg-yellow-100",
    badgeText: "text-yellow-800",
    label: "Pending",
  },
  new: {
    border: "border-blue-500",
    bg: "bg-blue-50",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    label: "Not reviewed",
  },
};