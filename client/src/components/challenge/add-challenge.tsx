import React, {useState} from 'react';
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'

const AddChallenge = () => {

    const [type, setType] = useState({value: 'additive'})
    const [cutoff, setCutoff] = useState(0)
    const [title, setTitle] = useState('')

    const onRadioChange = (e:any) => {
        setType({value: e.target.name})
    }

    const onCutoffChange = (e:any) => {
        if(!isNaN(e.target.value)){
            setCutoff(parseInt(e.target.value))
        }else{
            setCutoff(0)
        }

        if(e.target.value === ''){
            setCutoff(0)
        }
    }

    const onTitleChange = (e: any) => {
        setTitle(e.target.value)
    }

    const onSubmit = (e: any) => {
        e.preventDefault()
        axios.post('http://localhost:4000/challenges/add', {title, type, cutoff}, {withCredentials: true})
            .then(res=>{
                console.log(res)
            })
            .catch(err=>{
                console.log(err)
            })
    }

    return (
        <div className={'container-fluid'}>
            <div className="row">
                <div className={'col-12'}>
                    <div className={'mt-5'}>
                        <h3>
                            Create a new challenge
                        </h3>
                        <h6>Climb the IRL ladder</h6>
                    </div>
                    <div className={'col-2 offset-5 mt-5 text-align-left attention-wrap'}>
                        <Form className={'mt-5'} onSubmit={onSubmit}>
                            <FormGroup>
                                <legend>Challenge title</legend>
                                <Input onChange={onTitleChange} type="text" name="challengeName" />
                            </FormGroup>

                            <FormGroup tag="fieldset" className={'mt-4'}>
                                <legend>Challenge type</legend>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={onRadioChange} checked={type.value === 'additive'} type="radio" name="additive" />
                                        Additive
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={onRadioChange} checked={type.value === 'recurring'} type="radio" name="recurring" />
                                        Recurring
                                    </Label>
                                </FormGroup>
                                <FormGroup check>
                                    <Label check>
                                        <Input onChange={onRadioChange} checked={type.value === 'abstinence'} type="radio" name="abstinence" />
                                        Abstinence
                                    </Label>
                                </FormGroup>
                                <div className={'text-italic mt-1 text-85'}>
                                    {
                                        type.value === 'additive' &&
                                        <div>Achieve a total of the cutoff number to reach challenger.</div>
                                    }
                                    {
                                        type.value === 'recurring' &&
                                        <div>Maintain daily the cutoff number to reach challenger, average is counted on weekly basis.</div>
                                    }
                                    {
                                        type.value === 'abstinence' &&
                                        <div>Achieve the cutoff threshold to reach challenger.</div>
                                    }
                                </div>
                            </FormGroup>
                            <FormGroup className={'mt-4'}>
                                <legend>Challenger cutoff</legend>
                                <Input onChange={onCutoffChange} type="text" name="challengeName" />
                            </FormGroup>
                            <Button disabled={title === '' || cutoff === 0 } type={'submit'} className={'my-5'} block color="primary">Add</Button>

                        </Form>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default AddChallenge;