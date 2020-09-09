import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from 'reactstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const Challenge = () => {

    const location = useLocation()
    const [challenge, setChallenge ] = useState({
        title: '',
        type: '',
        cutoff: 0
    })
    const [challengeId, setChallengeId] = useState('')
    const [challengeEntries, setChallengeEntries] = useState([])
    const [entryDate, setEntryDate] = useState<Date | null | [Date, Date]>(new Date());

    const [entryValue, setEntryValue] = useState(0)

    useEffect(()=>{
        const challengeId = location.pathname.split('/')[2]
        setChallengeId(challengeId)
        axios.get('http://localhost:4000/challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    setChallenge(res.data.challenge)
                }
            })
            .catch(e=>{
                console.log(e)
            })
    }, [])

    const onEntryValueChange = (e: any) => {
        if(e !== ''){
            setEntryValue(e.target.value)
        }else{
            setEntryValue(0)
        }
    }


    const onSubmit = (e: any) => {
        e.preventDefault()
        axios.post('http://localhost:4000/challenges', {challengeId, value: entryValue, date: entryDate}, {withCredentials: true})
            .then(res=>{
                console.log(res)
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
                </div>
            </div>

            <div>
                <legend className={'mt-4'}>Add entry</legend>
                <div className={'col-2 offset-5 text-align-left'}>
                    <Form onSubmit={onSubmit}>
                        <FormGroup>
                            <Label for="mail" className={'m-0'}>Value</Label>
                            <Input  onChange={onEntryValueChange} type="text" name="entryValue" />
                        </FormGroup>
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
        </div>
    );
};

export default Challenge;