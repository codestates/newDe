"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saveImage = (req, res) => {
    const IMG_URL = `${process.env.SERVER_URL}/${req.file.filename}`;
    res.json({ url: IMG_URL });
};
exports.default = saveImage;
//# sourceMappingURL=imageController.js.map