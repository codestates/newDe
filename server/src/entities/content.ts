import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn} from "typeorm";

@Entity()
export class Content {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    main: string;

    @Column()
    userId: number;

    @Column()
    like: number;

    @Column()
    report: number;

    @Column()
    parentCategory: string;

    @Column()
    childCategory: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}