import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class contentImg {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    contentId: number;

    @Column()
    imgId: number;
}