import clsx from "clsx";

interface SkeletonProps {
    className?: string;
    variant?: "text" | "circle" | "rectangular";
}

export default function Skeleton({ className, variant = "rectangular" }: SkeletonProps) {
    const variants = {
        text: "rounded-md",
        circle: "rounded-full",
        rectangular: "rounded-lg",
    };

    return (
        <div
            className={clsx(
                "bg-surface-muted/50 animate-pulse",
                variants[variant],
                className
            )}
        />
    );
}