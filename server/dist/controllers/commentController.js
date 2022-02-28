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
exports.getReportedComment = exports.reportComment = exports.deleteComment = exports.editComment = exports.createComment = exports.allComment = void 0;
const typeorm_1 = require("typeorm");
const comment_1 = require("../entities/comment");
const commentReport_1 = require("../entities/commentReport");
const authorizeToken_1 = require("../middleware/token/authorizeToken");
const allComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contentId = req.params.contentId;
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    //const comments = await commentRepository.find({where : {contentId : contentId}});
    const comments = yield commentRepository
        .createQueryBuilder('comment')
        .select(['comment', 'comments.nickname'])
        .leftJoin('comment.user', 'comments')
        .where('comment.contentId = :contentId', { contentId })
        .getMany();
    res.status(200).json({ data: comments, message: 'ok' });
});
exports.allComment = allComment;
const createComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId, main } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const comment = new comment_1.Comment();
    comment.contentId = contentId;
    comment.userId = verify.userInfo.id;
    comment.main = main;
    yield commentRepository.save(comment);
    res.status(201).json({ data: comment, message: 'comment registered successfully' });
});
exports.createComment = createComment;
const editComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const { commentId, main } = req.body;
    const targetComment = yield commentRepository.findOne(commentId);
    //console.log(verify);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (targetComment.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    targetComment.main = main;
    console.log(main);
    yield commentRepository.save(targetComment);
    console.log(targetComment);
    res.status(200).json({ data: targetComment, message: 'comment mdified successfully' });
});
exports.editComment = editComment;
const deleteComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const commentId = req.params.commentId;
    const targetComment = yield commentRepository.findOne(commentId);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    if (!targetComment)
        return res.status(400).json({ message: 'no comment' });
    if (verify.userInfo.admin) {
        yield commentRepository.delete(commentId);
        return res.status(200).json({ message: 'Deleted' });
    }
    if (targetComment.userId !== verify.userInfo.id)
        return res.status(400).json({ message: 'different user' });
    yield commentRepository.delete(commentId);
    return res.status(200).json({ message: 'Deleted' });
});
exports.deleteComment = deleteComment;
const reportComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId, initialrize } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const CommentReportRepository = (0, typeorm_1.getRepository)(commentReport_1.CommentReport);
    if (initialrize && verify.userInfo.admin) {
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .update(comment_1.Comment)
            .set({
            report: 0
        })
            .where({ id: commentId })
            .execute();
        yield (0, typeorm_1.getConnection)()
            .createQueryBuilder()
            .delete()
            .from(commentReport_1.CommentReport)
            .where("comment = :comment", { comment: commentId })
            .execute();
        return res.status(200).json({ message: "success" });
    }
    const commentInfo = yield commentRepository.findOne({
        where: { id: commentId }
    });
    const overlap = yield CommentReportRepository.findOne({
        where: { comment: commentId, user: verify.userInfo.id }
    });
    if (overlap) {
        return res.status(400).json({ message: "Fail" });
    }
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .update(comment_1.Comment)
        .set({
        report: commentInfo.report + 1
    })
        .where({ id: commentId })
        .execute();
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .insert()
        .into(commentReport_1.CommentReport)
        .values([
        { user: verify.userInfo.id,
            comment: commentId }
    ])
        .execute();
    return res.status(200).json({ message: "success" });
});
exports.reportComment = reportComment;
const getReportedComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const commentRepository = (0, typeorm_1.getRepository)(comment_1.Comment);
    const comments = yield commentRepository
        .createQueryBuilder('comment')
        .leftJoin('comment.user', 'comments')
        .select(['comment', 'comments.nickname'])
        .where('comment.report >= :report', { report: 5 })
        .getMany();
    res.status(200).json({ data: comments, message: "ok" });
});
exports.getReportedComment = getReportedComment;
//# sourceMappingURL=commentController.js.map