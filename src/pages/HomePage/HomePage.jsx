import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./Home.css";
import Job from "../../components/job/Job";
import { DataContext } from "../../context/dataContext";
import { useNavigate } from "react-router-dom";
import { URL } from "../../constants/data";
import axios from "axios";
export default function Home() {
  const [jobsState, setjobsState] = useState([]);
  const [reqData, setreqData] = useState([]);
  const [effiencyNumber, setEfficiencyNumber] = useState("");
  const [clarity, setClarity] = useState("");

  const { allJobs, userRole, setAllJobs } = useContext(DataContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (userRole.userRole === "FINANCE") {
      navigate("/allBudgets");
    }
    axios
      .get(`${URL}/jobs`)
      .then(function (response) {
        setAllJobs(response.data);
        setjobsState(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${URL}/jobs/reqs`)
      .then(function (response) {
        setreqData(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${URL}/applications/efficiency`)
      .then(function (response) {
        setEfficiencyNumber(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    axios
      .get(`${URL}/applications/clarity`)
      .then(function (response) {
        setClarity(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [userRole, setAllJobs]);

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        {" "}
        {userRole.userRole === 'RR_HH' && (
          <div>
            <h3>Application Efficiency: {effiencyNumber}</h3>
            <h3>Application Clarity: {clarity}</h3>
          </div>
        )}
        <h2>Jobs</h2>
        <div className="mappedJobs">

          {jobsState.map((item, index) => {
            return (
              <div>{item.description && <Job props={item} key={index} />}</div>
            );
          })}
        </div>

      </div>
    </div>
  );
}
