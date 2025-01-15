import axios from "axios";
import useAuth from "./useAuth";
import { useNavigate } from "react-router-dom";



const axiosSecure = axios.create({
    baseURL : import.meta.env.VITE_API_URL,
    withCredentials : true,
})

const useAxiosSecure = () => {
    const {logout} = useAuth()
    const navigate = useNavigate()

    
                         // INTERCEPTORS

    // for receiving response from the server side
    axiosSecure.interceptors.response.use( res => {
        // console.log('response ashar agei interceptor diye thamiye dekhtesi vitor e ki ache',res);
        return res
    },

    async error => {
        console.log('error from axios interceptor', error.response.message);
        if(error.response.status === 401 || error.response.status === 403) {
            await logout()  // as login is a async function so we need to make the error function async
            navigate('/login')
        }

        return Promise.reject(error)
    }

)


    // for sending request to the server side
    // axios.interceptors.request

    return axiosSecure 

    
};

export default useAxiosSecure;