import { Request, Response, Application } from 'express';
import {Challenge} from "../../entity/Challenge";



export const addChallenge =  ( app: Application ) => {

    app.post( "/challenges/add", async ( req: Request, res: Response ) => {
        console.log(req.body)
        const challenge = Challenge.create({
            user: req.session.userId,
            title: req.body.title,
            type: req.body.type,
            cutoff: parseInt(req.body.cutoff)
        })
            .save()
            .then((challenge: any)=>{
                return res.json({success: true, challenge})
            })
            .catch((e:Error)=>{
                console.log(e)
            })
    } );
}