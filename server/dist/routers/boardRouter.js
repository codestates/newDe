"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_js_1 = require("../controllers/contentController.js");
const boardRouter = express_1.default.Router();
boardRouter.patch("/recommend", contentController_js_1.recommentContent);
boardRouter.patch("/report", contentController_js_1.reportContent);
boardRouter
    .route("/")
    .get(contentController_js_1.allContent)
    .post(contentController_js_1.createContent);
boardRouter
    .route("/:contentid")
    .get(contentController_js_1.getContentDetail)
    .patch(contentController_js_1.editContent)
    .delete(contentController_js_1.deleteContent);
exports.default = boardRouter;
//# sourceMappingURL=boardRouter.js.map