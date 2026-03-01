"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormStatus = "idle" | "loading" | "success" | "error";

interface WaitlistFormProps {
  product: "spark" | "swarm" | "general";
  placeholder?: string;
  buttonText?: string;
  className?: string;
}

export function WaitlistForm({
  product,
  placeholder = "your@email.com",
  buttonText = "Join Waitlist",
  className = "",
}: WaitlistFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, product }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to join waitlist");
      }

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  if (status === "success") {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="flex items-center gap-2 text-sm text-perkos-peach">
          <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          <span>You&apos;re on the list! We&apos;ll be in touch.</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-2 ${className}`}>
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="h-10 bg-white/5 border-white/10 text-sm flex-1 min-w-0"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-10 bg-perkos-gradient hover:opacity-90 text-sm font-medium whitespace-nowrap shrink-0"
      >
        {status === "loading" ? (
          <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          buttonText
        )}
      </Button>
      {status === "error" && (
        <p className="text-xs text-red-400 sm:col-span-2">{errorMessage}</p>
      )}
    </form>
  );
}
