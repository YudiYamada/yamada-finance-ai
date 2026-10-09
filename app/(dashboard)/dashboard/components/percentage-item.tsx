import { ReactNode } from "react";

interface PercentageItemProps {
  icon: ReactNode;
  title: string;
  value: number;
}

const PercentageItem = ({ icon, title, value }: PercentageItemProps) => {
  return (
    <div className="flex items-center justify-between">
      {/* ICON */}
      <div className="flex items-center gap-3">
        <div className="bg-opacity-[3%] rounded-lg bg-white p-2">{icon}</div>
        <p className="text-muted-foreground text-sm">{title}</p>
      </div>

      <div>
        <p className="text-foreground text-sm font-bold">{value}%</p>
      </div>
    </div>
  );
};

export default PercentageItem;
