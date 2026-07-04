/* lib */
import { cn } from "@/lib/utils";
/* icons */
import { FireIcon } from "../icons/fireIcon";

export interface MarkerProps {
   name: 'hit' | undefined;
   size: 'md' | 'sm' | undefined;
}

export default function Marker({name, size}: MarkerProps) {
   return (
      <div className={cn("flex justify-center items-center rounded-[8px] bg-red-600",
            size === 'sm' ? "size-5" : size === 'md' ? "size-6" : "size-6",
          )}>
         {name == 'hit' && (
            <FireIcon size={16} color="#ffffff"></FireIcon>
         )}
      </div>
   );
}