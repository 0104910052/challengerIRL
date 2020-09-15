import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label, ListGroup, ListGroupItem} from "reactstrap";
import DatePicker from 'react-datepicker'

interface InputValueProps {
    onSubmit: (entryValue: number, entryDate: Date) => void;
    challenge: any;

}

const InputValue: React.FC<InputValueProps> = ({onSubmit, challenge}:InputValueProps) => {


    const [entryDate, setEntryDate] = useState<Date | null | [Date, Date]>(new Date());

    const [entryValue, setEntryValue] = useState(0)
    const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


    const onEntryValueChange = (e: any) => {
        if(e !== '' && !isNaN(e.target.value)){
            setEntryValue(e.target.value)
        }else{
            setEntryValue(0)
        }
    }

    useEffect(()=>{
        if(challenge.type === 'abstinence'){
            setEntryValue(-1)
        }
    },[])



    const submit = (e:any) => {
        e.preventDefault()
        onSubmit(entryValue, entryDate as Date)
    }


    return (
        <div className={'col-12'}>
            <h3 className={'mt-5'}>Add new entry</h3>

                <div className={'col-12 text-align-left'}>

                    <Form onSubmit={submit}>
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
    );
};

export default InputValue;