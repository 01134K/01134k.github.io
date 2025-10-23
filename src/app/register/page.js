"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/lib/api";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const router = useRouter();
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ first_name, last_name, username, password });
      await Swal.fire({
        title: "Register Successful",
        text: "Account created successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#06b6d4",
      });
      router.push("/");
    } catch (error) {
      await Swal.fire({
        title: "Register Failed",
        text: error.response?.data?.message || "Something went wrong.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleLogin = () => router.push("/");

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[360px] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-cyan-600 text-center">Register</h1>

        <input
          type="text"
          value={first_name}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="text"
          value={last_name}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-cyan-400"
        />

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-lg bg-cyan-500 text-white font-medium 
                     hover:bg-cyan-600 transition-colors shadow-md"
        >
          Register
        </button>

        <button
          onClick={handleLogin}
          className="w-full py-2 rounded-lg border border-cyan-500 text-cyan-600 
                     font-medium hover:bg-cyan-50 transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
