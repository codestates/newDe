"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
let Comment = class Comment {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Comment.prototype, "main", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Comment.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Comment.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Comment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], Comment.prototype, "updated_at", void 0);
Comment = __decorate([
    (0, typeorm_1.Entity)()
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.js.map