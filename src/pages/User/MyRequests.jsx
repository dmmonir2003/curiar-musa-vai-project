/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/Dashboard";
import RequestsData from "../../Components/RequestsData";
import useFetch from "../../hooks/useFetch";
import { GET_USER_REQUESTS } from "../../constants";

const JobsData = [
  {
    id: 1,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 2,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 3,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 4,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 5,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
  {
    id: 6,
    from: "",
    to: "",
    from_time: "",
    end_time: "",
    price: "",
    type: "",
    status: "",
    posted_date: "",
  },
];
const DashboardUser = () => {
  const [userRequests , setUserRequests] = useState([]);
      const [tab, setTab] = useState('pending');
        const {fetchData} = useFetch()
      const [loading, setLoading] = useState(false);
      



  const getUserRequests = async () => {
      setLoading(true)
      try{
        const response = await fetchData(`${GET_USER_REQUESTS}?status=${tab}`)
        console.log(response.data)
        setUserRequests(response.data?.requests)
  
      }catch(error){
        console.log("Error fetching user requests:", error);
      }finally{
        setLoading(false)
      }
    }
  
  const [jobs, setJobs] = useState(JobsData);


   useEffect(() => {
      getUserRequests()
    }, [tab]);

  return (
    <DashboardLayout>
      <div className="mt-10">
        <RequestsData jobs={userRequests} tab={tab} setTab={setTab} loading={loading} getUserRequests={getUserRequests} />
      </div>
    </DashboardLayout>
  );
};

export default DashboardUser;
