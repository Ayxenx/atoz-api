# atoz-api
> Amazon A-to-Z API for automating employee services 

## Highlights
- 

## Install
```bash
npm i atoz-api
```
## Usage

#### Authentication

>This is the getAuthToken function which we use to get our Access Token
```javascript

//Gets AuthToken from refresh token
const atozapi = require('atoz-api')

async function main() {
    const authToken = await atozapi.getAuthToken('refresh_token');
    console.log(authToken);
    console.log(authToken.access_token);
    console.log(authToken.refresh_token);
}
/** Logs
 *  JSON BODY : console.log(authToken);
 *  "access_token" : console.log(authToken.access_token);
 *  "refresh_token" : console.log(authToken.refresh_token);
 *  The function also returns 'expires_in' & 'token_type'
 *  These are not commonly used unless you want to accurately 
 *  refresh your token
 * **/


main();
```
>Here, We're using a refresh token to get our auth token which is used in every request. This function will return JSON:

```json
{
    "access_token": "access(auth)_token", // JWT Token
    "refresh_token": "refresh_token", // UUID
    "expires_in": 900, // (seconds)
    "token_type": "bearer"
}

```

#### Viewing VTO

>Let's call the getVto function and use our authToken to view our VTO requests, the boolean represents if you want to see include ineligible opportunities.
```javascript
const atozapi = require('atoz-api')

async function main(){
const authToken = await atozapi.getAuthToken('refresh_token') // UUID as String
console.log(await vto.getVto(authToken.access_token,false))
}
main()
```
>This is what an opportunity looks like, you can automate accepting opportunities by going through every **opportunity** in **opportunities**
```json
{
    "data": {
        "shiftOpportunities": {
            "opportunities": [
                {
                    "id": "amzn.ls.opportunityidaf0d0e5d-5735-4c8b-9d8a-127fb52e94e7",
                    "type": "VOLUNTARY_TIME_OFF",
                    "dropDeadline": null,
                    "penaltyStartTime": null,
                    "shift": {
                        "id": "ABCD-2013-09-17T12:30:00Z-2013-09-17T23:00:00Z",
                        "timeRange": {
                            "start": "2013-09-17T06:20:00Z",
                            "end": "2013-09-17T16:50:00Z",
                            "__typename": "DateTimeRange"
                        },
                        "__typename": "Shift",
                        "site": {
                            "specialInstructions": null,
                            "__typename": "Site",
                            "address": null,
                            "id": "ABCD_(AMZML)Station_ABCD",
                            "lineOfBusiness": null,
                            "name": "ABCD"
                        },
                        "duration": {
                            "value": "PT10H30M",
                            "__typename": "Duration"
                        }
                    },
                    "incentivePay": null,
                    "__typename": "ShiftOpportunity",
                    "skill": "CYCLE_1",
                    "skills": [
                        {
                            "translationKey": null,
                            "namespace": null,
                            "defaultText": "CYCLE_1",
                            "__typename": "TranslatedString"
                        }
                    ],
                    "eligibility": {
                        "isEligible": false,
                        "unclaimableReasonCodes": [
                            "SMS-1002",
                            "SMS-1000",
                            "SMS-1006"
                        ],
                        "__typename": "ShiftEligibility"
                    },
                    "addDeadline": null,
                    "unavailability": null
                }
            ]
        }
    }
}
```

#### Accepting VTO

Here, We're accepting a VTO Opportunity using the Opportunity Id given by the JSON from getVto
```javascript
const atozapi = require('atoz-api')

async function main(){
const authToken = await atozapi.getAuthToken('refresh_token') // UUID as String

const opportunity = await vto.getVto(authToken.access_token)
const response = vto.submitVto(authToken.access_token,opportunity.data.shiftOpportunities.opportunities[0].id)
/** 
 *  You can go through the opportunities and check all start and end times to see which 
 *  you'd like to accept, with this example this is attempting to accept the first opportunity
 * **/
}
main()
```

#### Viewing VET
Let's View VET using the getVet function, here we input our access_token with the start and end date. Ex: 01/23/2024 is input as 01232024.
This is to accurately view opportunities for the week, you'll be provided with a JSON.
```javascript
const atozapi = require('atoz-api')

async function main(){
const authToken = await atozapi.getAuthToken('refresh_token')
const response = await atozapi.getVet(authToken.access_token,'01232024','01312024')
}
main()
```

#### Accepting VET

```javascript
const atozapi = require('atoz-api')

async function main(){
const authToken = await atozapi.getAuthToken('refresh_token')
const opportunity. = await atozapi.getVet(authToken.access_token,'01232024','01312024')
const response = await atozapi.submitVet(authToken,opportunity.data.shiftOpportunities.opportunities[0].id)
// As of 1/23 this does not work right yet, but will very soon.
}
main()


```

### FAQ

>How to get my refresh_token?
- To get your refresh token, log into a  

## Todo
**Each category will be in-order from importance**
- Auth
    - [x] Authentication
    - [ ] Login

- User
    - [x] Get VoluntaryTimeOff (VTO)
    - [x] Submit VoluntaryTimeOff (VTO)
    - [x] Get VoluntaryExtraTime (VET)
    - [ ] Submit VoluntaryExtraTime (VET) 
    - [ ] View Time
    - [ ] View Profile
- Misc.
    - [ ] Send Shout-Outs (Any)
    - [ ] Post on MyVoice

