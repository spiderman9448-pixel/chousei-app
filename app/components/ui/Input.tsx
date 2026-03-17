"use client";

import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({
  label,
  error,
  className = "",
  id,
  ...props
}: InputProps) {
  const inputId = id || label?.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={inputId} className="text-base font-semibold text-foreground">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`
          w-full px-4 py-3.5 rounded-xl border border-border bg-white
          text-lg text-foreground placeholder:text-secondary/60
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
          transition-shadow duration-200
          ${error ? "border-danger ring-1 ring-danger" : ""}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-base text-danger">{error}</p>}
    </div>
  );
}
