import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { register } from "../../https";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Register = ({ setIsRegister }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSelection = (role) => {
    setFormData({ ...formData, role });
  };

  const registerMutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      enqueueSnackbar("Employee registered successfully", {
        variant: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
      });

      setTimeout(() => setIsRegister(false), 1200);
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Registration failed",
        { variant: "error" }
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.role) {
      enqueueSnackbar("Please select a role", { variant: "warning" });
      return;
    }

    registerMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* NAME */}
      <label className="block text-sm text-[#b5b5b5] mb-2">
        Employee Name
      </label>
      <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f] mb-4
                      focus-within:ring-2 focus-within:ring-[#f6b100]">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="John Doe"
          className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
          required
        />
      </div>

      {/* EMAIL */}
      <label className="block text-sm text-[#b5b5b5] mb-2">
        Employee Email
      </label>
      <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f] mb-4
                      focus-within:ring-2 focus-within:ring-[#f6b100]">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="employee@company.com"
          className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
          required
        />
      </div>

      {/* PHONE */}
      <label className="block text-sm text-[#b5b5b5] mb-2">
        Phone Number
      </label>
      <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f] mb-4
                      focus-within:ring-2 focus-within:ring-[#f6b100]">
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(709) 555-1234"
          className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
          required
        />
      </div>

      {/* PASSWORD */}
      <label className="block text-sm text-[#b5b5b5] mb-2">
        Password
      </label>
      <div className="relative mb-4">
        <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f]
                        focus-within:ring-2 focus-within:ring-[#f6b100]">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-transparent flex-1 text-white placeholder-[#666] focus:outline-none"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-[#aaa] hover:text-white"
            tabIndex={-1}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <p className="text-[11px] text-[#777] mt-1">
          Minimum 6 characters recommended
        </p>
      </div>

      {/* ROLE */}
      <label className="block text-sm text-[#b5b5b5] mb-2">
        Employee Role
      </label>
      <div className="flex gap-3 mb-6">
        {["Waiter", "Cashier", "Admin"].map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => handleRoleSelection(role)}
            className={`w-full py-3 rounded-lg font-medium transition
              ${
                formData.role === role
                  ? "bg-[#f6b100] text-black"
                  : "bg-[#1f1f1f] text-[#ababab] hover:bg-[#2a2a2a]"
              }`}
          >
            {role}
          </button>
        ))}
      </div>

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={registerMutation.isLoading}
        className={`w-full py-3 rounded-lg font-semibold transition
          ${
            registerMutation.isLoading
              ? "bg-[#2f2f2f] text-[#777] cursor-not-allowed"
              : "bg-[#f6b100] text-black hover:bg-[#ffcc33]"
          }`}
      >
        {registerMutation.isLoading ? "Creating account…" : "Create Employee"}
      </button>
    </form>
  );
};

export default Register;
