import { Request, Response, Application } from 'express';
import { getUserChallenges } from '../user.route';
import {Challenge} from "../../entity/Challenge";
import {ChallengeEntry} from "../../entity/ChallengeEntry";
import {getChallengeRank} from "./logic/challenge-logic";



export const getChallenges =  ( app: Application ) => {
    app.get( "/challenges", async ( req: Request, res: Response ) => {
        const challenges = await getUserChallenges(req.session.userId)




        if(challenges){
            return res.json({
                success: true,
                challenges
            })
        }

        return res.status(403)
    });


    app.get( "/challenges/:id", async ( req: Request, res: Response ) => {


        const challenge = await Challenge.findOne({relations: ['user'], where: {id: req.params.id}})
        if(challenge && challenge.user.id !== req.session.userId){
            return res.status(403)
        }

        const division = await getChallengeRank(challenge)


        let c:any  = challenge
        delete c.user

        const challengeEntries = await ChallengeEntry.find({where: {challenge: req.params.id}})
        c.challengeEntries = challengeEntries


        c.division = division


        return res.json({
            success: true,
            challenge: c
        })

    });
}