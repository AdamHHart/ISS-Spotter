// index.js
const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');



fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }
  

  console.log('It worked! Returned IP:' , ip);
 
  fetchCoordsByIp(ip, (error, coordinates) => {
    if (error) {
      console.log("It didn't work!" , error);
      return;
    }
  
    console.log('SUCCESS! Coordinates:' , coordinates);
    finalCoords = coordinates;


    fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
      if (error) {
        console.log("Something went wrong..", error);
      }
  
      console.log('SUCCESS!!!! Here are the next flyover times: ', passTimes);
    });
  });




});




