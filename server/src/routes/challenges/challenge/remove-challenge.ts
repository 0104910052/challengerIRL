import { Request, Response, Application } from 'express';
import {ChallengeEntry} from "../../../entity/ChallengeEntry";
import {getConnection} from "typeorm";
import {getChallenge, getChallengeOfEntry} from "../../../logic/challenge-general";
import {Challenge} from "../../../entity/Challenge";



export const removeChallenge =  (app: Application ) => {

    app.delete( "/challenges/:id", async ( req: Request, res: Response ) => {
        console.log('delete challenge getting hit')

        const deleteRes = await getConnection()
            .createQueryBuilder()
            .delete()
            .from(Challenge)
            .where("id = :id", { id: req.params.id })
            .execute();


        if(deleteRes.affected > 0){
            return res.json({
                success: true
            })
        }


    });
}