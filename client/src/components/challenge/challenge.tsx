import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {Button, Form, FormFeedback, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Challenge = () => {

    const location = useLocation()
    const [challenge, setChallenge ] = useState({
        rank: {
            totalElo: 0,
            division: ''
        },
        title: '',
        type: '',
        cutoff: 0,
        challengeEntries: [{}]
    })
    const [challengeId, setChallengeId] = useState('')
    const [entryDate, setEntryDate] = useState<Date | null | [Date, Date]>(new Date());

    const [entryValue, setEntryValue] = useState(0)

    useEffect(()=>{
        const challengeId = location.pathname.split('/')[2]
        setChallengeId(challengeId)
        axios.get('http://localhost:4000/challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    setChallenge(res.data.challenge)
                    if(res.data.challenge.type === 'abstinence'){
                        setEntryValue(-1)
                    }
                    console.log(challenge)
                }
            })
            .catch(e=>{
                console.log(e)
            })
    }, [])

    const onEntryValueChange = (e: any) => {
        if(e !== '' && !isNaN(e.target.value)){
            setEntryValue(e.target.value)
        }else{
            setEntryValue(0)
        }
    }
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };


    const onSubmit = (e: any) => {
        e.preventDefault()

        axios.post('http://localhost:4000/challenges', {challengeId, value: entryValue, date: entryDate}, {withCredentials: true})
            .then(res=>{
                console.log(res)
                console.log(res.data.entries)
                setChallenge({...challenge, challengeEntries: res.data.entries})
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return (
        <div>
            <div className={'mt-5'}>
                <h3>{challenge.title}</h3>
                <div>
                    {challenge.type}
                    <div>
                        cutoff: {challenge.cutoff}
                    </div>
                    <div>

                    </div>
                </div>
            </div>

            <div>
                <legend className={'mt-4'}>Add entry</legend>
                <div className={'col-2 offset-5 text-align-left'}>
                    <Form onSubmit={onSubmit}>
                        {
                            challenge.type !== 'abstinence' &&
                            <FormGroup>
                                <Label for="mail" className={'mt-2'}>Value</Label>
                                <Input  onChange={onEntryValueChange} type="text" name="entryValue" />
                            </FormGroup>
                        }
                        {
                            challenge.type === 'abstinence' &&
                            <FormGroup>
                                <Label for="i" className={'mt-2 text-danger text-115'}>Abstinence interrupted</Label>
                            </FormGroup>
                        }

                        <FormGroup>
                            <div>
                                <Label for="mail" className={'m-0'}>Date</Label>
                            </div>
                            <DatePicker selected={entryDate as Date} onChange={date => date && setEntryDate(date)} />
                        </FormGroup>
                        <Button type={'submit'} className={'my-4'} block color="primary" disabled={entryValue === 0}>Add entry</Button>
                    </Form>
                </div>
            </div>
            <div className={'col-2 offset-5'}>
                <legend>Entries</legend>
                <ListGroup>
                {
                        challenge.challengeEntries.map((e:any)=>{
                            return (
                                <ListGroupItem>
                                        <div>
                                            {e.value}
                                        </div>
                                    <div>
                                        {e.date && new Date(e.date).toLocaleDateString("en-US", dateOptions)}
                                    </div>
                                </ListGroupItem>
                            )
                        })
                    }
                </ListGroup>
            </div>
        </div>
    );
};

export default Challenge;