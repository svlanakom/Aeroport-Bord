import React, { useState, useEffect } from "react";
import { Route, Switch, Link, useLocation } from "react-router-dom";
import FlightsList from "./FlightsList";
import NotFlight from "./NotFlight";

const FlightSchedule = () => {
  const [status, setStatus] = useState("departures");
  const location = useLocation();
  const departureClass =
    status === "departures" ? "scoreboard__link_active" : "";
  const arrivalClass = status === "arrivals" ? "scoreboard__link_active" : "";

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
            <Switch>
              <Route path={`/:direction?`} component={FlightsList} />
              <Route component={NotFlight} />
            </Switch>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightSchedule;
