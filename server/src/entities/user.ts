import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable, ManyToMany} from "typeorm";
import { Content } from './content';
import { Comment } from './comment';
import { ContentLike } from "./contentLike";
import { ContentReport } from "./contentReport";
import { CommentReport } from "./commentReport";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickname: string;

    @Column()
    email: string;
    
    @Column({type:'timestamp', default:null})
    penalty: string;

    @Column()
    password: string;

    @Column({default: false})
    kakao: boolean;

    @Column({default: false})
    admin: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Content, content=>content.user)
    contents: Content[];

    @OneToMany(()=> Comment, conment=>conment.user)
    comments: Comment[];

    @OneToMany(()=> ContentLike, contentLike=>contentLike.user)
    contentLikes: ContentLike[];

    @OneToMany(()=> ContentReport, contentReport=>contentReport.user)
    contentReports: ContentReport[];

    @OneToMany(()=> CommentReport, commentReport=>commentReport.user)
    commentReports: CommentReport[];

}