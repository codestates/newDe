"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const userRouter = express_1.default.Router();
userRouter.get("/logout", userController_js_1.logout);
userRouter.post("/check", userController_js_1.checkInfo);
userRouter
    .route("/")
    .get(userController_js_1.profile)
    .patch(userController_js_1.editUser)
    .delete(userController_js_1.deleteUser);
exports.default = userRouter;
//# sourceMappingURL=userRouter.js.map