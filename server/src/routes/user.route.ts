import {Application, Request, Response} from "express";
import {User} from "../entity/User";
import {Challenge} from "../entity/Challenge";


export const getUserChallenges = async (userId: string): Promise<Challenge[]> => {
    return await Challenge.find({ relations: ['challengeEntries'], where: {user: userId}})
}

export const user =  ( app: Application ) => {

    /* Get all data for user */
    app.get( "/user", async ( req: Request, res: Response ) => {
        await User.findOne({id: req.session.userId})
            .then(async (u)=>{
                if(u){
                    const user = { id: u.id, name: u.name, mail: u.mail}
                    const challenges = await getUserChallenges(req.session.userId)
                    return res.json({ user, challenges })
                }
                return res.json({success: false})
            })
            .catch(e=>{
                console.log(e)
            })
            .finally(()=>{
                return res.status(500)
            })
    });

}