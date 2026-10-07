import { redirect } from "next/navigation";

import SummaryCards from "./components/summary-cards";
import { TimeSelect } from "./components/time-select";

interface DashBoardPageProps {
  searchParams: { month: string };
}

const DashBoardPage = async ({ searchParams }: DashBoardPageProps) => {
  const { month } = await searchParams;

  const monthIsValid =
    month && !isNaN(Number(month)) && Number(month) >= 1 && Number(month) <= 12;

  if (!monthIsValid) {
    const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
    redirect(`/dashboard?month=${currentMonth}`);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>
      <SummaryCards month={month} />
    </div>
  );
};

export default DashBoardPage;
