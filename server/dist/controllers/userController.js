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
const login = (req, res) => res.send("Login");
exports.login = login;
const logout = (req, res) => res.send("Log out");
exports.logout = logout;
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password, nickName } = req.body;
    const user = new user_1.User();
    user.email = email;
    user.password = password;
    user.nickName = nickName;
    const userRepository = (0, typeorm_1.getRepository)(user_1.User);
    const check = yield userRepository.find({ email: email });
    if (check) {
        yield userRepository.save(user);
        res.status(201).send('sign up');
    }
    else {
        res.status(400).send("conflict");
    }
});
exports.signup = signup;
const profile = (req, res) => {
    console.log(req.params.id);
    res.send(`profile ${req.params.id}`);
};
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