const jwt = require('jsonwebtoken');
const TokenModel = require('../db/models/tokenmodels')
class TokenService{
    generateTokens(payload){
        const accssesToken = jwt.sign(payload, process.env.JWT=ACCESS-SECRET, {expiresIn:'15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT=REFRESH-SECRET, {expiresIn:'30d'});
        return{
            accssesToken,
            refreshToken
        }
    }
    validateAccessToken(token){
        try{
            const momxmarebeliData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return momxmarebeliData;
        }catch(e){
            return null;
        }
    }
    validateRefreshToken(token){
        try{
            const momxmarebeliData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return momxmarebeliData;
        }catch(e){
            return null;
        }
    }
    async saveToken(userid, refreshToken){
        const tokendate = await TokenModel.findOne({id: userid })
        if (tokendate){
            tokendate.refreshToken = refreshToken;
            return tokendate.save();
        }
        const token= await TokenModel.create({id: userid, refreshToken});
        return token;
    }
    async removeToken(refreshToken){
        const tokendate = await TokenModel.deleteOne({refreshToken});
        return tokendate;
    }
    async findToken(refreshToken){
        const tokendate = await TokenModel.findOne({refreshToken});
        return tokendate;
    }
}

module.exports = new TokenService();
