import React from 'react';
const LineChart = require('react-chartjs').Line;

const LineChartTemplate = ({ data , labels }) => {
  let chartData = {
    labels: labels,
    datasets: [{
      label: "user-activity by day",
      lineTension: 0.5,
      // backgroundColor: ["rgba(75,192,192,0.4)"],
      // borderColor: ["rgba(75,192,192,1)"],
      // borderCapStyle: 'butt',
      // borderDash: [],
      // borderDashOffset: 0.0,
      // borderJoinStyle: 'miter',
      // pointBorderColor: "rgba(75,192,192,1)",
      // pointBackgroundColor: "#fff",
      // pointBorderWidth: 1,
      // pointHoverRadius: 5,
      // pointHoverBackgroundColor: "rgba(75,192,192,1)",
      // pointHoverBorderColor: "rgba(220,220,220,1)",
      // pointHoverBorderWidth: 2,
      // pointRadius: 1,
      // pointHitRadius: 10,
      data: data,
      spanGaps: false,
    }]
  };

  let chartOptions = {
    
  }
  return (
    <LineChart data={chartData} options={chartOptions} width={'600'} height={'300'}/>
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
