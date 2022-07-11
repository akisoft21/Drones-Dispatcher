

export const controllerHandler = (promise: Function, params:any) => {
    return async (req:any, res:any, next:any) => {
        const boundParams = params ? params(req, res, next) : [];
        try {
            const result = await promise(...boundParams);
            return res.status(result.statusCode).json({
                status: result.status,
                data: result.data,
                message: result.message,
            });
        } catch (error) {
            next(error);
        }
    };
};