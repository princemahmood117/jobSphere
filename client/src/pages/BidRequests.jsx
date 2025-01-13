// import { useEffect, useState } from "react";
// import axios from "axios"
import toast from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAuth from "../hooks/useAuth";
import { Triangle } from "react-loader-spinner";



const BidRequests = () => {
  
  const { user } = useAuth();

  const axiosSecure = useAxiosSecure();

  const queryClient = useQueryClient()

  //  fetch data using tanstack query
  const {data: bids = [],isLoading,refetch} = useQuery({

    queryFn: () => getData(),
    queryKey: ["bids", user?.email],
  });

  // const [bids,setBids] = useState([])

  // useEffect(()=> {
  //   getData()
  // },[user])

  const getData = async () => {
    // const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/bid-requests/${user?.email}`)

    const { data } = await axiosSecure.get(`/bid-requests/${user?.email}`);
    return data;
  };


  // mutation is for put,patch,delete request

  const {mutateAsync} = useMutation({
    mutationFn : async ({id,status}) => {
      const { data } = await axiosSecure.patch(`/bid/${id}`, { status });
      console.log(data);
      return data;  
    },

    onSuccess : () =>  {
      console.log('Data update hoise');
      toast.success('status updated')
      // refetch()

      // instead of refetch, we will use hard way called 'invalidateQueries'
      queryClient.invalidateQueries({
        queryKey : ['bids']
      })
    }
    
  })

  const handleStatus = async (id, prevStatus, status) => {
    console.log(id, prevStatus, status);

    if (prevStatus === status) return toast.error("Action already done");
    await mutateAsync({id,status})

    // const { data } = await axiosSecure.patch(`/bid/${id}`, { status });
    // getData();
    // console.log(data);
  };



  if (isLoading) {
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
    <section className="container px-4 mx-auto pt-12">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 ">Bid Requests</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full ">
          {bids.length} Requests
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200  md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Title</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Email (who applied)</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Deadline</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Price</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Category
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Status
                    </th>

                    <th className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="bg-white divide-y divide-gray-200 ">
                  {bids.map((bid) => (
                    <tr key={bid._id}>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {bid.job_title}
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {bid.email}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        {new Date(bid.deadline).toLocaleDateString()}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-500  whitespace-nowrap">
                        ${bid.price}
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <p
                            className={`px-3 py-1 ${
                              bid.category === "Web Development" &&
                              "text-blue-500 bg-blue-100/60"
                            } ${
                              bid.category === "Graphics Design" &&
                              "text-emerald-500 bg-emerald-100/60"
                            } ${
                              bid.category === "Digital Marketing" &&
                              "text-pink-500 bg-pink-100/60"
                            } ${
                              bid.category === "Game Development" &&
                              "text-orange-500 bg-pink-100/60"
                            } text-xs  rounded-full`}
                          >
                            {bid.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {/* <div className='inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-yellow-100/60 text-yellow-500'>
                          <span className='h-1.5 w-1.5 rounded-full bg-yellow-500'></span>
                          <h2 className='text-sm font-normal '>{bid.status}</h2>
                        </div> */}

                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full gap-x-2 ${
                            bid.status === "Pending" &&
                            "bg-yellow-100/60 text-yellow-500"
                          } ${
                            bid.status === "In Progress" &&
                            "bg-blue-100/60 text-blue-500"
                          } ${
                            bid.status === "Complete" &&
                            "bg-emerald-100/60 text-emerald-500"
                          } ${
                            bid.status === "Rejected" &&
                            "bg-red-100/60 text-red-500"
                          } `}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              bid.status === "Pending" && "bg-yellow-500"
                            } ${
                              bid.status === "In Progress" && "bg-blue-500"
                            } ${bid.status === "Complete" && "bg-green-500"} ${
                              bid.status === "Rejected" && "bg-red-500"
                            }  `}
                          ></span>
                          <h2 className="text-sm font-normal ">{bid.status}</h2>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          {/* accept button */}
                          <button
                            title="accept"
                            disabled={bid.status === "Complete"}
                            onClick={() =>
                              handleStatus(bid._id, bid.status, "In Progress")
                            }
                            className="disabled:cursor-not-allowed text-gray-500 transition-colors duration-200   hover:text-red-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m4.5 12.75 6 6 9-13.5"
                              />
                            </svg>
                          </button>

                          {/* reject button */}
                          <button
                            title="reject"
                            disabled={bid.status === "Complete"}
                            onClick={() =>
                              handleStatus(bid._id, bid.status, "Rejected")
                            }
                            className="text-gray-500 transition-colors duration-200   hover:text-yellow-500 focus:outline-none"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="w-5 h-5"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M18.364 18.364A9 9 0 0 0 5.636 5.636m12.728 12.728A9 9 0 0 1 5.636 5.636m12.728 12.728L5.636 5.636"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BidRequests;
