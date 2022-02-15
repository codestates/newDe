import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class ContentImg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contentId: number;

    @Column()
    imgId: number;
}