import React, { createContext, useState } from "react";
// import jobs from "../constants/data";
export const DataContext = createContext();

const initialStateJobs = {
  allJobs: [],
};

const initialStateRole = {
  userRole: "default",
};

const item = JSON.parse(localStorage.getItem("userRole"));
if(item == null){
  localStorage.setItem("userRole", JSON.stringify(initialStateRole));
} else {
  localStorage.setItem("userRole", JSON.stringify(item));
}

const initialStateActualJob = {
  actualJob: {},
};

export const DataProvided = ({ children }) => {
  const [allJobs, setAllJobs] = useState(initialStateJobs);
  const [userRole, setUserRole] = useState(initialStateRole);
  const [actualJob, setActualJob] = useState(initialStateActualJob);

  return (
    <DataContext.Provider
      value={{
        allJobs,
        setAllJobs,
        userRole,
        setUserRole,
        actualJob,
        setActualJob
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
