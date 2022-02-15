"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
const typeorm_1 = require("typeorm");
const user_1 = require("./user");
let Content = class Content {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)()
], Content.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "main", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.contents)
], Content.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "like", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "report", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "parentCategory", void 0);
__decorate([
    (0, typeorm_1.Column)()
], Content.prototype, "childCategory", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)()
], Content.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)()
], Content.prototype, "updatedAt", void 0);
Content = __decorate([
    (0, typeorm_1.Entity)()
], Content);
exports.Content = Content;
//# sourceMappingURL=content.js.map