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
exports.checkPassword = exports.checkEmail = exports.deleteUser = exports.editUser = exports.profile = exports.signup = exports.logout = exports.login = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("../entities/user");
const content_1 = require("../entities/content");
const generateToken_1 = require("./token/generateToken");
const authorizeToken_1 = require("./token/authorizeToken");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = new user_1.User();
    user.email = email;
    user.password = password;
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
    const { email, nickName, password } = req.body;
    const user = new user_1.User();
    user.email = email;
    user.nickName = nickName;
    user.password = password;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    if (!email || !nickName || !password) {
        return res.status(400).json({ message: 'Bad Request' });
    }
    else {
        const userInfo = yield userRepository.findOne({ email: email });
        if (userInfo) {
            return res.status(409).json({ message: 'Account already exists' });
        }
        yield userRepository.save(user);
        return res.status(201).json({ message: 'Succes' });
    }
});
exports.signup = signup;
const profile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    console.log(verify.userInfo);
    const userInfo = yield userRepository.findOne({
        where: { id: verify.userInfo.id }
    });
    const userContent = yield ContentRepository.find({
        where: { userId: userInfo.id }
    });
    return res.status(201).json({ data: Object.assign(Object.assign({}, userInfo), { content: userContent }) });
});
exports.profile = profile;
const editUser = (req, res) => res.send("Edit User");
exports.editUser = editUser;
const deleteUser = (req, res) => res.send("Delete");
exports.deleteUser = deleteUser;
const checkEmail = (req, res) => res.send("checkEmail");
exports.checkEmail = checkEmail;
const checkPassword = (req, res) => res.send("checkPassword");
exports.checkPassword = checkPassword;
//# sourceMappingURL=userController.js.map