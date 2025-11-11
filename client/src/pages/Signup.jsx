import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";

export default function Signup() {
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [err,setErr] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    setErr(null); setLoading(true);
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      if (res.data?.token) {
        login(res.data.token);
        nav("/", { replace: true });
      } else {
        nav("/login");
      }
    } catch (error) {
      setErr(error?.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container-custom px-4 py-8 center-viewport flex items-center justify-center">
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl p-8 shadow">
          <h2 className="text-2xl font-semibold text-center mb-4">Create account</h2>
          {err && <div className="text-red-500 mb-3">{err}</div>}
          <form onSubmit={submit} className="space-y-4">
            <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name" required className="w-full p-3 border rounded" />
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" required placeholder="Email" className="w-full p-3 border rounded" />
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" required placeholder="Password" className="w-full p-3 border rounded" />
            <button disabled={loading} className="w-full p-3 rounded bg-cyan-400">{loading ? "Creating..." : "Signup"}</button>
          </form>
          <p className="text-center mt-4 text-sm">Already registered? <a href="/login" className="text-cyan-400">Login</a></p>
        </div>
      </div>
    </div>
  );
}
