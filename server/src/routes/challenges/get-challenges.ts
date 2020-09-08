import { Request, Response, Application } from 'express';
import { getUserChallenges } from '../user.route';



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
}