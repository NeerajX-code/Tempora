import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    weather: null
}

const weatherSlice = createSlice({
    name: "weatherData",
    initialState,
    reducers: {
        loadWeather(state, aciton) {
            state.weather = aciton.payload
        }
    }
})

export const { loadWeather } = weatherSlice.actions;
export default weatherSlice.reducer;