module.exports = (ctx, error) => {
    const errorStatus = error.status ? error.status : 500;
    ctx.status = errorStatus;
    ctx.body = {
        success: false,
        message: error.message ? error.message : error,
        status: errorStatus
    }
};
