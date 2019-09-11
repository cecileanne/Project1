// Ready the page
$(document).ready(function() {
  // Eventually have buttons or a side bar with different searches (eclipses, asteroids, etc)

  // DO NOT NEED - Set variables for calculating if one can see the Northern Lights
  // DO NOT NEED - For Northern Lights, we can set the search parameter of a user traveling that day to up to a week from the current date
  // DO NOT NEED NOW - (if we decide on working on eclipses, the search parameters are based on when an eclipse is happening on earth, taken from an API)

  // Event listener - user input on click submit button
  $(document).on("submit", "#cityForm", function() {
    event.preventDefault();
    let citySearch = $("#city").val();
    console.log(citySearch);

    // Save to local storage (no need for cookies or server) - eventually if we have a log in then people could save settings or plan events
    //  Where is the user / where will the user be (user input of starting location)
    //  Date (if not current date), optional

    // TO DO - Pull the data from the form use the google API to put that location into latitude and longitude
    // TO DECIDE - Display that latitude (number with five decimal points) and longitude for the user?

    $("#runAJAX").on("submit", "#cityForm", function(searchAuroraLive) {
      event.preventDefault();
      let latitude = $("#googleLatitude").val();
      let longitude = $("#googleLongitude").val();
      queryURL = `https://api.auroras.live/v1/?type=all&lat=${latitude}&long=${longitude}&forecast=false&threeday=false`;
      console.log("working...");
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function(response) {
        let results = probability.highest.value;
        console.log(results);
      }); //closes .then
    }); // closes searchAroraLive
  }); // closes form submit listener

  // TO DO Create a for loop where AuroraLive does the search for latitude-10 (10 degrees north) until it hits the north pole and longitude truncated to 1 decimal point
  // TO DO if there is a result for which the probability is over 75%, these latitude/longitudinal pairs get put into objects

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
  //  City
  //  Distance from start location
  //  Best date
  //  Best time
  //  Percentage of Probability

  // When a user clicks on a result in the list - map updates with driving directions
  // Eventually there could be a search and highlight on map of dark areas (see how Google categorizes locations - parks, forest, fields or find another API)
  // Eventually for each city result, we could print to a card a deeper dive into that city's percentage of probability for the date plus/(minus if possible given current date) 3 days
}); // closes $(document).ready
