import React from 'react';

interface Challenge {
    challengeEntries: any[]
}

const EloHistory: React.FC<Challenge> = ({challengeEntries}:Challenge) => {

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
                </tr>
                </thead>
                <tbody>

                {
                    challengeEntries.map((entry, i)=>{
                        return (
                            <tr>
                                <th scope="row">{++i}</th>
                                <td>{entry.eloGain}</td>
                                <td>{entry.date && new Date(entry.date).toLocaleDateString("en-US", dateOptions)}</td>
                                <td>{entry.value}</td>
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