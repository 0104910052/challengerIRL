import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./User";
import {Challenge} from "./Challenge";

@Entity()
export class ChallengeEntry extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @ManyToOne(type => Challenge, challenge => challenge.challengeEntries)
    challenge: Challenge;

    @Column({type: 'real'})
    value: number;

    @Column()
    date: Date;

    @Column({type: 'real'})
    eloGain: number;
}