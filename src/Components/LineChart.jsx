/* eslint-disable react/prop-types */
import React from "react";
import ApexCharts from "react-apexcharts";

const LineChart = ({chartStats}) => {
  console.log(chartStats)
  const options = {
    chart: {
      id: "basic-line",
      toolbar: {
        show: false,  // Disables the toolbar
      },
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    stroke: {
        curve: "smooth",  // Smooth line
        width: 3,  // Thinner line
      },
      colors: ["#85E211"],
      yaxis: {
        show: true,  // Display y-axis
        min: 0,  // Min value of y-axis
      },
      grid: {
        show: true,  // Enable grid lines for better clarity
      },
  };

  const series = [
    {
      name: "$",
      data: chartStats?.map((stat)=>{
        return stat.revenue
      }),
    },
  ];

  return (
    <div className="h-[290px]">
      <ApexCharts options={options} series={series} type="line" height={'299'}/>
      </div>
  );
};

export default LineChart;