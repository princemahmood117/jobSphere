import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import { useEffect, useState } from "react";
import axios from "axios";

const TabCategories = () => {

  const [jobs,setJobs] = useState([])

  useEffect(()=> {
    const getData = async () => {
      const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
      setJobs(data)
    }
    getData()
  },[])
  
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
          <div className="grid grid-cold-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 xl:mt-16 xl:grid-cols-4">
            {
              jobs.filter(j=> j.category==='Web Development').map(job => <JobCard key={job._id} job={job}></JobCard>)
            }
          </div>
        </TabPanel>


        <TabPanel>
        <div className="grid grid-cold-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 xl:mt-16 xl:grid-cols-4">
            {
             jobs.filter(j=> j.category==='Graphics Design').map(job => <JobCard key={job._id} job={job}></JobCard>)
            }
          </div>
        </TabPanel>


        <TabPanel>
        <div className="grid grid-cold-1 lg:grid-cols-3 md:grid-cols-2 gap-8 mt-8 xl:mt-16 xl:grid-cols-4">
            {
              jobs.filter(j=> j.category==='Digital Marketing').map(job => <JobCard key={job._id} job={job}></JobCard>)
            }
          </div>
        </TabPanel>
      </div>
    </Tabs>
  );
};

export default TabCategories;
