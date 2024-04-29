import React from "react";
import Line_chart from "../components/Line_Chart";
import Pie from "../components/Pie";
import Navigation from "../components/Navigation";
import Header from "../components/Header";
import Buttons_Dashboard from "../components/Buttons_Dashboard";
import PaitentTable from "../components/PaitentsTable";

function Dashboard() {
  return (
    <div className="flex h-screen">
      <div className="flex flex-col flex-1 justify-start ml-0 ">
        <div className="flex justify-center">
            <Buttons_Dashboard className="h-[calc(100vh - 100px)]" />
          </div>
        <div className="flex flex-row mt-2 gap-2 h-[calc(100vh - 100px)]">
          <Line_chart className="flex-1 h-[300px]" />{" "}
          <Pie className="flex-1 h-full" /> 
        </div>
        <PaitentTable className="w-full h-40" />
      </div>
    </div>
  );
}

export default Dashboard;
