// Ready the page
$(document).ready(function() {
  //FOR NAVBAR DROPDOW---------------------------------------------------------------------------------------
  $(".dropdown-trigger").dropdown();
  // Eventually have buttons or a side bar with different searches (eclipses, asteroids, etc)
  //-------------------------FIREBASE-------------------------------------------------------------------------------------
  const firebaseConfig = {
    apiKey: "AIzaSyAzbPIVKtTavnGr0c1OSBJc5paL39E5Ido",
    authDomain: "spacechasers.firebaseapp.com",
    databaseURL: "https://spacechasers.firebaseio.com",
    projectId: "spacechasers",
    storageBucket: "",
    messagingSenderId: "795917898622",
    appId: "1:795917898622:web:7dae77116fbeb71348592f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const database = firebase.database();
  const connectionsRef = database.ref("/connections");
  const connectedRef = database.ref(".info/connected");
  connectedRef.on("value", function(snap) {
    if (snap.val()) {
      const con = connectionsRef.push(true);
      con.onDisconnect().remove();
    }
  });
  connectionsRef.on("value", function(snap) {
    $("#currentUsers").text("Current Users: " + snap.numChildren());
  });

  // Setting up the Leaflet Map (Evanston starting point, zoom at 13)
  var map = L.map("mapid").setView([42.0451, -87.6877], 13);

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
  ).addTo(map);

  // Array of Dark Sky objects:

  const darkSkyPlaces = [
    {
      name: "Antelope Island State Park",
      latitude: 41.02983,
      longitude: -112.2297
    },

    { name: "Arches National Park", latitude: 38.7334, longitude: -109.5926 },

    { name: "Beverly Shores, IN", latitude: 41.6898, longitude: -86.9796 },

    {
      name: "Black Canyon of the Gunnison National Park",
      latitude: 38.5847,
      longitude: -107.744
    },

    { name: "Bon Accord, Alberta", latitude: 53.8355, longitude: -113.4141 },

    {
      name: "Bryce Canyon National Park",
      latitude: 37.6,
      longitude: -112.1901
    },

    {
      name: "Canyonlands National Park",
      latitude: 38.3311,
      longitude: -109.8789
    },
    {
      name: "Capitol Reef National Park",
      latitude: 38.3723,
      longitude: -111.2639
    },
    {
      name: "Capulin Volcano National Monument",
      latitude: 36.7816,
      longitude: -103.9697
    },
    {
      name: "Cedar Breaks National Monument",
      latitude: 37.6422,
      longitude: -112.8436
    },

    //note: central Idaho refers to about half the state of Idaho, and is not the name of a distinct location
    { name: "Central Idaho", latitude: 43.9624, longitude: -114.9122 },

    {
      name: "Chaco Culture National Historical Park",
      latitude: 36.0503,
      longitude: -107.956
    },
    {
      name: "Cherry Springs State Park",
      latitude: 41.6563,
      longitude: -77.8286
    },
    { name: "Clayon Lake State Park", latitude: 36.576, longitude: -103.3056 },

    {
      name: "Craters of the Moon National Monument",
      latitude: 43.2152,
      longitude: -113.5014
    },
    {
      name: "Dead Horse Point State Park",
      latitude: 38.485,
      longitude: -109.7407
    },

    {
      name: "Dinosaur National Monument",
      latitude: 40.4927,
      longitude: -108.9417
    },

    { name: "Geauga Observatory Park", latitude: 41.5844, longitude: -81.082 },

    { name: "Glacier National Park", latitude: 48.6535, longitude: -113.7827 },

    {
      name: "Goblin Valley State Park",
      latitude: 38.5739,
      longitude: -110.7071
    },

    {
      name: "Great Basin National Park",
      latitude: 38.9881,
      longitude: -114.3048
    },

    {
      name: "Great Sand Dunes National Park and Preserve",
      latitude: 37.7908,
      longitude: -105.5596
    },

    {
      name: "Headlands International Dark Sky Park",
      latitude: 45.7756,
      longitude: -84.7765
    },

    { name: "Homer Glen, IL", latitude: 41.5989, longitude: -87.9401 },

    {
      name: "Hovenweep National Monument",
      latitude: 37.384,
      longitude: -109.0727
    },

    { name: "James River State Park", latitude: 37.6282, longitude: -78.1023 },

    {
      name: "Kaibab Indian Reservation",
      latitude: 36.9214,
      longitude: -112.6786
    },

    { name: "Ketchum, ID", latitude: 43.6775, longitude: -144.8558 },

    {
      name: "Massacre Rim Wilderness Study Area",
      latitude: 41.7156,
      longitude: -119.6945
    },

    {
      name: "Middle Fork River Forest Preserve",
      latitude: 40.3802,
      longitude: -87.9533
    },

    {
      name: "Mont-Megantic National Park",
      latitude: 45.452,
      longitude: -71.1488
    },

    {
      name: "Natural Bridges National Monument",
      latitude: 37.6124,
      longitude: -110.0076
    },

    { name: "Newport State Park", latitude: 45.235, longitude: -86.9993 },

    { name: "Norwood, CO", latitude: 38.1315, longitude: -108.2927 },

    {
      name: "Rainbow Bridge National Monument",
      latitude: 37.0751,
      longitude: -110.8658
    },

    { name: "Rappahannock County", latitude: 38.6762, longitude: -78.1564 },

    {
      name: "Staunton River State Park",
      latitude: 36.699,
      longitude: -78.6772
    },

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
  //progress bar function
  function loadBar() {
    if (isLoading == true) {
      $(".progress").show();
    } else if (isLoading == false) {
      $(".progress").hide();
    }
  }
  let isLoading = false;
  loadBar();

  // event listener - user input on form submit
  $(document).on("submit", "#cityForm", function() {
    event.preventDefault();

    if (isLoading === false) {
      const citySearch = $("#city").val();
      isLoading = true;
      loadBar();
      const ajaxes = [];
      let loadCount = 0;
      darkSkyPlaces.forEach(element => {
        let weatherData = "";
        // running the
        auroraQueryURL = `https://api.auroras.live/v1/?type=all&lat=${element.latitude}&long=${element.longitude}&forecast=false&threeday=false`;
        //$.when to help control load bar

        ajaxes.push(
          $.ajax({
            url: auroraQueryURL,
            method: "GET"
          }).then(auroraResults => {
            let auroraCount = 0;
            let probability = auroraResults.probability.highest.value;
            if (probability > 20) {
              auroraCount++;
              // 5 day weather forecast:
              const weatherAPIKey = "743ab863a8fe63b9814fb432f2017098";
              const weatherQueryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${element.latitude}&lon=${element.longitude}&APPID=${weatherAPIKey}`;
              $.ajax({
                url: weatherQueryURL,
                dataType: "json",
                type: "GET"
              }).then(weatherResults => {
                loadCount++;
                weatherData = weatherResults;

                if (loadCount >= darkSkyPlaces.length) {
                  isLoading = false;
                }
              });
              $.ajax({
                url: `https://api.openweathermap.org/data/2.5/forecast?zip=${citySearch}&APPID=${weatherAPIKey}`,
                dataType: "json",
                type: "GET"
              }).then(userWeather => {
                const cityLat = userWeather.city.coord.lat;
                const cityLon = userWeather.city.coord.lon;

                $.ajax({
                  url: `https://api.mapbox.com/directions/v5/mapbox/driving/${cityLon},${cityLat};${element.longitude},${element.latitude}?access_token=pk.eyJ1IjoiY2VjaWxlYW5uZXNpc29uIiwiYSI6ImNrMGpxbG5taTA5cnAzYm90dHBwbHM0bmsifQ.S8GKddmQ1_kd1f_gRBt7yQ`
                }).then(directionResults => {
                  const distanceMiles = Math.floor(
                    directionResults.routes[0].distance * 0.000621371
                  );

                  const row = $("<tr>");
                  //  City
                  const location = $("<td>");
                  location.text(element.name); //location variable
                  row.append(location);

                  //  Distance from start location
                  const distanceFromStart = $("<td>");
                  distanceFromStart.text(distanceMiles); //distanceFromStart variable
                  row.append(distanceFromStart);

                  // viewing probablity
                  const viewProbability = $("<td>");
                  viewProbability.text(probability); //viewProbability variable
                  row.append(viewProbability);

                  // cloudiness % - NOTE there was an error when weather didn't return weatherData.list
                  const cloudiness = $("<td>");
                  const cloudPercentage = weatherData.list[0].clouds.all;

                  if (cloudPercentage <= 15) {
                    cloudiness.text(cloudPercentage + " (clear)");
                  } else {
                    cloudiness.text(cloudPercentage + " (too cloudy)");
                  }
                  row.append(cloudiness);

                  // sunset - sunrise
                  const bestTime = $("<td>");
                  const sunTime = moment
                    .unix(weatherData.city.sunrise)
                    .format(`HH:MM`);
                  // .subtract(2, "hours"); not working :(
                  const sunsetTime = moment
                    .unix(weatherData.city.sunset)
                    .format(`HH:MM`);
                  // .add(2, "hours"); not working :(
                  bestTime.text(`${sunsetTime} - ${sunTime}`); //bestTime variable
                  row.append(bestTime);

                  // row needs data attributes and classes for directions event

                  $(row)
                    .attr({
                      "data-destlon": element.longitude,
                      "data-destlat": element.latitude,
                      "data-userlon": cityLon,
                      "data-userlat": cityLat
                    })
                    .addClass("tableRow");
                  if (distanceMiles < 1000) {
                    $("tbody").prepend(row);
                  }
                }); // closes weather .then;
              });
            } // closes probability if conditional
            if (auroraCount === 0) {
              $("#noGoMessage").html(
                "<h5>Sorry, solar activity isn't high enough to be visible.</h5>"
              );
              isLoading = false;
              loadBar();
            }
          })
        ); //closes aurora .then
      }); // closes forEach
      $.when(...ajaxes).done(() => {
        isLoading = false;
        loadBar();
      });
    } // closes isLoading conditional
  }); // closes form submit listener
  // second event listener:  each table row will run a "directions" call on click
  $(document).on("click", ".tableRow", function(event) {
    const rowData = {
      destLon: $(event.target)
        .parent()
        .data("destlon"),
      destLat: $(event.target)
        .parent()
        .data("destlat"),
      userLon: $(event.target)
        .parent()
        .data("userlon"),
      userLat: $(event.target)
        .parent()
        .data("userlat")
    };
    //Adds a marker to the map at the location choosen from the table
    var marker = L.marker([rowData.destLat, rowData.destLon]).addTo(map);
    // marker has a pop with the location name and Instructions for directions
    marker
      .bindPopup(
        `<b>${event.target.textContent}</b>.<br>Click me for directions`
      )
      .openPopup();
    //if marker is clicked, user is taken to google maps with the driving route already displayed
    marker.on("click", function() {
      document.location.href = `https://www.google.com/maps/dir/${rowData.userLat},${rowData.userLon}/${rowData.destLat},${rowData.destLon}/data=!3m1!4b1!4m2!4m1!3e0`;
    });
    //keeps the marker centered on screen
    map.panTo([rowData.destLat, rowData.destLon]);
  }); // closes tableRow .on click
}); // closes $(document).ready
