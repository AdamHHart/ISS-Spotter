/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

 const request = require('request');
 const fs = require('fs');
 var http = require('http');
 
// const myIP = {}; 

const fetchMyIP = function(callback) { 
  request(`https://api.ipify.org/?format=json`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    if (body) {
      const myIP = JSON.parse(body);
      callback(error, myIP['ip']);
    }
  } ) 
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    // if non-200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    const myGeo = JSON.parse(body);
    const myCoords = {
      'latitude': '',
      'longitude': '',
    };
    myCoords.latitude = myGeo['latitude'];
    myCoords.longitude = myGeo['longitude'];
    console.log(myCoords);
    callback(null, myCoords);
  });

};


module.exports = { fetchMyIP, fetchCoordsByIp, };
