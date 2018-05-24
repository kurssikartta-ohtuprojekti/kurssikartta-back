const axios = require('axios');

const baseUrl = 'https://weboodi.helsinki.fi/hy/api/public/opetushaku/hae?nimiTaiTunniste='

const opetustapahtumaMapper = (item, index = 1) => {
    console.log('item: ', item)
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
    console.log('item1: ', item)
    return {
        key: index,
        opintokohteenTunniste: item.opintokohde.opintokohteenTunniste,
        opetustapahtumat: item.opetustapahtumat.map(opetustapahtumaMapper),
    }

}
const getCourseInfo = (id) => {
    console.log('url: ', baseUrl.concat(id))
    return axios
        .get(baseUrl.concat(id))
        .then(response =>
            response.data.map(opintokohdeMapper)

        )
}

module.exports = {
    getCourseInfo
}