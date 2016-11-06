import React from 'react';
const LineChart = require('react-chartjs-2').Line;

const LineChartTemplate = ({ data , labels , title }) => {
  let chartData = {
    labels: labels,
    datasets: [{
      borderColor: "rgba(0, 170, 236,1)",
      pointborderColor: "rgba(0, 170, 236,1)",
      pointBackgroundColor: "rgba(0, 170, 236,1)",
      backgroundColor: "rgba(0, 170, 236,.4)",

      // pointColor: "rgba(0, 170, 236,1)",
      // strokeColor: "rgba(0, 170, 236,1)",
      data: data,
    }],
  };

let chartOptions = {
  default: {
    fontColor: "white",
    fontFamily: "'Roboto', sans-serif",
    fontStyle: "100"
  },
  title: {
    display: true,
    text:title,
    fontColor: "white",
    fontSize: 16,
    fontFamily: "'Roboto Slab', serif",
    fontStyle: "100"
  },
  scales: {
    yAxes: [{
      display:true,
    }]
  },
  legend: {
    display:false
  },
};

  return (
    <LineChart data={chartData} options={chartOptions} width={800} height={300}/>
  );
}

// StackedBarGraph.defaultProps = {
//   width: 600,
//   height: 40,
// };
//
// StackedBarGraph.propTypes = {
//   width: React.PropTypes.number.isRequired,
//   height: React.PropTypes.number.isRequired
// };

export default LineChartTemplate;
