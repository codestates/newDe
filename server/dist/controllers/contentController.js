"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editComment = exports.reportComment = exports.deleteContent = exports.deleteComment = exports.editContent = exports.getContentDetail = exports.createContent = exports.createComment = exports.allContent = exports.allComment = exports.reportContent = exports.recommentContent = void 0;
const typeorm_1 = require("typeorm");
const content_1 = require("../entities/content");
const comment_1 = require("../entities/comment");
const authorizeToken_1 = require("./token/authorizeToken");
const recommentContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const contentInfo = yield ContentRepository.findOne({
        where: { id: contentId }
    });
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .update(content_1.Content)
        .set({
        like: contentInfo.like + 1
    })
        .where({ id: contentId })
        .execute();
    res.status(200).json({ message: "succes" });
});
exports.recommentContent = recommentContent;
const reportContent = (req, res) => res.send("reportContent");
exports.reportContent = reportContent;
const allContent = (req, res) => res.send("allContent");
exports.allContent = allContent;
const createContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, main, parentCategory, childCategory } = req.body;
    const content = new content_1.Content();
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    //console.log(verify);
    content.title = title;
    content.main = main;
    content.userId = verify.userInfo.id;
    content.parentCategory = parentCategory;
    content.childCategory = childCategory;
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    yield ContentRepository.save(content);
    return res.status(201).json({ message: 'Succes' });
});
exports.createContent = createContent;
const getContentDetail = (req, res) => res.send("getContentDetail");
exports.getContentDetail = getContentDetail;
const editContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, main, parentCategory, childCategory } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const targetContent = yield ContentRepository.findOne({ id: Number(req.params.contentid) });
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (!targetContent)
        return res.status(400).json({ message: 'Bad Content' });
    if (!title || !main || !parentCategory || !childCategory)
        return res.status(400).json({ message: 'Bad Request' });
    if (targetContent.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    targetContent.title = title;
    targetContent.main = main;
    targetContent.parentCategory = parentCategory;
    targetContent.childCategory = childCategory;
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .update(content_1.Content)
        .set(targetContent)
        .where({ id: targetContent.id })
        .execute();
    console.log(targetContent);
    return res.status(200).json({ message: "edit success" });
});
exports.editContent = editContent;
const deleteContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const targetContent = yield ContentRepository.findOne({ id: Number(req.params.contentid) });
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (targetContent.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    yield ContentRepository.delete(req.params.contentid);
    return res.status(200).json({ message: 'Deleted' });
});
exports.deleteContent = deleteContent;
// Comment
const reportComment = (req, res) => {
    res.send("reportComment");
};
exports.reportComment = reportComment;
const allComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const comments = yield commentRepository.find({ where: { contentId: contentId } });
    res.status(200).json({ data: comments, message: 'ok' });
});
exports.allComment = allComment;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, userId, main } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const comment = new comment_1.Comment();
    comment.contentId = contentId;
    comment.userId = userId;
    comment.main = main;
    yield commentRepository.save(comment);
    res.status(201).json({ data: comment, message: 'comment registered successfully' });
});
exports.createComment = createComment;
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const { commentId, userId, main } = req.body;
    const targetComment = yield commentRepository.findOne(commentId);
    //console.log(verify);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (targetComment.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    targetComment.main = main;
    yield commentRepository.save(targetComment);
    res.status(200).json({ data: targetComment, message: 'comment mdified successfully' });
});
exports.editComment = editComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const commentId = req.params.commentId;
    const targetContent = yield commentRepository.findOne(commentId);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (targetContent.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    yield commentRepository.delete(commentId);
    return res.status(200).json({ message: 'Deleted' });
});
exports.deleteComment = deleteComment;
//# sourceMappingURL=contentController.js.map