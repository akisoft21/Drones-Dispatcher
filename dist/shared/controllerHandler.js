"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerHandler = void 0;
const controllerHandler = (promise, params) => {
    return async (req, res, next) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            const result = await promise(...boundParams);
            return res.status(result.statusCode).json({
                status: result.status,
                data: result.data,
                message: result.message,
            });
        }
        catch (error) {
            next(error);
        }
    };
};
exports.controllerHandler = controllerHandler;
//# sourceMappingURL=controllerHandler.js.map