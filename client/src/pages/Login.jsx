import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axiosInstance";

export default function Login(){
  const { login } = useContext(AuthContext);
  const nav = useNavigate();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit = async e => {
    e.preventDefault();
    try {
      // call backend auth route
      const res = await api.post('/users/login', { email, password });
      const token = res.data.token || res.data;
      login(token);
      toast.success("Logged in");
      nav('/');
    } catch (err) {
      console.error(err);
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form onSubmit={submit} className="max-w-md w-full bg-slate-800/60 p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4 text-cyan-300 text-center">Welcome back</h2>
        <input autoComplete="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
               className="w-full p-3 rounded mb-3 bg-slate-700 border border-slate-600" />
        <input autoComplete="current-password" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}
               className="w-full p-3 rounded mb-4 bg-slate-700 border border-slate-600" />
        <button className="w-full py-3 bg-cyan-400 text-slate-900 font-semibold rounded">Login</button>
      </form>
    </div>
  );
}
