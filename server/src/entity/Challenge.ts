import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";

@Entity()
export class Challenge extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(type => User, owner => owner.challenges)
    owner: User;

    @Column()
    type: string;

    @Column()
    cutoff: number;

    @Column()
    title: string;



}