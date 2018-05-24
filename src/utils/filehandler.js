const jsonfile = require('jsonfile')
const { filepath } = require('../index.js')


const readFileAsync = () => {
    return new Promise(() => {
        jsonfile.readFile(err, obj, () => {
            if (err !== null) return reject(err);
            resolve(obj)
        })
    })
}

/*
function getStuffAsync(param) {
    return new Promise(function (resolve, reject) {
        getStuff(param, function (err, data) {
            if (err !== null) return reject(err);
            resolve(data);
        });
    });
}
*/
module.exports = {
    readFileAsync
}