const ApiError = require('../api-error');
const jsend = require('../jsend');

function methodNotAllowed(req, res, next){
    if (req.route){
        const httpMethods = Object.keys(req.route.methods)
                .filter((method) => method !== '_all')
                .map((method)=> method.toUpperCase());
        return next (new ApiError(405, 'Method Not Allowed', {
            Allow: httpMethods.join(', ')
        }))
    }
    return next();
}

function handleError(error, req, res, next){
    if (res.headersSent){
        return next (error);
    }

    const statusCode = error.statusCode || 500;
    const message = error.message || 'Internal server error';

    return res.status(statusCode).set(error.headers || {}).json(
        statusCode >= 500 ? jsend.error(message) : jsend.fail(message)
    )
}

module.exports = {
    methodNotAllowed,
    handleError
}