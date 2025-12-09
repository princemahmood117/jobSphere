import Lottie from "lottie-react";
import faq from "../assets/faq.json";

const Faq = () => {
  return (
    <div>
      <h1 className="text-center text-2xl md:text-3xl my-4">
        Frequently asked questions
      </h1>
      <div className="flex md:px-6 px-4 justify-around">
        <div className="w-1/3 min-h-screen hidden md:block">
          <Lottie style={{ height: "500px"}} animationData={faq}></Lottie>
        </div>

        <div className="md:w-1/2 w-full px-3">
          <div>
            <div className="collapse collapse-arrow bg-base-200 md:my-8 my-4">
              <input type="radio" name="my-accordion-2" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>First one</p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 md:my-8 my-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>Second one</p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 md:my-8 my-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>Third one</p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 md:my-8 my-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>Fourth one</p>
              </div>
            </div>

            <div className="collapse collapse-arrow bg-base-200 md:my-8 my-4">
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>Fifth one</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
