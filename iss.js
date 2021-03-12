 const request = require('request');
//  const fs = require('fs');
//  var http = require('http');
 

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

 const fetchISSFlyOverTimes = function(coords, callback) {
  // ...
  console.log("coords = ", coords);
  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
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
    const passesList = JSON.parse(body).response;
    callback(null, passesList);

  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
