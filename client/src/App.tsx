import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Router from "./components/router/router";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
import {selectAuth, setIsAuthed} from "./store/authSlice";
import { getUserData } from './store/userSlice';
import {  useDispatch } from 'react-redux';



function App() {


    const dispatch = useDispatch();

    const [authCookie, setCookie, removeCookie] = useCookies(['qid']);
    const { auth } = useSelector(selectAuth);

    useEffect(()=>{
        console.log(authCookie)
        if(!auth.isAuthed && authCookie.qid){
            dispatch(getUserData())
        }
    },[])

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;
