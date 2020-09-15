import { Request, Response, Application } from 'express';
import {ChallengeEntry} from "../../../entity/ChallengeEntry";
import {getConnection} from "typeorm";
import {getChallenge, getChallengeOfEntry} from "../../../logic/challenge-general";



export const removeEntry =  (app: Application ) => {

    app.delete( "/challenges/entry/:id", async ( req: Request, res: Response ) => {
        const challenge = await getChallengeOfEntry(req.params.id)

        await getConnection()
            .createQueryBuilder()
            .delete()
            .from(ChallengeEntry)
            .where("id = :id", { id: req.params.id })
            .execute();


        const rankedChallenge = await getChallenge(challenge.id, true)


        if(rankedChallenge){
            return res.json({
                success: true,
                challenge: rankedChallenge
            })
        }

    });
}