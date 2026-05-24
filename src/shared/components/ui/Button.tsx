import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

export default function Button({
                                   children,
                                   loading,
                                   className,
                                   ...props
                               }: Props) {
    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={clsx("btn-primary", className)}
        >
            {loading ? "در حال ورود..." : children}
        </button>
    );
}
