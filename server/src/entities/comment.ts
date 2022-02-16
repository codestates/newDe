import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
import { User } from "./user"
import { Content } from "./content";

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    main: string;

    @Column()
    like: number;

    @Column()
    report: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;

    @ManyToOne(()=> User, user=> user.comments)
    user: User;

    @ManyToOne(()=> Content, content=> content.comments)
    content: Content;

}
