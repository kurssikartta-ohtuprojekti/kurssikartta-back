

// tee tälle jotain
const dataIsValid = (data) => {
    return (data.id !== undefined && data.name !== undefined && data.matrice !== undefined)
}

module.exports = {
    dataIsValid
}