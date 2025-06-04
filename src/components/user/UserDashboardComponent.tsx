import { Building2, CarFront, GraduationCap, Handshake, HeartPulse, HousePlus } from "lucide-react";
import LoanCard from "../shared/LoanCard"
import UserRoute from "../auth/UserRoute";
const loanTypes = [
  {
    name: "Home Loan",
    description: "Competitive rates and flexible terms for your dream home.",
    icon: <HousePlus size={26}/>
  },
  {
    name: "Education Loan",
    description: "Affordable funding for higher education and future goals.",
    icon: <GraduationCap size={26}/>,
  },
  {
    name: "Personal Loan",
    description: "Quick cash for personal needs with easy repayment and terms.",
    icon: <Handshake size={26}/>,
  },
  {
    name: "Car Loan",
    description: "Low rates to finance your next vehicle smoothly.",
    icon: <CarFront size={26}/>,
  },
  {
    name: "Business Loan",
    description: "Tailored loans to support your business growth.",
    icon: <Building2 size={26}/>,
  },
  {
    name: "Medical Loan",
    description: "Fast financial help for medical emergencies.",
    icon: <HeartPulse size={26}/>,
  },
];


const UserDashboardComponent = () => {
  return (
    <UserRoute>
    <section className="min-h-screen w-full bg-[#F5F5F5]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-5xl font-bold font-outfit text-center text-blue-600 mb-2">
          DocBot📑
      
        </h2>
        <h3 className="text-2xl text-center text-blue-700 font-medium drop-shadow-sm mb-8">
          Choose your loan type
        </h3>

       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center">
  {loanTypes.map((loan) => (
    <LoanCard
    key={loan.name}
      icon={loan.icon}
      name={loan.name}
      description={loan.description}
    />
  ))}
</div>

      </div>
    </section>
  </UserRoute>
  );
};

export default UserDashboardComponent;

