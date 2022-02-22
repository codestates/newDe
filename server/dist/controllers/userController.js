"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkInfo = exports.deleteUser = exports.editUser = exports.profile = exports.signup = exports.logout = exports.login = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const content_1 = require("../entities/content");
const generateToken_1 = require("../middleware/token/generateToken");
const authorizeToken_1 = require("../middleware/token/authorizeToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (!email || !password) {
        return res.status(400).json({ message: 'Fail' });
    }
    else {
        const userInfo = yield userRepository.findOne({
            email: email,
            password: password,
        });
        if (userInfo) {
            const token = yield (0, generateToken_1.generateToken)(userInfo);
            // console.log(token);
            res.cookie('accessToken', token);
            res.status(200).json({ data: userInfo, message: 'Login Success' });
        }
        else {
            res.status(404).send('invalid user');
        }
    }
});
exports.login = login;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.clearCookie('accessToken').status(205).json({ message: 'Logout Success' });
});
exports.logout = logout;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, password } = req.body;
    const user = new user_1.User();
    user.email = email;
    user.nickname = nickname;
    user.password = password;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (!email || !nickname || !password) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    else {
        const userInfo = yield userRepository.findOne({ email: email });
        if (userInfo) {
            return res.status(409).json({ message: 'Account already exists' });
        }
        yield userRepository.save(user);
        return res.status(201).json({ message: 'Success' });
    }
});
exports.signup = signup;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (verify) {
        const userInfo = yield userRepository.findOne({
            where: { id: verify.userInfo.id }
        });
        const userContent = yield ContentRepository.find({
            where: { userId: userInfo.id }
        });
        return res.status(201).json({ data: Object.assign(Object.assign({}, userInfo), { content: userContent }) });
    }
    else {
        return res.status(400).json({ message: 'Invalid Accesstoken' });
    }
});
exports.profile = profile;
const editUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { nickname, password } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const userInfo = yield userRepository.findOne({
        where: { id: verify.userInfo.id }
    });
    userInfo.nickname = nickname || userInfo.nickname;
    userInfo.password = password || userInfo.password;
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .update(user_1.User)
        .set(userInfo)
        .where({ id: verify.userInfo.id })
        .execute();
    return res.status(200).json({ data: userInfo });
});
exports.editUser = editUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const targetUser = yield userRepository.findOne(verify.userInfo.id);
    targetUser.nickname = '';
    targetUser.email = '';
    targetUser.password = '';
    yield userRepository.save(targetUser);
    return res
        .clearCookie('accessToken')
        .status(200)
        .json({ message: 'Deleted' });
});
exports.deleteUser = deleteUser;
const checkInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, nickname, password } = req.body;
    console.log(email, nickname, password);
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (email) {
        const userInfo = yield userRepository.findOne({ email: email });
        if (userInfo) {
            return res.status(409).json({ message: 'Account already exisits' });
        }
        return res.status(200).json({ message: 'email available' });
    }
    if (password) {
        const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
        if (!verify)
            return res.status(403).json({ message: 'Invalid Accesstoken' });
        const userRepository = (0, typeorm_1.getRepository)(user_1.User);
        const userInfo = yield userRepository.findOne({ email: verify.userInfo.email });
        if (userInfo.password === password) {
            return res.status(200).json({ message: 'password correct!' });
        }
        else {
            return res.status(400).json({ message: 'incorrect password' });
        }
    }
    if (nickname) {
        const userInfo = yield userRepository.findOne({ nickname: nickname });
        if (userInfo) {
            return res.status(200).json({ message: 'nickname already exisits' });
        }
        return res.status(200).json({ message: 'nickname available' });
    }
    return res.status(404).json({ message: 'Bad Request' });
});
exports.checkInfo = checkInfo;
//# sourceMappingURL=userController.js.map