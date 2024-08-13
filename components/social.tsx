import Link from "next/link";

import { cn } from "@/lib/utils";
import { socialLinks } from "@/constants";
import { Button } from "@/components/ui/button";

interface Props {
  className?: string;
}

export const Social: React.FC<Props> = ({ className }) => {
  return (
    <ul className={cn("flex items-center gap-4", className)}>
      {socialLinks.map(({ label, href, icon }) => {
        const Icon = icon;
        return (
          <li key={href}>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-md"
            >
              <Link href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={24} aria-label={label} />
              </Link>
            </Button>
          </li>
        );
      })}
    </ul>
  );
};
