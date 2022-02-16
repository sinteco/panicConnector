import { GET_ERRORS,SET_CURRENT_USER } from "./types";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_Decode from "jwt-decode";

// register user
export const registeruser = (userData, history) => dispatch => {
    axios.post('/api/users/register/', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data.errors
    }));
};

//login get user token
export const loginUser = userData => dispatch => {
    axios.post('/api/users/login/', userData)
    .then(res=>{
        //save to local storage
        const {token} = res.data;
        //set token to localstorage
        localStorage.setItem('jwtToken', token);
        //set token to Auth header
        setAuthToken(token);
        //decode token to get user data
        const decoded = jwt_Decode(token);
        //set current user
        dispatch(setCurrentUser(decoded));
    })
    .catch(err => dispatch({
        type:GET_ERRORS,
        payload:err.response.data.errors
    }));
}

// set logged user
export const setCurrentUser = decoded => {
    return {
        type:SET_CURRENT_USER,
        payload: decoded
    }
}

//logout user
export const logoutUser = () => dispatch =>{
    //Remove token
    localStorage.removeItem('jwtToken');
    //remove auth header
    setAuthToken(false);
    //set isAuthenticated to false
    dispatch(
        setCurrentUser({})
    );
}