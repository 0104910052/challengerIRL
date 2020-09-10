import {Challenge} from "../../../entity/Challenge";
import {ChallengeEntry} from "../../../entity/ChallengeEntry";
import {calculateEloForNewAdditiveEntry, getAdditiveChallengeRank} from "./additive/entry-additive.logic";
import {divisions, higherDivisions, MASTER_CUTOFF, MAX_ELO} from "./logic.config";


export const getChallengeEntries = async (challengeId: string) => {

    const entries = await  ChallengeEntry.find({ where: {challenge: challengeId}})
    return entries

}


export const calculateEloForNewEntry = (challenge: Challenge, value: number) => {
    if(challenge.type === 'additive'){
        return calculateEloForNewAdditiveEntry(challenge, value)
    }
}

export const getChallengeRank = async (challenge: Challenge) => {
    let rank = {}

    if(challenge.type === 'additive'){
        rank = await getAdditiveChallengeRank(challenge)
    }

    return rank

}

export const calculateDivision = (totalElo: number) => {
    const divisionEloRange = MASTER_CUTOFF / divisions.length
    const divisionIndex = Math.round(totalElo / divisionEloRange) - 1
    let division: string



    if(divisionIndex >= divisions.length){
        console.log('master and higher')
        const masterToChallengerRange = MAX_ELO - MASTER_CUTOFF
        const higherDivisionEloRange = masterToChallengerRange / higherDivisions.length
        const higherDivisionIndex = Math.round( (totalElo - MASTER_CUTOFF) / higherDivisionEloRange)

        if(higherDivisionIndex < higherDivisions.length){
            division = higherDivisions[higherDivisionIndex]
        }else{
            division = higherDivisions[higherDivisions.length - 1]
        }


    }else{
        division = divisions[divisionIndex]
    }

    return division

}