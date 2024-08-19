import { Loader } from "lucide-react";

export const Loading: React.FC = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Loader size={40} className="animate-spin" />
    </div>
  );
};
