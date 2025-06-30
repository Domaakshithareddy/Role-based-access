"use client";
import { useState, useContext } from "react";
import { login, register } from "../lib/auth";
import { AuthContext } from "../context/AuthContext";

export default function AuthForm() {
  const { syncUser } = useContext(AuthContext);   //  ✅ only what we need
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const storeToken = (token, remember) => {
    if (remember) localStorage.setItem("token", token);
    else sessionStorage.setItem("token", token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      let data;
      if (isLogin) {
        data = (await login(form)).data;
      } else {
        await register(form);
        data = (await login(form)).data;  // auto-login
      }
      storeToken(data.token, form.remember);
      await syncUser();                   // ✅ now defined
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong");
      console.error("Auth error:", err?.response?.data || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm w-full p-6 bg-white shadow rounded-xl space-y-4"
    >
      <h2 className="text-2xl font-semibold text-center">
        {isLogin ? "Login" : "Register"}
      </h2>

      {!isLogin && (
        <input
          className="input w-full border p-2 rounded"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      )}

      <input
        className="input w-full border p-2 rounded"
        placeholder="Email"
        type="email"
        name="email"
        value={form.email}
        onChange={handleChange}
        required
      />

      <input
        className="input w-full border p-2 rounded"
        type="password"
        placeholder="Password"
        name="password"
        value={form.password}
        onChange={handleChange}
        required
      />

      {isLogin && (
        <label className="flex items-center space-x-2 text-sm">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />
          <span>Remember me</span>
        </label>
      )}

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
      >
        {isLogin ? "Login" : "Register"}
      </button>

      <p className="text-center text-sm">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 underline"
        >
          {isLogin ? "Register" : "Login"}
        </button>
      </p>
    </form>
  );
}
