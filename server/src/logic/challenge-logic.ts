import {Challenge} from "../entity/Challenge";
import {calculateEloForNewAdditiveEntry, getAdditiveChallengeRank} from "./additive/entry-additive.logic";
import {calculateEloForNewRecurringEntry} from "./recurring/entry-recurring";





export const calculateEloForNewEntry = (challenge: Challenge, value: number) => {
    if(challenge.type === 'additive'){
        return calculateEloForNewAdditiveEntry(challenge, value)
    }
    if(challenge.type === 'recurring'){
        return calculateEloForNewRecurringEntry(challenge, value)
    }
}


export const getChallengeRank = async (challenge: Challenge) => {
    let rank = {}

    if(challenge.type === 'additive'){
        rank = await getAdditiveChallengeRank(challenge)
    }
    // if(challenge.type === 'recurring'){
    //     rank = await getRecurringChallengeRank(challenge)
    // }
    return rank
}


