"use client";

import { forwardRef, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, icon, type = "text", className, id, ...props }, ref) => {
        const [showPassword, setShowPassword] = useState(false);
        const isPassword = type === "password";

        const inputId = id || `input-${label.replace(/\s/g, "-").toLowerCase()}`;

        return (
            <div className="w-full">
                <label
                    htmlFor={inputId}
                    className="block text-sm font-medium text-text-secondary mb-1.5"
                >
                    {label}
                </label>

                <div className="relative">
                    {icon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-light">
                            {icon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        id={inputId}
                        type={isPassword ? (showPassword ? "text" : "password") : type}
                        className={clsx(
                            "w-full rounded-lg border bg-surface-muted px-4 py-2.5 text-text",
                            "placeholder:text-text-light placeholder:text-sm",
                            "transition-all duration-200",
                            "focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20",
                            "disabled:opacity-50 disabled:cursor-not-allowed",
                            icon ? "pl-10" : "pl-4",
                            isPassword && "pr-10",
                            error && "border-danger focus:border-danger focus:ring-danger/20",
                            className
                        )}
                        {...props}
                    />

                    {isPassword && (
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-light hover:text-text transition-colors"
                        >
                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                    )}
                </div>

                {error && (
                    <p className="mt-1.5 text-xs text-danger">{error}</p>
                )}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;