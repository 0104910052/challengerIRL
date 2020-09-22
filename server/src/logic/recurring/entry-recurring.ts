import {Challenge} from "../../entity/Challenge";
import {MAX_ELO} from "../../../../shared/logic.config";

export const calculateEloForNewRecurringEntry = async (challenge: Challenge, value: number) => {

    const maxValue = challenge.cutoff
    const score =   value / maxValue
    const elo = MAX_ELO * score
    return elo
}

export const getRecurringChallengeRank = async (challenge: Challenge) => {


}