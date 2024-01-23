const auth = require('./lib/auth')
const vto = require("./lib/vto")
const vet = require("./lib/vet")

async function main(){
const authToken = await auth.getAuthToken('6effe878-e147-41fd-a53b-7e820ce0e6f3')
const response = await vet.getVet(authToken.access_token,'01232024','01312024')
}
main()

module.exports = {
    getAuthToken : auth.getAuthToken,
    getVto : vto.getVto,
    submitVto : vto.submitVto
}