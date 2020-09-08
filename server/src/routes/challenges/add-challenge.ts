import { Request, Response, Application } from 'express';



export const addChallenge =  ( app: Application ) => {

    app.post( "/challenges/add", async ( req: Request, res: Response ) => {
        console.log(req.body)

    } );


}