import DashboardFrame from "../Components/DashboardFrame";

export default function Stock() {
  return (
    <DashboardFrame
      title="Stock"
      url={import.meta.env.VITE_POWERBI_STOCK}
    />
  );
}
