const inputDataForUpdateIsValid = (id, data) => {
    return (data.name !== undefined && data.matrice !== undefined && data.id !== undefined && id === data.id)
}
const inputDataForCreationIsValid = (data) => {
    return (data.name !== undefined && data.matrice !== undefined && data.id === undefined)

}
module.exports = {
    inputDataForUpdateIsValid, inputDataForCreationIsValid
}