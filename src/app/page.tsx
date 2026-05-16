// app/page.tsx

import MobileHome from "@/features/home/components/mobile/mobileHome";
import DesktopHome from "@/features/home/components/desktop/desktopHome";

export default function HomePage() {
    return (
        <>
            {/* mobile */}
            <div className="lg:hidden">
                <MobileHome />
            </div>

            {/* desktop */}
            <div className="hidden lg:block">
                <DesktopHome />
            </div>
        </>
    );
}