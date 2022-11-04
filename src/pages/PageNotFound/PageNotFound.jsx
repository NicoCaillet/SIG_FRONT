import React from "react";
import Navbar from "../../components/Navbar/Navbar";

function PageNotFound() {
  return (
    <div>
      <Navbar />
      <div style={{display:'flex', justifyContent: 'center'}}>
        <p style={{fontSize: 20, fontWeight: 'bold'}}>Sorry, we didn't find that page!</p>
      </div>
    </div>
  );
}

export default PageNotFound;
