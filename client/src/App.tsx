import React, {useEffect} from 'react';
import './App.css';
import Router from "./components/router/router";
import {useCookies} from "react-cookie";
import {useSelector} from "react-redux";
import {selectAuth} from "./store/authSlice";
import { getUserData } from './store/userSlice';
import {  useDispatch } from 'react-redux';
import {BrowserRouter as DomRouter} from 'react-router-dom';



function App() {


    const dispatch = useDispatch();

    const [authCookie, setCookie, removeCookie] = useCookies(['qid']);
    const { auth } = useSelector(selectAuth);


    useEffect(()=>{
        if(!auth.isAuthed && authCookie.qid){
            dispatch(getUserData())
        }
    },[])

  return (
    <div className="App">
        <DomRouter>
            <Router />
        </DomRouter>
    </div>
  );
}

export default App;
