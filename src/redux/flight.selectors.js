import { createSelector } from "reselect";
import moment from "moment";

export const flightsListSelector = (state) => {
  return state.flights.flightsList;
};

export const dateSelector = (state) => {
  return state.flights.date;
};

const filterFlightsList = (flightsList, filterString) => {
  const today = moment().format("YYYY-MM-DD");
  return flightsList.filter((flight) => {
    const dateOfDeparture = moment(flight[filterString]).format("YYYY-MM-DD");
    return moment(today).isSame(dateOfDeparture);
  });
};

export const departureSelector = createSelector(
  [flightsListSelector],
  (flightsList) => {
    if (flightsList.length === 0) return flightsList;
    return filterFlightsList(flightsList.body.departure, "timeDepSchedule");
  }
);

export const arrivalSelector = createSelector(
  [flightsListSelector],
  (flightsList) => {
    if (flightsList.length === 0) return flightsList;
    return filterFlightsList(flightsList.body.arrival, "timeArrSchedule");
  }
);
