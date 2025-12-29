import { Fire20SolidIcon } from "../icons/heroicons-fire-20-solid";

export interface MarkerProps {
   name: 'hit' | undefined;
   size: 'md' | 'sm' | undefined;
}

export default function Marker({name, size}: MarkerProps) {
   return (
      <div className="size-6 flex justify-center items-center rounded-[8px] bg-red-600">
         {name == 'hit' && (
            <Fire20SolidIcon size={16} color="#ffffff"></Fire20SolidIcon>
         )}
      </div>
   );
}