import React, {FC, useEffect, useState} from 'react';
import { Doughnut } from 'react-chartjs-2';
import {Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts";

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

        if(challengeEntries && challengeEntries.length > 0){
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


            <ResponsiveContainer width={350} height={300}>
                <AreaChart data={data}>
                    <XAxis dataKey="x" height={80} label={'Days elapsed'}/>
                    <YAxis dataKey="y" />
                    <Tooltip label={'Days'} />
                    <Area
                        type="monotone"
                        dataKey="y"
                        name="Elo gain"
                        stroke="rgb(63, 191, 191)"
                        fill="rgba(63, 191, 191, 0.1)"
                    />
                </AreaChart>
            </ResponsiveContainer>

            {/*<LineChart*/}
            {/*    width={400}*/}
            {/*    height={400}*/}
            {/*    data={data}*/}
            {/*    margin={{ top: 5, right: 20, left: 10, bottom: 5 }}*/}
            {/*>*/}

            {/*    <XAxis dataKey="name" />*/}
            {/*    <Tooltip />*/}
            {/*    <CartesianGrid stroke="#f5f5f5" />*/}
            {/*    <Line type="monotone" dataKey="y" stroke="#ff7300" yAxisId={0} />*/}
            {/*</LineChart>*/}


        </div>
    );
};

export default DivisionGraph;