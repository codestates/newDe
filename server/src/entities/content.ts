import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany} from "typeorm";
import {User} from './user';
import { Comment } from "./comment";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    main: string;    

    @Column({default:null})
    like: number;

    @Column({default:null})
    report: number;

    @Column()
    parentCategory: string;

    @Column()
    childCategory: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date; 
    
<<<<<<< HEAD
    @ManyToOne(() => User, user => user.contents, { onDelete: 'CASCADE' })
    user: User;   
=======
    @ManyToOne(() => User, user => user.contents)
    user: User;

    @Column()
    userId: Number   
>>>>>>> 37b837b0ce1f1304abfc7d18fc4b2c0d4c8646dd

    @OneToMany(() => Comment, comment => comment.content)
    comments:Comment[];

}