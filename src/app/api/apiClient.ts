import axios, { AxiosError } from "axios"
import { AppError } from "@/shared/utils/AppError"
import { handleApiError } from "@/shared/utils/handleApiError"
import { ApiErrorResponse } from "@/shared/types/api" // ایمپورت تایپ جدید

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
})

apiClient.interceptors.response.use(
    (response) => {
        if (response.data && response.data.success === false) {
            return Promise.reject({ response });
        }
        return response;
    },
    (error: AxiosError<ApiErrorResponse>) => {
        if (!error.response) {
            const appError = new AppError("خطا در ارتباط با سرور", "NETWORK_ERROR", "NETWORK_ERROR", 0);
            handleApiError(appError);
            return Promise.reject(appError);
        }

        const { status, data } = error.response;

        if (data?.message) {
            const appError = new AppError(
                data.message,
                "API_ERROR",
                data.code ?? "API_ERROR",
                status
            );
            handleApiError(appError);
            return Promise.reject(appError);
        }

        if (status === 403) {
            const appError = new AppError("دسترسی غیرمجاز است", "FORBIDDEN", "AUTH_403", 403);
            handleApiError(appError);
            return Promise.reject(appError);
        }

        const appError = new AppError("خطای ناشناخته‌ای رخ داد", "UNKNOWN_ERROR", "UNKNOWN_ERROR", status);
        handleApiError(appError);
        return Promise.reject(appError);
    }
)
