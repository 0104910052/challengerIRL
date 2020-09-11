import React, {useEffect, useState} from 'react';
import axios from 'axios'
import { useLocation } from 'react-router-dom';
import {Button, Form, FormFeedback, FormGroup, Input, Label, ListGroup, ListGroupItem} from 'reactstrap';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import RankImage from "../generic/rank-image";

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
    const [entryDate, setEntryDate] = useState<Date | null | [Date, Date]>(new Date());

    const [entryValue, setEntryValue] = useState(0)

    useEffect(()=>{
        const challengeId = location.pathname.split('/')[2]
        setChallengeId(challengeId)
        axios.get('http://localhost:4000/challenges/' + challengeId, {withCredentials: true})
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.challenge)
                    setChallenge(res.data.challenge)
                    if(res.data.challenge.type === 'abstinence'){
                        setEntryValue(-1)
                    }
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
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


    const onSubmit = (e: any) => {
        e.preventDefault()

        axios.post('http://localhost:4000/challenges', {challengeId, value: entryValue, date: entryDate}, {withCredentials: true})
            .then(res=>{
                setChallenge({...challenge, challengeEntries: res.data.entries})
                console.log(challenge)
            })
            .catch(e=>{
                console.log(e)
            })
    }

    return (
        <div className={'container-fluid'}>
            <div className={'row'}>

                    <div className={'col-3'}>
                        <RankImage challenge={challenge} />
                    </div>
                    <div className={'col-4 offset-1 p-0'}>

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
                                challenge.challengeEntries.map((entry, i)=>{
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


            </div>

            {/*<div>*/}
            {/*    <legend className={'mt-4'}>Add entry</legend>*/}
            {/*    <div className={'col-2 offset-5 text-align-left'}>*/}
            {/*        <Form onSubmit={onSubmit}>*/}
            {/*            {*/}
            {/*                challenge.type !== 'abstinence' &&*/}
            {/*                <FormGroup>*/}
            {/*                    <Label for="mail" className={'mt-2'}>Value</Label>*/}
            {/*                    <Input  onChange={onEntryValueChange} type="text" name="entryValue" />*/}
            {/*                </FormGroup>*/}
            {/*            }*/}
            {/*            {*/}
            {/*                challenge.type === 'abstinence' &&*/}
            {/*                <FormGroup>*/}
            {/*                    <Label for="i" className={'mt-2 text-danger text-115'}>Abstinence interrupted</Label>*/}
            {/*                </FormGroup>*/}
            {/*            }*/}
            
            {/*            <FormGroup>*/}
            {/*                <div>*/}
            {/*                    <Label for="mail" className={'m-0'}>Date</Label>*/}
            {/*                </div>*/}
            {/*                <DatePicker selected={entryDate as Date} onChange={date => date && setEntryDate(date)} />*/}
            {/*            </FormGroup>*/}
            {/*            <Button type={'submit'} className={'my-4'} block color="primary" disabled={entryValue === 0}>Add entry</Button>*/}
            {/*        </Form>*/}
            {/*    </div>*/}
            {/*</div>*/}
            {/*<div className={'col-2 offset-5'}>*/}
            {/*    <legend>Entries</legend>*/}
            {/*    <ListGroup>*/}
            {/*    {*/}
            {/*            challenge.challengeEntries.map((e:any)=>{*/}
            {/*                return (*/}
            {/*                    <ListGroupItem>*/}
            {/*                            <div>*/}
            {/*                                {e.value}*/}
            {/*                            </div>*/}
            {/*                        <div>*/}
            {/*                            {e.date && new Date(e.date).toLocaleDateString("en-US", dateOptions)}*/}
            {/*                        </div>*/}
            {/*                    </ListGroupItem>*/}
            {/*                )*/}
            {/*            })*/}
            {/*        }*/}
            {/*    </ListGroup>*/}
            {/*</div>*/}
        </div>
    );
};

export default Challenge;