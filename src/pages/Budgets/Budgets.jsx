/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import { DataContext } from "../../context/dataContext";
import axios from "axios";
import { URL } from "../../constants/data";
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
      .get(`${URL}/budgets?status=REVIEW`)
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
            <div>All budgets</div>
            {approvedBudgets &&
              userRole.userRole === "FINANCE" &&
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
            {(userRole.userRole === "TEAM_LEADER" ||
              userRole.userRole === "FINANCE") &&
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
                      <div>
                        {" "}
                        <input
                          type="button"
                          value="create requirements"
                          onClick={() => setRequirementInput(!requirementInput)}
                        />
                      </div>
                      {requirementInput && (
                        <div>
                          {" "}
                          <input
                            type="text"
                            value={requirementValue}
                            onChange={handleRequirementValue}
                          />{" "}
                          <input
                            type="button"
                            value="Confirm"
                            onClick={() =>
                              handlerequirement(item, requirementValue)
                            }
                          />
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
