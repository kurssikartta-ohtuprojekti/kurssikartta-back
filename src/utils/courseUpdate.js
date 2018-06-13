var request = require('request');
var path = require('path');
var fs = require('fs');

module.exports = function (req, res, next) {
  // Give spreadsheet information
  var id = "1K0w4aGHVwqZJpB8wm9sa9eye3nsQXPn2KvacnZGmlh8",
    sheet = 1,
    url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';

  // Get spreadsheet information and parse them to JSON
  request(url, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(response.body);
      var responseObj = {};
      var rows = [];
      var columns = {};
      for (var i = 0; i < data.feed.entry.length; i++) {
        var entry = data.feed.entry[i];
        var keys = Object.keys(entry);
        var newRow = {};
        var queried = false;
        for (var j = 0; j < keys.length; j++) {
          var gsxCheck = keys[j].indexOf('gsx$');
          if (gsxCheck > -1) {
            var key = keys[j];
            var name = key.substring(4);
            var content = entry[key];
            var value = content.$t;

            if (value.length > 0) {
              if (value === "TRUE") {
                value = true;
              }
              if (value === "FALSE") {
                value = false;
              }
              if (name === "prereqs" || name === "studytrack") {
                var splitter = value.split(',');
                value = splitter;
              }
              newRow[name] = value;

              if (name === "periodyear") {
                var splitter = value.split(',');
                var howMany = value.split(',').length;
                var periodyear = new Object();

                for (var k = 2017; k < 2030; k++) {
                  var year = k;
                  yearCheck(howMany, splitter, year, periodyear);
                }
                newRow[name] = periodyear;
              }

            } else {
              if (name !== "faculty") {
                value = [];
                newRow[name] = value;
              }
            }
          }
        }
        rows.push(newRow);
      }
      responseObj = rows;

      return res.status(200).json(responseObj) &&
        fs.writeFileSync(path.resolve(__dirname, '../../resources/kaikkikurssit.json'), JSON.stringify(responseObj, null, 4));;
    } else {
      return res.status(response.statusCode).json(error);
    }
  });
};

function yearCheck(howMany, splitter, year, periodyear) {
  var periods = [false, false, false, false, false, false];
  periodCheck(howMany, splitter, year, periods);
  if (periods.includes(true)) {
    periodyear[year] = periods;
    // console.log(periodyear);
  }
}

function periodCheck(howMany, splitter, year, periods) {
  for (var y = 0; y < howMany; y++) {
    if (splitter[y] === ("1/" + year)) {
      periods[0] = true;
    }
    if (splitter[y] === ("2/" + year)) {
      periods[1] = true;
    }
    if (splitter[y] === ("christmas/" + year)) {
      periods[2] = true;
    }
    if (splitter[y] === ("3/" + year)) {
      periods[3] = true;
    }
    if (splitter[y] === ("4/" + year)) {
      periods[4] = true;
    }
    if (splitter[y] === ("summer/" + year)) {
      periods[5] = true;
    }
  }
}
