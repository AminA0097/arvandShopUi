// app/not-found.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
    Home,
    ShoppingBag,
    ArrowRight,
    Compass,
    Search,
    AlertCircle,
} from "lucide-react";

export default function NotFound() {
    const router = useRouter();
    const [countdown, setCountdown] = useState(20);

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push("/");
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 flex items-center justify-center px-4 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-20 left-10 w-72 h-72 bg-amber-400 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-stone-400 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-2xl w-full">
                {/* Animated 404 Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring", stiffness: 200 }}
                    className="text-center mb-8"
                >
                    <div className="relative inline-block">
                        <motion.div
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, -5, 5, 0],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                repeatDelay: 3,
                            }}
                            className="text-8xl md:text-9xl
                            font-black text-transparent bg-clip-text
                            bg-gradient-to-r from-stone-400 via-amber-500 to-stone-400
                            font-tanha-fd">
                            404
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="absolute -top-4 -right-8 md:-top-6 md:-right-12"
                        >
                            <div className="relative">
                                <AlertCircle className="w-8 h-8 md:w-10 md:h-10 text-amber-500" />
                                <motion.div
                                    animate={{ scale: [1, 1.3, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                    className="absolute inset-0 rounded-full bg-amber-400/30 blur-md"
                                />
                            </div>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Main Content */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="text-center"
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4, type: "spring" }}
                        className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-100 to-stone-100 flex items-center justify-center shadow-lg"
                    >
                        <Compass className="w-12 h-12 text-amber-600" />
                    </motion.div>

                    {/* Title */}
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-stone-800 mb-3 font-shabnam">
                        صفحه‌ای که دنبالش بودی پیدا نشد!
                    </h1>

                    {/* Countdown Redirect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-8 pt-6 border-t border-stone-100"
                    >
                        <div className="flex items-center justify-center gap-2 text-sm text-stone-400">
                            <span className="font-shabnam">انتقال به صفحه اصلی در</span>
                            <div className="relative">
                                <span className="font-tanha-fd font-bold text-amber-600 text-lg">{countdown}</span>
                                <motion.div
                                    key={countdown}
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    className=" absolute -inset-1 bg-amber-400/20 rounded-full -z-10"
                                />
                            </div>
                            <span className="font-shabnam">ثانیه</span>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: countdown, repeat: Infinity, ease: "linear" }}
                            >
                                <ArrowRight size={14} className="text-amber-400" />
                            </motion.div>
                        </div>

                        {/* Progress Bar */}
                        <div className="max-w-xs mx-auto mt-3 h-1 bg-stone-100 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: "100%" }}
                                animate={{ width: "0%" }}
                                transition={{ duration: countdown, ease: "linear" }}
                                className="h-full bg-gradient-to-r from-amber-500 to-stone-600 rounded-full"
                            />
                        </div>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        x: [0, 10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute top-20 left-5 opacity-30 hidden lg:block"
                >
                    <div className="w-16 h-16 border-4 border-amber-200 rounded-full" />
                </motion.div>

                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        x: [0, -10, 0],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                    className="absolute bottom-20 right-5 opacity-30 hidden lg:block"
                >
                    <div className="w-24 h-24 border-4 border-stone-200 rounded-full" />
                </motion.div>
            </div>
        </div>
    );
}