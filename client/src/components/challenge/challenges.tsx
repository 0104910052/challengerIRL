import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getChallenges, selectUserData} from "../../store/userSlice";
import platinum from '../../assets/rank_platinum.png'
import { useHistory } from 'react-router-dom';

const Challenges = () => {
    const { challenges } = useSelector(selectUserData).user

    const history = useHistory()


    return (
        <div className={'col-8 offset-1 mt-5 d-flex challenges'}>
            {
                challenges.map((challenge: any)=>{
                    return (
                        <div className={'challenge col-3 offset-1'} onClick={()=>{history.push('/challenge/' + challenge.id)}}>
                            <div className={'challenge-title'}>
                                {challenge.title}
                            </div>
                            <div>
                                <img src={platinum} className={'challenge-div-img'} alt=""/>
                            </div>
                            <div>
                                <div className={'text-85 mt-3'}>Current div</div>
                                <h6>Platinum III</h6>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    );
};

export default Challenges;