import { Request, Response, Application } from 'express';
import { getUserChallenges } from '../../user.route';
import {getChallengeRank} from "../../../logic/challenge-logic";
import {getChallenge} from "../../../logic/challenge-general";



export const getChallenges =  ( app: Application ) => {
    app.get( "/challenges", async ( req: Request, res: Response ) => {
        let challenges = await getUserChallenges(req.session.userId)

        for(let i = 0; i < challenges.length; i++){
            challenges[i].division = await getChallengeRank(challenges[i])
        }


        if(challenges){
            return res.json({
                success: true,
                challenges
            })
        }

        return res.status(403)
    });


    app.get( "/challenges/:id", async ( req: Request, res: Response ) => {
        const challenge = await getChallenge(req.params.id, true)

        return res.json({
            success: true,
            challenge: challenge
        })

    });
}