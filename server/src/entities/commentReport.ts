import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Comment } from './comment';
import { User } from './user';

@Entity()
export class CommentReport {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => User, 
        (user) => user.commentReports, { nullable: false, onDelete: 'CASCADE'}
    )
    user: User;

    @ManyToOne(
        (type) => Comment, 
        (comment) => comment.commentReports, { nullable: false, onDelete: 'CASCADE'}
    )
    comment: Comment;
}