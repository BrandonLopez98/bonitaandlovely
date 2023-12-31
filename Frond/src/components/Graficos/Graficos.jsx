import React from "react";
import { Chart } from "react-google-charts";


const Dashboard = ({data, options, type}) => {
    return (
    <div>
      <Chart
        chartType={type}
        data={data}
        options={options}
        width={"100%"}
        height={"400px"}
      />
    </div>
  );
};

export default Dashboard;
