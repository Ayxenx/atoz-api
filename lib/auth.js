
async function getAuthToken(refresh_token) {
    // Check if the refresh_token is a valid UUID
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(refresh_token)) {
        return "Refresh Token is invalid.";
    }

    // Data to be sent in the POST request
    const formData = new URLSearchParams();
    formData.append('refresh_token', refresh_token);
    formData.append('client_id', 'atoz.mobile.pkce.prod');
    formData.append('grant_type', 'refresh_token');

    try {
        // Make the POST request
        const response = await fetch('https://idp.federate.amazon.com/api/oauth2/v2/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: formData
        });

        // Parse and return the JSON response
        return await response.json();
    } catch (error) {
        // Handle any errors that occur during the fetch
        return `Error: ${error.message}`;
    }
}

module.exports = {
    getAuthToken
}