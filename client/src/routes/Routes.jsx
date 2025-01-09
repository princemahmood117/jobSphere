import { createBrowserRouter } from "react-router-dom";
import Main from "../layouts/Main";
import Home from "../pages/Home";
import Login from "../pages/Authentication/Login";
import Register from "../pages/Authentication/Register";
import JobDetails from "../pages/JobDetails";
import AddJob from "../pages/AddJob";
import MyPostedJobs from "../pages/MyPostedJobs";
import MyBids from "../pages/MyBids";
import BidRequests from "../pages/BidRequests";
import ErrorPage from "../pages/ErrorPage";
import UpdateJob from "../pages/UpdateJob";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
    {
        path : '/',
        element : <Main></Main>,
        errorElement : <ErrorPage></ErrorPage>,
        children : [
        {
            index : true,
            element : <Home></Home>
        },

        {
            path : '/login',
            element : <Login></Login>
        },
        
        {
            path : '/register',
            element : <Register></Register>
        },
        
        {
            path : '/add-job',
            element : <PrivateRoute> <AddJob></AddJob> </PrivateRoute>
        },
        
        {
            path : '/my-posted-jobs',
            element : <PrivateRoute> <MyPostedJobs></MyPostedJobs> </PrivateRoute>
        },
        
        {
            path : '/my-bids',
            element :<PrivateRoute> <MyBids></MyBids> </PrivateRoute>
        },
        
        {
            path : '/bid-requests',
            element : <PrivateRoute> <BidRequests></BidRequests> </PrivateRoute>
        },
        
        {
            path : '/job/:id',
            element : <PrivateRoute> <JobDetails></JobDetails> </PrivateRoute>,
            loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        
        {
            path : '/update/:id',
            element :<PrivateRoute> <UpdateJob></UpdateJob> </PrivateRoute> ,
            loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        }
        
    ]
    }
])

export default router;