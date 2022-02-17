import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import {Content} from './content';
import {Comment} from './comment';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nickName: string;

    @Column()
    email: string;

    @Column({default:null})
    joinType: string;

    @Column({type:'timestamp', default:null})
    penalty: string;

    @Column()
    password: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(()=> Content, content=>content.user)
    contents: Content[];

    @OneToMany(()=> Comment, conment=>conment.user)
    comments: Comment[];
}