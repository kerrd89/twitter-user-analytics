

## Table of Contents

- [Introduction](#introduction)
- [Getting Started](#getting-started)

## Introduction

![](http://g.recordit.co/5LbHgVIvu6.gif)

This repo was created to call the Twitter API for any given user and provide information about how that individual uses twitter.  [Using ChartJS-2](https://www.npmjs.com/package/react-chartjs-2), Twitter data is converted into various charts about a given accounts usage.  The application uses filter states to allow users to click on commonly used hashtags or commonly interacted with users and see just those tweets.

To run this package, apply to the [twitter API](https://dev.twitter.com/docs) for access Tokens.

## Getting Started

Clone the repository and run `npm install`.

Once you have received tokens via Twitter, create a file named config.json with the following contents:

{
"consumerKey": "your consumer key here",
"consumerSecret": "your consumer secret key here",
"accessToken": "your access token here",
"accessTokenSecret": "Access token secret"
}

Run `npm start` and go to [http://localhost:3001](http://localhost:3001).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs both the application and the local server.  The application requires personal twitter identification <br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](#running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
