// index.js
const { fetchMyIP, fetchCoordsByIp } = require('./iss');


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
  });


});




