import axios from "../../utils/axiosConfig";
import { loadforcast } from "../reducers/forcastReducer";
const apiKey = import.meta.env.VITE_API_KEY;

export const getasyncforcast = (city) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/forecast?q=${city}&units=metric&appid=${apiKey}`)
        dispatch(loadforcast(data))
    } catch (error) {
        console.log(error);
        return error.response;
    }
}