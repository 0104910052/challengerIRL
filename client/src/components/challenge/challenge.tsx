import React, {useEffect, useState} from 'react';
import axios from 'axios'
import {useHistory, useLocation } from 'react-router-dom';
import {Button, Form, FormFeedback, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import RankImage from "../generic/rank-image";
import EloHistory from './histsory';
import InputValue from "./input-value";
import DivisionGraph from "./division-graph";
import {apiUri} from "../../env_config";

const Challenge = () => {

    const location = useLocation()
    const [challenge, setChallenge ] = useState({
        createdAt: new Date(),
        division: {
            totalElo: 0,
            division: ''
        },
        title: '',
        type: '',
        cutoff: 0,
        challengeEntries: [{} as any]
    })
    const [challengeId, setChallengeId] = useState('')
    const history = useHistory()


    const onSubmit = (entryValue: number, entryDate: Date):void => {
        // e.preventDefault()

        axios.post(apiUri + 'challenges', {challengeId, value: entryValue, date: entryDate}, {withCredentials: true})
            .then(res=>{
                setChallenge(res.data.challenge)
                console.log(res.data)
            })
            .catch(e=>{
                console.log(e)
            })
    }

    const onChallengeDelete = (challengeId: string) => {
        axios.delete(apiUri + 'challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    history.push('/dashboard')
                }
            })
    }

    const onEntryDelete = (entryId: string) => {
        axios.delete(apiUri + 'challenges/entry/' + entryId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    setChallenge(res.data.challenge)
                }
            })
    }


    useEffect(()=>{
        const challengeId = location.pathname.split('/')[2]
        setChallengeId(challengeId)
        axios.get(apiUri + 'challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.challenge)
                    console.log(res.data)
                    setChallenge(res.data.challenge)

                }
            })
            .catch(e=>{
                console.log(e)
            })
    }, [])

    return (
        <div className={'container-fluid'}>
            <div className={'row'}>
                    <div className={'col-3'}>
                        <RankImage onChallengeDelete={onChallengeDelete} challenge={challenge} />
                    </div>
                    <div className={'col-4 offset-1 p-0'}>

                        <div className="row">
                            <EloHistory onEntryDelete={onEntryDelete} challengeEntries={challenge.challengeEntries}  />
                        </div>
                    </div>
                <div className={'col-2 offset-1 p-0'}>

                    <div className="row">
                        <DivisionGraph challengeEntries={challenge.challengeEntries} createdAt={challenge.createdAt}/>
                        <InputValue onSubmit={onSubmit} challenge={challenge}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Challenge;