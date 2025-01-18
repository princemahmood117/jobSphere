
import Carousel from "../components/Carousel";
import TabCategories from "../components/TabCategories";
import Faq from "../components/Faq";
import ImagePreview from "../components/ImagePreview";

const Home = () => {

    return (
        <div>
            <Carousel></Carousel>

            <TabCategories></TabCategories>

            <ImagePreview></ImagePreview>

            <Faq></Faq>
        </div>
    );
};

export default Home;