import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";

const Greetings = () => {
  const user = useSelector((state) => state.user);
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* =========================
     GREETING LOGIC
  ========================= */
  const greeting = useMemo(() => {
    const hour = now.getHours();
    if (hour < 12) return "Good morning ☀️";
    if (hour < 18) return "Good afternoon 🌤️";
    return "Good evening 🌙";
  }, [now]);

  const displayName = useMemo(() => {
    if (!user?.name) return "Guest";
    return user.name.split(" ")[0]; // first name only
  }, [user]);

  /* =========================
     FORMATTED TIME & DATE
  ========================= */
  const time = useMemo(
    () =>
      now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    [now]
  );

  const date = useMemo(
    () =>
      now.toLocaleDateString([], {
        weekday: "long",
        month: "short",
        day: "numeric",
      }),
    [now]
  );

  return (
    <div className="flex justify-between items-center px-8 mt-6">
      {/* LEFT */}
      <div>
        <h1 className="text-[#f5f5f5] text-2xl font-semibold tracking-wide">
          {greeting}, {displayName}
        </h1>
        <p className="text-[#ababab] text-xs mt-1">
          Give your best service to customers today
        </p>

        {/* subtle divider */}
        <div className="mt-3 h-[2px] w-12 bg-[#f6b100] rounded-full" />
      </div>

      {/* RIGHT */}
      <div className="text-right">
        <h2 className="text-[#f5f5f5] text-3xl font-bold tracking-wide">
          {time}
        </h2>
        <p className="text-[#ababab] text-sm capitalize">
          {date}
        </p>
      </div>
    </div>
  );
};

export default Greetings;
