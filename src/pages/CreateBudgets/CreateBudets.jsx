import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DataContext } from "../../context/dataContext";
import { URL } from "../../constants/data";
import axios from 'axios'
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";


export default function DetailJob() {
  const { userRole } = useContext(DataContext);
  const [position, setposition] = useState("");
  const [salary, setsalary] = useState("");



  const onSubmit = () => {
    console.log(position, salary)
   

      axios
      .post(`${URL}/budgets`, {  position, salary })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  function handleChangePos(event) {
    setposition(event.target.value);
  }

  function handleChangeSal(event) {
    setsalary(event.target.value);
  }


  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        {" "}
        <div className="mappedJobs">
          {userRole.userRole === "TEAM_LEADER" ? (
            <div>
              <h2>Budgets </h2>
              <div
                style={{
                  width: 300,
                  color: "black",
                  borderRadius: 10,
                  padding: 20,
                  border: "1px solid gray",
                }}
              >
                {/*<p> Position </p>*/}
                {/*<input type="text" className="input" style={{ height: 25 }} onChange={handleChangePos}/>*/}
                {/*<p> Salary</p>*/}
                {/*<input type="text" className="input" style={{ height: 25 }} onChange={handleChangeSal}/>*/}
                {/*/!* <p> State</p>*/}
                {/*<input type="text" className="input" style={{ height: 25 }} /> *!/*/}
                {/*<input type="button" value="Create Budgets" onClick={onSubmit} />*/}
                <Stack spacing={2} direction="column">
                  <TextField  label="Position" variant="outlined" onChange={handleChangePos} />
                  <TextField  label="Salary" variant="outlined" onChange={handleChangeSal} />
                  <Button  variant="contained" onClick={onSubmit}>Create</Button>

                </Stack>
              </div>
            </div>
          ): <p> Only team leaders can create budgets</p>}
          
        </div>
      </div>
    </div>
  );
}
