"use client";

import { useState } from "react";

const API_URL = "https://ai-interviewer-2-rfp6.onrender.com";

export default function Home() {
  const [mode, setMode] = useState<"login" | "register">("register");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const endpoint =
        mode === "register"
          ? "/api/auth/register"
          : "/api/auth/login";

      const body =
        mode === "register"
          ? { name, email, password }
          : { email, password };

      const response = await fetch(`${API_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      if (mode === "login" && data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user_id", data.user_id);
      }

      setMessage(
        mode === "register"
          ? "Registration successful! You can now login."
          : "Login successful!"
      );

      if (mode === "register") {
        setMode("login");
        setPassword("");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6">

        <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl md:grid-cols-2">

          {/* Left side */}
          <div className="hidden bg-blue-600 p-12 md:block">

            <div className="flex h-full flex-col justify-center">

              <div className="mb-6 text-5xl">
                🤖
              </div>

              <h1 className="text-4xl font-bold">
                AI Interviewer
              </h1>

              <p className="mt-5 text-lg leading-8 text-blue-100">
                Practice realistic interviews with an AI interviewer
                based on your resume and target job description.
              </p>

              <div className="mt-10 space-y-4 text-blue-50">
                <div>✓ Resume analysis</div>
                <div>✓ Job description matching</div>
                <div>✓ Technical interview</div>
                <div>✓ Coding round</div>
                <div>✓ Performance report</div>
              </div>

            </div>

          </div>

          {/* Right side */}
          <div className="p-8 md:p-12">

            <h2 className="text-3xl font-bold">
              {mode === "register" ? "Create account" : "Welcome back"}
            </h2>

            <p className="mt-2 text-slate-400">
              {mode === "register"
                ? "Create your AI Interviewer account."
                : "Login to continue your interview practice."}
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-5"
            >

              {mode === "register" && (
                <div>
                  <label className="mb-2 block text-sm">
                    Full name
                  </label>

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    required
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="mb-2 block text-sm">
                  Email
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">
                  Password
                </label>

                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {message && (
                <div className="rounded-xl border border-slate-700 bg-slate-950 p-4 text-sm">
                  {message}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-blue-600 py-3 font-semibold hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Please wait..."
                  : mode === "register"
                    ? "Create Account"
                    : "Login"}
              </button>

            </form>

            <div className="mt-6 text-center text-sm text-slate-400">

              {mode === "register"
                ? "Already have an account?"
                : "Don't have an account?"}

              <button
                type="button"
                onClick={() =>
                  setMode(
                    mode === "register"
                      ? "login"
                      : "register"
                  )
                }
                className="ml-2 font-semibold text-blue-400 hover:text-blue-300"
              >
                {mode === "register"
                  ? "Login"
                  : "Create account"}
              </button>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}