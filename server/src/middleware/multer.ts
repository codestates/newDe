import multer from 'multer';
import path from 'path';

const upload = multer({
    storage : multer.diskStorage({
        //저장할 장소
        destination(req, file, cb) {
            cb(null, 'src/imageStorage');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);//파일의 확장자
            //파일명이 절대 겹치지 않도록 해야한다.
            //파일이름 + 현재시간밀리초 + 파일 확장자명
            cb(null,path.basename(file.originalname,ext)+Date.now()+ext);
        }
    }),
    limits:{fileSize:5*1024*1024}
})

export default upload;