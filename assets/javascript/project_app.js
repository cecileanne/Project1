// Ready the page
$(document).ready(function() {
  // Eventually have buttons or a side bar with different searches (eclipses, asteroids, etc)

  // DO NOT NEED - Set variables for calculating if one can see the Northern Lights
  // DO NOT NEED - For Northern Lights, we can set the search parameter of a user traveling that day to up to a week from the current date
  // DO NOT NEED NOW - (if we decide on working on eclipses, the search parameters are based on when an eclipse is happening on earth, taken from an API)

  // Array of Dark Sky objects:

  const darkSkyPlaces = [
    // {
    //   name: "Antelope Island State Park",
    //   latitude: 41.02983,
    //   longitude: -112.2297
    // },

    // { name: "Arches National Park", latitude: 38.7334, longitude: -109.5926 },

    // { name: "Beverly Shores, IN", latitude: 41.6898, longitude: -86.9796 },

    // {
    //   name: "Black Canyon of the Gunnison National Park",
    //   latitude: 38.5847,
    //   longitude: -107.744
    // },

    // { name: "Bon Accord, Alberta", latitude: 53.8355, longitude: -113.4141 },

    // {
    //   name: "Bryce Canyon National Park",
    //   latitude: 37.6,
    //   longitude: -112.1901
    // },

    // {
    //   name: "Canyonlands National Park",
    //   latitude: 38.3311,
    //   longitude: -109.8789
    // },
    // {
    //   name: "Capitol Reef National Park",
    //   latitude: 38.3723,
    //   longitude: -111.2639
    // },
    // {
    //   name: "Capulin Volcano National Monument",
    //   latitude: 36.7816,
    //   longitude: -103.9697
    // },
    // {
    //   name: "Cedar Breaks National Monument",
    //   latitude: 37.6422,
    //   longitude: -112.8436
    // },

    // //note: central Idaho refers to about half the state of Idaho, and is not the name of a distinct location
    // { name: "Central Idaho", latitude: 43.9624, longitude: -114.9122 },

    // {
    //   name: "Chaco Culture National Historical Park",
    //   latitude: 36.0503,
    //   longitude: -107.956
    // },
    // {
    //   name: "Cherry Springs State Park",
    //   latitude: 41.6563,
    //   longitude: -77.8286
    // },
    // { name: "Clayon Lake State Park", latitude: 36.576, longitude: -103.3056 },

    // {
    //   name: "Craters of the Moon National Monument",
    //   latitude: 43.2152,
    //   longitude: -113.5014
    // },
    // {
    //   name: "Dead Horse Point State Park",
    //   latitude: 38.485,
    //   longitude: -109.7407
    // },

    // {
    //   name: "Dinosaur National Monument",
    //   latitude: 40.4927,
    //   longitude: -108.9417
    // },

    // { name: "Geauga Observatory Park", latitude: 41.5844, longitude: -81.082 },

    // { name: "Glacier National Park", latitude: 48.6535, longitude: -113.7827 },

    // {
    //   name: "Goblin Valley State Park",
    //   latitude: 38.5739,
    //   longitude: -110.7071
    // },

    // {
    //   name: "Great Basin National Park",
    //   latitude: 38.9881,
    //   longitude: -114.3048
    // },

    // {
    //   name: "Great Sand Dunes National Park and Preserve",
    //   latitude: 37.7908,
    //   longitude: -105.5596
    // },

    // {
    //   name: "Headlands International Dark Sky Park",
    //   latitude: 45.7756,
    //   longitude: -84.7765
    // },

    // { name: "Homer Glen, IL", latitude: 41.5989, longitude: -87.9401 },

    // {
    //   name: "Hovenweep National Monument",
    //   latitude: 37.384,
    //   longitude: -109.0727
    // },

    // { name: "James River State Park", latitude: 37.6282, longitude: -78.1023 },

    // {
    //   name: "Kaibab Indian Reservation",
    //   latitude: 36.9214,
    //   longitude: -112.6786
    // },

    // { name: "Ketchum, ID", latitude: 43.6775, longitude: -144.8558 },

    // {
    //   name: "Massacre Rim Wilderness Study Area",
    //   latitude: 41.7156,
    //   longitude: -119.6945
    // },

    // {
    //   name: "Middle Fork River Forest Preserve",
    //   latitude: 40.3802,
    //   longitude: -87.9533
    // },

    // {
    //   name: "Mont-Megantic National Park",
    //   latitude: 45.452,
    //   longitude: -71.1488
    // },

    // {
    //   name: "Natural Bridges National Monument",
    //   latitude: 37.6124,
    //   longitude: -110.0076
    // },

    // { name: "Newport State Park", latitude: 45.235, longitude: -86.9993 },

    // { name: "Norwood, CO", latitude: 38.1315, longitude: -108.2927 },

    // {
    //   name: "Rainbow Bridge National Monument",
    //   latitude: 37.0751,
    //   longitude: -110.8658
    // },

    // { name: "Rappahannock County", latitude: 38.6762, longitude: -78.1564 },

    // {
    //   name: "Staunton River State Park",
    //   latitude: 36.699,
    //   longitude: -78.6772
    // },

    { name: "Steinaker State Park", latitude: 40.5118, longitude: -109.524 },

    { name: "Torrey, UT", latitude: 38.2957, longitude: -111.2736 },

    {
      name: "Waterton Lakes National Park",
      latitude: 49.0836,
      longitude: -113.9187
    },

    {
      name: "Weber County North Fork Park",
      latitude: 41.3709,
      longitude: -111.9073
    },

    { name: "Westcliffe, CO", latitude: 38.1353, longitude: -105.4733 }
  ];

  // event listener - user input on form submit
  let isLoading = false;
  $(document).on("submit", "#cityForm", function() {
    event.preventDefault();

    if (isLoading === false) {
      const citySearch = $("#city").val();
      isLoading = true;
      console.log(isLoading);
      let loadCount = 0;
      darkSkyPlaces.forEach(element => {
        cityLat = "";
        cityLon = "";
        // Save to local storage (no need for cookies or server) - eventually if we have a log in then people could save settings or plan events
        //  Where is the user / where will the user be (user input of starting location)
        //  Date (if not current date), optional

        // TO DO - Pull the data from the form use the google API to put that location into latitude and longitude
        // TO DECIDE - Display that latitude (number with five decimal points) and longitude for the user?
        auroraQueryURL = `https://api.auroras.live/v1/?type=all&lat=${element.latitude}&long=${element.longitude}&forecast=false&threeday=false`;
        $.ajax({
          url: auroraQueryURL,
          method: "GET"
        }).then(auroraResults => {
          let probability = auroraResults.probability.highest.value;
          if (probability > 20) {
            // 5 day weather forecast:
            const weatherAPIKey = "743ab863a8fe63b9814fb432f2017098";
            const weatherQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${element.latitude}&lon=${element.longitude}&APPID=${weatherAPIKey}`;
            $.ajax({
              url: weatherQueryURL,
              dataType: "json",
              type: "GET"
            }).then(weatherResults => {
              loadCount++;
              console.log(`loadCount:${loadCount}`);
              console.log(weatherResults);
              if (loadCount >= darkSkyPlaces.length) {
                isLoading = false;
                console.log(isLoading);
              }
            });
            $.ajax({
              url: `https://api.openweathermap.org/data/2.5/forecast?zip=${citySearch}&APPID=${weatherAPIKey}`,
              dataType: "json",
              type: "GET"
            }).then(userWeather => {
              cityLat = userWeather.city.coord.lat;
              cityLon = userWeather.city.coord.lon;
              console.log(cityLat);
              console.log(cityLon);
            });
          }
        }); //closes aurora .then
      }); // closes forEach
    } // closes isLoading conditional
  }); // closes form submit listener

  // Setting up the Leaflet Map (Evanston starting point, zoom at 13)
  var mymap = L.map("mapid").setView([42.0451, -87.6877], 13);
  // mapbox is the tiling we will use with leaflet, Cecile's key is pk.eyJ1IjoiY2VjaWxlYW5uZXNpc29uIiwiYSI6ImNrMGpxbG5taTA5cnAzYm90dHBwbHM0bmsifQ.S8GKddmQ1_kd1f_gRBt7yQ
  // Adding a tile layer to the map:
  L.tileLayer(
    "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "mapbox.streets",
      accessToken:
        "pk.eyJ1IjoiY2VjaWxlYW5uZXNpc29uIiwiYSI6ImNrMGpxbG5taTA5cnAzYm90dHBwbHM0bmsifQ.S8GKddmQ1_kd1f_gRBt7yQ"
    }
  ).addTo(mymap);

  // Taking the new array of objects that have a probability over an amount (to be set after testing) and the weather, these are the latitudes and longitudes to run
  afterWeatherLat = element.coord.lat;
  afterWeatherLon = element.coord.lon;

  // For each THIS SHOULD BE PUT UNDER WEATHER API
  // afterWeatherArray.forEach(element => {
  const firstLatLng = [cityLat, cityLon];
  const secondLatLng = [afterWeatherLat, afterWeatherLon];

  function distanceCalculator() {
    distance = L.GeometryUtil.distance(firstLatLng, secondLatLng);
    // document.getElementById('distance').innerHTML = distance;
    console.log(distance);
  }

  // // DECIDED NOT TO DO THIS: For Each of the probable latitudes, run the boolean "reachable" against the user input
  // // Cecile's openrouteservice key 5b3ce3597851110001cf6248aca18772dbdd4d4ca8e01a6717082039
  // // reachabilityURL = `https:// api.openrouteservice.org /v2/isochrones/driving-car`
  // // This is a copy paste from
  // let request = new XMLHttpRequest();
  // request.open(
  //   "POST",
  //   "https://api.openrouteservice.org/v2/isochrones/driving-car"
  // );
  // request.setRequestHeader(
  //   "Accept",
  //   "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8"
  // );
  // request.setRequestHeader(
  //   "Authorization",
  //   "5b3ce3597851110001cf6248aca18772dbdd4d4ca8e01a6717082039"
  // );
  // request.onreadystatechange = function() {
  //   if (this.readyState === 4) {
  //     console.log("Status:", this.status);
  //     console.log("Headers:", this.getAllResponseHeaders());
  //     console.log("Body:", this.responseText);
  //   }
  // };
  // const body =
  //   '{"locations":[[{cityLat},{cityLon}],[afterWeatherLat,afterWeatherLon]],"range":[{sunset.format("HH:MM")+02:00-moment.format("HH:MM")},1500000]}';
  // request.send(body);
  // //   const body =
  // //   '{"locations":[[8.681495,49.41461],[8.686507,49.41943]],"range":[300,200]}';
  // // request.send(body);

  // DO NOT NEED Create a for loop where AuroraLive does the search for latitude-10 (10 degrees north) until it hits the north pole and longitude truncated to 1 decimal point
  // DO NOT NEED if there is a result for which the probability is over 75%, these latitude/longitudinal pairs get put into objects

  // DO NOT NEED - First determine if it's even possible given the date range (all upcoming kp=0)
  // DO NOT NEED - Second check - Is there solar flare activity in that two-day range? (take the last active known date, and if it is a multiple of either 27-28 days later this is fulfilled -- get this from an API)
  // DO NOT NEED YET - What date (or date range) is the user wanting to chase the lights? (user input)
  //      Calculate a radius for the users position based on the current location at the current time; and how far north they will be able to drive within that time frame
  //          We are assuming they won't be able to get day-of plane tickets and they won't be able to walk or take public transportation because it should be in a dark area / no city lights
  //          For loop for every day in the range?
  //              If for day of, we will assume that the person will need some packing/ready time so we should subtract an hour of available travel time
  //              If for next day, calculate driving time plus 6 hours (human needs such as napping, eating - do we want to promote going safely? This doesn't take into account if there is a second driver)
  //  DO NOT NEED What kp zone is the user capable of reaching
  //  DO NOT NEED Do any kp zones the user is capable of reaching exist on the API results?

  //  For each of the resulting locations:
  //  //  Is it dark?
  //  //      Grab time of sunset for a given date from an API
  //  //      Grab time of sunrise for a given date plus one from same API
  //  //      let window of time when it is dark equal sunset+2 hours to sunrise-2 hours
  //  //  Is the weather clear (no clouds/precipitation) during the window of time?
  //  //      Grab the weather forecast for that window of time

  // DOM elements that can notify the user.
  // Image for aurora at the current time: https://services.swpc.noaa.gov/images/aurora-forecast-northern-hemisphere.jpg
  // Eventually there could be a toggle so the user can sort the order of the results
  //  // By least amount of travel time
  //  // By likelihood of seeing (higher percentage predictability)
  //  Eventually possibly a slider so a user can set the percentage lower (i.e. they are willing to chase it even if only a 60% chance)
  //  If percentage is over 80% possibility: Time to pack your long-exposure cameras! You can reach the following places and the odds are good.
  //  If the user cannot reach a zone in time: Sorry, {userLocation} you're too far away from reaching a good spot in time. (But still give a list of up to 10 possibile locations+dates+times)
  //  If the solar flare activity is low: Sorry, solar activity is low {userDates} and even Zones 1 and 2 can't see the lights.
  //  If it's a matter of weather: Sorry, it's not a great idea to make the trip from {userLocation} because it won't be clear enough. (But still give a list of 10 possible locations+dates+times)

  // Table display: You can view the Northern Lights here:
  const row = $("<tr>");
  //  City
  const location = $("<td>");
  location.text(); //location variable
  row.append(location);

  //  Distance from start location
  const distanceFromStart = $("<td>");
  distanceFromStart.text(); //distanceFromStart variable
  row.append(distanceFromStart);

  //viewing probablity
  const viewProbability = $("<td>");
  viewProbability.text(); //viewProbability variable
  row.append(viewProbability);
  //  sunset
  const sunset = $("<td>");
  sunset.text(); //sunset variable
  row.append(sunset);
  //  sunrise
  const sunrise = $("<td>");
  sunrise.text(); //sunrise variable
  row.append(sunrise);
  //  Best time
  const bestTime = $("<td>");
  bestTime.text(); //bestTime variable
  row.append(bestTime);
  $("tbody").append(row);
  // When a user clicks on a result in the list - card is replaced with #selectedLocale
  $("<tr>").on("click", function() {
    $("#selectedLocale").append("Location: " + location);
    $("#selectedLocale").append("Viewing Probability: " + viewProbability);
    $("#selectedLocale").append("Best Viewing Time: " + bestTime);
    $("#selectedLocale").append("Directions: " + directions); //or whatever variable needed
    //- map updates with driving directions
  });
  // Eventually there could be a search and highlight on map of dark areas (see how Google categorizes locations - parks, forest, fields or find another API)
  // Eventually for each city result, we could print to a card a deeper dive into that city's percentage of probability for the date plus/(minus if possible given current date) 3 days
}); // closes $(document).ready
