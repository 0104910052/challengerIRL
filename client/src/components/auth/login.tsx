import React, {useState} from 'react';
import challenger from "../../assets/rank_challenger.png";
import {Button, Form, FormFeedback, FormGroup, Input, Label} from "reactstrap";
import axios from 'axios'
import {useDispatch} from "react-redux";
import { login } from '../../store/authSlice';
import {getUserData, setUser} from "../../store/userSlice";
import { useHistory } from 'react-router-dom';
import {apiUri} from "../../env_config";


const Login = () => {



    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const errorsDefault = {
        mail: {
            valid: true,
            message: ''
        },
        password: {
            valid: true,
            message: ''
        }
    }

    const [errors, setErrors] = useState(errorsDefault)
    const dispatch = useDispatch()
    const history = useHistory()


    const handleSubmit = (e:any) =>{
        e.preventDefault()
        axios.post(apiUri + 'auth/login', {mail: mail, password: password}, {withCredentials: true})
            .then((res)=>{
                if(res.data.success){
                    dispatch(login())
                    dispatch(getUserData())
                    history.push('/dashboard')
                }else{
                    setErrors({...errorsDefault, ...res.data.errors})
                }

            })
            .catch(e=>{
                console.log(e)
            })

    }

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
                    <h1 className={'mt-4'}>Login</h1>
                    <h5 className={'color-secondary'}>ChallengerIRL</h5>
                    <img src={challenger} className={'auth-challenger-img pt-4'} alt=""/>

                    <div className={'align-text-right '}>
                        <Form onSubmit={handleSubmit} className={'mt-4 col-10 offset-1 mb-4 py-4'}>

                            <FormGroup>
                                <Label for="mail" className={'m-0'}>Email</Label>
                                <Input invalid={!errors.mail.valid} onChange={onMailChange} type="email" name="email" />
                                <FormFeedback>{errors.mail.message}</FormFeedback>

                            </FormGroup>
                            <FormGroup>
                                <Label for="password" className={'m-0'}>Password</Label>
                                <Input invalid={!errors.password.valid} type="password" onChange={onPasswordChange}  name="password" />
                                <FormFeedback>{errors.password.message}</FormFeedback>
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