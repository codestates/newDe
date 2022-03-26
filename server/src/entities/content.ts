import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import {User} from './user';
import { Comment } from "./comment";
import { ContentLike } from "./contentLike";
import { ContentReport } from "./contentReport";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({})
    title: string;

    @Column({type: 'mediumtext'})
    main: string;    

    @Column({default:0})
    like: number;

    @Column({default:0})
    report: number;

    @Column({default:null})
    parentCategory: string;

    @Column({default:null})
    childCategory: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date; 
    
    @ManyToOne(() => User, user => user.contents)
    user: User;

    @Column()
    userId: Number   

    @OneToMany(() => Comment, comment => comment.content)
    comments:Comment[];

    @OneToMany(()=> ContentLike, contentLike=>contentLike.user)
    contentLikes: ContentLike[];

    @OneToMany(()=> ContentReport, contentReport=>contentReport.user)
    contentReports: ContentReport[];

}
