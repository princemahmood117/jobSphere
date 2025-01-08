import { useLoaderData } from "react-router-dom";
import Carousel from "../components/Carousel";
import TabCategories from "../components/TabCategories";
import Faq from "../components/Faq";

const Home = () => {

    const jobs = useLoaderData()
    console.log(jobs);
    return (
        <div>
            <Carousel></Carousel>

            <TabCategories></TabCategories>

            <Faq></Faq>
        </div>
    );
};

export default Home;