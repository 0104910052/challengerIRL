import React from 'react';
import delIcon from '../../assets/delete.svg'

interface Challenge {
    challengeEntries: any[],
    onEntryDelete: (entryId: string) => void
}

const EloHistory: React.FC<Challenge> = ({challengeEntries, onEntryDelete}:Challenge) => {

    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


    return (
        <div className="col-12">
            <div className={'mt-5'}>
                <h2>History</h2>

            </div>
            <table className="table mt-4">

                <thead className="thead-dark">
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Elo gains</th>
                    <th scope="col">Date</th>
                    <th scope="col">Value</th>
                    <th scope="col"></th>

                </tr>
                </thead>
                <tbody>

                {   challengeEntries &&
                    challengeEntries.map((entry, i)=>{
                        return (
                            <tr>
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