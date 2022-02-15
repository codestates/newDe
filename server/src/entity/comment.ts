import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class comment {
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
}