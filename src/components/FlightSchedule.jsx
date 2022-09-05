import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import qs from "qs";
import { connect } from "react-redux";
import FlightsList from "./FlightsList";
import NotFlight from "./NotFlight";
import { departureSelector, arrivalSelector } from "../redux/flight.selectors";
import { fetchFlightsList } from "../redux/flight.actions";

const FlightSchedule = ({ departureList, arrivalList }) => {
  const [status, setStatus] = useState("arrivals");
  const location = useLocation();
  const departureClass =
    status === "departures" ? "scoreboard__link_active" : "";
  const arrivalClass = status === "arrivals" ? "scoreboard__link_active" : "";
  const [flightsList, setFlightsList] = useState([]);

  useEffect(() => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    if (location.pathname.includes("arrivals")) {
      setFlightsList(filterFlightsList(arrivalList, query.search));
      setStatus("arrivals");
    } else {
      setFlightsList(filterFlightsList(departureList, query.search));
      setStatus("departures");
    }
  }, [location, departureList, arrivalList]);

  const filterFlightsList = (flightsList, queryString) => {
    if (!queryString) return flightsList;
    return flightsList.filter((flight) => {
      const fltNo = `${flight["carrierID.IATA"]}${flight.fltNo}`;
      return fltNo.toLowerCase().includes(queryString.toLowerCase());
    });
  };

  useEffect(() => {
    if (location.pathname.includes("arrivals")) {
      setStatus("arrivals");
    } else {
      setStatus("departures");
    }
  }, [location]);

  return (
    <div className="scoreboard">
      <div className="scoreboard__nav">
        <Link
          to={`/departures${location.search}`}
          className={`scoreboard__link scoreboard__link_departures ${departureClass}`}
        >
          <i className="fas fa-plane-departure"></i>
          Departures
        </Link>
        <Link
          to={`/arrivals${location.search}`}
          className={`scoreboard__link scoreboard__link_arrivals ${arrivalClass}`}
        >
          <i className="fas fa-plane-arrival"></i>
          Arrivals
        </Link>
      </div>
      <div className="scoreboard__table-wrapper">
        {flightsList.length !== 0 ?
          <table className="scoreboard__table flights-list">
            <thead className="flights-list__header">
              <tr>
                <th>Terminal</th>
                <th>Local time</th>
                <th>Destination</th>
                <th>Status</th>
                <th>Airline</th>
                <th>Flight</th>
              </tr>
            </thead>
            <tbody>
              <FlightsList flightsList={flightsList} status={status} />
            </tbody>
          </table>
          : <NotFlight />
        }
      </div>
    </div>
  );
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

export default connect(mapState, mapDispatch)(FlightSchedule);
