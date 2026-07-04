/* icons */
import { Star } from "lucide-react";

export interface RatingProps {
   rating: number;
   reviewsAmount?: number;
}

export default function Rating({ rating, reviewsAmount = -1 }: RatingProps ){
   return(
      <div className="flex gap-x-1.5 items-center"> 
         <span className="my-text-p">{rating}</span>
         <div className="h-full flex items-center">
            <Star size={12} strokeWidth={3} />
         </div>
         {reviewsAmount > -1 && <span className="text-slate-500">({reviewsAmount} reviews)</span>}
      </div>
   )
}