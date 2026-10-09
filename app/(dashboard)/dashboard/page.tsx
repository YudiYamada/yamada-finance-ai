import { redirect } from "next/navigation";

import { getDashboard } from "@/data-access/get-dashboard";

import SummaryCards from "./components/summary-cards";
import { TimeSelect } from "./components/time-select";
import { TransactionsChartPieDonut } from "./components/transactions-chart-pie-donut";

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

  const dashboard = await getDashboard(month);

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <TimeSelect />
      </div>

      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <SummaryCards month={month} {...dashboard} />
          <div className="mt-6 grid grid-cols-3 gap-6">
            <div className="col-span-1">
              <TransactionsChartPieDonut {...dashboard}/>
            </div>

            <div className="col-span-2">Gastos por categoria</div>
          </div>
        </div>

        <div className="col-span-1">
          <h2> Olá mundo!</h2>
        </div>
      </div>
    </>
  );
};

export default DashBoardPage;
