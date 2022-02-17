"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const contentController_js_1 = require("../controllers/contentController.js");
const commentRouter = express_1.default.Router();
commentRouter.post("/", contentController_js_1.createComment);
commentRouter.patch("/", contentController_js_1.editComment);
commentRouter.patch("/report", contentController_js_1.reportComment);
commentRouter.get("/:contentId", contentController_js_1.allComment);
commentRouter
    .route("/:commentId")
    .delete(contentController_js_1.deleteComment);
exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map