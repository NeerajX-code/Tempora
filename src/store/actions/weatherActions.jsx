import axios from "../../utils/axiosConfig"
import { loadWeather } from "../reducers/weatherReducer";

export const getasyncWeather = (city) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/weather?q=${city}&units=metric&appid=da4194102ae0dc773e53ad7a8baa167a`);
        localStorage.setItem("city",JSON.stringify(city));
        dispatch(loadWeather(data));
    } catch (error) {
        console.log(error);
        return error.response;
    }
}