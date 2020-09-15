import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getChallenges, selectUserData} from "../../store/userSlice";
import diamond from '../../assets/rank_diamond.png'
import Challenges from '../challenge/challenges';

const Dashboard = () => {
    const { user } = useSelector(selectUserData).user
    const dispatch = useDispatch()

    useEffect(()=>{
       dispatch(getChallenges())
    },[])


    return (
        <div className={'container-fluid dashboard'}>
            <div className={'row'}>
                <div className={'col-2 vh-100 pt-5 dash-side'}>
                    <div className={'dash-side-title'}>
                        {user.name}
                    </div>
                    <div>
                        {user.mail}
                    </div>
                    <div className={'mt-4'}>
                        <img className={'dash-side-rank-img'} src={diamond} alt=""/>
                    </div>
                    <div className={'mt-1'}>
                        <div>
                            Current division
                        </div>
                        <div className={'dash-side-rank-text'}>
                            Diamond III
                        </div>
                    </div>
                </div>
                <Challenges />
            </div>
        </div>
    );
};

export default Dashboard;