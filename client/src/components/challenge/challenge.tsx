import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {Button, Form, FormFeedback, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import "react-datepicker/dist/react-datepicker.css";
import RankImage from "../generic/rank-image";
import EloHistory from './histsory';
import InputValue from "./input-value";

const Challenge = () => {

    const location = useLocation()
    const [challenge, setChallenge ] = useState({
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


    const onSubmit = (entryValue: number, entryDate: Date):void => {
        // e.preventDefault()

        axios.post('http://localhost:4000/challenges', {challengeId, value: entryValue, date: entryDate}, {withCredentials: true})
            .then(res=>{
                setChallenge({...challenge, challengeEntries: res.data.entries})
                console.log(challenge)
            })
            .catch(e=>{
                console.log(e)
            })
    }




    useEffect(()=>{
        const challengeId = location.pathname.split('/')[2]
        setChallengeId(challengeId)
        axios.get('http://localhost:4000/challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.challenge)
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
                        <RankImage challenge={challenge} />
                    </div>
                    <div className={'col-4 offset-1 p-0'}>

                        <div className="row">
                            <EloHistory challengeEntries={challenge.challengeEntries}  />
                            <InputValue onSubmit={onSubmit} challenge={challenge}/>
                        </div>
                    </div>
                <div className={'col-2 offset-1 p-0'}>

                    <div className="row">
                        <EloHistory challengeEntries={challenge.challengeEntries}  />
                        <InputValue onSubmit={onSubmit} challenge={challenge}/>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default Challenge;