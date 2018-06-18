const dataIsValid = (data) => {
    return (data.name !== undefined && data.matrice !== undefined)
}

module.exports = {
    dataIsValid
}