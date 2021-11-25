import { FLIGHTS_LIST } from "./flight.actions";

const initialState = {
  flightsList: [],
  date: null,
};

const flightsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FLIGHTS_LIST:
      return {
        ...state,
        flightsList: action.payload.dataList,
        date: action.payload.date,
      };
    default:
      return state;
  }
};

export default flightsReducer;
