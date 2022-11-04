import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import Req from "../../components/requirement/requirement";
import { DataContext } from "../../context/dataContext";
import { URL } from "../../constants/data";
import axios from "axios";

export default function Home() {
  const [reqData, setreqData] = useState([])
  const { allJobs, userRole, setAllJobs } = useContext(DataContext);

  useEffect(() => {

      axios
      .get(`${URL}/jobs/reqs`)
      .then(function (response) {
        console.log(response.data, 'responsedata')
        setreqData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });

  }, [userRole, setAllJobs]);

  return (
    <div>
      <Navbar />
      {userRole.userRole === "RR_HH" && (
        <div className="homeContainer">
          {" "}
          <h2>Requirements</h2>
          <div className="mappedJobs">
            {reqData.map((item, index) => {
              return (
                <div>
                  {<Req props={item} key={index} />}
                </div>
              );
            })}
          </div>
          <div></div>
        </div>
      )}
    </div>
  );
}
