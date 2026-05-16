// features/home/components/mobile/mobileHomeHeader.tsx

export default function MobileHomeHeader() {
    return (
        <header
            className="
                fixed
                inset-x-0
                top-0
                z-50
                border-b
                border-[var(--border)]
                bg-[var(--bg)]/90
                backdrop-blur-xl
            "
        >
            <div className="flex h-16 items-center justify-center">
                <h1 className="font-shabnam text-xl text-[var(--text)]">
                    چرم آروند
                </h1>
            </div>
        </header>
    );
}