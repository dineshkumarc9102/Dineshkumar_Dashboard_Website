import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const [onRefresh, setOnRefresh] = useState(() => () => {});
  const [onOpen, setOnOpen] = useState(() => () => {});

  return (
    <DashboardContext.Provider
      value={{
        lastRefresh,
        setLastRefresh,
        onRefresh,
        setOnRefresh,
        onOpen,
        setOnOpen
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
