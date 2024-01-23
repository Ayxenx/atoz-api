async function getVto(auth_token, includeIneligible) {
    const url = 'https://atoz-api-us-east-1.amazon.work/graphql';
    const headers = {
        'Content-Type': 'application/json',
        'x-atoz-client-id': 'SCHEDULE_MANAGEMENT_SERVICE',
        'Cookie': `atoz-oauth-token=${auth_token}`
    };

    const body = JSON.stringify({
        "operationName": "VtoPage",
        "variables": {
          "timeRange": {
            "start": "2023-11-03T18:00:00.000Z",
            "end": "2027-01-13T18:00:00.000Z"
          },
          "filter": {
            "includeIneligible": true,
            "unavailableReasonsToInclude": [
              "AssociateAccepted",
              "ShiftOpportunityCapacityMet"
            ]
          },
          "opportunityTypes": {
            "types": [
              "VOLUNTARY_TIME_OFF"
            ]
          }
        },
        "query": "query VtoPage($timeRange: DateTimeRangeInput!, $opportunityTypes: TypeFilter!, $filter: ShiftOpportunitiesFilter) {\n  shiftOpportunities(timeRange: $timeRange, filter: $filter) {\n    opportunities(opportunityTypes: $opportunityTypes) {\n      ...VtoCard_shiftOpportunity\n      ...PaidVto_shiftOpportunity\n      ...VtoSuccessModal_shiftOpportunity\n      __typename\n    }\n    __typename\n  }\n}\n\nfragment VtoCard_shiftOpportunity on ShiftOpportunity {\n  id\n  skill\n  eligibility {\n    isEligible\n    unclaimableReasonCodes\n    __typename\n  }\n  unavailability {\n    reasons\n    __typename\n  }\n  shift {\n    timeRange {\n      start\n      end\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment PaidVto_shiftOpportunity on ShiftOpportunity {\n  availableTimeOffBalances {\n    availableBalances {\n      id\n      displayNameTagName\n      amount {\n        value\n        __typename\n      }\n      __typename\n    }\n    minimumPaidBalancesAmountRequired {\n      value\n      __typename\n    }\n    maximumPaidBalancesAmountAllowed {\n      value\n      __typename\n    }\n    paidBalancesIncrementAmount {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment VtoSuccessModal_shiftOpportunity on ShiftOpportunity {\n  availableTimeOffBalances {\n    maximumPaidBalancesAmountAllowed {\n      value\n      __typename\n    }\n    __typename\n  }\n  __typename\n}"
      });

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body
        });
        return await response.json();
    } catch (error) {
        return `Error: ${error.message}`;
    }
}

async function submitVto(auth_token, opportunity) {
    const url = 'https://atoz-api-us-east-1.amazon.work/graphql';
  
    const headers = {
      'Content-Type': 'application/json',
      'x-atoz-client-id': 'SCHEDULE_MANAGEMENT_SERVICE',
      'Cookie': `atoz-oauth-token=${auth_token}`
    };
  
    const body = JSON.stringify({
      "operationName": "AcceptVto",
      "variables": {
        "input": {
          "shiftOpportunityId": opportunity
        }
      },
      "query": "mutation AcceptVto($input: DropShiftInput!) {\n  dropShift(input: $input)\n}"
    });
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: body
      });
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }

  module.exports = {
    getVto,
    submitVto
  }