import { useState, useEffect } from "react";

export const useTimer = (deadline) => {
  const calculateTimeRemaining = () => {
    const now = new Date().getTime();
    const deadlineTime = new Date(deadline).getTime();
    const total = Math.max(0, deadlineTime - now);

    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (total % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((total % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
  };

  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(calculateTimeRemaining());
    }, 100); // Update every minute

    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deadline]);

  return timeRemaining;
};
