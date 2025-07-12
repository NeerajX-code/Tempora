import axios from "../../utils/axiosConfig"
import { loadWeather } from "../reducers/weatherReducer";
const apiKey = import.meta.env.VITE_API_KEY;

export const getasyncWeather = (city) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/weather?q=${city}&units=metric&appid=${apiKey}`);
        localStorage.setItem("city",JSON.stringify(city));
        dispatch(loadWeather(data));
    } catch (error) {
        console.log(error);
        return error.response;
    }
}