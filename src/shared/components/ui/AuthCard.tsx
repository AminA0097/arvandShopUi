import { ReactNode } from "react";

type Props = {
    title: string;
    subtitle?: string;
    children: ReactNode;
};

export default function AuthCard({ title, subtitle, children }: Props) {
    return (
        <div className="glass-card w-full max-w-md p-8 md:p-9">
            <div className="mb-8 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[0_0_30px_rgba(240,195,190,.12)]">
                    <div className="h-8 w-8 rounded-xl bg-[linear-gradient(135deg,#F0C3BE_0%,#F1AA9B_100%)]" />
                </div>

                <h1 className="text-3xl font-extrabold tracking-tight text-white
                font-shabnam">
                    {title}
                </h1>

                {subtitle && (
                    <p className="mt-2 text-sm text-[var(--color-text-secondary)]">
                        {subtitle}
                    </p>
                )}
            </div>

            {children}
        </div>
    );
}