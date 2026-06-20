import { createContext, useContext, useState } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [refreshKey, setRefreshKey] = useState(0);

  const onRefresh = () => {
    setLastRefresh(new Date());
    setRefreshKey(prev => prev + 1); // 🔥 triggers reload
  };

  return (
    <DashboardContext.Provider
      value={{ lastRefresh, onRefresh, refreshKey }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => useContext(DashboardContext);
