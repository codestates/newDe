import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { Content } from './content';
import { User } from './user';

@Entity()
export class ContentReport {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(
        (type) => User,
        (user) => user.contentReports, { nullable: false, onDelete: 'CASCADE'}
    )
    user: User;

    @ManyToOne(
        (type) => Content, 
        (content) => content.contentReports, { nullable: false, onDelete: 'CASCADE'}
    )
    content: Content;
}