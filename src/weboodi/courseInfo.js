const axios = require('axios');

const baseUrl = 'https://weboodi.helsinki.fi/hy/api/public/opetushaku/hae?nimiTaiTunniste='

const opetustapahtumaMapper = (item) => {
    console.log('item: ', item)
    return {
        key: item.alkuPvm,   
        nimi: item.opetustapahtumanNimi,
        alkamisaika: item.alkuPvm,
        loppumisaika: item.loppuPvm,
        tyyppi: item.opetustapahtumanTyyppiSelite,
        ilmoittautuminenKaynnissa: (item.tila === "ilmoittautuminen_kaynnissa")
    }
}

const getCourseInfo = (id) => {
    console.log('url: ', baseUrl.concat(id))
    return axios
        .get(baseUrl.concat(id))
        .then(response => {
            console.log('response.data: ', response.data)
            return response.data.map((opintokohde) => {
                console.log('opetustapahtumat: ', opintokohde.opetustapahtumat)
                return {
                    key: opintokohde.opintokohde.opintokohteenTunniste,
                    opintokohteenTunniste: opintokohde.opintokohde.opintokohteenTunniste,
                    //    opintokohteenNimi: kohde.opintokohde.opintokohteenNimi,
                    opetustapahtumat: opintokohde.opetustapahtumat.map(opetustapahtumaMapper),
                    //  ilmoauki: kohde.ilmoittautumiskelpoinen
                }

            })

        })
}

module.exports = {
    getCourseInfo
}