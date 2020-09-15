import { Request, Response, Application } from 'express';
import {Challenge} from "../../../entity/Challenge";



export const addChallenge =  ( app: Application ) => {

    app.post( "/challenges/add", async ( req: Request, res: Response ) => {
        Challenge.create({
            user: req.session.userId,
            title: req.body.title,
            type: req.body.type,
            cutoff: parseInt(req.body.cutoff),
            createdAt: new Date()
        })
            .save()
            .then((challenge: any)=>{
                return res.json({success: true, challenge})
            })
            .catch((e:Error)=>{
                console.log(e)
            })
            .finally(()=>{
                return res.status(500)
            })
    } );
}