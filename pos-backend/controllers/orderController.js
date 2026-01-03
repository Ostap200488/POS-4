const Order = require("../models/orderModel");

/* ======================
   CREATE ORDER
====================== */
const addOrder = async (req, res) => {
  try {
    const tableNo = String(req.body.tableNo || "").trim();
    const paymentMethod = req.body.paymentMethod;

    const rawItems = Array.isArray(req.body.items) ? req.body.items : [];
    const rawBills = req.body.bills || {};

    // ✅ SAFE validation
    if (!tableNo) {
      return res.status(400).json({
        success: false,
        message: "Table number is required",
      });
    }

    if (!rawItems.length) {
      return res.status(400).json({
        success: false,
        message: "Order items are required",
      });
    }

    if (!["Card", "Cash"].includes(paymentMethod)) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment method",
      });
    }

    // ✅ Normalize items (NO NaN)
    const items = rawItems.map((i) => ({
      name: String(i.name || ""),
      price: Number.isFinite(Number(i.price)) ? Number(i.price) : 0,
      quantity: Number.isFinite(Number(i.quantity)) ? Number(i.quantity) : 1,
    }));

    // ✅ Normalize bills (0 is allowed)
    const bills = {
      subtotal: Number.isFinite(Number(rawBills.subtotal))
        ? Number(rawBills.subtotal)
        : 0,
      tax: Number.isFinite(Number(rawBills.tax))
        ? Number(rawBills.tax)
        : 0,
      total: Number.isFinite(Number(rawBills.total))
        ? Number(rawBills.total)
        : 0,
    };

    const order = await Order.create({
      tableNo,
      customer: req.body.customer || {},
      items,
      bills,
      paymentMethod,
      createdBy: req.user?._id || null,
    });

    return res.status(201).json({
      success: true,
      data: order,
    });
  } catch (err) {
    console.error("❌ ADD ORDER ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create order",
    });
  }
};

/* ======================
   GET ALL ORDERS
====================== */
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("createdBy", "name role")
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      data: orders,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
    });
  }
};

/* ======================
   MARK ORDER AS PAID
====================== */
const markOrderPaid = async (req, res) => {
  try {
    if (!["admin", "cashier"].includes(req.user?.role)) {
      return res.status(403).json({
        success: false,
        message: "Not allowed",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status: "Paid" },
      { new: true }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.json({
      success: true,
      data: order,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update order",
    });
  }
};

module.exports = {
  addOrder,
  getOrders,
  markOrderPaid,
};
