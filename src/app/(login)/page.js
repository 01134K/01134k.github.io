"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser,verifyToken } from "@/lib/api";
import Swal from "sweetalert2";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username, password });
      localStorage.setItem("token", data.access_token);
      const result = await verifyToken(data.access_token);

      if (result && result.user_id) {
        // 4. เก็บ user info
        localStorage.setItem("userId", result.user_id);
        localStorage.setItem("username", result.username);
      } else {
        throw new Error("Invalid token response");
      }
      await Swal.fire({
        title: "Login Successful",
        text: "Welcome back!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#06b6d4",
      });
      router.push("/home");
    } catch (error) {
      await Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleRegister = () => router.push("/register");

  return (
    <div className="flex items-center justify-center min-h-screen bg-cyan-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-[360px] flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-cyan-600 text-center">Login</h1>

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
          onClick={handleLogin}
          className="w-full py-2 rounded-lg bg-cyan-500 text-white font-medium 
                     hover:bg-cyan-600 transition-colors shadow-md"
        >
          Login
        </button>

        <button
          onClick={handleRegister}
          className="w-full py-2 rounded-lg border border-cyan-500 text-cyan-600 
                     font-medium hover:bg-cyan-50 transition-colors"
        >
          Register
        </button>
      </div>
    </div>
  );
}
