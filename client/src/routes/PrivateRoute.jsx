import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)

    const location = useLocation()

    if(loading) return <p>Loading......</p>  // login থাকা অবস্থায় page reload দিলে যাতে লগ-আউট করে লগ-ইন পেইজে না নিয়ে যায়

    if(user) return children;

    return <Navigate to='/login' state={location.pathname} replace={true}></Navigate> // কোন পেইজে ঢুকতে চেয়েছি সেটি location.pathname এ থাকবে, যাতে লগ-ইন করার পর সেই পেইজে রি-ডাইরেক্ট করা যায়

};

export default PrivateRoute;