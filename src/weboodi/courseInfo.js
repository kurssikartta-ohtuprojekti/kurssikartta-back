const axios = require('axios');

const {weboodiApiBase} = require('../urls')

const opetustapahtumaMapper = (item, index = 1) => {
   // console.log('item: ', item)
    return {
        key: index,
        nimi: item.opetustapahtumanNimi,
        alkamisaika: item.alkuPvm,
        loppumisaika: item.loppuPvm,
        tyyppi: item.opetustapahtumanTyyppiSelite,
        ilmoittautuminenKaynnissa: (item.tila === "ilmoittautuminen_kaynnissa")
    }
}

const opintokohdeMapper = (item, index = 1) => {
 //   console.log('item1: ', item)
    return {
        key: index,
        opintokohteenTunniste: item.opintokohde.opintokohteenTunniste,
        opetustapahtumat: item.opetustapahtumat.map(opetustapahtumaMapper),
    }

}
const getCourseInfo = (id) => {
    console.log('url: ', weboodiApiBase.concat(id))
    return axios
        .get(weboodiApiBase.concat(id))
        .then(response => response.data.map(opintokohdeMapper))
}

module.exports = {
    getCourseInfo
}