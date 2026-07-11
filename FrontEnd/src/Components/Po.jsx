import DashboardFrame from "../Components/DashboardFrame";

export default function PO() {
  return (
    <DashboardFrame
      title="PO"
      url={import.meta.env.VITE_POWERBI_PO}
    />
  );
}
