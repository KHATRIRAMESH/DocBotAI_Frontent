import DashboardSidebar from "./DashboardSideBar";

const loanTypes = [
  {
    name: "Home Loan",
    description: "Low interest rates for your dream house.",
    icon: "🏠",
  },
  {
    name: "Education Loan",
    description: "Invest in your future with flexible education loans.",
    icon: "🎓",
  },
  {
    name: "Personal Loan",
    description: "Quick cash for any personal needs, anytime.",
    icon: "💼",
  },
  {
    name: "Car Loan",
    description: "Drive your dream car with easy financing.",
    icon: "🚗",
  },
  {
    name: "Business Loan",
    description: "Fuel your business growth with tailored loans.",
    icon: "🏢",
  },
  {
    name: "Medical Loan",
    description: "Get financial support for medical emergencies.",
    icon: "🏥",
  },
];

const UserDashboardComponent = () => {
  return (
    <div className="flex flex-row ">
      <DashboardSidebar />
      <section className="bg-radial-[at_25%_25%] from-white to-zinc-900 to-75% min-h-screen w-full">
        <div className="max-w-6xl mx-auto px-6 py-20">
          <h2 className="text-4xl font-bold text-center text-shadow-white mb-12">
            Choose Your Loan Type
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {loanTypes.map((loan) => {
              return (
                <div
                  key={loan.name}
                  className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
                >
                  <h4 className="text-xl font-semibold mb-2 text-gray-900">
                    {loan.icon} {loan.name}
                  </h4>
                  <p className="text-gray-600">{loan.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
export default UserDashboardComponent;
