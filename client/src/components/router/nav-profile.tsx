import React from 'react';
import logoutIcon from "../../assets/logout.svg";
import {useDispatch, useSelector} from "react-redux";
import {logout as logoutStore, selectAuth} from "../../store/authSlice";
import {selectUserData, resetData} from "../../store/userSlice";
import {useCookies} from "react-cookie";
import {useHistory} from "react-router-dom";

const NavProfile = () => {

    const { auth } = useSelector(selectAuth);
    const { user } = useSelector(selectUserData)
    const [_, __, removeCookie] = useCookies(['qid']);
    const history = useHistory()
    const dispatch = useDispatch()

    const removeAllCookies = () => {
        document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
    }

    const logout = async () =>{
        dispatch(logoutStore())
        dispatch(resetData())
        removeAllCookies()
        history.push('/')
    }


    return (
        <div className={'nav-profile'}>
            {user.user.name}
            <div className={'d-inline mx-3'} onClick={logout}>
                <img className={'logout-img'} src={logoutIcon} alt=""/>
            </div>
        </div>
    );
};

export default NavProfile;