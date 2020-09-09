import { Request, Response, Application } from 'express';
import { getUserChallenges } from '../user.route';
import {Challenge} from "../../entity/Challenge";
import {ChallengeEntry} from "../../entity/ChallengeEntry";



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
        console.log(challenge)
        if(challenge && challenge.user.id !== req.session.userId){
            return res.status(403)
        }

        let c = challenge
        delete c.user

        return res.json({
            success: true,
            challenge: c
        })

    });
}