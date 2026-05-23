import { AppError } from "./AppError"
import {notify} from "./notify";

export function handleApiError(error: AppError) {
    // console.log(error.message)
    notify.error(error.message)

}
