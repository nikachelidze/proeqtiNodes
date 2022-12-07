const ApiError = require('../exceptions/api-error');
const tokenService = require('../services/token-service');

module.exports = function (req, res, next) {
    try{
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader){
            return next(ApiError.UnauthorizedError());
        }
        const accssesToken = authorizationHeader.split(' ')[1];
        if(!accssesToken){
            return next(ApiError.UnauthorizedError()); 
        }
        const momxmarebeliData = tokenService.validateAccessToken(accssesToken);
        if(!momxmarebeliData){
            return next(ApiError.UnauthorizedError());
        }

        req.momxmarebeli = momxmarebeliData;
        next();

    } catch(e){
        return next(ApiError.UnauthorizedError());
    }
}