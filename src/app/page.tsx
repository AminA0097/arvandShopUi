// app/page.tsx

import MobileHome from "@/features/home/components/mobile/mobileHome";
// import DesktopHome from "@/features/home/components/desktop/desktop-home";

export default function HomePage() {
    return (
        <>
            {/* mobile */}
            <div className="lg:hidden">
                <MobileHome />
            </div>

            {/*/!* desktop *!/*/}
            {/*<div className="hidden lg:block">*/}
            {/*    <DesktopHome />*/}
            {/*</div>*/}
        </>
    );
}