import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams, useLocation } from "react-router-dom";
import qs from "qs";
import { departureSelector, arrivalSelector } from "../redux/flight.selectors";
import { fetchFlightsList } from "../redux/flight.actions";
import Flight from "./Flight";

const FlightsList = ({ departureList, arrivalList }) => {
  const [flightsList, setFlightsList] = useState([]);
  const [status, setStatus] = useState("");
  const { direction } = useParams();
  const location = useLocation();

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (direction && direction.includes("arrivals")) {
      setFlightsList(filterFlightsList(arrivalList, query.search));
      setStatus("arrivals");
    } else {
      setFlightsList(filterFlightsList(departureList, query.search));
      setStatus("departures");
    }
  }, [location, departureList, arrivalList, direction]);

  const filterFlightsList = (flightsList, queryString) => {
    if (!queryString) return flightsList;
    return flightsList.filter((flight) => {
      const fltNo = `${flight["carrierID.IATA"]}${flight.fltNo}`;
      return fltNo.toLowerCase().includes(queryString.toLowerCase());
    });
  };

  const extractDataList = (flightsList, flightDirection) => {
    return flightsList.map((flight) => {
      let flightData = {
        term: flight.term,
        flightNum: `${flight["carrierID.IATA"]}${flight.fltNo}`,
        airportName:
          flight["airportToID.name_en"] || flight["airportFromID.name_en"],
        localTime: flight.timeDepSchedule,
        timeStatus: flight.timeTakeOfFact,
        status: flight.status,
        name: flight.airline.en.name,
        logoUrl: flight.airline.en.logoSmallName,
      };
      if (flightDirection === "arrivals") {
        flightData = {
          ...flightData,
          timeStatus: flight.timeLandFact,
          localTime: flight.timeToStand,
        };
      }
      return <Flight key={flight.ID} {...flightData} />;
    });
  };

  return <>{extractDataList(flightsList, status)}</>;
};
const mapState = (state) => {
  return {
    departureList: departureSelector(state),
    arrivalList: arrivalSelector(state),
  };
};
const mapDispatch = {
  getFlightsList: fetchFlightsList,
};
export default connect(mapState, mapDispatch)(FlightsList);
