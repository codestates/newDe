import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user"
import { Content } from "./content";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    main: string;

    @Column({default:null})
    like: number;

    @Column({default:null})
    report: number;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> User, user=> user.comments, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: Number   

    @ManyToOne(()=> Content, content=> content.comments)
    content: Content;

    @Column()
    contentId: Number 

    

}
