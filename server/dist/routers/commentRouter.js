"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commentController_1 = require("../controllers/commentController");
const commentRouter = express_1.default.Router();
commentRouter.post("/", commentController_1.createComment);
commentRouter.patch("/", commentController_1.editComment);
commentRouter.patch("/report", commentController_1.reportComment);
commentRouter.get("/:contentId", commentController_1.allComment);
commentRouter.delete("/:commentId", commentController_1.deleteComment);
exports.default = commentRouter;
//# sourceMappingURL=commentRouter.js.map