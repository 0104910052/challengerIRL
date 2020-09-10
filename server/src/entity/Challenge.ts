import {
    BaseEntity,
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn
} from "typeorm";
import {User} from "./User";
import {ChallengeEntry} from "./ChallengeEntry";

@Entity()
export class Challenge extends BaseEntity{

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(type => User, user => user.challenges)
    user: User;

    @OneToMany(type => ChallengeEntry, challengeEntry => challengeEntry.challenge)
    challengeEntries: ChallengeEntry[];

    @Column()
    type: string;

    @Column()
    cutoff: number;

    @Column()
    title: string;

    @Column()
    createdAt: Date;

}