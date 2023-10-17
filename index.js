// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function(req, res) {
  let inputDate = req.params.date;

  // If the date parameter is empty, use the current time
  if (!inputDate) {
    inputDate = new Date();
    res.json({
      unix: inputDate.getTime(),
      utc: inputDate.toUTCString()
    });
    return;
  }

  // Validate the date format (MM-DD-YYYY)
  const dateFormatRegex = /^(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])-\d{4}$/;

  if (dateFormatRegex.test(inputDate) ) {
    // If the date is in the valid format, parse and return the response
    const parsedDate = new Date(inputDate);
    res.json({
      unix: parsedDate.getTime(),
      utc: parsedDate.toUTCString()
    });
  } else if (!isNaN(inputDate)) {
      // If the input is a valid Unix timestamp, convert to Date and return the response
      const unixTimestamp = parseInt(inputDate);
      const unixDate = new Date(unixTimestamp);
      let utc = unixDate.toUTCString();
      if(utc === "Invalid Date")
        res.json(
          { error: "Invalid Date" });
      else {
      res.json({
        unix: unixDate.getTime(),
        utc: unixDate.toUTCString()
      })};
    }
  else {
    // If the date format is invalid, return an error response
    res.json({ error : "Invalid Date" });
  }
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
