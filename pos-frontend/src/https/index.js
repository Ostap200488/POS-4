import axios from "axios";

/* ============================
   AXIOS INSTANCE
============================ */
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    error.normalizedMessage =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    return Promise.reject(error);
  }
);

/* ============================
   AUTH APIS
============================ */
export const login = (data) => api.post("/api/user/login", data);
export const register = (data) => api.post("/api/user/register", data);
export const logout = () => api.post("/api/user/logout");

/**
 * GET CURRENT USER
 * 401 = NOT LOGGED IN (NORMAL)
 */
export const getUserData = async () => {
  try {
    return await api.get("/api/user");
  } catch (error) {
    if (error.response?.status === 401) {
      // ✅ Not logged in is NORMAL
      return null;
    }
    throw error;
  }
};

/* ============================
   TABLE APIS
============================ */
export const lockTable = (data) =>
  api.post("/api/table/lock", data);

export const unlockTable = (data) =>
  api.post("/api/table/unlock", data);

export const updateTable = (tableId, data) =>
  api.put(`/api/table/${tableId}`, data);

/* ============================
   PAYMENT API (CAD – STRIPE)
============================ */
export const createPaymentIntent = (data) =>
  api.post("/api/payment/create-payment-intent", data);

/* ============================
   ORDER API
============================ */
export const addOrder = (data) =>
  api.post("/api/order", data);

export default api;
