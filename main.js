const auth = require('./lib/auth')
const vto = require("./lib/vto")
const vet = require("./lib/vet")
const user = require("./lib/user")



module.exports = {
    getAuthToken: auth.getAuthToken,
    getVto: vto.getVto,
    submitVto: vto.submitVto,
    getEmployee: user.getEmployee
}