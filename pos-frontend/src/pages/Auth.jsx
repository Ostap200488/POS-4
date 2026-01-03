import React, { useState } from "react";
import logo from "../assets/logo.png";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div className="flex min-h-screen w-full bg-[#121212]">

      {/* LEFT PANEL (Hidden on small screens) */}
      <div className="hidden lg:flex w-1/2 relative items-center justify-center bg-black">
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Quote */}
        <blockquote className="relative z-10 px-12 max-w-xl text-2xl text-white leading-relaxed">
          “Serve the customers the best food with prompt and friendly service
          in a welcoming atmosphere, and they’ll keep coming back.”
          <span className="block mt-6 text-yellow-400 text-lg font-semibold">
            — Ostap Demchuk
          </span>
        </blockquote>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex w-full lg:w-1/2 items-center justify-center px-6">
        <div
          className="
            w-full max-w-md
            bg-[#1a1a1a]
            rounded-2xl
            shadow-xl shadow-black/40
            p-8
          "
        >
          {/* BRAND */}
          <div className="flex flex-col items-center gap-2 mb-8">
            <img
              src={logo}
              alt="Restaurant Logo"
              className="h-14 w-14 rounded-full border border-[#333] p-1"
            />
            <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
              Five Guys
            </h1>
          </div>

          {/* TITLE */}
          <h2 className="text-3xl text-center font-semibold text-yellow-400 mb-8">
            {isRegister ? "Employee Registration" : "Employee Login"}
          </h2>

          {/* FORM */}
          {isRegister ? (
            <Register setIsRegister={setIsRegister} />
          ) : (
            <Login />
          )}

          {/* TOGGLE */}
          <div className="flex justify-center mt-6">
            <p className="text-sm text-[#ababab]">
              {isRegister
                ? "Already have an account?"
                : "Don’t have an account?"}
              <button
                type="button"
                onClick={() => setIsRegister((p) => !p)}
                className="ml-1 text-yellow-400 font-semibold hover:underline"
              >
                {isRegister ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
