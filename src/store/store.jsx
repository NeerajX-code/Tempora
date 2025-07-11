import { configureStore } from '@reduxjs/toolkit'
import weatherReducer from './reducers/weatherReducer'
import forcastReducer from "./reducers/forcastReducer"

export const store = configureStore({
    reducer: {
        weatherSlice: weatherReducer,
        forcastSlice: forcastReducer,
    },
})