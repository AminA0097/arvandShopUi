"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
    return (
        <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ top: 24 }}
            toastOptions={{
                duration: 4000,
                style: {
                    background: "#faf5f0", // --surface
                    color: "#1a1817",     // --text
                    borderRadius: "16px",
                    padding: "12px 24px",
                    fontFamily: "Tanha, sans-serif",
                    fontSize: "0.95rem",
                    border: "1px solid rgba(154, 129, 116, 0.12)", // --border
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.06)",   // --shadow-md
                },
                success: {
                    style: {
                        borderRight: "4px solid #9a8174", // --primary
                        background: "#fefcf9",           // --bg
                    },
                    iconTheme: {
                        primary: "#9a8174",              // --primary
                        secondary: "#fefcf9",
                    },
                },
                error: {
                    style: {
                        borderRight: "4px solid #7e685d", // --primary-dark (برای ارور کمی تیره تر)
                        background: "#faf5f0",           // --surface
                        color: "#4a3f3a",               // --text-secondary
                    },
                    iconTheme: {
                        primary: "#7e685d",
                        secondary: "#faf5f0",
                    },
                },
                loading: {
                    style: {
                        background: "#f3ebe5", // --surface-2
                        color: "#4a3f3a",     // --text-secondary
                    },
                    iconTheme: {
                        primary: "#9a8174",
                        secondary: "#f3ebe5",
                    },
                },
            }}
        />
    );
}
