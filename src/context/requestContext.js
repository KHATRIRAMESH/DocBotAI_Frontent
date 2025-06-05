import { createContext, useEffect, useState } from "react";

const RequestContext = createContext(null);

const RequestContextProvider = ({ children }) => {
  const [loanRequest, setLoanRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [generatedDocument, setGeneratedDocument] = useState(null);

  useEffect(() => {
    console.log("Use effect executing...");
    const fetchLoan = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/loan-applications`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!res.ok) {
          return console.log("Error while fetching");
        }
        const body = await res.json();
        console.log(body);
        setLoanRequest(body.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoan();
  }, []);

  return (
    <RequestContext.Provider
      value={{
        loanRequest,
        setLoanRequest,
        generatedDocument,
        setGeneratedDocument,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </RequestContext.Provider>
  );
};

export { RequestContext, RequestContextProvider };
