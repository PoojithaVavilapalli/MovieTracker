import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("https://movietracker-4.onrender.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: name, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <form onSubmit={handleSignup} className="bg-gray-800 p-6 rounded-lg w-96">
        <h2 className="text-2xl text-white font-bold mb-4">Sign Up</h2>
        <input type="text" placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"/>
        <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"/>
        <input type="password" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} className="w-full mb-3 px-3 py-2 rounded bg-gray-700 text-white"/>
        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">Sign Up</button>
        <p onClick={()=>navigate("/login")} className="text-sm text-gray-400 mt-3 cursor-pointer hover:underline">Already have an account? Login</p>
      </form>
    </div>
  );
}
