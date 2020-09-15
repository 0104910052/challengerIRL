import React, {FC, useEffect, useState} from 'react';
import {XYPlot, XAxis, YAxis, HorizontalGridLines, LineSeries} from 'react-vis';

interface Challenge {
    challengeEntries: any[];
    createdAt: Date;
}


const DivisionGraph: FC<Challenge> = ({challengeEntries, createdAt}: Challenge) => {


    const getDiffInDays = (baseDay: Date, offsetDay: Date):number =>{
        const diff = Math.abs(new Date(baseDay).getTime() - new Date(offsetDay).getTime());
        return  Math.ceil(diff / (1000 * 3600 * 24));
    }

    const [data, setData] = useState<{ x: number, y: number }[]>([])

    useEffect(()=>{

        if(challengeEntries.length > 0){
            let sortedEntries: Map<string, number> = new Map()
            if(challengeEntries.length > 1){
                for(let i = 0; i < challengeEntries.length; i++){
                    const dateString = challengeEntries[i].date.split('T')[0]
                    if(sortedEntries.has(dateString)){
                        sortedEntries.set(dateString, sortedEntries.get(dateString) + challengeEntries[i].eloGain)
                    }else{
                        sortedEntries.set(dateString, challengeEntries[i].eloGain)
                    }
                }
            }

            console.log(sortedEntries)

            let plotData: { x: number, y: number }[] = []
            sortedEntries.forEach((value, key)=>{
                plotData.push({
                    x: getDiffInDays(createdAt, new Date(key)),
                    y: value
                })
            })
            setData(plotData)
        }

    },[challengeEntries])

    return (
        <div className={'mt-5'}>
            <h3>Division graph</h3>
            {
                <XYPlot
                    width={400}
                    height={300}>
                    <HorizontalGridLines />
                    <LineSeries
                        data={data}/>
                    <XAxis />
                    <YAxis />
                </XYPlot>
            }


        </div>
    );
};

export default DivisionGraph;