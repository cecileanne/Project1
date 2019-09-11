// Ready the page
$(document).ready(function() {
  // Eventually have buttons or a side bar with different searches (eclipses, asteroids, etc)

  // Set variables for calculating if one can see the Northern Lights
  // For Northern Lights, we can set the search parameter of a user traveling that day to up to a week from the current date
  // (if we decide on working on eclipses, the search parameters are based on when an eclipse is happening on earth, taken from an API)

  const weatherAPIKey = "743ab863a8fe63b9814fb432f2017098";
  recentSearch = localStorage.getItem("recentLocation");

  // loads most recent search on page load? not sure if we want this
  if (recentSearch !== undefined) {
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${recentSearch},us&APPID=${weatherAPIKey}`,
      dataType: "json",
      type: "GET"
    }).then(weatherResults => {
      console.log(weatherResults);
    });
  }

  // event listener - user input on form submit
  $(document).on("submit", "#cityForm", function() {
    event.preventDefault();
    const citySearch = $("#city").val();
    localStorage.setItem("recentLocation", citySearch);

    // 5 day weather forecast,
    $.ajax({
      url: `https://api.openweathermap.org/data/2.5/forecast?q=${citySearch},us&APPID=${weatherAPIKey}`,
      dataType: "json",
      type: "GET"
    }).then(weatherResults => {
      console.log(weatherResults);
    });
  }); // closes form submit listener

  // Save to local storage (no need for cookies or server) - eventually if we have a log in then people could save settings or plan events
  //  Where is the user / where will the user be (user input of starting location)
  //  Date (if not current date), optional

  // First determine if it's even possible given the date range (all upcoming kp=0)
  //  Second check - Is there solar flare activity in that two-day range? (take the last active known date, and if it is a multiple of either 27-28 days later this is fulfilled -- get this from an API)
  // What date (or date range) is the user wanting to chase the lights? (user input)
  //      Calculate a radius for the users position based on the current location at the current time; and how far north they will be able to drive within that time frame
  //          We are assuming they won't be able to get day-of plane tickets and they won't be able to walk or take public transportation because it should be in a dark area / no city lights
  //          For loop for every day in the range?
  //              If for day of, we will assume that the person will need some packing/ready time so we should subtract an hour of available travel time
  //              If for next day, calculate driving time plus 6 hours (human needs such as napping, eating - do we want to promote going safely? This doesn't take into account if there is a second driver)

  //  What kp zone is the user capable of reaching
  //  Do any kp zones the user is capable of reaching exist on the API results?
  //  For each of the resulting locations:
  //  //  Is it dark?
  //  //      Grab time of sunset for a given date from an API
  //  //      Grab time of sunrise for a given date plus one from same API
  //  //      let window of time when it is dark equal sunset+2 hours to sunrise-2 hours
  //  //  Is the weather clear (no clouds/precipitation) during the window of time?
  //  //      Grab the weather forecast for that window of time

  // DOM elements that can notify the user.
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
