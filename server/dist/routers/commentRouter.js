"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_js_1 = require("../controllers/contentController.js");
const commentRouter = express_1.default.Router();
commentRouter.patch("/report", contentController_js_1.reportComment);
commentRouter
    .route("/")
    .get(contentController_js_1.allComment)
    .post(contentController_js_1.createComment);
commentRouter
    .route("/:commentid")
    .patch(contentController_js_1.editComment)
    .delete(contentController_js_1.deleteComment);
exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map