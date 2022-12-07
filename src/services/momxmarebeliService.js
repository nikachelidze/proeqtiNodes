const MomxmarebeliModel = require('../db/models/momxmarebeliModel');
const bcrypt = require('bcrypt');
const uuid = require('uuid');
const MeilService = require('./meilservice');
const TokenService = require('./token-service')
const UserDto = require('../dtos/momxmarebelidto');
const tokenService = require('./token-service');
const ApiError = require('../exceptions/api-error');

class MomxmareblisService{
    async registration(saxeli, gvari, tel, email, paroli){
        const candidate = await MomxmarebeliModel.findOne({email});
        if(candidate){
            throw ApiError.BadReqvest('ასეთი ელექტრონული ფოსტა უკვე არსებობს');
        }
        const hashParoli = await bcrypt.hash(paroli, 3);
        //პაროლის ქეშირება და ქეშირებული პაროლის ჩაწერა
        const activationLink = uuid.v4();
        const momxmarebeli = await MomxmarebeliModel.create({saxeli, gvari, tel, email, paroli: hashParoli, activationLink});
        await MeilService.sendActivationMeil(email, $(process.env.API_URL)/api/activate/$(activationLink));
        
        const userDto = new UserDto(momxmarebeli);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, momxmarebeli: userDto}
    }
    async activate(activationLink){
        const momxmarebeli = await MomxmarebeliModel.findOne( {activationLink} )
        if (!momxmarebeli){
            throw ApiError.BadReqvest('აქტივაციის არაკორექტული მისამართი')
        }
        momxmarebeli.asActivated = true;
        await momxmarebeli.save();
    }
    async login(email, paroli){
        const momxmarebeli = await MomxmarebeliModel.findOne({email});
        if (!momxmarebeli){
            throw ApiError.BadReqvest('მომხმარებელი ასეთი ემაილით არ მოიძებნა');
        }
        const isPassEquals = await bcrypt.compare(paroli, momxmarebeli.paroli);
        if(!isPassEquals){
            throw ApiError.BadReqvest('არა კორექტული პაროლი');
        }
        const userDto = new UserDto(momxmarebeli);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, momxmarebeli: userDto}
    }
    async logout(refreshToken){
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
    async refresh(refreshToken){
        if(!refreshToken){
            throw ApiError.UnauthorizedError();
        }
        const momxmarebeliData = tokenService.validateRefreshToken(refreshToken);
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if(!momxmarebeliData || !tokenFromDb){
            throw ApiError.UnauthorizedError();
        }
        const momxmarebeli = await MomxmarebeliModel.findById(momxmarebeliData.id);
        const userDto = new UserDto(momxmarebeli);
        const tokens = tokenService.generateTokens({...userDto});
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {...tokens, momxmarebeli: userDto}
    }

    async getAllUsers(){
        const momxmarebeli = await MomxmarebeliModel.find();
        return momxmarebeli;
    }
}

module.exports = new MomxmareblisService();
