import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class img {
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
}