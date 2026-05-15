// components/products/ProductSkeleton.tsx
'use client';

export default function ProductGridSkeleton() {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center">
                <div className="w-32 h-4 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                <div className="w-20 h-4 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="p-4 space-y-4" style={{ background: 'var(--surface)', borderRadius: 'var(--radius)' }}>
                        <div className="w-full h-32 rounded-lg animate-pulse" style={{ background: 'var(--surface-2)' }} />
                        <div className="w-3/4 h-4 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                        <div className="w-1/2 h-3 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                        <div className="w-1/3 h-5 rounded animate-pulse" style={{ background: 'var(--surface-2)' }} />
                        <div className="flex gap-2">
                            <div className="w-12 h-4 rounded-full animate-pulse" style={{ background: 'var(--surface-2)' }} />
                            <div className="w-16 h-4 rounded-full animate-pulse" style={{ background: 'var(--surface-2)' }} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}