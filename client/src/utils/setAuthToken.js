import axios from "axios";

const setAuthToken = token => {
    if(token){
        //apply to every request
        axios.defaults.headers.common['Authrization'] = token;
    }else{
        //delete auth header
        delete axios.defaults.headers.common['Authrization'];
    }
}

export default setAuthToken;