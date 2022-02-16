import { GET_ERRORS } from "./types";
import axios from "axios";

// register user
export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register/', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data.errors
    }));
};