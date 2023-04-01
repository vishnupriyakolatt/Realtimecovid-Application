/*--this module accepts three arguements yourlocation, records, radius(in meters)
and it return the active patients around the given location within the specified radius--*/
// const geolib = require('geolib');
let getNearby = (yourLoc, records, radiusInKm) => {
    Around = [];
    AroundExist = false;
    lat1 = yourLoc.latitude;
    lon1 = yourLoc.longitude;

    console.log(yourLoc)

    // radiusInKm = radius / 1000;

    // records.map((record) => {
    //     lat2 = record.latitude;
    //     lon2 = records.longitude;
    //     distance = findDistance(lat1, lon1, lat2, lon2);
    //     console.log(distance)
    //     if (distance < radiusInKm) {

    //         Around.push(record[i]);
    //         AroundExist = true;
    //         console.log(distance);
    //     }
    // })
    for (let i = 0; i < records.length; i++) {
        lat2 = records[i].latitude;
        lon2 = records[i].longitude;
        distance = findDistance(lat1, lon1, lat2, lon2);
        console.log(distance)
        if (distance < radiusInKm) {

            Around.push(records[i]);
            AroundExist = true;
            console.log(distance);
        }

    }
    return (AroundExist ? Around : null);
}
/*--This function takes in latitude and longitude of two location and returns the distance
(not actual road route,it is like displacement) between them  (in km)--*/

function findDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d;
}

//Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

//SAMPLE DATA
// govt ayurved disp 10.67597655073662, 76.42308965560025
//ihrd 10.700908494364707, 76.42715519781129
//thiruvillwamala 10.728934487949953, 76.42508309642878
// testing for 3 km radius [3000m]

//TESTING
// yourLocation = { lat: 10.6857341, lon: 76.4170785 };
// activePatients = [{ patId: 001, lat: 10.67597655073662, lon: 76.42308965560025 },
// { patId: 002, lat: 10.700908494364707, lon: 76.42715519781129 },
// { patId: 003, lat: 10.728934487949953, lon: 76.42508309642878 }]
// console.log(getCvdPosAround(yourLocation, activePatients, 3000));



// checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
// if (geolib.isPointWithinRadius(
//     { latitude: parseFloat(records[i].latitude), longitude: parseFloat(records[i].longitude) },
//     { latitude: parseFloat(yourLoc.latitude), longitude: parseFloat(yourLoc.longitude) },
//     radius
// )) {
//     Around.push(records[i]);
//     AroundExist = true;

// }

module.exports = getNearby;