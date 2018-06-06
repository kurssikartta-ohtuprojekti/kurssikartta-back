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

              if (name === "periodyear") {
                var splitter = value.split(',');
                var monta = value.split(',').length;
                console.log(monta);

                var periodyear = new Array();

                var vuosi = "2018";
                var periodit = [false, false, false, false, false, false];
                console.log(splitter);
                periodCheck(monta, splitter, vuosi, periodit);
                var v2018 = periodit;
                // if (periodit.includes(true)) {
                //   var year = {
                //     "2018": periodit,
                //   }
                //   periodyear.push(year);
                // }

                periodit = [false, false, false, false, false, false];
                vuosi = "2019";
                periodCheck(monta, splitter, vuosi, periodit);
                var v2019 = periodit;

                periodit = [false, false, false, false, false, false];
                vuosi = "2020";
                periodCheck(monta, splitter, vuosi, periodit);
                var v2020 = periodit;

                var periodyear = {
                  "2018": v2018,
                  "2019": v2019,
                  "2020": v2020,
                }

                console.log(periodyear);

                console.log(periodit);
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

function periodCheck(monta, splitter, vuosi, periodit) {
  for (var y = 0; y < monta; y++) {
    if (splitter[y] === ("k1/" + vuosi)) {
      periodit[0] = true;
    }
    if (splitter[y] === ("k2/" + vuosi)) {
      periodit[1] = true;
    }
    if (splitter[y] === ("kesä/" + vuosi)) {
      periodit[2] = true;
    }
    if (splitter[y] === ("s1/" + vuosi)) {
      periodit[3] = true;
    }
    if (splitter[y] === ("s2/" + vuosi)) {
      periodit[4] = true;
    }
    if (splitter[y] === ("joulu/" + vuosi)) {
      periodit[5] = true;
    }
  }
}
