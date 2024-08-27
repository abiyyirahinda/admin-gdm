"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter()
  const handleSubmit = async () => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (data.success) {
            router.push('/dashboard')
        } else {
            console.log('Login failed');
        }
    } catch (error) {
        console.log('Catch error:', error);
    }
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center justify-center w-full">
        <img
          src="https://garam2musim.com/wp-content/uploads/2022/06/Picture1.png"
          alt="Logo"
          width={150}
          height={150}
          className="mb-8"></img>
        <div className="w-full max-w-xs p-8 rounded-lg">

          <div className="mb-6">
            <label htmlFor="email" className="block mb-2 text-sm font-medium">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-black border border-gray-300 focus:outline-none text-sm rounded-lg block w-full p-2.5"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Admin Password
            </label>
            <input
              type="password"
              placeholder="Enter given password"
              id="password"
              className="bg-black focus:outline-none  border border-gray-300 text-sm rounded-lg block w-full p-2.5"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full text-black bg-white hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
