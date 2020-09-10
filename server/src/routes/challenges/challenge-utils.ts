import {ChallengeEntry} from "../../entity/ChallengeEntry";
import {Challenge} from "../../entity/Challenge";

const MASTER_CUTOFF = 1800

const MAX_ELO = 2000

const getScore = (currentTotalValue: number, maxValue: number) => {
    return currentTotalValue / maxValue
}



export const calculateEloForNewEntry = async (challengeId: string, value: number) => {

    const challenge = await Challenge.findOne({id: challengeId})
    const entries = await getChallengeEntries(challengeId)
    const maxValue = challenge.cutoff
    let currentTotalValue = value
    console.log('current total value start', value)

    entries.forEach((entry, i)=>{
        console.log('entry value: ', entry.value)
        currentTotalValue = +entry.value + currentTotalValue
    })

    console.log('max value ', maxValue)
    console.log('current total value', currentTotalValue)
    const score = getScore(currentTotalValue, maxValue)
    console.log('score', score)
    let elo = score * MAX_ELO
    console.log('elo gain before reduction', elo)
    // elo *= score / 2
    const eloAfterReduction = elo * (score /2)
    console.log('elo after reduction', eloAfterReduction)




    /* 50% at max score */
    const scorePenalty = score / 2



    return elo



}


// const getEloForAdditiveChallenge = async (challenge: Challenge): Promise<number> =>{
//
//     const entries = await getChallengeEntries(challenge.id)
//
//     let currentScore: number = 0
//     const maxScore = challenge.cutoff
//
//     entries.forEach(entry=>{
//         currentScore += entry.value
//     })
//
//
//     const score = getScore(currentScore, maxScore)
//     const elo = score * MAX_ELO
//
//     console.log('maxScore: ', maxScore)
//     console.log('currentScore: ', currentScore)
//     console.log('score: ', score)
//     console.log('elo: ', elo)
//
//     return maxScore
//
// }


export const getChallengeRank = async (challengeId: string) =>{

    const challenge = await Challenge.findOne({id: challengeId})
    let elo: number

    if(challenge.type === 'additive'){
        // elo = await getEloForAdditiveChallenge(challenge)
    }



    console.log('weior')

}


export const getChallengeEntries = async (challengeId: string) => {

    const entries = await  ChallengeEntry.find({ where: {challenge: challengeId}})
    return entries

}