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
const globalRouter = express_1.default.Router();
globalRouter.post("/login", userController_js_1.login);
globalRouter.post("/signup", userController_js_1.signup);
globalRouter.post("/image", multer_js_1.default.single('img'), imageController_js_1.default);
<<<<<<< HEAD
globalRouter.get("/report/board", contentController_js_1.getReportedContent);
globalRouter.get("/report/comment", contentController_js_1.getReportedComment);
=======
globalRouter.get("/report/board", contentController_js_1.reportContent);
globalRouter.get("/report/comment", contentController_js_1.reportComment);
>>>>>>> 9412aad7f932abeddb38ee5b8f8fd0afcfd6660a
exports.default = globalRouter;
//# sourceMappingURL=globalRouter.js.map