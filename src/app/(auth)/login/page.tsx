"use client";


import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "@/features/auth/style/login.module.css";

export default function LoginPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        phone: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Login logic here
        setTimeout(() => {
            setLoading(false);
            router.push("/");
        }, 1000);
    };

    return (
        <main className={styles.container}>
            <div className={styles.card}>
                <div className={styles.header}>
                    <h1 className={styles.title}>ورود</h1>
                    <p className={styles.subtitle}>به حساب کاربری خود وارد شوید</p>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label className={styles.label}>شماره موبایل</label>
                        <input
                            type="tel"
                            placeholder="09xxxxxxxxx"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label className={styles.label}>رمز عبور</label>
                        <input
                            type="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className={styles.input}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading} className={styles.button}>
                        {loading ? "در حال ورود..." : "ورود"}
                    </button>
                </form>

                <div className={styles.footer}>
                    <p className={styles.footerText}>
                        حساب کاربری ندارید؟{" "}
                        <Link href="/register" className={styles.link}>
                            ثبت نام
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}