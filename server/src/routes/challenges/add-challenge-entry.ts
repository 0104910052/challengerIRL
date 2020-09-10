import { Request, Response, Application } from 'express';
import {Challenge} from "../../entity/Challenge";
import {ChallengeEntry} from "../../entity/ChallengeEntry";
import {calculateEloForNewEntry, getChallengeEntries} from "./logic/challenge-logic";



export const addChallengeEntry =  ( app: Application ) => {

    app.post( "/challenges", async ( req: Request, res: Response ) => {
        console.log(req.body)

        const challenge = await Challenge.findOne({id: req.body.challengeId})

        const elo = await calculateEloForNewEntry(challenge, req.body.value);

        console.log(elo)

        ChallengeEntry.create({
            challenge: req.body.challengeId,
            value: +req.body.value,
            date: req.body.date,
            eloGain: elo
        })
            .save()
            .then( async (e)=>{
                if(e){
                    const entries = await getChallengeEntries(req.body.challengeId)
                    return res.json({
                        success: true,
                        entries
                    })
                }
                return res.status(403)
            })
            .catch(e=>{
                console.log(e)
            })
            .finally(()=>{
                return res.status(500)
            })
    });
}