import { getTimeRemaining } from "@/lib/utils";
import { useEffect, useState } from "react";

export function useCountdown(deadline: Date) {
    const [, forceUpdate] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            forceUpdate(t => t + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return getTimeRemaining(deadline);
}