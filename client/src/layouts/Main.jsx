import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Main = () => {
    return (
        <div>

            {/* nabvar */}
            <Navbar></Navbar>


            {/* dynamic outlet */}

            <div className="min-h-[calc(100vh-306px)]">
                <Outlet></Outlet>
            </div>



            {/* footer */}
            <Footer></Footer>
        </div>
    );
};

export default Main;