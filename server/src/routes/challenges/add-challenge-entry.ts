import { Request, Response, Application } from 'express';
import {Challenge} from "../../entity/Challenge";
import {ChallengeEntry} from "../../entity/ChallengeEntry";



export const addChallengeEntry =  ( app: Application ) => {

    app.post( "/challenges", async ( req: Request, res: Response ) => {
        console.log(req.body)
        ChallengeEntry.create({
            challenge: req.body.challengeId,
            value: req.body.value,
            date: req.body.date
        })
            .save()
            .then(e=>{
                if(e){
                    return res.json({
                        success: true,
                        entry: e
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