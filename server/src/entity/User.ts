import {BaseEntity, Column, Entity, JoinColumn, OneToMany, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Challenge} from "./Challenge";

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @Column()
    mail: string;

    @Column()
    password: string;

    @OneToMany(type => Challenge, challenge => challenge.user)
    challenges: Challenge[];

}