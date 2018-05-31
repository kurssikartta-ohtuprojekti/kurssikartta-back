var request = require('request');
var path = require('path');
var fs = require('fs');

module.exports = function (req, res, next) {
  // Annetaan spreadsheetin tiedot
  var id = "1K0w4aGHVwqZJpB8wm9sa9eye3nsQXPn2KvacnZGmlh8",
    sheet = 1,
    url = 'https://spreadsheets.google.com/feeds/list/' + id + '/' + sheet + '/public/values?alt=json';

  // Haetaan spreadsheetin tiedot ja käsitellään ne JSONiin sopivaan muotoon
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