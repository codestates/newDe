"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContentLike = void 0;
const typeorm_1 = require("typeorm");
const content_1 = require("./content");
const user_1 = require("./user");
let ContentLike = class ContentLike {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ContentLike.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => user_1.User, (user) => user.contentLikes, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", user_1.User)
], ContentLike.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)((type) => content_1.Content, (content) => content.contentLikes, { nullable: false, onDelete: 'CASCADE' }),
    __metadata("design:type", content_1.Content)
], ContentLike.prototype, "content", void 0);
ContentLike = __decorate([
    (0, typeorm_1.Entity)()
], ContentLike);
exports.ContentLike = ContentLike;
//# sourceMappingURL=contentLike.js.map