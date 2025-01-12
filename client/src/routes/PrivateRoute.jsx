import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";
import { Triangle } from "react-loader-spinner";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  const location = useLocation();

  if (loading) {
    return (
        <div className="flex justify-center items-center mt-6">
            {/*  red triangle */}
          <Triangle
            visible={true}
            height="80"
            width="80"
            // color="#4fa94d"
            color="#e74c3c"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      ); // login থাকা অবস্থায় page reload দিলে যাতে লগ-আউট করে লগ-ইন পেইজে না নিয়ে যায়
  }
  

  if (user) return children;

  return (
    <Navigate to="/login" state={location.pathname} replace={true}></Navigate>
  ); // কোন পেইজে ঢুকতে চেয়েছি সেটি location.pathname এ থাকবে, যাতে লগ-ইন করার পর সেই পেইজে রি-ডাইরেক্ট করা যায়
};

export default PrivateRoute;
