import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {setIsAuthed} from "./authSlice";

export const slice = createSlice({
    name: 'data',
    initialState: {
        user: {},
        challenges: [{}]
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        resetData: (state) =>{
            state.user = {}
        },
        addChallenge: (state, action) =>{
            state.challenges.push(action.payload)
        },
        setChallenges: (state, action) => {
            state.challenges = action.payload
        },


    },
});

export const { setUser, resetData, addChallenge, setChallenges } = slice.actions;

export const getChallenges = () => (dispatch:any) => {
    axios.get('http://localhost:4000/challenges',  {withCredentials: true} )
        .then((res)=>{
            if(res.data.success){
                dispatch(setChallenges(res.data.challenges))
            }

        })
};


export const getUserData = () => (dispatch:any) => {
    axios.get('http://localhost:4000/user',  {withCredentials: true} )
        .then((res)=>{
            console.log(res.data)
            dispatch(setUser(res.data.user))
            dispatch(setChallenges(res.data.challenges))
            dispatch(setIsAuthed({isAuthed: true}))
        })
        .catch(e=>{
            console.log(e)
        })
};

export const selectUserData = (state: any)  => state;

export default slice.reducer;