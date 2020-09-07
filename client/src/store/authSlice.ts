import { createSlice } from '@reduxjs/toolkit';
import {resetData, setUser } from './userSlice';



export const slice = createSlice({
    name: 'auth',
    initialState: {
        isAuthed: false,
    },
    reducers: {
        login: (state, action) => {
            console.log(action.payload.user)
            state.isAuthed = true
        },
        setIsAuthed: (state, action) => {
            state.isAuthed = action.payload.isAuthed
        },
        logout: (state) => {
            state.isAuthed = false

        }

    },
});

export const { login, setIsAuthed, logout } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
// export const incrementAsync = amount => dispatch => {
//     setTimeout(() => {
//         dispatch(incrementByAmount(amount));
//     }, 1000);
// };

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAuth = (state: any)  => state;

export default slice.reducer;