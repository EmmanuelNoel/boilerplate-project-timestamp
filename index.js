// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});



app.get("/api/:date?", function(req, res) {
  const date_string = req.params.date;
  let resDate;

  if (!date_string) {
    resDate = new Date();
  } else {
    // Si le paramètre est un nombre, le traiter comme un timestamp Unix
    if (!isNaN(date_string)) {
      resDate = new Date(parseInt(date_string));
    } else {
      resDate = new Date(date_string);
    }

    // Vérifier si la date est invalide
    if (isNaN(resDate.getTime())) {
      return res.json({ error: "Invalid Date" });
    }
  }

  res.json({ unix: resDate.valueOf(), utc: resDate.toUTCString() });
});



