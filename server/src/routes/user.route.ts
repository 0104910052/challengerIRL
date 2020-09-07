import {Application, Request, Response} from "express";
import {User} from "../entity/User";

export const user =  ( app: Application ) => {

    app.get( "/user", async ( req: Request, res: Response ) => {
        console.log(req.session.userId)
        await User.findOne({id: req.session.userId})
            .then((u)=>{
                if(u){
                    const user = { id: u.id, name: u.name, mail: u.mail}
                    return res.json({ user })
                }
                return res.json({success: false})
            })
    });

}