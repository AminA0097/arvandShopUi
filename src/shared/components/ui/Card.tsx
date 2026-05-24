import { ReactNode } from "react";
import clsx from "clsx";

interface CardProps {
    children: ReactNode;
    className?: string;
    hover?: boolean;
    padding?: "none" | "sm" | "md" | "lg";
    glass?: boolean;
}

export default function Card({
                                 children,
                                 className,
                                 hover = false,
                                 padding = "md",
                                 glass = false,
                             }: CardProps) {
    const paddingStyles = {
        none: "p-0",
        sm: "p-3",
        md: "p-4",
        lg: "p-6",
    };

    return (
        <div
            className={clsx(
                "rounded-xl border transition-all duration-200",
                glass
                    ? "bg-surface/40 backdrop-blur-md border-border"
                    : "bg-surface border-border",
                paddingStyles[padding],
                hover && "hover:-translate-y-1 hover:shadow-hover hover:border-primary/20",
                className
            )}
        >
            {children}
        </div>
    );
}