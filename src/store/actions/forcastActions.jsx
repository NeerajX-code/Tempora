import axios from "../../utils/axiosConfig";
import { loadforcast } from "../reducers/forcastReducer";

export const getasyncforcast = (city) => async (dispatch) => {
    try {
        const { data } = await axios.get(`/forecast?q=${city}&units=metric&appid=da4194102ae0dc773e53ad7a8baa167a`)
        dispatch(loadforcast(data))
    } catch (error) {
        console.log(error);
        return error.response;
    }
}