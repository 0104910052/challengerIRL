import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, FormText, Button} from 'reactstrap';
import challenger from '../../assets/rank_challenger.png'
import axios from "axios";
import { login } from '../../store/authSlice';
import { useHistory } from 'react-router-dom';
import {useDispatch} from "react-redux";
import {setUser} from "../../store/userSlice";
import {useCookies} from "react-cookie";




const Register = () => {


    const history = useHistory()
    const dispatch = useDispatch()
    const [_, __, removeCookie] = useCookies(['qid']);


    const handleSubmit = (e:any) =>{
        e.preventDefault()
        removeCookie('qid')
        axios.post('http://localhost:4000/auth/register', {name: fullName, mail, password}, {withCredentials: true} )
            .then((res)=>{
                console.log(res.data)
                if(res.data.success){
                    dispatch(login({user: res.data.user}))
                    dispatch(setUser({user: res.data.user}))
                    history.push('/dashboard')
                }
            })

    }

    const [password, setPassword] = useState('');
    const [mail, setMail] = useState('');
    const [fullName, setFullName] = useState('');

    const onMailChange = (e:any) => {
        setMail(e.target.value)
    }

    const onPasswordChange = (e:any) => {
        setPassword(e.target.value)
    }

    const onNameChange = (e:any) => {
        setFullName(e.target.value)
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
                                <Label for="examplePassword" className={'m-0'}>Name</Label>
                                <Input type="text" onChange={onNameChange}  name="name" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="exampleEmail" className={'m-0'}>Email</Label>
                                <Input onChange={onMailChange} type="email" name="email" />
                            </FormGroup>
                            <FormGroup>
                                <Label for="examplePassword" className={'m-0'}>Password</Label>
                                <Input type="password" onChange={onPasswordChange}  name="password" />
                            </FormGroup>

                            <Button type={'submit'} className={'my-4'} block color="primary">Register</Button>

                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;