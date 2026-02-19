import { getTimeRemaining } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useCountdown(deadline: Date) {
   const [isMounted, setIsMounted] = useState(false);
   const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

   useEffect(() => {
      setIsMounted(true);

      setTimeLeft(getTimeRemaining(deadline));

      const interval = setInterval(() => {
         setTimeLeft(getTimeRemaining(deadline));
      }, 1000);

      return () => clearInterval(interval);
   }, [deadline])

   return {
      ...timeLeft,
      isMounted,
   };
}