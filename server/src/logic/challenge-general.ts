import {ChallengeEntry} from "../entity/ChallengeEntry";
import {Challenge} from "../entity/Challenge";
import {getChallengeRank} from "./challenge-logic";
import { getRepository} from "typeorm";

export const getChallengeEntries = async (challengeId: string) => {
    return await  ChallengeEntry.find({ where: {challenge: challengeId}})
}

export const getChallenge = async (challengeId: string, withEntries?: boolean) => {
    const challenge = await Challenge.findOne({id: challengeId})
    const entries = await getChallengeEntries(challengeId)
    challenge.division = await getChallengeRank(challenge)
    if(withEntries){
        challenge.challengeEntries = entries
    }
    return challenge
}

export const getChallengeOfEntry = async (entryId: string) =>{
    const entry = await ChallengeEntry.findOne({relations: ['challenge'], where: {id: entryId}})


    return entry.challenge
}