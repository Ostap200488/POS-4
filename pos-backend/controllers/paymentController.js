const Stripe = require("stripe");
const Payment = require("../models/paymentModel");

const createPaymentIntent = async (req, res) => {
  try {
    // ✅ Ensure Stripe key exists
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({
        success: false,
        message: "Stripe secret key missing",
      });
    }

    // ✅ Init Stripe
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    // ✅ Validate amount
    const amount = Number(req.body.amount);
    if (!amount || isNaN(amount) || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    // ✅ Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100), // cents
      currency: "cad",
      automatic_payment_methods: { enabled: true },
    });

    // ✅ Save payment to DB
    const newPayment = new Payment({
      paymentId: paymentIntent.id,
      amount: paymentIntent.amount / 100,
      currency: paymentIntent.currency,
      status: paymentIntent.status,
      method: "card",
      createdAt: new Date(paymentIntent.created * 1000),
    });

    await newPayment.save();

    // ✅ Send response
    return res.status(200).json({
      success: true,
      clientSecret: paymentIntent.client_secret,
    });

  } catch (error) {
    console.error("🔥 STRIPE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Stripe payment failed",
    });
  }
};

module.exports = { createPaymentIntent };
