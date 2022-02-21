import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
import {Content} from './content';

@Entity()
export class Img {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    url: string;

    @Column()
    alt: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @ManyToMany(()=> Content )
    @JoinTable()
    contents: Content[];
}
