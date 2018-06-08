

// tee tälle jotain
const validate = (data) => {
    return (data.id !== undefined && data.name !== undefined && data.matrice !== undefined)
}

module.exports = {
    validate
}