import React, {useEffect} from 'react';
import {
    Switch,
    Route,
    useHistory, useLocation
} from "react-router-dom";
import Register from "../auth/register";
import {useSelector} from "react-redux";
import {selectAuth} from "../../store/authSlice";
import NavProfile from "./nav-profile";
import Login from "../auth/login";
import Dashboard from "../dashboard/dashboard";
import {Link} from "react-router-dom";
import AddChallenge from "../challenge/add-challenge";
import Challenges from "../challenge/challenges";
import Challenge from '../challenge/challenge';

const Router = () => {

    const { auth } = useSelector(selectAuth);
    let location = useLocation()
    let history = useHistory()


    useEffect(()=>{
        const isInAuthRoute = location.pathname.split('/')[1] === 'auth'
        //
        // if(auth.isAuthed && isInAuthRoute){
        //     history.push('/dashboard')
        // }

        // if(!auth.isAuthed && !isInAuthRoute){
        //     history.push('/auth/login')
        // }

    }, [location.pathname, auth.isAuthed])


    return (
        <div>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">ChallengerIRL</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <a onClick={()=> history.push('/dashboard')} className="nav-link">Dashboard <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a onClick={()=>history.push('/challenges')} className="nav-link">Challenges</a>
                            </li>
                        </ul>

                    </div>
                    <div className="form-inline mx-5 my-lg-0">
                        { !auth.isAuthed &&
                            <div>
                                <Link to="/auth/register">Register</Link>
                                <div className={'d-inline px-2 nav-divider'}>|</div>
                                <Link to="/auth/login">Login</Link>

                            </div>
                        }
                        { auth.isAuthed &&
                            < NavProfile />
                        }
                    </ div>
                </nav>


                <Switch>
                    <Route path="/auth/register">
                        <Register />
                    </Route>
                    <Route path="/auth/login">
                        <Login />
                    </Route>
                    <Route exact path="/dashboard">
                        <Dashboard />
                    </Route>
                    <Route exact path="/challenges">
                        <Challenges />
                    </Route>
                    <Route exact path="/challenges/add">
                        <AddChallenge />
                    </Route>
                    <Route exact path="/challenge/:id">
                        <Challenge />
                    </Route>
                </Switch>
            </div>
        </div>
    );
};

export default Router;