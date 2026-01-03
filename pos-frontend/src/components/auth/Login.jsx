import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useSnackbar } from "notistack";
import { login } from "../../https";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      const { _id, name, email, role } = res.data.data;
      dispatch(setUser({ _id, name, email, role }));
      enqueueSnackbar("Login successful", { variant: "success" });
      navigate("/");
    },
    onError: (error) => {
      enqueueSnackbar(
        error?.response?.data?.message || "Invalid credentials",
        { variant: "error" }
      );
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate(formData);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* EMAIL */}
        <label className="block text-[#b5b5b5] mb-2 text-sm font-medium">
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
            className="bg-transparent flex-1 text-white placeholder-[#666]
                       focus:outline-none"
            required
          />
        </div>

        {/* PASSWORD */}
        <label className="block text-[#b5b5b5] mb-2 text-sm font-medium">
          Employee Password
        </label>
        <div className="flex items-center rounded-lg px-4 py-3 bg-[#1f1f1f] mb-6
                        focus-within:ring-2 focus-within:ring-[#f6b100]">
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            className="bg-transparent flex-1 text-white placeholder-[#666]
                       focus:outline-none"
            required
          />
        </div>

        {/* LOGIN BUTTON */}
        <button
          type="submit"
          disabled={loginMutation.isLoading}
          className={`w-full py-3 rounded-lg font-semibold transition
            ${
              loginMutation.isLoading
                ? "bg-[#2f2f2f] text-[#777] cursor-not-allowed"
                : "bg-[#f6b100] text-black hover:bg-[#ffcc33] active:scale-[0.99]"
            }`}
        >
          {loginMutation.isLoading ? "Logging in…" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
