import { createContext, useState } from "react";

const RequestContext = createContext(null);

const RequestContextProvider = ({ children }) => {
  const [loanRequest, setLoanRequest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <RequestContext.Provider
      value={{
        loanRequest,
        setLoanRequest,
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
