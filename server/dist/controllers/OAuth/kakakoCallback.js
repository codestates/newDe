"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kakaologin = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../../entities/user");
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const kakaologin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const KAKAO_OAUTH_TOKEN_API_URL = "https://kauth.kakao.com/oauth/token";
    const KAKAO_GRANT_TYPE = "authorization_code";
    // 요청이 잘못된 경우, 다음 에러메시지를 반환한다.
    let code = req.query.code;
    if (!code)
        return res.status(400).json({ message: 'Bad Request!' });
    try {
        const result = yield axios_1.default.post(`${KAKAO_OAUTH_TOKEN_API_URL}?grant_type=${KAKAO_GRANT_TYPE}&client_secret=${process.env.KAKAO_CLIENT_SECRET}&client_id=${process.env.KAKAO_CLIENT_ID}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&code=${code}`);
        const token = result.data.access_token;
        const userInfo = yield axios_1.default.get('https://kapi.kakao.com/v2/user/me', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        let kakaoInfo = userInfo.data;
        console.log(userInfo);
        const user = new user_1.User();
        user.email = kakaoInfo.kakao_account.email;
        user.nickname = '';
        user.password = '';
        user.kakao = true;
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        const kakaoEmail = yield userRepository.findOne({ email: kakaoInfo.kakao_account.email });
        //쿼리문 읽어서 모달창 띄우기
        if (kakaoEmail && !kakaoEmail.kakao) {
            return res.status(409).redirect('http://localhost:3000/login?islogin=fail');
        }
        if (kakaoEmail && kakaoEmail.kakao) {
            return res.status(201).cookie('kakaoAccessToken', token).redirect('http://localhost:3000');
        }
        let count = 1;
        let nickname = kakaoInfo.properties.nickname;
        while (true) {
            const kakaoNickname = yield userRepository.findOne({ nickname: nickname });
            console.log(kakaoNickname);
            if (kakaoNickname) {
                if (count === 1)
                    nickname += count++;
                else
                    nickname = nickname.slice(0, nickname.length - 1) + count++;
            }
            else {
                break;
            }
        }
        user.nickname = nickname;
        yield userRepository.save(user);
        return res
            .status(201)
            .cookie('kakaoAccessToken', token)
            .redirect('http://localhost:3000');
    }
    catch (e) {
        console.log(e);
        res.send(e);
    }
});
exports.kakaologin = kakaologin;
//# sourceMappingURL=kakakoCallback.js.map