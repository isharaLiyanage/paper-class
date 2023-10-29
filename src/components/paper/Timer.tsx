"Use client";

import { useEffect, useState } from "react";

function Timer() {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(() => time + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const getReturnValues = (countDown: any) => {
    // calculate time left

    const hours = Math.floor(countDown / 3600);
    const minutes = Math.floor(countDown / 60);
    const seconds = countDown % 60;

    return [hours, minutes, seconds];
  };
  const [hours, minutes, seconds] = getReturnValues(time);

  return (
    <div>
      Time: {hours.toString().padStart(2, "0")}:
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}

export default Timer;
