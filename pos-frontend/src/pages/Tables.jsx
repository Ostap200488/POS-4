import React, { useMemo, useState } from "react";
import BottomNav from "../components/shared/BottomNav";
import BackButton from "../components/shared/BackButton";
import TableCard from "../components/tables/TableCard";
import { tables } from "../constants/PopularDishes";

const Tables = () => {
  const [status, setStatus] = useState("All");

  const groupedTables = useMemo(() => {
    const available = tables.filter(t => t.status === "Available");
    const booked = tables.filter(t => t.status === "Booked");

    if (status === "Available") return { available };
    if (status === "Booked") return { booked };

    return { available, booked };
  }, [status]);

  return (
    <div className="bg-[#1f1f1f] min-h-screen pb-28">

      {/* HEADER */}
      <div className="px-6 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <BackButton />
          <h1 className="text-white text-2xl font-semibold">
            Tables
          </h1>
        </div>

        {/* SIMPLE FILTER */}
        <div className="flex gap-2">
          {["All", "Available", "Booked"].map(s => (
            <button
              key={s}
              onClick={() => setStatus(s)}
              className={`
                px-4 py-2 rounded-md text-sm font-semibold
                ${
                  status === s
                    ? "bg-[#383838] text-white"
                    : "text-[#ababab] hover:text-white"
                }
              `}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="px-6 mt-8 space-y-10">

        {/* AVAILABLE */}
        {groupedTables.available && (
          <section>
            <h2 className="text-[#8cff8c] text-sm font-semibold mb-4 tracking-wide">
              AVAILABLE TABLES
            </h2>

            <div className="flex flex-wrap gap-4">
              {groupedTables.available.map(table => (
                <TableCard
                  key={table.id}
                  {...table}
                />
              ))}
            </div>
          </section>
        )}

        {/* BOOKED */}
        {groupedTables.booked && (
          <section>
            <h2 className="text-[#ff8c8c] text-sm font-semibold mb-4 tracking-wide">
              BOOKED TABLES
            </h2>

            <div className="flex flex-wrap gap-4 opacity-80">
              {groupedTables.booked.map(table => (
                <TableCard
                  key={table.id}
                  {...table}
                />
              ))}
            </div>
          </section>
        )}

      </div>

      <BottomNav />
    </div>
  );
};

export default Tables;
