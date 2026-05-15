// app/product/layout.tsx
"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface ProductLayoutProps {
    children: ReactNode;
}

export default function ProductLayout({ children }: ProductLayoutProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="min-h-screen bg-gradient-to-b from-stone-50 to-white"
        >
            {children}
        </motion.div>
    );
}