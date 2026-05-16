// features/home/components/mobile/mobileHome.tsx

import MobileMostViewed from "./mobileMostViewed";
import MobileInfoSection from "./mobileInfoSection";
import MobileNewsSection from "./mobileNewsSection";
import MobileHero from "./mobileHero";

export default function MobileHome() {
    return (
        <div className="min-h-screen bg-[var(--bg)]">
            <div className="space-y-8 px-4 py-6">
                <MobileHero />

                <MobileNewsSection />

                <MobileMostViewed />

                <MobileInfoSection />
            </div>
        </div>
    );
}