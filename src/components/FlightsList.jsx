import React from "react";
import Flight from "./Flight";

const FlightsList = ({ flightsList, status }) => {
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

export default FlightsList;
