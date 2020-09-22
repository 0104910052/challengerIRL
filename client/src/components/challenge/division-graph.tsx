import React, {FC, useEffect, useState} from 'react';
import {Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";
import {calculateDivision} from "../../../../shared/calculate-division";

interface Challenge {
    challengeEntries: any[];
    createdAt: Date;
}


const DivisionGraph: FC<Challenge> = ({challengeEntries, createdAt}: Challenge) => {

    let options = {
        year: "2-digit",
        month: "2-digit",
        day: "numeric"
    };

    const [data, setData] = useState<{ time: number, elo: number }[]>([])

    useEffect(()=>{

        if(challengeEntries && challengeEntries.length > 0){
            let sortedEntries: Map<string, number> = new Map()
            if(challengeEntries.length > 1){
                for(let i = 0; i < challengeEntries.length; i++){
                    const dateString = new Date(challengeEntries[i].date).toDateString()
                    if(sortedEntries.has(dateString)){
                        sortedEntries.set(dateString, sortedEntries.get(dateString) + challengeEntries[i].eloGain)
                    }else{
                        sortedEntries.set(dateString, challengeEntries[i].eloGain)
                    }
                }
            }


            let plotData: { time: string, elo: number }[] = []

            let sum = 0;

            let dateSortedEntries:{date: Date, value: number}[] = []

            sortedEntries.forEach((value, key)=>{
                dateSortedEntries.push({date: new Date(key), value: value})
            })

            dateSortedEntries.sort( (a,b)=>a.date.getTime()- b.date.getTime())


            for(let i =0; i < dateSortedEntries.length; i++){
                plotData.push({
                    time: dateSortedEntries[i].date.toLocaleDateString("en-US", options),
                    elo: Math.floor((sum + dateSortedEntries[i].value))
                })
                sum += dateSortedEntries[i].value
            }
            setData(plotData as any)
        }

    },[challengeEntries])

    return (
        <div className={'mt-5'}>
            <h3>Division graph</h3>

            {
                challengeEntries.length > 1  &&
                <ResponsiveContainer width={350} height={400}>
                    <AreaChart data={data}>
                        <XAxis dataKey="time" height={80} label={'Date'}/>
                        <YAxis dataKey="elo" tickFormatter={(elo)=>{
                            return calculateDivision(elo)

                        } } />
                        <Tooltip label={'Days'} />
                        <Area
                            type="monotone"
                            dataKey="elo"
                            name="Elo gain"
                            stroke="rgba(37, 237, 237, 0.7)"
                            fill="rgba(37, 237, 237, 0.1)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            }
        </div>
    );
};

export default DivisionGraph;