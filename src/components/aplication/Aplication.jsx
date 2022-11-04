import React, { useState, useContext } from "react";
import axios from "axios";
import { URL } from "../../constants/data";
import { DataContext } from "../../context/dataContext";

function Aplication({ data }) {
  const [edit, setedit] = useState(false);
  const [status, setStatus] = useState("");
  const { userRole } = useContext(DataContext);
  const [duration, setduration] = useState("");
  console.log(data);
  const handleChange = (event) => {
    setStatus(event.target.value);
    console.log(event.target.value);
  };

  const onSumbit = () => {
    console.log(status, data, userRole.userRole);
    axios
      .put(`${URL}/applications`, {
        id: data.id,
        status,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const printMagicalStatus = () => {
    console.log(data.jobId, data.id);
    axios
      .get(
        `${URL}/applications/duration?jobId=${data.jobId}&applicationId=${data.id}`
      )
      .then(function (response) {
        console.log(response.data);
        setduration(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    return (
      <div>
        <p>Process Duration: {duration} </p>
      </div>
    );
  };

  return (
    <div>
      {" "}
      <div className="containerItem">
        <input
          type="button"
          value="Edit"
          style={{ height: 30, width: 40 }}
          className="button"
          onClick={() => setedit(!edit)}
        />
        <div className="jobColumn">
          <p>Id: {data.id}</p>
          <p>contact: {data.contact}</p>
        </div>
        <div className="jobColumn">
          <p>Speech: {data.speech}</p>
          <p>Status: {data.status}</p>
          {data.status === "APPROVED" &&
            (userRole.userRole === "RR_HH" ||
              userRole.userRole === "TEAM_LEADER") &&
            printMagicalStatus()}
          {userRole.userRole === "RR_HH" && edit && (
            <div>
              <select
                name=""
                id=""
                style={{ height: 33, marginRight: 30 }}
                value={status}
                onChange={handleChange}
              >
                <option value="FIRST_INTERVIEW">First interview</option>
                <option value="SECOND_INTERVIEW">Second interview</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <input
                type="button"
                value="Completar edicion"
                style={{ height: 33 }}
                onClick={() => onSumbit()}
              />
            </div>
          )}
          {userRole.userRole === "TEAM_LEADER" && edit && (
            <div>
              <select
                name=""
                id=""
                style={{ height: 33, marginRight: 30 }}
                value={status}
                onChange={handleChange}
              >
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
              <input
                type="button"
                value="Completar edicion"
                style={{ height: 33 }}
                onClick={() => onSumbit()}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Aplication;
