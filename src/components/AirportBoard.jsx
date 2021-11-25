import React, { useEffect } from "react";
import { connect } from "react-redux";
import moment from "moment";
import SearchFlights from "./SearchFlights";
import FlightSchedule from "./FlightSchedule";
import * as flightsActions from "../redux/flight.actions";

const AirportBoard = ({ fetchFlightsList }) => {
  useEffect(() => {
    fetchFlightsList(moment().format("DD-MM-YYYY"));
  }, [fetchFlightsList]);

  return (
    <div>
      <SearchFlights />
      <FlightSchedule />
    </div>
  );
};

const mapDispatch = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(null, mapDispatch)(AirportBoard);
