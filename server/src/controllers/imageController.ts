import { Request, Response } from "express";
import { toEditorSettings } from "typescript";

const saveImage = (req:Request, res:Response) => {
    const IMG_URL = `https://server.newb-d.com/${req.file.filename}`;

    res.json({url:IMG_URL});
};

export default saveImage;

