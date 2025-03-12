import React, { useState } from "react";
import { registerWithEmail } from "../utils/auth";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = await registerWithEmail(email, password);
    if (user) {
      console.log("Registered:", user);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form className="flex flex-col gap-3 w-64" onSubmit={handleRegister}>
        <input className="border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-green-500 text-white p-2 rounded" type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;
