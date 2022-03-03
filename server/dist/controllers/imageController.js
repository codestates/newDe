"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const saveImage = (req, res) => {
    //const IMG_URL = `https://server.newb-d.com/${req.file.filename}`;
    const IMG_URL = `http://localhost:4000/${req.file.filename}`;
    res.json({ url: IMG_URL });
};
exports.default = saveImage;
//# sourceMappingURL=imageController.js.map