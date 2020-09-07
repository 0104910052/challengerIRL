import React from 'react';
import {
    BrowserRouter as DomRouter,
    Switch,
    Route,
    Link,
    useHistory
} from "react-router-dom";
import Register from "../auth/register";
import {useSelector} from "react-redux";
import {selectAuth} from "../../store/authSlice";
import {selectUserData} from "../../store/userSlice";
import {useCookies} from "react-cookie";
import { logout as logoutStore } from '../../store/authSlice';
import logoutIcon  from '../../assets/logout.svg'
import NavProfile from "./nav-profile";
import Login from "../auth/login";

const Router = () => {

    const { auth } = useSelector(selectAuth);

    return (
        <div>
            <DomRouter>
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
                                    <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Features</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Pricing</a>
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
                    </Switch>
                </div>
            </DomRouter>
        </div>
    );
};

export default Router;