import {BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Challenge} from "./Challenge";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @OneToMany(type => Challenge, challenge => challenge.owner)
    challenges: Challenge[]

    @Column()
    name: string;

    @Column()
    mail: string;

    @Column()
    password: string;



}