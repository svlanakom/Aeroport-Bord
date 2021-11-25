import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { dateSelector } from "../redux/flight.selectors";
import { connect } from "react-redux";
import qs from "qs";

const SearchFlights = ({ date }) => {
  const [value, setValue] = useState("");
  const location = useLocation();
  const history = useHistory();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
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

export default connect(mapState)(SearchFlights);
