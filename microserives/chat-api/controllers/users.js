const getUser = async (ctx) => {
    let user = ctx.request.user;
    if (user) {
        ctx.status = 200;
        ctx.body = {
            ...user
        };
    } else {
        ctx.status = 400;
        ctx.body = {
            message: 'User not found'
        };
    }
};

module.exports = {
    getUser
};
