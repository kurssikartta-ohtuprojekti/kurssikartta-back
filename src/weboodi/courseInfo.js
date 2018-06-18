const axios = require('axios');

const {weboodiApiBase} = require('../other/urls')

const instructionEventMapper = (item, index = 1) => {
    return {
        key: index,
        name: item.opetustapahtumanNimi,
        begins: item.alkuPvm,
        ends: item.loppuPvm,
        type: item.opetustapahtumanTyyppiSelite,
        signupAvailability: (item.tila === "ilmoittautuminen_kaynnissa")
    }
}

const studyObjectMapper = (item, index = 1) => {
    return {
        key: index,
        studyObjectCode: item.opintokohde.opintokohteenTunniste,
        instructionEvents: item.opetustapahtumat.map(instructionEventMapper),
    }

}
const getCourseInfo = (id) => {
    return axios
        .get(weboodiApiBase.concat(id))
        .then(response => response.data.map(studyObjectMapper))
}

module.exports = {
    getCourseInfo
}