const user = {
    getEmployee: async function(alias, auth) {
        const url = `https://atoz-api.amazon.work/users/${alias}`;
        const headers = {
            'Content-Type': 'application/json',
            'x-atoz-client-id': 'ATOZ_MY_VOICE_SERVICE',
            'Cookie': `atoz-oauth-token=${auth}`
        };

        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: headers
            });
            const result = await response.json();
            return result;
        } catch (error) {
            return `Error: ${error.message}`;
        }
    }
}



module.exports = user