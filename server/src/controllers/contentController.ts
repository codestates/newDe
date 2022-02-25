import { Request, Response } from "express";
import { createQueryBuilder, getRepository, getConnection, MoreThanOrEqual } from "typeorm";
import { Content } from "../entities/content";
import { authorizeToken } from '../middleware/token/authorizeToken';


const recommentContent = async (req:Request, res:Response) => {
    const { contentId } = req.body;
    const verify = await authorizeToken(req, res)

    

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    const ContentRepository = getRepository(Content)

    const contentInfo = await ContentRepository.findOne({
        where: { id : contentId }
    })

    await getConnection()
    .createQueryBuilder()
    .update(Content)
    .set({
        like: contentInfo.like + 1
    })
    .where({ id : contentId })
    .execute();

    res.status(200).json({ message: "success" })
}

const allContent = async (req:Request, res:Response) => { 
    
    const { searching, parentCategory, childCategory, page } = req.query;
    // query check
    if(!parentCategory || !page) return res.status(404).json({message:'no essential query'}); 

    //find payload with searching and category
    let payload = null;
    if(!searching) {
        if(!childCategory) {
            payload = await getRepository(Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.parentCategory = :parentCategory',{ parentCategory : parentCategory })
                .getMany();     
        } else {
            payload = await getRepository(Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.childCategory = :childCategory',{ childCategory : childCategory })
                .getMany();
        }
    } else {
        if(!childCategory) {
            payload = await getRepository(Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.parentCategory = :parentCategory',{ parentCategory : parentCategory })
                .andWhere('content.title like :searching', { searching : '%'+searching+'%'})
                .getMany();     
        } else {
            payload = await getRepository(Content)
                .createQueryBuilder('content')
                .select(['content', 'contents.nickname'])
                .leftJoin('content.user', 'contents')
                .where('content.childCategory = :childCategory',{ childCategory : childCategory })
                .andWhere('content.title like :searching', { searching : '%'+searching+'%'})
                .getMany();
        }
    }
    payload.reverse();
    
    //pagenation
    const pageCount = Math.floor(payload.length/10)+1;

    if(pageCount < Number(page) || Number(page) < 1) return res.status(404).json({message : 'page query out of range'});
    payload = payload.filter((el:object, idx:number) => {
        return Math.floor(idx/10)+1 === Number(page);
    })    

    return res.status(200).json({data : payload, pageCount, message : 'ok'}); 

}

const createContent = async (req:Request, res:Response) => {
    const { title, main, parentCategory, childCategory } = req.body
    const content = new Content()

    const verify = await authorizeToken(req, res);
    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' });
    //console.log(verify);

    content.title = title;
    content.main = main;
    content.userId = verify.userInfo.id;
    content.parentCategory = parentCategory;
    content.childCategory = childCategory;
    
    const ContentRepository = getRepository(Content)
    
    await ContentRepository.save(content);
    return res.status(201).json({ message: 'Success'})
};

const getContentDetail = async (req:Request, res:Response) => {
    const { contentid } = req.params;

    console.log(contentid)

    const payload = await getRepository(Content)
    .createQueryBuilder('content')
    .select(['content', 'contents.nickname'])
    .leftJoin('content.user', 'contents')
    .where('content.id = :id',{ id : contentid })
    .getOne();     

    console.log(payload)

    if(!payload) return res.status(404).json({ data : [], message: "no Content" })

    return res.status(200).json({ data : payload, message: "ok" })
};

const editContent = async (req:Request, res:Response) => {
    const { title, main, parentCategory, childCategory } = req.body;
    const verify = await authorizeToken(req, res);
    const ContentRepository = getRepository(Content); 
    const targetContent = await ContentRepository.findOne({ id: Number(req.params.contentid) });

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
    if(!targetContent) return res.status(400).json({ message: 'Bad Content' });
    if(!title || !main || !parentCategory || !childCategory) return res.status(400).json({ message: 'Bad Request' });
    if(targetContent.userId !== verify.userInfo.id ) return res.status(400).json({ message: 'different user' })

    targetContent.title = title;
    targetContent.main = main;
    targetContent.parentCategory = parentCategory;
    targetContent.childCategory = childCategory;

    await getConnection()
        .createQueryBuilder()
        .update(Content)
        .set(targetContent)      
        .where({ id: targetContent.id })
        .execute();

        console.log(targetContent)

    return res.status(200).json({ message: "edit success" })
};

const deleteContent = async (req:Request, res:Response) => {
    const verify = await authorizeToken(req, res);
    const ContentRepository = getRepository(Content); 
    const targetContent = await ContentRepository.findOne({ id: Number(req.params.contentid) });

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })
    if(targetContent.userId !== verify.userInfo.id ) return res.status(400).json({ message: 'different user' })

    await ContentRepository.delete(req.params.contentid)

    return res.status(200).json({ message: 'Deleted' })
};

// report
const reportContent = async (req:Request, res:Response) => {
    const { contentId } = req.body;
    const verify = await authorizeToken(req, res)

    if(!verify) return res.status(403).json({ message: 'Invalid Accesstoken' })

    const ContentRepository = getRepository(Content)

    const contentInfo = await ContentRepository.findOne({
        where: { id : contentId }
    })

    await getConnection()
    .createQueryBuilder()
    .update(Content)
    .set({
        report: contentInfo.report + 1
    })
    .where({ id : contentId })
    .execute();

    res.status(200).json({ message: "success" })
};

const getReportedContent = async (req:Request, res:Response) => {
    const ContentRepository = getRepository(Content)

    const contents = await ContentRepository.find({
        report: MoreThanOrEqual(5)
    })

    res.status(200).json({ data: contents, message: "ok" })
}


export {
    recommentContent,
    reportContent,
    allContent,
    createContent,
    getContentDetail,
    editContent,
    deleteContent,
    getReportedContent,
}