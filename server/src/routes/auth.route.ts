import { Request, Response, Application, NextFunction } from 'express';
import validator from 'validator';
import {isEmpty} from "../../is-empty";
import {User} from "../entity/User";
const bcrypt = require('bcrypt');


export const register =  ( app: Application ) => {



    app.post( "/auth/register", async ( req: Request, res: Response ) => {
        console.log(req.session.userId)

        if(isEmpty(req.body.mail) || !validator.isEmail(req.body.mail) ){
            return res.json({success: false, message: 'Invalid email'})
        }


        return await User.findOne({mail: req.body.mail})
            .then((u)=>{
                if(u !== undefined){
                    return res.json({success: false, message: {mail: 'Email already in use.'}})
                }else{
                     const hash = bcrypt.hash(req.body.password, 10, function(err:Error, h:string) {
                         const user = User.create({mail: req.body.mail, password: h, name: req.body.name})
                         user.save()
                             .then(u=>{
                                 req.session.userId = u.id
                                 const user = { id: u.id, name: u.name, mail: u.mail}
                                 return res.json({success: true, user })
                             })
                             .catch((e)=>{
                                 return res.json({success: false})
                             })
                    });
                }
            }).catch(e=>{
                return res.json({success: false})
            })
    } );
}