import React, {useContext } from "react";
import "./Job.css";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../../context/dataContext";

function Job({ props }) {
  const {setActualJob} = useContext(DataContext); 

  let navigate = useNavigate();
  const jobClicked = () => {
    // Pushear al context
    setActualJob(props)
    navigate(`jobs/${props.id}`);
  };

  return (
    <div className="containerItem" onClick={() => jobClicked()} key={props.id}>
      <div className="jobColumn">
        <p>Position: {props.position}</p>
        <p>Salary: {props.salary}</p>
      </div>
      <div className="jobColumn">
        <p>Requirements: {props.requirements}</p>
        <p>Description: {props.description}</p>
      </div>
    </div>
  );
}

export default Job;
