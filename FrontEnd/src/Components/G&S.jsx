import DashboardFrame from "../Components/DashboardFrame";

export default function GNS() {
  return (
    <DashboardFrame
      title="Physical G&S"
      url={import.meta.env.VITE_POWERBI_GNS}
    />
  );
}
