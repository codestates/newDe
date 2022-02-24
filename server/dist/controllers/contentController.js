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
exports.getReportedContent = exports.deleteContent = exports.editContent = exports.getContentDetail = exports.createContent = exports.allContent = exports.reportContent = exports.recommentContent = void 0;
const typeorm_1 = require("typeorm");
const content_1 = require("../entities/content");
const authorizeToken_1 = require("../middleware/token/authorizeToken");
const recommentContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
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
    res.status(200).json({ message: "success" });
});
exports.recommentContent = recommentContent;
const allContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searching, parentCategory, childCategory, page } = req.query;
    // query check
    if (!parentCategory || !page)
        return res.status(404).json({ message: 'no essential query' });
    //find payload with searching and category
    let payload = null;
    if (!searching) {
        if (!childCategory) {
            payload = yield (0, typeorm_1.getRepository)(content_1.Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.parentCategory = :parentCategory', { parentCategory: parentCategory })
                .getMany();
        }
        else {
            payload = yield (0, typeorm_1.getRepository)(content_1.Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.childCategory = :childCategory', { childCategory: childCategory })
                .getMany();
        }
    }
    else {
        if (!childCategory) {
            payload = yield (0, typeorm_1.getRepository)(content_1.Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.parentCategory = :parentCategory', { parentCategory: parentCategory })
                .andWhere('content.title like :searching', { searching: '%' + searching + '%' })
                .getMany();
        }
        else {
            payload = yield (0, typeorm_1.getRepository)(content_1.Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.childCategory = :childCategory', { childCategory: childCategory })
                .andWhere('content.title like :searching', { searching: '%' + searching + '%' })
                .getMany();
        }
    }
    payload.reverse();
    //pagenation
    const pageCount = Math.floor(payload.length / 10) + 1;
    if (pageCount < Number(page) || Number(page) < 1)
        return res.status(404).json({ message: 'page query out of range' });
    payload = payload.filter((el, idx) => {
        return Math.floor(idx / 10) + 1 === Number(page);
    });
    return res.status(200).json({ data: payload, pageCount, message: 'ok' });
});
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
    return res.status(201).json({ message: 'Success' });
});
exports.createContent = createContent;
const getContentDetail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentid } = req.params;
    console.log(contentid);
    const payload = yield (0, typeorm_1.getRepository)(content_1.Content)
        .createQueryBuilder('content')
        .select(['content', 'contents.nickname'])
        .leftJoin('content.user', 'contents')
        .where('content.id = :id', { id: contentid })
        .getOne();
    console.log(payload);
    if (!payload)
        return res.status(404).json({ data: [], message: "no Content" });
    return res.status(200).json({ data: payload, message: "ok" });
});
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
// report
const reportContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    const verify = yield (0, authorizeToken_1.authorizeToken)(req, res);
    if (!verify)
        return res.status(403).json({ message: 'Invalid Accesstoken' });
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const contentInfo = yield ContentRepository.findOne({
        where: { id: contentId }
    });
    yield (0, typeorm_1.getConnection)()
        .createQueryBuilder()
        .update(content_1.Content)
        .set({
        report: contentInfo.report + 1
    })
        .where({ id: contentId })
        .execute();
    res.status(200).json({ message: "success" });
});
exports.reportContent = reportContent;
const getReportedContent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ContentRepository = (0, typeorm_1.getRepository)(content_1.Content);
    const contents = yield ContentRepository.find({
        report: (0, typeorm_1.MoreThanOrEqual)(5)
    });
    res.status(200).json({ data: contents, message: "ok" });
});
exports.getReportedContent = getReportedContent;
//# sourceMappingURL=contentController.js.map