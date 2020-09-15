import {divisions, higherDivisions, MASTER_CUTOFF, MAX_ELO} from "./logic.config";




export const calculateDivision = (elo: number) => {


    const divisionEloRange = MASTER_CUTOFF / divisions.length

    if(elo < divisionEloRange) {
        return 'Iron IV'
    }


    const divisionIndex = Math.round(elo / divisionEloRange) - 1
    let division: string



    if(divisionIndex >= divisions.length){
        const masterToChallengerRange = MAX_ELO - MASTER_CUTOFF
        const higherDivisionEloRange = masterToChallengerRange / higherDivisions.length
        const higherDivisionIndex = Math.round( (elo - MASTER_CUTOFF) / higherDivisionEloRange)

        if(higherDivisionIndex < higherDivisions.length){
            division = higherDivisions[higherDivisionIndex]
        }else{
            division = higherDivisions[higherDivisions.length - 1]
        }


    }else{
        division = divisions[divisionIndex]
    }
    return division
}