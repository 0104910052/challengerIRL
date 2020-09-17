import React, {useEffect} from 'react';
import delIcon from '../../assets/delete.svg'

interface Challenge {
    challengeEntries: any[],
    onEntryDelete: (entryId: string) => void
}

const EloHistory: React.FC<Challenge> = ({challengeEntries, onEntryDelete}:Challenge) => {

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

    useEffect(()=>{
        challengeEntries.sort((a,b)=>new Date(a.date).getTime()- new Date(b.date).getTime()).reverse()
    },[challengeEntries])


    return (
        <div className="col-12">
            <div className={'mt-5'}>
                <h2>History</h2>

            </div>
            <table className="table mt-4">

                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Elo gain</th>
                    <th scope="col">Date</th>
                    <th scope="col">Value</th>
                    <th scope="col"> </th>

                </tr>
                </thead>
                <tbody>

                {   challengeEntries &&
                    challengeEntries.map((entry, i)=>{
                        let rowBgColor: string

                        if(entry.eloGain > 0){
                            const progressBalancer = 30
                            const percent = entry.eloGain / 2000 * (entry.eloGain > 35 ? progressBalancer / 1.5 : progressBalancer)
                            rowBgColor = `rgba(64, 255, 0, ${percent})`
                        }else{
                            const percent = (entry.eloGain * -1) / 2000 * 20
                            rowBgColor = `rgba(255, 0, 0, ${percent})`
                        }


                        return (
                            <tr style={{backgroundColor: rowBgColor}}>
                                <th scope="row">{++i}</th>
                                <td>{entry.eloGain}</td>
                                <td>{entry.date && new Date(entry.date).toLocaleDateString("en-US", dateOptions)}</td>
                                <td>{entry.value}</td>
                                <td><img onClick={()=> onEntryDelete(entry.id)} className={'history-delete-icon'} src={delIcon} alt=""/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
        </div>
    );
};

export default EloHistory;