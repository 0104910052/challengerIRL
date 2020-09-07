import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import {setIsAuthed} from "./authSlice";

export const slice = createSlice({
    name: 'data',
    initialState: {
        user: {}
    },
    reducers: {
        setUser: (state, action) => {
            console.log('called')
            console.log(action.payload.user)
            state.user = action.payload.user
        },
        resetData: (state) =>{
            state.user = {}
        }

    },
});

export const { setUser, resetData } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const getUserData = () => (dispatch:any) => {


    axios.get('http://localhost:4000/user',  {withCredentials: true} )
        .then((res)=>{
            // console.log(res.data)
            dispatch(setUser(res.data))
            dispatch(setIsAuthed({isAuthed: true}))
        })
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserData = (state: any)  => state;

export default slice.reducer;