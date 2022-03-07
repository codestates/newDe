import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "./user"
import { Content } from "./content";
import { CommentReport } from "./commentReport";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({type: 'mediumtext'})
    main: string;

    @Column({default:0})
    like: number;

    @Column({default:0})
    report: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @Column()
    userId: Number   

    @Column()
    contentId: Number 

    @ManyToOne(()=> User, user=> user.comments, { onDelete: 'CASCADE' })
    user: User;


    @ManyToOne(
        (type)=> Content, 
        (content) => content.comments, { nullable: false, onDelete: 'CASCADE'}
    )
    content: Content;

    @OneToMany(()=> CommentReport, commentReport=>commentReport.user)
    commentReports: CommentReport[];
}
