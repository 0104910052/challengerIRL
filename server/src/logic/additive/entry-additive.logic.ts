import {Challenge} from "../../entity/Challenge";
import {ELO_REDUCTION_RATE, MAX_ELO} from "../logic.config";
import {calculateDivision} from "../challenge-logic";
import {getChallengeEntries} from "../challenge-general";


const getScore = (currentTotalValue: number, maxValue: number) => {
    return currentTotalValue / maxValue
}
export const calculateEloForNewAdditiveEntry = async (challenge: Challenge, value: any) => {

    const entries = await getChallengeEntries(challenge.id)
    const maxValue = challenge.cutoff
    let currentTotalValue:number = +value


    entries.forEach((entry)=>{
        currentTotalValue = +entry.value + +currentTotalValue
    })

    const totalScore = getScore(currentTotalValue, maxValue)

    const currentScore = getScore(value, maxValue)

    let elo = currentScore * MAX_ELO
    const eloToReduce = elo * (totalScore / ELO_REDUCTION_RATE)
    return Number((elo - eloToReduce).toFixed(2))


}

const calculateTotalElo = async (challenge: Challenge) => {
    const entries = await getChallengeEntries(challenge.id)
    let elo: number = 0
    entries.forEach((entry)=>{
        elo += entry.eloGain
    })

    return elo
}

export const getAdditiveChallengeRank = async (challenge: Challenge) => {
    const totalElo = await calculateTotalElo(challenge)
    const division = calculateDivision(totalElo)
    return {
        totalElo,
        division
    }
}