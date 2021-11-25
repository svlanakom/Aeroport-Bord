import React from "react";
import moment from "moment";

const Flight = (props) => {
  const { term, flightNum, status, name, logoUrl, airportName, localTime } =
    props;
  const sheduale = moment(localTime).format("HH:mm");

  return (
    <tr>
      <td>
        <span className={term === "D" ? "terminal blue" : "terminal"}>
          {term}
        </span>
      </td>
      <td>{sheduale}</td>
      <td>
        <span>{airportName}</span>
      </td>
      <td>
        <span>{status}</span>
      </td>
      <td>
        <span className="logo-company">
          <img src={logoUrl} alt={name} />
          <span>{name}</span>
        </span>
      </td>
      <td>
        <span>{`${flightNum}`}</span>
      </td>
      <td>
        <i className="fas fa-chevron-right"></i>
      </td>
    </tr>
  );
};

export default Flight;
