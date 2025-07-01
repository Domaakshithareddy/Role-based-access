import api from "./api";

export const register=(payload)=>api.post("/auth/register",payload);
export const login = async (payload) => {
  try {
    return await api.post("/auth/login", payload);
  } catch (err) {
    console.log("Axios error:", err);
    console.log("err.response:", err?.response);
    console.log("err.response.data:", err?.response?.data);
    console.log("err.response.status:", err?.response?.status);
    console.error("Login API error:", err?.response?.data || err.message);
    throw err;
  }
};

export const verifyToken=()=>api.get("/auth/verify").then((res)=>res.data);
export const logout=()=>api.post("/auth/logout");