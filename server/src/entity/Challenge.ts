import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Challenge extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(type => User, user => user.challenges)
    user: User;

    @Column()
    type: string;

    @Column()
    cutoff: number;

    @Column()
    title: string;
}