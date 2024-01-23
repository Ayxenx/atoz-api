# atoz-api
> Amazon A-to-Z API for automating employee services 

## Highlights
- 

## Install
```bash
npm install --save atoz-api
```
## Usage
```ts

//Get AuthToken from refresh token
const atozapi = require('atoz-api')

async function main() {
    const authToken = await auth.getAuthToken('refresh_token');
    console.log(authToken);
}

main();
```
Here, We're using a refresh token to get our auth token which is used in every request. This function will return something like:

```json
{
    "access_token": "access(auth)_token",
    "refresh_token": "refresh_token",
    "expires_in": 900,
    "token_type": "bearer"
}

```

## Todo
**Each category will be in-order from importance**
- Auth
    - [x] Authentication
    - [ ] Login

- User
    - [x] Get VoluntaryTimeOff (VTO)
    - [x] Submit VoluntaryTimeOff (VTO)
    - [ ] Get VoluntaryExtraTime (VET)
    - [ ] Submit VoluntaryExtraTime (VET)
    - [ ] View Time
    - [ ] View Profile
- Misc.
    - [ ] Send Shout-Outs (Any)
    - [ ] Post on MyVoice

