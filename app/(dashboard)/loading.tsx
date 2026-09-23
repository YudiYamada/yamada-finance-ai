import { LoaderIcon } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="animate-spin">
        <LoaderIcon />
      </div>
    </div>
  );
}
