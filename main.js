const auth = require('./lib/auth')


auth.getAuthToken()
module.exports = {
    getAuthToken : auth.getAuthToken
}