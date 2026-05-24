"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
    Eye,
    EyeOff,
    Lock,
    Mail,
    Phone,
    User,
    ArrowLeft,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { notify } from "@/shared/utils/notify";
import { LoginRequest } from "@/features/auth/types/authTypes";

import "@/features/auth/style/login-styles.css";

export default function LoginPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<LoginRequest>({
        defaultValues: {
            identifier: "",
            password: "",
            rememberMe: false,
        },
        mode: "onChange",
    });

    useEffect(() => {
        const err = searchParams.get("err");

        if (err === "401") {
            notify.error("نام کاربری یا رمز عبور اشتباه است");
        }

        if (err === "403") {
            notify.error("دسترسی غیر مجاز");
        }

        if (err === "blocked") {
            notify.error("حساب کاربری شما مسدود شده است");
        }
    }, [searchParams]);

    const validateIdentifier = (value: string) => {
        const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
        const emailRegex =
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        const phoneRegex = /^09[0-9]{9}$/;

        if (!value) {
            return "وارد کردن اطلاعات الزامی است";
        }

        if (
            usernameRegex.test(value) ||
            emailRegex.test(value) ||
            phoneRegex.test(value)
        ) {
            return true;
        }

        return "فرمت وارد شده معتبر نیست";
    };

    const validatePassword = (value: string) => {
        if (!value) {
            return "رمز عبور الزامی است";
        }

        if (value.length < 6) {
            return "رمز عبور باید حداقل ۶ کاراکتر باشد";
        }

        return true;
    };

    const onSubmit = async (data: LoginRequest) => {
        try {
            setLoading(true);

            console.log(data);

            await new Promise((resolve) => setTimeout(resolve, 1500));

            notify.success("ورود با موفقیت انجام شد");

            router.push("/");
        } catch (e) {
            notify.error("خطا در ورود");
        } finally {
            setLoading(false);
        }
    };

    const getIdentifierIcon = () => {
        const value = watch("identifier");

        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            return <Mail size={18} className="login-icon" />;
        }

        if (/^09[0-9]{9}$/.test(value)) {
            return <Phone size={18} className="login-icon" />;
        }

        return <User size={18} className="login-icon" />;
    };

    return (
        <div className="login-container">
            <div className="login-bg-orb login-bg-orb-1" />
            <div className="login-bg-orb login-bg-orb-2" />
            <div className="login-bg-orb login-bg-orb-3" />

            <div className="login-card">
                <div className="login-header">
                    <h1 className="login-title">Arvand Leather</h1>

                    <p className="login-subtitle">
                        ورود به حساب کاربری
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="login-form"
                >
                    {/* Identifier */}

                    <div className="login-field">
                        <label className="login-label">
                            نام کاربری، ایمیل یا شماره موبایل
                        </label>

                        <div className="login-input-wrapper">
                            <div className="login-input-icon">
                                {getIdentifierIcon()}
                            </div>

                            <input
                                dir="rtl"
                                type="text"
                                autoComplete="username"
                                placeholder="مثال: amin / amin@gmail.com / 0912..."
                                className={`login-input ${
                                    errors.identifier
                                        ? "login-input-error"
                                        : ""
                                }`}
                                {...register("identifier", {
                                    validate: validateIdentifier,
                                })}
                            />
                        </div>

                        <div className="login-message">
                            {errors.identifier?.message ? (
                                <span className="login-error-message">
                                    {errors.identifier.message}
                                </span>
                            ) : (
                                watch("identifier") && (
                                    <span className="login-success-indicator">
                                        اطلاعات معتبر است
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Password */}

                    <div className="login-field">
                        <label className="login-label">
                            رمز عبور
                        </label>

                        <div className="login-input-wrapper">
                            <div className="login-input-icon">
                                <Lock
                                    size={18}
                                    className="login-icon"
                                />
                            </div>

                            <input
                                dir="rtl"
                                type={
                                    showPassword
                                        ? "text"
                                        : "password"
                                }
                                autoComplete="current-password"
                                placeholder="رمز عبور خود را وارد کنید"
                                className={`login-input ${
                                    errors.password
                                        ? "login-input-error"
                                        : ""
                                }`}
                                {...register("password", {
                                    validate: validatePassword,
                                })}
                            />

                            <button
                                type="button"
                                className="login-password-toggle"
                                onClick={() =>
                                    setShowPassword((p) => !p)
                                }
                            >
                                {showPassword ? (
                                    <EyeOff
                                        size={18}
                                        className="login-icon"
                                    />
                                ) : (
                                    <Eye
                                        size={18}
                                        className="login-icon"
                                    />
                                )}
                            </button>
                        </div>

                        <div className="login-message">
                            {errors.password?.message ? (
                                <span className="login-error-message">
                                    {errors.password.message}
                                </span>
                            ) : (
                                watch("password") && (
                                    <span className="login-success-indicator">
                                        رمز عبور معتبر است
                                    </span>
                                )
                            )}
                        </div>
                    </div>

                    {/* Actions */}

                    <div className="login-row">
                        <label className="login-checkbox">
                            <input
                                type="checkbox"
                                className="login-checkbox-input"
                                onChange={(e) =>
                                    setValue(
                                        "rememberMe",
                                        e.target.checked
                                    )
                                }
                            />

                            <span>
                                مرا به خاطر بسپار
                            </span>
                        </label>

                        <Link
                            href="/forgot-password"
                            className="login-link"
                        >
                            فراموشی رمز عبور
                        </Link>
                    </div>

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={loading}
                        className="login-button"
                    >
                        {loading ? (
                            <>
                                <span className="login-spinner" />
                                در حال ورود...
                            </>
                        ) : (
                            <>
                                ورود به حساب
                                <ArrowLeft size={18} />
                            </>
                        )}
                    </button>

                    {/* Divider */}

                    <div className="login-divider">
                        <span className="login-divider-text">
                            حساب ندارید؟
                        </span>
                    </div>

                    {/* Register */}

                    <Link
                        href="/register"
                        className="login-register-btn"
                    >
                        ایجاد حساب کاربری
                    </Link>
                </form>
            </div>
        </div>
    );
}