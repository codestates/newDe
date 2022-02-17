"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const globalRouter = express_1.default.Router();
globalRouter.post("/login", userController_js_1.login);
globalRouter.post("/signup", userController_js_1.signup);
// globalRouter.get("/report/board", reportBoard);
// globalRouter.get("/report/comment", reportComment);
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map