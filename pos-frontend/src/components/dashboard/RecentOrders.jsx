import React, { useMemo, useState } from "react";
import { GrUpdate } from "react-icons/gr";

const STATUS_OPTIONS = ["All", "In Progress", "Completed", "Cancelled"];

const INITIAL_ORDERS = [
  { id: "#FG1024", customer: "John Doe", table: "T4", items: 3, total: "$42.60", status: "In Progress" },
  { id: "#FG1023", customer: "Sarah Lee", table: "T1", items: 2, total: "$26.20", status: "Completed" },
  { id: "#FG1022", customer: "Mike Ross", table: "Takeaway", items: 1, total: "$14.90", status: "Cancelled" },
  { id: "#FG1021", customer: "Anna Smith", table: "T7", items: 4, total: "$58.10", status: "Completed" },
];

const statusPillClasses = (status) => {
  if (status === "Completed") return "bg-green-500/20 text-green-400";
  if (status === "In Progress") return "bg-yellow-500/20 text-yellow-400";
  return "bg-red-500/20 text-red-400";
};

const RecentOrders = () => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  /* =========================
     FILTERED ORDERS
  ========================= */
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "All" || o.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  /* =========================
     METRICS
  ========================= */
  const metrics = useMemo(() => [
    { title: "Orders", value: orders.length },
    { title: "In Progress", value: orders.filter(o => o.status === "In Progress").length },
    { title: "Completed", value: orders.filter(o => o.status === "Completed").length },
    { title: "Cancelled", value: orders.filter(o => o.status === "Cancelled").length },
  ], [orders]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    setEditingOrderId(null);
  };

  const refreshOrders = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setOrders(INITIAL_ORDERS);
      setIsRefreshing(false);
    }, 600);
  };

  return (
    <div className="container mx-auto px-6 md:px-4 py-4">

      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#f5f5f5]">
            Recent Orders
          </h2>
          <p className="text-sm text-[#ababab]">
            Track and manage all active and completed orders
          </p>
        </div>

        <button
          onClick={refreshOrders}
          className="flex items-center gap-2 px-4 py-2 rounded-md
                     bg-[#1a1a1a] text-[#f5f5f5] hover:bg-[#262626] transition"
        >
          <GrUpdate className={isRefreshing ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {/* METRICS */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-[#1a1a1a] rounded-lg p-4">
            <p className="text-xs text-[#ababab]">{metric.title}</p>
            <h3 className="mt-2 text-xl font-bold text-[#f5f5f5]">
              {metric.value}
            </h3>
          </div>
        ))}
      </div>

      {/* CONTROLS */}
      <div className="mb-4 flex flex-wrap gap-3">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by order or customer..."
          className="bg-[#1a1a1a] text-white placeholder-[#666] px-4 py-2 rounded-md
                     outline-none focus:ring-2 focus:ring-[#f6b100]"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-[#1a1a1a] text-white px-3 py-2 rounded-md
                     outline-none focus:ring-2 focus:ring-[#f6b100]"
        >
          {STATUS_OPTIONS.map(opt => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* TABLE */}
      <div className="bg-[#1a1a1a] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-[#262626] text-[#ababab] sticky top-0">
            <tr>
              <th className="px-4 py-3 text-left">Order ID</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Table</th>
              <th className="px-4 py-3 text-left">Items</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.map(order => (
              <tr
                key={order.id}
                className="border-b border-[#262626] text-[#f5f5f5]
                           hover:bg-[#202020] transition"
              >
                <td className="px-4 py-3 font-medium">{order.id}</td>
                <td className="px-4 py-3">{order.customer}</td>
                <td className="px-4 py-3">{order.table}</td>
                <td className="px-4 py-3">{order.items}</td>
                <td className="px-4 py-3 font-semibold">{order.total}</td>

                <td className="px-4 py-3">
                  {editingOrderId === order.id ? (
                    <select
                      autoFocus
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      onBlur={() => setEditingOrderId(null)}
                      className="bg-[#262626] text-[#f5f5f5] text-xs rounded px-2 py-1"
                    >
                      {STATUS_OPTIONS.filter(s => s !== "All").map(opt => (
                        <option key={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <button
                      onClick={() => setEditingOrderId(order.id)}
                      className={`px-2 py-1 rounded text-xs font-semibold
                        ${statusPillClasses(order.status)}`}
                    >
                      {order.status}
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredOrders.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center py-6 text-[#777]">
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default RecentOrders;
