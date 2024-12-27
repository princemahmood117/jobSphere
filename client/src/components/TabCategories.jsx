import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";

const TabCategories = () => {
  return (
    <Tabs>
      <div className="container px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-center text-gray-800 capitalize lg:text-3xl">
          Browse jobs by category
        </h1>

        <p className="max-w-2xl mx-auto my-6 text-center text-gray-500">
          Three categories available for the time being. They are Web development,
          Graphics design and Digital marketing. Brwowse them by clicking on the
          tabs below
        </p>

        <div className="flex items-center justify-center">
          <TabList>
            <Tab>Web Development</Tab>
            <Tab>Graphics Design</Tab>
            <Tab>Digital Marketing</Tab>
          </TabList>
        </div>

        <TabPanel>
          <h2> <JobCard></JobCard> </h2>
        </TabPanel>
        <TabPanel>
          <h2>This is graphics design section</h2>
        </TabPanel>
        <TabPanel>
          <h2>This is digital marketing section</h2>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
