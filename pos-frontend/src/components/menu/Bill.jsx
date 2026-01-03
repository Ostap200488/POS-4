import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { enqueueSnackbar } from "notistack";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useMutation } from "@tanstack/react-query";

import {
  createPaymentIntent,
  unlockTable,
  addOrder, // ✅ use API helper
} from "../../https";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

/* ======================
   STRIPE CHECKOUT FORM
====================== */
const CheckoutForm = ({ total, onSuccess, disabled }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePay = async () => {
    if (!stripe || !elements || disabled) return;

    setLoading(true);

    const result = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });

    if (result.error) {
      enqueueSnackbar(result.error.message, { variant: "error" });
      setLoading(false);
      return;
    }

    enqueueSnackbar("Payment successful", { variant: "success" });
    setLoading(false);
    onSuccess();
  };

  return (
    <div className="mt-5">
      <PaymentElement />
      <button
        onClick={handlePay}
        disabled={loading || disabled}
        className={`w-full mt-4 py-4 rounded-xl font-semibold transition
          ${
            loading || disabled
              ? "bg-[#3a3a3a] text-[#888] cursor-not-allowed"
              : "bg-[#f6b100] text-black hover:bg-[#ffcc33]"
          }`}
      >
        {loading ? "Processing payment…" : `Pay CAD $${total.toFixed(2)}`}
      </button>
    </div>
  );
};

/* ======================
   BILL COMPONENT
====================== */
const Bill = () => {
  const cart = useSelector((s) => s.cart);
  const customer = useSelector((s) => s.customer);

  const subtotal = useMemo(
    () => cart.reduce((a, i) => a + i.price * i.quantity, 0),
    [cart]
  );
  const tax = useMemo(() => subtotal * 0.05, [subtotal]);
  const total = useMemo(() => subtotal + tax, [subtotal, tax]);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);

  /* ======================
     CREATE ORDER MUTATION
  ====================== */
  const orderMutation = useMutation({
    mutationFn: (method) =>
      addOrder({
        tableNo: customer.tableNo,
        customer: {
          name: customer.customerName,
          phone: customer.customerPhone,
          guests: customer.guests,
        },
        items: cart.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        bills: { subtotal, tax, total },
        paymentMethod: method, // "Cash" | "Card"
      }),

    onSuccess: async () => {
      await unlockTable({ tableNo: customer.tableNo });

      enqueueSnackbar("Order completed", { variant: "success" });
      setClientSecret(null);
      setPaymentMethod(null);
    },

    onError: (err) => {
      enqueueSnackbar(
        err?.response?.data?.message || "Failed to place order",
        { variant: "error" }
      );
    },
  });

  /* ======================
     STRIPE START
  ====================== */
  const startStripePayment = async () => {
    try {
      const { data } = await createPaymentIntent({ amount: total });
      setClientSecret(data.clientSecret);
    } catch {
      enqueueSnackbar("Failed to start payment", { variant: "error" });
    }
  };

  const handleCashPayment = () => {
    if (orderMutation.isLoading) return;
    setPaymentMethod("Cash");
    orderMutation.mutate("Cash");
  };

  return (
    <div className="bg-[#262626] rounded-2xl p-5">
      <h2 className="text-white text-xl font-bold mb-4">Bill Summary</h2>

      <div className="text-sm space-y-2">
        <div className="flex justify-between text-[#ababab]">
          <span>Subtotal</span>
          <span>CAD ${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-[#ababab]">
          <span>Tax (5%)</span>
          <span>CAD ${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-white font-semibold border-t border-[#3a3a3a] pt-3 mt-3">
          <span>Total</span>
          <span>CAD ${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <button
          onClick={() => setPaymentMethod("Card")}
          className={`py-3 rounded-xl font-medium transition
            ${
              paymentMethod === "Card"
                ? "bg-[#025cca] text-white"
                : "bg-[#1f1f1f] text-[#ababab] hover:bg-[#2a2a2a]"
            }`}
        >
          💳 Card
        </button>

        <button
          onClick={handleCashPayment}
          className={`py-3 rounded-xl font-medium transition
            ${
              paymentMethod === "Cash"
                ? "bg-[#025cca] text-white"
                : "bg-[#1f1f1f] text-[#ababab] hover:bg-[#2a2a2a]"
            }`}
        >
          💵 Cash
        </button>
      </div>

      {paymentMethod === "Card" && !clientSecret && (
        <button
          onClick={startStripePayment}
          className="mt-6 w-full py-4 rounded-xl font-semibold
                     bg-[#f6b100] text-black hover:bg-[#ffcc33] transition"
        >
          Continue to Payment
        </button>
      )}

      {clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm
            total={total}
            disabled={orderMutation.isLoading}
            onSuccess={() => orderMutation.mutate("Card")}
          />
        </Elements>
      )}
    </div>
  );
};

export default Bill;
