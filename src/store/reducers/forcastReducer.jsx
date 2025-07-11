import { createSlice } from '@reduxjs/toolkit'

const  initialState = {
    forcast: null
}

const forCastSlice = createSlice({
    name:"forcastData",
    initialState,
    reducers:{
        loadforcast(state,aciton) {
            state.forcast = aciton.payload
        }
    }
})

export const {loadforcast} = forCastSlice.actions;
export default forCastSlice.reducer