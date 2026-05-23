export class AppError extends Error {

    type: string
    code: string
    status: number

    constructor(
        message: string,
        type: string,
        code: string,
        status: number
    ) {

        super(message)

        this.name = "AppError"
        this.type = type
        this.code = code
        this.status = status

    }

}
