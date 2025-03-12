import React, { useState } from "react";
import { signInWithGoogle, signInWithEmail } from "../utils/auth";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    const user = await signInWithGoogle();
    if (user) {
      console.log("Logged in:", user);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const user = await signInWithEmail(email, password);
    if (user) {
      console.log("Logged in:", user);
    }
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      <form className="flex flex-col gap-3 w-64" onSubmit={handleEmailLogin}>
        <input className="border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button className="bg-blue-500 text-white p-2 rounded" type="submit">Login</button>
      </form>
      <button className="bg-red-500 text-white p-2 rounded mt-2" onClick={handleGoogleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
