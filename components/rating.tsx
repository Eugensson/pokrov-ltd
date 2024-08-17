import { IoStarOutline, IoStarHalfOutline, IoStar } from "react-icons/io5";

import { cn } from "@/lib/utils";

interface Props {
  value: number;
  caption?: string;
  className?: string;
}

export const Rating: React.FC<Props> = ({ value, caption, className }) => {
  return (
    <span className={cn("flex gap-3", className)}>
      <span className="flex gap-1">
        {value >= 1 ? (
          <IoStar size={16} className="text-blue-500" />
        ) : value >= 0.5 ? (
          <IoStarHalfOutline size={16} className="text-blue-500" />
        ) : (
          <IoStarOutline size={16} className="text-blue-500" />
        )}
        {value >= 2 ? (
          <IoStar size={16} className="text-blue-500" />
        ) : value >= 1.5 ? (
          <IoStarHalfOutline size={16} className="text-blue-500" />
        ) : (
          <IoStarOutline size={16} className="text-blue-500" />
        )}
        {value >= 3 ? (
          <IoStar size={16} className="text-blue-500" />
        ) : value >= 2.5 ? (
          <IoStarHalfOutline size={16} className="text-blue-500" />
        ) : (
          <IoStarOutline size={16} className="text-blue-500" />
        )}
        {value >= 4 ? (
          <IoStar size={16} className="text-blue-500" />
        ) : value >= 3.5 ? (
          <IoStarHalfOutline size={16} className="text-blue-500" />
        ) : (
          <IoStarOutline size={16} className="text-blue-500" />
        )}
        {value >= 5 ? (
          <IoStar size={16} className="text-blue-500" />
        ) : value >= 4.5 ? (
          <IoStarHalfOutline size={16} className="text-blue-500" />
        ) : (
          <IoStarOutline size={16} className="text-blue-500" />
        )}
      </span>
      {caption && <span>{caption}</span>}
    </span>
  );
};
