import { ENVIRONMENT } from "../config";


export default (err, req, res, next) => {
    if (!err.isOperational) {
        console.log("--------------");
        console.log(ENVIRONMENT);
        console.log("--------------");
        
        if ((ENVIRONMENT !== "development") && (ENVIRONMENT !== "production")) {
            console
            .error(
                "An unexpected error occurred please restart the application!",
                "\nError: " + err.message + " Stack: " + err.stack,
            );
            process.exit(1);
        }
    }
    console.error(
        `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${
        req.ip
        } - Stack: ${err.stack}`,
    );
    err.stack = err.stack || "";
    const errorDetails = {
        status: false,
        message: err.message,
        statusCode: err.statusCode || 500,
        data: err.data,
        stack: err.stack,
    };
    if (ENVIRONMENT === "production") {
        delete (errorDetails.stack);
    }

    res.status(err.statusCode || 500);
    return res.json(errorDetails);
};
