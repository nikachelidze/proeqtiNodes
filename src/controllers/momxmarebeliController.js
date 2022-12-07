const MomxmareblisService = require('../services/momxmarebeliService');
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');
const momxmarebeliService = require('../services/momxmarebeliService');

class momxmarebeli {
    async registration(req, res, next) {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadReqvest('ვალიდაციის შეცდომა', errors.array()))
            }
            const {saxeli, gvari, tel, email, paroli} = req.body;
            const momxmarebeliData = await MomxmareblisService.registration(saxeli, gvari, tel, email, paroli);
            res.cookie('refreshToken',momxmarebeliData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return json(momxmarebeliData);
        } catch(e) {
            next(e);
        }
    }
    async login(req, res, next) {
        try{
            const {email, paroli} = req.body;
            const momxmarebeliData = await MomxmareblisService.login(email, paroli);
            res.cookie('refreshToken',momxmarebeliData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return json(momxmarebeliData);
        } catch(e) {
            next(e);
        }
    }
    async logout(req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const token = await MomxmareblisService.logout(refreshToken);
            res.clearCooke('refreshToken');
            return res.json(token);
        } catch(e) {
            next(e);
        }
    }
    async activate(req, res, next) {
        try{
            const activationLink = req.params.link;
            await MomxmareblisService.activate(activationLink);
            return res.redireqt(process.env.CLIENT_URL);
        } catch(e) {
            next(e);
        }
    }
    async refresh(req, res, next) {
        try{
            const {refreshToken} = req.cookies;
            const momxmarebeliData = await MomxmareblisService.refresh(refreshToken);
            res.cookie('refreshToken',momxmarebeliData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return json(momxmarebeliData);
        } catch(e) {
            next(e);
        }
    }
    async getmomxmarebeli(req, res, next) {
        try{
            const momxmarebeli = await momxmarebeliService.getAllUsers();
            return res.json(momxmarebeli);
        } catch(e) {
            next(e);
        }
    }
}
module.exports = new momxmarebeli();
