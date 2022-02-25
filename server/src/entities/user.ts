import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Content} from './content';
import {Comment} from './comment';

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

    @Column({default:false})
    kakao: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Content, content=>content.user)
    contents: Content[];

    @OneToMany(()=> Comment, conment=>conment.user)
    comments: Comment[];
}