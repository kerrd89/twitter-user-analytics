import React from 'react';
const RadarChart = require('react-chartjs-2').Radar;

let averageTwitterUser = {
  'followers':208,
  'following':500,
  'tweetsPerDay':1.6,
  'likes':400,
  // 'retweets':60
}

const RadarChartTemplate = ({ data , labels , title }) => {
  let chartData = {
    labels: labels,
    datasets: [
      {
        label:"Twitter Averages",
        borderColor: "rgba(0, 170, 236,1)",
        pointborderColor: "rgba(0, 170, 236,1)",
        pointBackgroundColor: "rgba(0, 170, 236,1)",
        backgroundColor: "rgba(0, 170, 236,.2)",
        data: [1,1,1,1],
      },
      {
        label:"User Averages",
        borderColor: "rgba(128, 194, 175,1)",
        pointborderColor: "rgba(128, 194, 175,1)",
        pointBackgroundColor: "rgba(128, 194, 175,1)",
        backgroundColor: "rgba(128, 194, 175,.2)",
        data: [
          data.followers/averageTwitterUser.followers,
          data.following/averageTwitterUser.following,
          data.tweetsPerDay/averageTwitterUser.tweetsPerDay,
          data.likes/averageTwitterUser.likes,
          // data.retweets/averageTwitterUser.retweets
        ]
      }],
  };

let chartOptions = {
  default: {
    fontColor: "white",
    fontFamily: "'Roboto', sans-serif",
    fontStyle: "100",
  },
  title: {
    display: true,
    text:title,
    fontColor: "white",
    fontSize: 20,
    fontFamily: "'Roboto Slab', serif",
    fontStyle: "100"
  },

  legend: {
    display: true,
    labels: {
        fontColor: 'rgb(255, 255, 255)',
        fontFamily: "'Roboto', sans-serif",
        fontStyle: "100",
    }
  },
  labels: {
      fontColor: 'rgb(255, 255, 255)',
      fontFamily: "'Roboto', sans-serif",
      fontStyle: "100",
  },
  scale: {
    ticks: {
      display: false
    },
  }
};

  return (
    <RadarChart data={chartData} options={chartOptions} width={300} height={300}/>
  );
}
export default RadarChartTemplate;
