import React, { useState } from "react";
import axios from "axios";
import {URL} from '../../constants/data'
import Button from "@mui/material/Button";
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';


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
        {/*<input*/}
        {/*  type="button"*/}
        {/*  value="Complete description"*/}
        {/*  onClick={() => seteditor(!editor)}*/}
        {/*/>*/}
          <Button  variant="contained" onClick={() => seteditor(!editor)}>Complete description</Button>

          {editor && (
          <div style={{maxWidth:"218px", marginTop:"30px"}}>
              <Stack spacing={1} direction="column">
                  <TextField id="" label="Description" multiline maxRows={4} onChange={handleChangereq} value={description} />
                  <Button  style={{width:"109px"}} variant="contained" onClick={completeDescription}>Confirm</Button>
              </Stack>
              {" "}
            {/*<input*/}
            {/*  type="text"*/}
            {/*  name=""*/}
            {/*  id=""*/}
            {/*  value={description}*/}
            {/*  onChange={handleChangereq}*/}
            {/*/>*/}
            {/*<input*/}
            {/*  type="button"*/}
            {/*  value="Confirm"*/}
            {/*  onClick={completeDescription}*/}
            {/*/>*/}
          </div>
        )}
      </div>
    </div>
  );
}

export default Job;
