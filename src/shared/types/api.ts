export interface ApiResponse<T> {
    success: boolean;
    code: string;
    message: string;
    data: T;
}

// برای زمانی که خطای بک‌اند میاد
export interface ApiErrorResponse {
    success: boolean;
    code: string;
    message: string;
}
