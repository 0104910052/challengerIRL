import React, {useState} from 'react';
import challenger from "../../assets/rank_challenger.png";
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'


const Login = () => {

    const handleSubmit = (e:any) =>{
        e.preventDefault()
        console.log(mail, password)

    }

    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');

    const onMailChange = (e:any) => {
        setMail(e.target.value)
    }

    const onPasswordChange = (e:any) => {
        setPassword(e.target.value)
    }


    return (
        <div className={'container '}>
            <div className={'row'}>
                <div className={'auth offset-4 col-4 my-5'}>
                    <h1 className={'mt-4'}>Register</h1>
                    <h5 className={'color-secondary'}>ChallengerIRL</h5>
                    <img src={challenger} className={'auth-challenger-img pt-4'} alt=""/>

                    <div className={'align-text-right '}>
                        <Form onSubmit={handleSubmit} className={'mt-4 col-10 offset-1 mb-4 py-4'}>

                            <FormGroup>
                                <Label for="exampleEmail" className={'m-0'}>Email</Label>
                                <Input onChange={onMailChange} type="email" name="email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword" className={'m-0'}>Password</Label>
                                <Input type="password" onChange={onPasswordChange}  name="password" />
                            </FormGroup>

                            <Button type={'submit'} className={'my-4'} block color="primary">Login</Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;