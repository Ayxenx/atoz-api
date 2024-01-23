async function getVet(auth_token, startDate, endDate) {

    // Parse Input
    const startYear = startDate.substr(4, 4);
    const startMonth = startDate.substr(0, 2);
    const startDay = startDate.substr(2, 2);
  
    const endYear = endDate.substr(4, 4);
    const endMonth = endDate.substr(0, 2);
    const endDay = endDate.substr(2, 2);
  
    const timeRange = {
      start: `${startYear}-${startMonth}-${startDay}T05:00:00.000Z`,
      end: `${endYear}-${endMonth}-${endDay}T05:00:00.000Z`
    };

    const url = 'https://atoz-api-us-east-1.amazon.work/graphql';
    const headers = {
        'Content-Type': 'application/json',
        'x-atoz-client-id': 'SCHEDULE_MANAGEMENT_SERVICE',
        'Cookie': `atoz-oauth-token=${auth_token}`
    };

    const graphqlQuery = `
    query FindShiftsPageMore($timeRange: DateTimeRangeInput!, $filter: ShiftOpportunitiesFilter, $opportunityTypes: TypeFilter!, $canFetchPayBreakdown: Boolean = false) {
        shiftOpportunities(timeRange: $timeRange, filter: $filter) {
          opportunities(opportunityTypes: $opportunityTypes) {
            id
            type
            ...OpportunityCardList_ShiftOpportunity
            ...FilteredShifts_ShiftOpportunity
            ...ShiftsPerDay_ShiftOpportunities
            ...ShiftFilters_ShiftOpportunity
            __typename
          }
          __typename
        }
      }
      
      fragment OpportunityCardList_ShiftOpportunity on ShiftOpportunity {
        ...OpportunityFlowModal_ShiftOpportunity
        ...OpportunityCard_ShiftOpportunity
        __typename
      }
      
      fragment OpportunityFlowModal_ShiftOpportunity on ShiftOpportunity {
        ...UseAddOpportunityModalContentData_ShiftOpportunity
        ...UseShiftDetailsModalContentData_ShiftOpportunity
        __typename
      }
      
      fragment UseAddOpportunityModalContentData_ShiftOpportunity on ShiftOpportunity {
        id
        type
        dropDeadline
        penaltyStartTime
        shift {
          id
          timeRange {
            start
            end
            __typename
          }
          __typename
        }
        incentivePay {
          payModifiers {
            applicableNetAmount {
              amount
              code
              __typename
            }
            category
            hourlyAdditionalCompensation {
              amount
              code
              __typename
            }
            name
            timeRange {
              start
              end
              __typename
            }
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment UseShiftDetailsModalContentData_ShiftOpportunity on ShiftOpportunity {
        shift {
          ...UseShiftDetailsModalContentData_Shift
          __typename
        }
        skill
        skills {
          translationKey
          namespace
          defaultText
          __typename
        }
        ...UseShiftDetailsCardData_ShiftOpportunity
        ...UseShiftPayLinkData_ShiftOpportunity
        ...UseShiftPayBreakdownData_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftDetailsModalContentData_Shift on Shift {
        site {
          specialInstructions
          __typename
        }
        ...UseShiftDetailsCardData_Shift
        __typename
      }
      
      fragment UseShiftDetailsCardData_Shift on Shift {
        id
        timeRange {
          start
          __typename
        }
        site {
          address
          __typename
        }
        ...UseShiftInfoData_Shift
        __typename
      }
      
      fragment UseShiftInfoData_Shift on Shift {
        timeRange {
          start
          end
          __typename
        }
        duration {
          value
          __typename
        }
        site {
          id
          address
          lineOfBusiness
          name
          __typename
        }
        __typename
      }
      
      fragment UseShiftDetailsCardData_ShiftOpportunity on ShiftOpportunity {
        shift {
          ...UseShiftDetailsCardData_Shift
          __typename
        }
        payBreakdown @include(if: $canFetchPayBreakdown) {
          ...UseShiftDetailsCardData_PayBreakdown
          __typename
        }
        ...UseShiftInfoData_ShiftOpportunity
        ...UseVtoAvailableCardData_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftDetailsCardData_PayBreakdown on PayBreakdown {
        ...UseShiftInfoData_PayBreakdown
        __typename
      }
      
      fragment UseShiftInfoData_PayBreakdown on PayBreakdown {
        summary {
          duration {
            value
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment UseShiftInfoData_ShiftOpportunity on ShiftOpportunity {
        skill
        skills {
          translationKey
          namespace
          defaultText
          __typename
        }
        shift {
          ...UseShiftInfoData_Shift
          __typename
        }
        payBreakdown @include(if: $canFetchPayBreakdown) {
          ...UseShiftInfoData_PayBreakdown
          __typename
        }
        __typename
      }
      
      fragment UseVtoAvailableCardData_ShiftOpportunity on ShiftOpportunity {
        id
        shift {
          duration {
            value
            __typename
          }
          timeRange {
            start
            end
            __typename
          }
          __typename
        }
        ...useAcceptVto_ShiftOpportunity
        __typename
      }
      
      fragment useAcceptVto_ShiftOpportunity on ShiftOpportunity {
        id
        ...UseAcceptVtoSuccessData_ShiftOpportunity
        __typename
      }
      
      fragment UseAcceptVtoSuccessData_ShiftOpportunity on ShiftOpportunity {
        shift {
          id
          timeRange {
            start
            end
            __typename
          }
          duration {
            value
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayLinkData_ShiftOpportunity on ShiftOpportunity {
        incentivePay {
          ...UseShiftPayLinkData_IncentivePay
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayLinkData_IncentivePay on IncentivePay {
        netPayModifier {
          code
          amount
          __typename
        }
        payModifiers {
          category
          applicableNetAmount {
            code
            amount
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayBreakdownData_ShiftOpportunity on ShiftOpportunity {
        payBreakdown @include(if: $canFetchPayBreakdown) {
          ...UseShiftPayBreakdownData_PayBreakdown
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayBreakdownData_PayBreakdown on PayBreakdown {
        base {
          ...UseShiftPayBreakdownData_BreakdownRange
          __typename
        }
        shiftDifferential {
          ...UseShiftPayBreakdownData_BreakdownRange
          __typename
        }
        premiums {
          ...UseShiftPayBreakdownData_BreakdownRange
          __typename
        }
        summary {
          ...UseShiftPayBreakdownData_BreakdownSummary
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayBreakdownData_BreakdownRange on BreakdownRange {
        category
        hourlyCompensation {
          ...UseShiftPayBreakdownData_Currency
          __typename
        }
        durationRange {
          min {
            value
            __typename
          }
          max {
            value
            __typename
          }
          __typename
        }
        totalCompensationRange {
          min {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          max {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment UseShiftPayBreakdownData_Currency on Currency {
        amount
        code
        __typename
      }
      
      fragment UseShiftPayBreakdownData_BreakdownSummary on BreakdownSummary {
        totalShiftPayRange {
          min {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          max {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          __typename
        }
        duration {
          value
          __typename
        }
        hourlyShiftRateRange {
          min {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          max {
            ...UseShiftPayBreakdownData_Currency
            __typename
          }
          __typename
        }
        __typename
      }
      
      fragment OpportunityCard_ShiftOpportunity on ShiftOpportunity {
        type
        dropDeadline
        penaltyStartTime
        eligibility {
          isEligible
          unclaimableReasonCodes
          __typename
        }
        shift {
          id
          ...UseShiftInfoData_Shift
          __typename
        }
        incentivePay {
          payModifiers {
            applicableNetAmount {
              amount
              code
              __typename
            }
            category
            hourlyAdditionalCompensation {
              amount
              code
              __typename
            }
            name
            timeRange {
              start
              end
              __typename
            }
            __typename
          }
          __typename
        }
        ...UsePayLabelData_ShiftOpportunity
        ...UseShiftInfoData_ShiftOpportunity
        __typename
      }
      
      fragment UsePayLabelData_ShiftOpportunity on ShiftOpportunity {
        shift {
          ...UsePayLabelData_Shift
          __typename
        }
        incentivePay {
          ...UsePayLabelData_IncentivePay
          __typename
        }
        payBreakdown @include(if: $canFetchPayBreakdown) {
          ...UsePayLabelData_PayBreakdown
          __typename
        }
        __typename
      }
      
      fragment UsePayLabelData_Shift on Shift {
        timeRange {
          start
          end
          __typename
        }
        duration {
          value
          __typename
        }
        __typename
      }
      
      fragment UsePayLabelData_IncentivePay on IncentivePay {
        netPayModifier {
          amount
          code
          __typename
        }
        payModifiers {
          applicableNetAmount {
            code
            amount
            __typename
          }
          category
          __typename
        }
        __typename
      }
      
      fragment UsePayLabelData_PayBreakdown on PayBreakdown {
        summary {
          hourlyShiftRateRange {
            min {
              amount
              code
              __typename
            }
            max {
              amount
              code
              __typename
            }
            __typename
          }
          __typename
        }
        premiums {
          category
          __typename
        }
        __typename
      }
      
      fragment FilteredShifts_ShiftOpportunity on ShiftOpportunity {
        type
        shift {
          site {
            id
            __typename
          }
          timeRange {
            start
            end
            __typename
          }
          __typename
        }
        eligibility {
          isEligible
          unclaimableReasonCodes
          __typename
        }
        incentivePay {
          netPayModifier {
            code
            __typename
          }
          payModifiers {
            name
            __typename
          }
          __typename
        }
        payBreakdown @include(if: $canFetchPayBreakdown) {
          premiums {
            category
            __typename
          }
          __typename
        }
        skill
        skills {
          translationKey
          namespace
          defaultText
          __typename
        }
        __typename
      }
      
      fragment ShiftsPerDay_ShiftOpportunities on ShiftOpportunity {
        ...ShiftFlowModal_ShiftOpportunities
        ...ShiftCard_ShiftOpportunities
        __typename
      }
      
      fragment ShiftFlowModal_ShiftOpportunities on ShiftOpportunity {
        id
        type
        addDeadline
        shift {
          ...ShiftFlowModal_Shift
          __typename
        }
        ...UseDropShiftModalContentData_ShiftOpportunity
        ...UseShiftDetailsModalBannersData_ShiftOpportunity
        ...UseShiftDetailsModalContentData_ShiftOpportunities
        ...UseSelectVtoModalContentData_ShiftOpportunity
        __typename
      }
      
      fragment ShiftFlowModal_Shift on Shift {
        id
        timeRange {
          start
          end
          __typename
        }
        __typename
      }
      
      fragment UseDropShiftModalContentData_ShiftOpportunity on ShiftOpportunity {
        id
        type
        penaltyStartTime
        dropDeadline
        shift {
          id
          __typename
        }
        __typename
      }
      
      fragment UseShiftDetailsModalBannersData_ShiftOpportunity on ShiftOpportunity {
        ...UseShiftDetailsModalScheduledBannersData_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftDetailsModalScheduledBannersData_ShiftOpportunity on ShiftOpportunity {
        id
        type
        shift {
          ...UseShiftDetailsModalScheduledBannersData_Shift
          __typename
        }
        ...UseScheduledShiftStatus_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftDetailsModalScheduledBannersData_Shift on Shift {
        id
        timeRange {
          start
          end
          __typename
        }
        __typename
      }
      
      fragment UseScheduledShiftStatus_ShiftOpportunity on ShiftOpportunity {
        id
        type
        addDeadline
        shift {
          ...UseScheduledShiftStatus_Shift
          __typename
        }
        __typename
      }
      
      fragment UseScheduledShiftStatus_Shift on Shift {
        id
        timeRange {
          start
          end
          __typename
        }
        __typename
      }
      
      fragment UseShiftDetailsModalContentData_ShiftOpportunities on ShiftOpportunity {
        ...UseShiftDetailsModalContentData_ShiftOpportunity
        ...UseShiftDetailsCardData_ShiftOpportunities
        __typename
      }
      
      fragment UseShiftDetailsCardData_ShiftOpportunities on ShiftOpportunity {
        ...UseShiftDetailsCardData_ShiftOpportunity
        ...UseVtoAvailableCardData_ShiftOpportunity
        __typename
      }
      
      fragment UseSelectVtoModalContentData_ShiftOpportunity on ShiftOpportunity {
        id
        shift {
          duration {
            value
            __typename
          }
          timeRange {
            start
            end
            __typename
          }
          __typename
        }
        type
        ...useAcceptVto_ShiftOpportunity
        __typename
      }
      
      fragment ShiftCard_ShiftOpportunities on ShiftOpportunity {
        id
        type
        penaltyStartTime
        shift {
          id
          duration {
            value
            __typename
          }
          timeRange {
            start
            end
            __typename
          }
          ...ShiftCard_Shift
          __typename
        }
        eligibility {
          isEligible
          __typename
        }
        unavailability {
          reasons
          __typename
        }
        ...UseShiftCardStatusData_ShiftOpportunity
        ...UseShiftInfoData_ShiftOpportunity
        __typename
      }
      
      fragment ShiftCard_Shift on Shift {
        id
        timeRange {
          start
          end
          __typename
        }
        __typename
      }
      
      fragment UseShiftCardStatusData_ShiftOpportunity on ShiftOpportunity {
        ...UseShiftCardScheduledStatusData_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftCardScheduledStatusData_ShiftOpportunity on ShiftOpportunity {
        shift {
          ...UseShiftCardScheduledStatusData_Shift
          __typename
        }
        ...UseScheduledShiftStatus_ShiftOpportunity
        __typename
      }
      
      fragment UseShiftCardScheduledStatusData_Shift on Shift {
        id
        duration {
          value
          __typename
        }
        timeRange {
          start
          end
          __typename
        }
        __typename
      }
      
      fragment ShiftFilters_ShiftOpportunity on ShiftOpportunity {
        shift {
          site {
            id
            name
            __typename
          }
          __typename
        }
        skill
        skills {
          translationKey
          namespace
          defaultText
          __typename
        }
        __typename
      }
      
`;

    const body = JSON.stringify({
        "operationName": "FindShiftsPageMore",
        "variables": {
            "canFetchPayBreakdown": false,
            "filter": {
                "includeIneligible": true,
                "unavailableReasonsToInclude": [
                    "AssociateAccepted",
                    "ShiftOpportunityCapacityMet",
                    "ShiftOpportunityExpired"
                ]
            },
            "opportunityTypes": {
                "types": [
                    "ADD",
                    "VOLUNTARY_EXTRA_TIME"
                ]
            },
            "timeRange": timeRange
        },
        "query": graphqlQuery
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

async function submitVet(auth_token,opportunity_id){}

module.exports = {
    getVet,
    submitVet
}