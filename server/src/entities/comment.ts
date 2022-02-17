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

    @ManyToOne(()=> User, user=> user.comments, { onDelete: 'CASCADE' })
    user: User;

<<<<<<< HEAD
    @ManyToOne(()=> Content, content=> content.comments, { onDelete: 'CASCADE' })
=======
    @Column()
    userId: Number   

    @ManyToOne(()=> Content, content=> content.comments)
>>>>>>> 37b837b0ce1f1304abfc7d18fc4b2c0d4c8646dd
    content: Content;

    @Column()
    contentId: Number 

    

}
