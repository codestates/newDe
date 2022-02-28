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
exports.likeReport = void 0;
const typeorm_1 = require("typeorm");
const content_1 = require("./content");
const comment_1 = require("./comment");
const user_1 = require("./user");
let likeReport = class likeReport {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], likeReport.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], likeReport.prototype, "contentLikeId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], likeReport.prototype, "contentReportId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], likeReport.prototype, "commentReportId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.User, user => user.id),
    __metadata("design:type", user_1.User)
], likeReport.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => content_1.Content, content => content.id),
    __metadata("design:type", content_1.Content)
], likeReport.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => comment_1.Comment, comment => comment.id),
    __metadata("design:type", comment_1.Comment)
], likeReport.prototype, "comment", void 0);
likeReport = __decorate([
    (0, typeorm_1.Entity)()
], likeReport);
exports.likeReport = likeReport;
//# sourceMappingURL=likeReport.js.map