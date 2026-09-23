import { Button } from "./ui/button";

interface TitleProps {
  title: string;
  action: string;
}

const Title = ({ title, action }: TitleProps) => {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">{title}</h1>
      <Button className="rounded-2xl p-5">{action}</Button>
    </div>
  );
};

export default Title;
