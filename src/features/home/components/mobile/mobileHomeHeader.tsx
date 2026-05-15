// features/home/components/mobile/mobile-home-header.tsx

export default function MobileHomeHeader() {
    return (
        <header className="sticky top-0 z-30 border-b
         border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur">
            <div className="flex h-16 items-center justify-center">
                <h1 className="font-shabnam text-xl text-[var(--text)]">
                    چرم آروند
                </h1>
            </div>
        </header>
    );
}