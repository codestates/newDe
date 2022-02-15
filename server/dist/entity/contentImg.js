"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentImg = void 0;
const typeorm_1 = require("typeorm");
let ContentImg = class ContentImg {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], ContentImg.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ContentImg.prototype, "contentId", void 0);
__decorate([
    (0, typeorm_1.Column)()
], ContentImg.prototype, "imgId", void 0);
ContentImg = __decorate([
    (0, typeorm_1.Entity)()
], ContentImg);
exports.ContentImg = ContentImg;
//# sourceMappingURL=contentImg.js.map