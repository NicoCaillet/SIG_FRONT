/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DataContext } from "../../context/dataContext";
import axios from "axios";
import { URL } from "../../constants/data";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from "@mui/material/TextField";

export default function DetailJob() {
  const [allBudgets, setallBudgets] = useState([]);
  const [approvedBudgets, setapprovedBudgets] = useState([]);
  const [requirementInput, setRequirementInput] = useState(false);
  const [requirementValue, setrequirementValue] = useState("");
  const { userRole } = useContext(DataContext);

  useEffect(() => {
    getAllBudgets();
    getapprovedBudgets();
  }, []);

  const getapprovedBudgets = () => {
    axios
      .get(`${URL}/budgets?status=APPROVED`)
      .then(function (response) {
        setapprovedBudgets(response.data);
        console.log(approvedBudgets);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getAllBudgets = () => {
    axios
      .get(`${URL}/budgets/all`)
      .then(function (response) {
        setallBudgets(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleAprovedBudget = (id, status) => {
    console.log("hgola", id, status);

    axios
      .put(`${URL}/budgets`, { id, status })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleRechazoBudget = (id, status) => {
    console.log("hgola", id, status);
    axios
      .put(`${URL}/budgets`, { id, status })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handlerequirement = (item, req) => {
    axios
    .post(`${URL}/jobs`, { position: item.position, salary: item.salary, requirements: req  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  function handleRequirementValue(event) {
    setrequirementValue(event.target.value);
  }

  return (
    <div>
      <Navbar />
      <div className="homeContainer">
        {" "}
        <div className="mappedJobs">
          <div style={{ marginTop: 20 }}>
            <h2>All budgets</h2>
            {allBudgets &&
              userRole.userRole === "FINANCE" &&
              allBudgets.map((item) => {
                return (
                  <div className="containerItem" key={item.id}>
                    <div className="jobColumn">
                      <p>Position: {item.position}</p>
                      <p>Salary: {item.salary}</p>
                    </div>
                    <div className="jobColumn">
                      <p>state: {item.status}</p>
                      <p>ID: {item.id}</p>
                      {userRole.userRole === "FINANCE" && (
                        <div>
                          {" "}
                          <input
                            type="button"
                            value="Aprobar"
                            onClick={() =>
                              handleAprovedBudget(item.id, "APPROVED")
                            }
                          />
                          {/*<Stack spacing={2} direction="row">*/}
                          {/*  <Button variant="contained" onClick={handleAprovedBudget(item.id, "APPROVED")}>Approve</Button>*/}
                          {/*  <Button variant="contained" onClick={handleRechazoBudget(item.id, "REJECTED")}>Reject</Button>*/}

                          {/*</Stack>*/}

                          <input
                            type="button"
                            value="Rechazar"
                            onClick={() =>
                              handleRechazoBudget(item.id, "REJECTED")
                            }
                          />
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            {userRole.userRole === "TEAM_LEADER" &&
              approvedBudgets.map((item) => {
                return (
                  <div className="containerItem" key={item.id}>
                    <div className="jobColumn">
                      <p>Position: {item.position}</p>
                      <p>Salary: {item.salary}</p>
                    </div>
                    <div className="jobColumn">
                      <p>state: {item.status}</p>
                      <p>ID: {item.id}</p>
                      {/*<div>*/}
                      {/*  {" "}*/}
                      {/*  <input*/}
                      {/*    type="button"*/}
                      {/*    value="create requirements"*/}
                      {/*    onClick={() => setRequirementInput(!requirementInput)}*/}
                      {/*  />*/}
                      {/*</div>*/}

                      <Button  variant="contained" onClick={() => setRequirementInput(!requirementInput)}>Add requirements</Button>


                      {requirementInput && (
                        // <div>
                        //   {" "}
                        //   <input
                        //     type="text"
                        //     value={requirementValue}
                        //     onChange={handleRequirementValue}
                        //   />{" "}
                        //   <input
                        //     type="button"
                        //     value="Confirm"
                        //     onClick={() =>
                        //       handlerequirement(item, requirementValue)
                        //     }
                        //   />
                        // </div>
                          <div style={{maxWidth:"218px", marginTop:"15px"}}>
                          <Stack spacing={1} direction="column">
                            <TextField id="" label="Requirements" multiline
                                       maxRows={3}  onChange={handleRequirementValue} value={requirementValue} />
                            <Button  style={{width:"109px"}} variant="contained" onClick={()=> handlerequirement(item,requirementValue)} >Confirm</Button>
                          </Stack>
                          </div>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}
