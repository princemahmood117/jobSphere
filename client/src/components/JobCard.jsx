

const JobCard = ({job}) => {

  const {category,job_title,deadline,description,min_price,max_price} = job || {};

    return (
      <div className='w-full max-w-sm px-4 py-3 bg-white rounded-md shadow-md hover:scale-[1.05] transition-all cursor-pointer'>
        <div className='flex items-center justify-between'>
          <span className='text-xs font-light text-gray-800 '>
            {deadline}
          </span>
          {/* category */}
          <span className='px-3 py-1 text-[8px] text-blue-800 uppercase bg-blue-200 rounded-full '>
            {category}
          </span>
        </div>
  
        <div>
          <h1 className='mt-2 text-lg font-semibold text-gray-800 '>
            {job_title}
          </h1>
  
          <p className='mt-2 text-sm text-gray-600 '>
            {description}
          </p>
          <p className='mt-2 text-sm font-bold text-gray-600 '>
            Range: {min_price} -  {max_price}
          </p>
        </div>
      </div>
    )
  }
  
  export default JobCard