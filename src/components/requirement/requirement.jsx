import React, { useState } from "react";
import axios from "axios";
import {URL} from '../../constants/data'
function Job({ props }) {
  const [description, setdescription] = useState("");
  const [editor, seteditor] = useState(false);
  console.log(props, "PROPS");
  function handleChangereq(event) {
    setdescription(event.target.value);
  }

  const completeDescription = () => {
    axios
      .put(`${URL}/jobs`, {
        description,
        id: props.id,
        position: props.position,
        requirements: props.requirements,
        salary: props.salary
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="containerItem" key={props.id}>
      <div className="jobColumn">
        <p>Position: {props.position}</p>
        <p>Salary: {props.salary}</p>
      </div>
      <div className="jobColumn">
        <p>Requirements: {props.requirements}</p>
        <input
          type="button"
          value="Complete description"
          onClick={() => seteditor(!editor)}
        />
        {editor && (
          <div>
            {" "}
            <input
              type="text"
              name=""
              id=""
              value={description}
              onChange={handleChangereq}
            />
            <input
              type="button"
              value="Confirm"
              onClick={completeDescription}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Job;
