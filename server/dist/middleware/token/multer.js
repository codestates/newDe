"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const upload = (0, multer_1.default)({
    storage: multer_1.default.diskStorage({
        //저장할 장소
        destination(req, file, cb) {
            cb(null, 'src/imageStorage');
        },
        filename(req, file, cb) {
            const ext = path_1.default.extname(file.originalname); //파일의 확장자
            //파일명이 절대 겹치지 않도록 해야한다.
            //파일이름 + 현재시간밀리초 + 파일 확장자명
            cb(null, path_1.default.basename(file.originalname, ext) + Date.now() + ext);
        }
    }),
    limits: { fileSize: 5 * 1024 * 1024 }
});
exports.default = upload;
//# sourceMappingURL=multer.js.map