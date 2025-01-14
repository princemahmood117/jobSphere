import axios from "axios"
import JobCard from "../components/JobCard"
import { useEffect, useState } from "react"
import { Triangle } from "react-loader-spinner"
import useAuth from "../hooks/useAuth"
// import { useQuery } from "@tanstack/react-query"

const AllJobs = () => {

    const {loading} = useAuth()
    const [jobs,setJobs] = useState([])

    const [itemsPerPage,setItemsPerPage] = useState(4)

    const [jobsCount,setJobsCount] = useState(0)

    const [currentPage,setCurrentPage] = useState(1)

    useEffect(()=> {
      const getData = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/all-jobs?page=${currentPage}&size=${itemsPerPage}`)
        setJobs(data)
        setJobsCount(data.length)
      }
      getData()
    },[currentPage, itemsPerPage])


    // for counting amount of data
    useEffect(()=> {
      const getCount = async () => {
        const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/jobs-count`)  // database থেকে টোটাল জবস নাম্বার টা data তে আসবে
        setJobsCount(data.count)
      }
      getCount()
    },[])

    const numberOfPages = Math.ceil(jobsCount/itemsPerPage)

    const pages = [...Array(numberOfPages).keys().map(e => e + 1 )]


    const handlePagination = (value) => {
      console.log(value);
      setCurrentPage(value)
    }


                    //  data fatched by tanstack query
    // const {data:jobs=[]} = useQuery({
    //   queryFn : ()=>  getData(),
    //   queryKey : ['all-jobs']
    // })

    // const getData = async () => {
    //   const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/jobs`)
    //   console.log(data);
    //   return data;
    // }
  

   if (loading) {
      return (
        <div className="flex justify-center items-center mt-6">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      );
    }
  return (
    <div className='container px-6 py-10 mx-auto min-h-[calc(100vh-306px)] flex flex-col justify-between'>
      <p>total data length : {jobsCount}</p>
      <div>
         
        <div className='flex flex-col md:flex-row justify-center items-center gap-5 '>
          <div>
           
            <select
              name='category'
              id='category'
              className='border p-2 rounded-lg'
            >
              <option value=''>Filter By Category</option>
              <option value='Web Development'>Web Development</option>
              <option value='Graphics Design'>Graphics Design</option>
              <option value='Digital Marketing'>Digital Marketing</option>
              <option value='Digital Marketing'>Game Development</option>
            </select>
          </div>

          <form>
            <div className='flex  overflow-hidden border rounded-lg focus-within:ring focus-within:ring-opacity-40 focus-within:border-blue-400 focus-within:ring-blue-300'>
              <input
                className='px-6 py-2 text-gray-700 placeholder-gray-500 bg-white outline-none focus:placeholder-transparent'
                type='text'
                name='search'
                placeholder='Enter Job Title'
                aria-label='Enter Job Title'
              />

              <button className='px-1 md:px-2 text-sm font-medium tracking-wider text-gray-100 uppercase transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:bg-gray-600 focus:outline-none'>
                Search
              </button>
            </div>
          </form>
          <div>
            <select
              name='category'
              id='category'
              className='border p-2 rounded-md'
            >
              <option value=''>Sort By Deadline</option>
              <option value='dsc'>Descending Order</option>
              <option value='asc'>Ascending Order</option>
            </select>
          </div>
          <button className='btn'>Reset</button>
        </div>
        <div className='grid grid-cols-1 gap-8 mt-8 xl:mt-16 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {jobs.map(job => (
            <JobCard key={job._id} job={job} />
          ))}
        </div>
      </div>


      <div className='flex justify-center mt-12'>
        {/* previous button */}
        <button className='px-4 py-2 mx-1 text-gray-700 disabled:text-gray-500 capitalize bg-gray-200 rounded-md disabled:cursor-not-allowed disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:bg-blue-500  hover:text-white duration-300'>
          <div className='flex items-center -mx-1'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M7 16l-4-4m0 0l4-4m-4 4h18'
              />
            </svg>

            <span className='mx-1'>previous</span>
          </div>
        </button>

          {/* page numbers */}
        {pages.map(btnNum => (
          <button
          onClick={() => handlePagination(btnNum)}
            key={btnNum}
            className={`hidden px-4 py-2 mx-1 transition-colors duration-300 transform  rounded-md sm:inline hover:bg-blue-500  hover:text-white`}
          >
            {btnNum}
          </button>
        ))}

        {/* next button */}
        <button className='px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-gray-200 rounded-md hover:bg-blue-500 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:text-white disabled:cursor-not-allowed disabled:text-gray-500'>
          <div className='flex items-center -mx-1'>
            <span className='mx-1'>Next</span>

            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='w-6 h-6 mx-1 rtl:-scale-x-100'
              fill='none'
              viewBox='0 0 24 24'
              stroke='currentColor'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M17 8l4 4m0 0l-4 4m4-4H3'
              />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}

export default AllJobs