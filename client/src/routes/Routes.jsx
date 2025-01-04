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
            element : <AddJob></AddJob>
        },
        
        {
            path : '/my-posted-jobs',
            element : <MyPostedJobs></MyPostedJobs>
        },
        
        {
            path : '/my-bids',
            element : <MyBids></MyBids>
        },
        
        {
            path : '/bid-requests',
            element : <BidRequests></BidRequests>
        },
        
        {
            path : '/job/:id',
            element : <JobDetails></JobDetails>,
            loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        },
        
        {
            path : '/update/:id',
            element : <UpdateJob></UpdateJob> ,
            loader : ({params}) => fetch(`${import.meta.env.VITE_API_URL}/job/${params.id}`)
        }
        
    ]
    }
])

export default router;