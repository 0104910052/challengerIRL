import { Request, Response, Application, NextFunction } from 'express';
import validator from 'validator';
import {isEmpty} from "../../../is-empty";
import {User} from "../../entity/User";
const bcrypt = require('bcrypt');


export const login =  ( app: Application ) => {

    app.post( "/auth/login", async ( req: Request, res: Response ) => {

        const { mail, password } = req.body
        const user = await User.findOne({mail})

        if(!user){
            return res.json({
                success: false,
                errors: {
                    mail: {
                        valid: false,
                        message: 'User not registered or invalid mail'
                    }
                }
            })
        }else{
            await bcrypt.compare(password, user.password, function(err:Error, result:boolean) {
                if(result){
                    req.session.userId = user.id
                    return res.json({
                        success: true,
                        user: user
                    })
                }

                return res.json({
                    success: false,
                    errors: {
                        password: {
                            valid: false,
                            message: 'Password incorrect'
                        }
                    }
                })
            });
        }





    } );


}