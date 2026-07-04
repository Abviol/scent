/* react */
import { useEffect, useState } from "react";
/* lib */
import { getTimeRemaining } from "@/lib/utils";

/**
 * Tracks the time remaining until a given deadline, updating every second.
 * @remarks Requires a Client Component — uses useState and useEffect internally.
 * @param deadline - The target date to count down to
 * @returns An object containing the remaining time as { d, h, m, s }
 */
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