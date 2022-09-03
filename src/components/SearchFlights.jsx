import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { dateSelector } from "../redux/flight.selectors";
import { connect } from "react-redux";
import qs from "qs";
import moment from "moment";
import * as flightsActions from "../redux/flight.actions";

const SearchFlights = ({ fetchFlightsList, date }) => {
  const [value, setValue] = useState("");
  const [dateValue, setDateValue] = useState(moment().format("YYYY-MM-DD"));
  const location = useLocation();
  const history = useHistory();

  const onChange = (event) => {
    setValue(event.target.value);
  };
  
  const onDateChange = (event) => {
    setDateValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    fetchFlightsList(moment(dateValue).format("DD-MM-YYYY"));
    let dataQuery = {
      search: value,
      date,
    };

    let pathname = "";
    if (location.pathname === "/") {
      pathname = "/departures?";
    } else {
      dataQuery = {
        ...dataQuery,
        ...qs.parse(location.search, { ignoreQueryPrefix: true }),
        search: value,
        date: moment(dateValue).format("DD-MM-YYYY"),
      };
      pathname = location.pathname + "?";
    }
    const queryString = qs.stringify(dataQuery);
    history.push(`${pathname}${queryString}`);
  };

  return (
    <div className="search-block">
      <h1 className="search-block__title">Search flight</h1>
      <form className="search-block__form" onSubmit={onSearch}>
        <i className="fas fa-search"></i>
        <input
          className="search-block__input"
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Airline, destination or flight #"
        />
        <input
          className="search-block__input"
          type="date"
          value={dateValue}
          onChange={onDateChange}
        />
        <button className="search-block__btn">Search</button>
      </form>
    </div>
  );
};

const mapState = (state) => {
  return {
    date: dateSelector(state),
  };
};

const mapDispatch = {
  fetchFlightsList: flightsActions.fetchFlightsList,
};

export default connect(mapState, mapDispatch)(SearchFlights);
