import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageContent from "../PageContent";
import SideBar from "../SideBar";

function DashBoard(props) {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!location.state || location.state.adminLogin === false) navigate("");
  }, []);
  
  return (
    <div className="w-full h-screen grid grid-cols-4">
      <SideBar />
      <PageContent />
    </div>
  );
}

export default DashBoard;
