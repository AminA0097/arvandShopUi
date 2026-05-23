import { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
    `
    inline-flex
    items-center
    justify-center
    rounded-full
    font-medium
    transition-all
    duration-200
    whitespace-nowrap
  `,
    {
        variants: {
            variant: {
                primary: "bg-[#9a8174] text-white",

                notification: "bg-[#ef4444] text-white shadow-sm",

                secondary: "bg-[#f3f0ed] text-[#1f1f1f] border border-black/5",

                outline: "border border-[#9a8174]/30 bg-white text-[#9a8174]",

                success: "bg-emerald-100 text-emerald-700",

                danger: "bg-red-100 text-red-700",

                warning: "bg-amber-100 text-amber-700",

                dark: "bg-[#1f1f1f] text-white",
            },

            size: {
                sm: "h-5 px-2 text-[10px]",
                md: "h-6 px-2.5 text-xs",
                lg: "h-8 px-3 text-sm",
            },

            dot: {
                true: "gap-1.5",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);

type BadgeProps =
    React.HTMLAttributes<HTMLDivElement> &
    VariantProps<typeof badgeVariants> & {
    children?: ReactNode;
    dotColor?: string;
};

export default function Badge({
                                  className,
                                  variant,
                                  size,
                                  dot,
                                  dotColor,
                                  children,
                                  ...props
                              }: BadgeProps) {
    return (
        <div
            className={cn(
                badgeVariants({
                    variant,
                    size,
                    dot,
                }),
                className
            )}
            {...props}
        >
            {dot && (
                <span
                    className="h-2 w-2 rounded-full"
                    style={{
                        backgroundColor:
                            dotColor || "#22c55e",
                    }}
                />
            )}

            {children}
        </div>
    );
}