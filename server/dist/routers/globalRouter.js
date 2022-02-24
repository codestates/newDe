"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_js_1 = require("../controllers/userController.js");
const imageController_js_1 = __importDefault(require("../controllers/imageController.js"));
const multer_js_1 = __importDefault(require("../middleware/multer.js"));
const contentController_js_1 = require("../controllers/contentController.js");
const commentController_js_1 = require("../controllers/commentController.js");
const kakao_js_1 = require("../controllers/OAuth/kakao.js");
const kakakoCallback_js_1 = require("../controllers/OAuth/kakakoCallback.js");
const globalRouter = express_1.default.Router();
globalRouter.post("/login", userController_js_1.login);
globalRouter.post("/signup", userController_js_1.signup);
globalRouter.post("/image", multer_js_1.default.single('img'), imageController_js_1.default);
globalRouter.get("/kakao", kakao_js_1.kakao);
globalRouter.get("/kakaoCallback", kakakoCallback_js_1.kakaologin);
globalRouter.get("/report/board", contentController_js_1.getReportedContent);
globalRouter.get("/report/comment", commentController_js_1.getReportedComment);
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map