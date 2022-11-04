import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DataContext } from "../../context/dataContext";
import "./DetailJob.css";
import Aplication from "../../components/aplication/Aplication";
import { URL } from "../../constants/data";
import axios from "axios";

export default function DetailJob() {
  const [localJob, setLocalJob] = useState({});
  const [editDescription, setEditDescription] = useState(false);
  const [form, setform] = useState(false);
  const [speech, setspeech] = useState("");
  const [contact, setcontact] = useState("");
  const [applications, setapplications] = useState([]);

  const { actualJob, userRole } = useContext(DataContext);

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("actualJob"));
    setLocalJob(item);
    if (JSON.stringify(actualJob.actualJob) !== "{}") {
      localStorage.setItem("actualJob", JSON.stringify(actualJob));
    }
    console.log('locals', localJob, actualJob)
    axios
    .get(`${URL}/applications/jobs?jobId=${actualJob.id}`)
    .then(function (response) {
      console.log(response.data, "las applications get");
      setapplications(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  }, []);


  const openApplicationForm = () => {
    setform(!form);
  };

  const handleChangeContact = (event) => {
    setcontact(event.target.value);
  };

  function handleChangeSpeech(event) {
    setspeech(event.target.value);
  }

  const onSubmitApplication = () => {
    axios
      .post(`${URL}/applications`, { jobId: localJob.id, speech, contact })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        {" "}
        
        <h2>Jobs</h2>
        <div className="mappedJobs">
          {localJob !== "{}" ? (
            <div>
              <div className="row">
                <p className="title">Position: </p> <p>{localJob.position}</p>
              </div>
              <div className="row">
                {" "}
                <p className="title">Description: </p>{" "}
                {!editDescription ? (
                  <p>{localJob.description}</p>
                ) : (
                  <input type="text" />
                )}
              </div>
              <div className="row">
                {" "}
                <p className="title">Requirements: </p>
                <p>{localJob.requirements}</p>
              </div>
              <div className="row">
                {" "}
                <p className="title">Salary: </p>
                <p>{localJob.salary}</p>
              </div>
            </div>
          ) : (
            <div> No application found </div>
          )}
          {userRole.userRole === "default" && (
            <input
              className="favorite styled"
              type="button"
              value="Apply"
              onClick={openApplicationForm}
            />
          )}
          {form && (
            <div>
              {" "}
              <div className="mappedJobs">
                <div>
                  <h2>Application Form </h2>
                  <div
                    style={{
                      width: 300,
                      color: "black",
                      borderRadius: 10,
                      padding: 20,
                      border: "1px solid gray",
                    }}
                  >
                    <p> Speech </p>
                    <input
                      type="text"
                      className="input"
                      style={{ height: 25 }}
                      onChange={handleChangeSpeech}
                    />
                    <p> Contact</p>
                    <input
                      type="text"
                      className="input"
                      style={{ height: 25 }}
                      onChange={handleChangeContact}
                    />
                    <input
                      type="button"
                      value="APPLY"
                      onClick={onSubmitApplication}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {userRole.userRole === "RR_HH" && (
            <div>
              {" "}
              <input
                className="favorite styled"
                type="button"
                style={{ marginRight: 20, height: 40 }}
                value="Edit description"
                onClick={() => setEditDescription(!editDescription)}
              />
              {editDescription && (
                <input
                  type="button"
                  style={{ marginRight: 20, height: 40 }}
                  value="Finish"
                />
              )}
            </div>
          )}
          <div style={{ marginTop: 30 }}>
            {(userRole.userRole === "TEAM_LEADER" ||
              userRole.userRole === "RR_HH") && <h2> Applications:</h2>}
            {applications &&
              (userRole.userRole === "TEAM_LEADER" ||
                userRole.userRole === "RR_HH") &&
                applications.map((item, index) => {
                return <Aplication data={item} key={index} />;
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
