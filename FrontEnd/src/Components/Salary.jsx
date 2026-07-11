import DashboardFrame from "../Components/DashboardFrame";

export default function Salary() {
  return (
    <DashboardFrame
      title="Salary"
      url={import.meta.env.VITE_POWERBI_SALARY}
    />
  );
}
